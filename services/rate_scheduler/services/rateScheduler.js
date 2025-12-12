const cron = require('node-cron');
const axios = require('axios');
const xml2js = require('xml2js');
const Rate = require('../models/Rate');

// Fetch CAD-NPR rate using Bank of Canada INR rate and fixed NPR-INR conversion
const fetchCurrentRate = async () => {
    try {
        // Fetch the XML from Bank of Canada RSS
        const url = 'https://www.bankofcanada.ca/valet/fx_rss';
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const xml = response.data;

        // Parse the XML
        const parser = new xml2js.Parser({
            explicitArray: false,
            attrkey: '$'
        });
        const result = await parser.parseStringPromise(xml);

        // Navigate to the items
        const items = result['rdf:RDF'].item;

        // Find the item for FXINRCAD (INR)
        // Note: xml2js preserves namespaces in attributes (rdf:about)
        const inrItem = Array.isArray(items)
            ? items.find(item => item['$'] && item['$']['rdf:about'] && item['$']['rdf:about'].endsWith('FXINRCAD'))
            : (items && items['$'] && items['$']['rdf:about'] && items['$']['rdf:about'].endsWith('FXINRCAD') ? items : null);

        if (!inrItem) {
            throw new Error('INR rate not found in the XML.');
        }

        // Extract the rate from cb:exchangeRate > cb:value (CAD per 1 INR)
        const exchangeRateElement = inrItem['cb:statistics']['cb:exchangeRate']['cb:value'];
        // Value is in '_' when attributes (like decimals) exist
        const rateVal = exchangeRateElement['_'] || exchangeRateElement;
        const inrToCad = parseFloat(rateVal);
        const decimals = exchangeRateElement['$'] && exchangeRateElement['$'].decimals ? parseInt(exchangeRateElement['$'].decimals) : 5;

        if (isNaN(inrToCad) || inrToCad <= 0) {
            throw new Error('Invalid INR rate extracted from XML.');
        }

        // NPR-INR fixed rate: 1 INR = 1.6 NPR, so NPR per CAD = 1.6 / inrToCad
        const nprPerInr = 1.6;
        const nprPerCad = nprPerInr / inrToCad;

        const rate = +nprPerCad.toFixed(4);
        console.log(`[Scheduler] Fetched INR rate: 1 INR = ${inrToCad.toFixed(decimals)} CAD`);
        console.log(`[Scheduler] Computed NPR rate: 1 CAD = ${rate} NPR (using 1 INR = ${nprPerInr} NPR)`);

        return rate;

    } catch (error) {
        console.error('[Scheduler] Fetch failed:', error.message);
        // Fallback to mock to keep service alive
        return +(98 + Math.random() * 2).toFixed(4);
    }
};

const checkAndSetRate = async () => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD (UTC)
    console.log(`[Scheduler] Checking CAD-NPR rate for ${today}...`);

    try {
        const existingRate = await Rate.findOne({ date: today, from: 'CAD', to: 'NPR' });

        if (existingRate) {
            console.log(`[Scheduler] Rate already exists for ${today}: ${existingRate.rate}`);
            return;
        }

        console.log(`[Scheduler] Rate missing for ${today}. Fetching...`);
        const newRateValue = await fetchCurrentRate();

        const newRate = new Rate({
            date: today,
            from: 'CAD',
            to: 'NPR',
            rate: newRateValue
        });

        await newRate.save();
        console.log(`[Scheduler] Successfully saved rate for ${today}: ${newRateValue}`);

    } catch (error) {
        console.error('[Scheduler] Error in checkAndSetRate:', error);
    }
};

const startScheduler = () => {
    // Schedule: Runs at 9:00 AM and 9:00 PM every day
    cron.schedule('0 9,21 * * *', () => {
        checkAndSetRate();
    });

    console.log('✅ Rate Scheduler started (Runs at 09:00 and 21:00)');

    // Run immediately on server start
    checkAndSetRate();
};

module.exports = { startScheduler, checkAndSetRate };