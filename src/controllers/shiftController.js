const db = require('../config/db');

exports.getAll = async (req, res) => {
    const result = await db.query('SELECT * FROM shift_configurations');
    res.json(result.rows);
};

exports.create = async (req, res) => {
    const { shift_name, start_time, end_time } = req.body;
    const result = await db.query(
        'INSERT INTO shift_configurations (shift_name, start_time, end_time) VALUES ($1, $2, $3) RETURNING *',
        [shift_name, start_time, end_time]
    );
    res.status(201).json(result.rows[0]);
};