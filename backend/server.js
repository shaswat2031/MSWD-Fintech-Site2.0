const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection logic
const scrapeRoutes = require('./routes/scrapeRoutes');
const articleRoutes = require('./routes/articleRoutes'); // Correct import for article routes
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/articles', articleRoutes); // Articles API route should be here
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/scrape', scrapeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
