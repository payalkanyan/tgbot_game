// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
dotenv.config();

// Initialize MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const questRoutes = require('./routes/questRoutes');
app.use('/api/quests', questRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

