const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/db');

describe('Employee API Unit Tests', () => {
  
  // Test 1: Mendapatkan Detail Jadwal
  it('should get employee schedule by NIK', async () => {
    const res = await request(app).get('/api/employees/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nik', '123456');
    expect(res.body).toHaveProperty('name', 'Dika');
  });

  // Test 2: Logika Perputaran Shift (Critical Test)
  it('should rotate shifts for all employees', async () => {
    // 1. Ambil data awal Dika (Shift 1)
    const before = await request(app).get('/api/employees/123456');
    const oldShiftId = before.body.shift_id;

    // 2. Jalankan Perputaran
    const res = await request(app).post('/api/employees/rotate');
    expect(res.statusCode).toEqual(200);

    // 3. Pastikan Shift Dika berubah (1 jadi 2)
    const after = await request(app).get('/api/employees/123456');
    expect(after.body.shift_id).not.toBe(oldShiftId);
  });

  // Test 3: Penanganan NIK Salah
  it('should return Not Found for invalid NIK', async () => {
    const res = await request(app).get('/api/employees/999999');
    expect(res.body.message).toBe('Not Found');
  });
});