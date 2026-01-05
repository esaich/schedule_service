const db = require('../config/db');

exports.requestSwap = async (req, res) => {
    const { requester_nik, target_nik, swap_date } = req.body;
    const result = await db.query(
        'INSERT INTO shift_swaps (requester_nik, target_nik, swap_date) VALUES ($1, $2, $3) RETURNING *',
        [requester_nik, target_nik, swap_date]
    );
    res.json(result.rows[0]);
};

exports.getHistory = async (req, res) => {
    const result = await db.query('SELECT * FROM shift_swaps ORDER BY created_at DESC');
    res.json(result.rows);
};