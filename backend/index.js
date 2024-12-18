const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const ArtisianRoutes = require('./routes/ArtisianRoutes');
const app = express();

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3000'  // Replace with your frontend's URL
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error:', error));

app.use('/api', productRoutes);
app.use('/api', ArtisianRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
