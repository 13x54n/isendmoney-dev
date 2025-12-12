const express = require('express');
const router = express.Router();
const GameStat = require('../models/GameStat');

// Energy consumption rate: 1 unit per minute (more realistic 12h?)
// User said: "once energy is filled it's filled for next 12 hours"
// This implies it doesn't drain? Or it stays available for 12 hours?
// "simply change the status to walking and sleeping"
// Interpretation: Refill = 100 energy. Walking is allowed for 12 hours from refill?
// If walking drains energy, "filled for 12 hours" suggests a duration.
// Let's assume: Refill provides 100% which is actually a 12-hour timer.
// If not walking, timer pauses? Or absolute 12 hours?
// "filled for next 12 hours" -> absolute time window?
// Let's implement absolute 12h validity for now. If refilled at T, expires at T+12h.
// During this 12h, energy is "Full" (or walking allowed).
// But visual bar drains? "show the video... simply change status"
// Let's make energy = 100 represent 12 hours. Drains over 12 hours if walking?
// "check the expiration time for energy"
// So: Refill sets `refillTime` and `energyExpiration` = `refillTime` + 12h.
// If now > expiration, energy = 0, status = idle.
// If now < expiration, status = walking allowed.

router.get('/:userId', async (req, res) => {
    try {
        let stats = await GameStat.findOne({ userId: req.params.userId });
        if (!stats) {
            stats = new GameStat({ userId: req.params.userId });
            await stats.save();
        }

        const now = new Date();
        const TWELVE_HOURS = 12 * 60 * 60 * 1000;

        // Check if energy expired
        if (stats.refillTime) {
            const expirationTime = new Date(stats.refillTime).getTime() + TWELVE_HOURS;
            if (now.getTime() > expirationTime) {
                stats.energy = 0;
                stats.status = 'idle';
                stats.walkStartTime = null;
                stats.refillTime = null; // Clear refill
                await stats.save();
            } else {
                // Calculate remaining percentage of the 12h window
                const remaining = expirationTime - now.getTime();
                const percent = Math.max(0, (remaining / TWELVE_HOURS) * 100);

                // If status is walking, update energy display
                // If status is idle, does it pause? User said "filled for next 12 hours".
                // This sounds like a subscription. 
                // Let's assume it expires regardless of walking. 
                // If "filled", you can walk.

                // However, current UI shows "Energy Level" bar.
                // We will map the Time Remaining to Energy Bar.
                stats.energy = Math.floor(percent);
                // Don't save pure display calculation unless we want to persist partial drains?
                // Let's just return it.
            }
        } else {
            // No active refill
            if (stats.energy > 0) {
                // Should be 0 if no refill time?
                // Legacy handling or manual set: reset to 0
                stats.energy = 0;
                stats.status = 'idle';
                await stats.save();
            }
        }

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Perform Action (Start/Stop/Refill)
router.post('/:userId/action', async (req, res) => {
    const { action } = req.body;

    try {
        let stats = await GameStat.findOne({ userId: req.params.userId });
        if (!stats) stats = new GameStat({ userId: req.params.userId });

        const now = new Date();
        const TWELVE_HOURS = 12 * 60 * 60 * 1000;

        if (action === 'refill') {
            stats.energy = 100;
            stats.status = 'walking';
            stats.refillTime = now; // Start 12h timer
            stats.walkStartTime = now;
        } else if (action === 'start') {
            // Check if valid
            if (stats.refillTime) {
                const expirationTime = new Date(stats.refillTime).getTime() + TWELVE_HOURS;
                if (now.getTime() < expirationTime) {
                    stats.status = 'walking';
                    stats.walkStartTime = now;
                } else {
                    stats.energy = 0;
                    stats.status = 'idle';
                    stats.refillTime = null;
                    return res.status(400).json({ error: 'Energy expired' });
                }
            } else {
                return res.status(400).json({ error: 'No energy' });
            }
        } else if (action === 'stop') {
            stats.status = 'idle';
            // Don't clear refillTime, allowing resume
        }

        await stats.save();
        res.json(stats);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
