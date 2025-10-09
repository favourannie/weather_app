const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api/v1', weatherRoutes);
app.use('/', (req, res) => {
  res.send('Welcome To My Weather App');
});
const PORT = process.env.PORT || 5656;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
