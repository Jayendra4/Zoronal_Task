require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Connect Database
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://zoronal-task-s57u-jayendras-projects-60719684.vercel.app',
    'https://zoronal-task-s57u-git-main-jayendras-projects-60719684.vercel.app'
  ],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});