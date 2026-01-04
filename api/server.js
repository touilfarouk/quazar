import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials.js';
import corsOptions from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import root from './routes/root.js';
import authRoutes from './routes/auth.js';
import registerRoutes from './routes/register.js';
import logoutRoutes from './routes/logout.js';
import refreshRoutes from './routes/refresh.js';
import productsRoutes from './routes/api/products.js';
import ordersRoutes from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json 
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Serve static files from public directory
app.use(express.static('public'));

// Routes
app.use('/', root);
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/logout', logoutRoutes);
app.use('/refresh', refreshRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// Catch-all route for 404
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.status(404).send('<h1>404 Not Found</h1>');
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
