import express from 'express';
import flights from '../data/flights.json' assert { type: 'json' };

const router = express.Router();

router.get('/', (req, res) => {
    const { fromCountry, toCountry, date, q } = req.query;

    let results = flights;

    if (fromCountry) {
        results = results.filter(f =>
            f.fromCountry.toLowerCase().includes(fromCountry.toLowerCase())
        );
    }

    if (toCountry) {
        results = results.filter(f =>
            f.toCountry.toLowerCase().includes(toCountry.toLowerCase())
        );
    }

    if (date) {
        results = results.filter(f => f.date === date);
    }

    if (q) {
        results = results.filter(f =>
            f.airline.toLowerCase().includes(q.toLowerCase()) ||
            f.flightNumber.toLowerCase().includes(q.toLowerCase())
        );
    }

    res.json({ success: true, data: results });
});

export default router;
