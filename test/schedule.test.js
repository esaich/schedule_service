const request = require('supertest');
const app = require('../src/app');

describe('Full CRUD Schedule Service Test', () => {
  const dummyNik = "TEST999";

  // --- TEST CREATE ---
  it('POST /api/employees - Harusnya bisa tambah karyawan baru', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({
        nik: dummyNik,
        name: "Karyawan Testing",
        group_name: "X",
        shift_id: 1
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.nik).toBe(dummyNik);
  });

  // --- TEST READ ALL ---
  it('GET /api/employees - Harusnya bisa ambil semua daftar karyawan', async () => {
    const res = await request(app).get('/api/employees');
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // --- TEST READ ONE ---
  it('GET /api/employees/:nik - Harusnya bisa ambil detail karyawan spesifik', async () => {
    const res = await request(app).get(`/api/employees/${dummyNik}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Karyawan Testing");
  });

  // --- TEST UPDATE ---
  it('PUT /api/employees/:nik - Harusnya bisa update nama karyawan', async () => {
    const res = await request(app)
      .put(`/api/employees/${dummyNik}`)
      .send({
        name: "Karyawan Updated",
        group_name: "Y",
        shift_id: 2,
        is_off: true
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Karyawan Updated");
    expect(res.body.is_off).toBe(true);
  });

  // --- TEST DELETE ---
  it('DELETE /api/employees/:nik - Harusnya bisa hapus karyawan', async () => {
    const res = await request(app).delete(`/api/employees/${dummyNik}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Deleted');
  });

  // --- VERIFIKASI DELETE ---
  it('GET /api/employees/:nik - Harusnya data sudah tidak ada (404/Not Found)', async () => {
    const res = await request(app).get(`/api/employees/${dummyNik}`);
    
    // Sesuai controller kita, jika tidak ada mengembalikan {message: 'Not Found'}
    expect(res.body.message).toBe('Not Found');
  });
});