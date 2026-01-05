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
    try {
        const { id } = req.params; // Kuncinya pakai ID dari URL
        
        // Ambil SEMUA data dari Body Postman
        const { nik, name, group_name, shift_id, is_off } = req.body; 

        // Query ini akan mengupdate SEMUA kolom berdasarkan ID
        const query = `
            UPDATE employee_schedules 
            SET nik = $1, 
                name = $2, 
                group_name = $3, 
                shift_id = $4, 
                is_off = $5
            WHERE id = $6 
            RETURNING *`;

        const values = [nik, name, group_name, shift_id, is_off, id];
        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Gagal! ID tidak ditemukan di database' });
        }

        res.json({
            message: "MANTAP! Semua data karyawan berhasil diupdate",
            data: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Hapus juga pakai ID
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM employee_schedules WHERE id = $1', [id]);
        
        if (result.rowCount === 0) return res.status(404).json({ message: 'ID tidak ada' });
        res.json({ message: `Karyawan dengan ID ${id} berhasil dihapus!` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Logika Khusus Perputaran
exports.rotate = async (req, res) => {
    const query = `UPDATE employee_schedules SET shift_id = CASE 
        WHEN shift_id = 1 THEN 2 WHEN shift_id = 2 THEN 3 WHEN shift_id = 3 THEN 1 ELSE shift_id END,
        last_rotation = NOW()`;
    const result = await db.query(query);
    res.json({ message: `Rotated ${result.rowCount} employees` });
};