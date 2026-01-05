/* eslint-disable camelcase */

exports.up = (pgm) => {
  // 1. Tabel Master Shift (Pagi, Siang, Malam)
  pgm.createTable('shift_configurations', {
    id: 'id',
    shift_name: { type: 'varchar(20)', notNull: true }, // Pagi, Siang, Malam
    start_time: { type: 'time', notNull: true },       // 06:00
    end_time: { type: 'time', notNull: true },         // 14:00
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // 2. Tabel Utama Jadwal Karyawan
  pgm.createTable('employee_schedules', {
    id: 'id',
    nik: { type: 'varchar(20)', notNull: true, unique: true },
    name: { type: 'varchar(100)', notNull: true },
    group_name: { type: 'varchar(5)', notNull: true },    // Grup A, B, C
    shift_id: { 
      type: 'integer', 
      references: 'shift_configurations', 
      onDelete: 'CASCADE' 
    },
    is_off: { type: 'boolean', default: false },          // Jika TRUE maka hari libur
    last_rotation: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // 3. Tabel Log Penukaran Shift (Shift Swap)
  pgm.createTable('shift_swaps', {
    id: 'id',
    requester_nik: { type: 'varchar(20)', notNull: true },
    target_nik: { type: 'varchar(20)', notNull: true },
    swap_date: { type: 'date', notNull: true },
    status: { type: 'varchar(20)', default: 'PENDING' }, // PENDING, APPROVED, REJECTED
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // SEED DATA: Masukkan konfigurasi shift default
  pgm.sql(`
    INSERT INTO shift_configurations (shift_name, start_time, end_time) VALUES
    ('Pagi', '06:00:00', '14:00:00'),
    ('Siang', '14:00:00', '22:00:00'),
    ('Malam', '22:00:00', '06:00:00');

    INSERT INTO employee_schedules (nik, name, group_name, shift_id) VALUES
    ('123456', 'Dika', 'A', 1),
    ('123457', 'Budi', 'B', 2),
    ('123458', 'Siti', 'C', 3);
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('shift_swaps');
  pgm.dropTable('employee_schedules');
  pgm.dropTable('shift_configurations');
};