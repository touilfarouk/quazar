import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables manually
const envPath = join(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf8');

// Process each line and clean up BOM/encoding issues
envContent.split('\n').forEach(line => {
    // Remove all non-printable characters and BOM
    const cleanLine = line.replace(/[\u0000-\u001F\u007F-\u009F\uFEFF]/g, '').trim();
    if (!cleanLine || !cleanLine.includes('=')) return; // Skip empty lines or invalid format
    
    const [key, ...values] = cleanLine.split('=');
    if (key && values.length > 0) {
        const value = values.join('=').trim();
        const cleanKey = key.replace(/[\u0000-\u001F\u007F-\u009F\uFEFF]/g, '').trim();
        // Remove any remaining BOM characters from the key
        const finalKey = cleanKey.replace(/^\uFEFF/, '').replace(/^[\u0000-\u001F]+/, '');
        process.env[finalKey] = value;
    }
});

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

const getAllProducts = async (req, res) => {
    try {
        const products = await executeQuery('SELECT * FROM products ORDER BY id');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

const createNewProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        
        if (!name) {
            return res.status(400).json({ 'message': 'Product name is required.' });
        }

        const result = await executeQuery(
            'INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
            [name, description || '', price || 0, image || '', category || 'Uncategorized']
        );
        
        res.status(201).json({ 
            id: result.insertId,
            name,
            description: description || '',
            price: price || 0,
            image: image || '',
            category: category || 'Uncategorized'
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, image, category } = req.body;
        
        if (!id) {
            return res.status(400).json({ "message": "Product ID is required" });
        }

        // Check if product exists
        const existingProducts = await executeQuery('SELECT * FROM products WHERE id = ?', [id]);
        if (existingProducts.length === 0) {
            return res.status(400).json({ "message": `Product ID ${id} not found` });
        }

        // Build dynamic update query
        const updates = [];
        const params = [];
        
        if (name !== undefined) {
            updates.push('name = ?');
            params.push(name);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            params.push(description);
        }
        if (price !== undefined) {
            updates.push('price = ?');
            params.push(price);
        }
        if (image !== undefined) {
            updates.push('image = ?');
            params.push(image);
        }
        if (category !== undefined) {
            updates.push('category = ?');
            params.push(category);
        }
        
        if (updates.length === 0) {
            return res.status(400).json({ "message": "No fields to update" });
        }
        
        params.push(id);
        
        await executeQuery(
            `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
            params
        );
        
        // Return updated product
        const updatedProducts = await executeQuery('SELECT * FROM products WHERE id = ?', [id]);
        res.json(updatedProducts[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            return res.status(400).json({ "message": "Product ID is required" });
        }

        // Check if product exists
        const existingProducts = await executeQuery('SELECT * FROM products WHERE id = ?', [id]);
        if (existingProducts.length === 0) {
            return res.status(400).json({ "message": `Product ID ${id} not found` });
        }

        await executeQuery('DELETE FROM products WHERE id = ?', [id]);
        
        // Return remaining products
        const remainingProducts = await executeQuery('SELECT * FROM products ORDER BY id');
        res.json(remainingProducts);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}

const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const products = await executeQuery('SELECT * FROM products WHERE id = ?', [productId]);
        
        if (products.length === 0) {
            return res.status(400).json({ "message": `Product ID ${productId} not found` });
        }
        
        res.json(products[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
}

export { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProduct };
