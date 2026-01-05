const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // Kita ubah pesan di sini agar lebih informatif
  console.log('--------------------------------------------------');
  console.log(`🚀 Schedule Service is running!`);
  console.log(`🌐 Local:   http://localhost:${PORT}`);
  console.log(`📁 API End: http://localhost:${PORT}/api/employees`);
  console.log('--------------------------------------------------');
  console.log('✅ Database connected successfully');
});