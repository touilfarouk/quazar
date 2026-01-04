import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MySQL connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'quazar_db',
    waitForConnections: true,
    connectionLimit: 10
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute queries
const executeQuery = async (query, params = []) => {
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await executeQuery('SELECT * FROM orders ORDER BY created DESC');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const orders = await executeQuery('SELECT * FROM orders WHERE id = ?', [orderId]);
        
        if (orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(orders[0]);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

// Create new order
const createOrder = async (req, res) => {
    try {
        const { user_id, total, status = 'pending' } = req.body;
        
        if (!user_id || !total) {
            return res.status(400).json({ error: 'User ID and total are required' });
        }
        
        const result = await executeQuery(
            'INSERT INTO orders (user_id, total, status, created) VALUES (?, ?, ?, NOW())',
            [user_id, total, status]
        );
        
        res.status(201).json({ 
            id: result.insertId,
            message: 'Order created successfully',
            order: { user_id, total, status, created: new Date() }
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        
        if (!id || !status) {
            return res.status(400).json({ error: 'Order ID and status are required' });
        }
        
        await executeQuery(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );
        
        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        const result = await executeQuery('DELETE FROM orders WHERE id = ?', [orderId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

export { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };
