const db = require('../config/db');

exports.getAll = async (req, res) => {
    const result = await db.query('SELECT * FROM employee_schedules');
    res.json(result.rows);
};

exports.getByNik = async (req, res) => {
    const result = await db.query('SELECT * FROM employee_schedules WHERE nik = $1', [req.params.nik]);
    res.json(result.rows[0] || { message: 'Not Found' });
};

exports.create = async (req, res) => {
    const { nik, name, group_name, shift_id } = req.body;
    const result = await db.query(
        'INSERT INTO employee_schedules (nik, name, group_name, shift_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [nik, name, group_name, shift_id]
    );
    res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
    const { name, group_name, shift_id, is_off } = req.body;
    const result = await db.query(
        'UPDATE employee_schedules SET name=$1, group_name=$2, shift_id=$3, is_off=$4 WHERE nik=$5 RETURNING *',
        [name, group_name, shift_id, is_off, req.params.nik]
    );
    res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
    await db.query('DELETE FROM employee_schedules WHERE nik = $1', [req.params.nik]);
    res.json({ message: 'Deleted' });
};

// Logika Khusus Perputaran
exports.rotate = async (req, res) => {
    const query = `UPDATE employee_schedules SET shift_id = CASE 
        WHEN shift_id = 1 THEN 2 WHEN shift_id = 2 THEN 3 WHEN shift_id = 3 THEN 1 ELSE shift_id END,
        last_rotation = NOW()`;
    const result = await db.query(query);
    res.json({ message: `Rotated ${result.rowCount} employees` });
};