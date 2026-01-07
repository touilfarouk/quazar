import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables manually
const envPath = join(__dirname, '.env');
console.log('Loading env from:', envPath);
const envContent = readFileSync(envPath, 'utf8');
console.log('Env content:', envContent);

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
        console.log(`Set ${finalKey} = ${value}`);
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

// Test database connection
const testConnection = async () => {
    try {
        console.log('Testing database connection...');
        console.log('Host:', process.env.DB_HOST);
        console.log('Database:', process.env.DB_DATABASE);
        console.log('User:', process.env.DB_USER);
        
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Database connection successful!');
        
        // Test query to get database info
        const [rows] = await connection.execute('SHOW TABLES');
        console.log('📊 Tables in database:');
        rows.forEach(row => {
            console.log('  -', Object.values(row)[0]);
        });
        
        await connection.end();
        console.log('✅ Connection closed');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
};

testConnection();
