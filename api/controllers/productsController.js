import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadProducts = async () => {
  try {
    const productsData = await readFile(join(__dirname, '../model/products.json'), 'utf8');
    return JSON.parse(productsData);
  } catch (error) {
    return [];
  }
};

const saveProducts = async (products) => {
  try {
    await writeFile(join(__dirname, '../model/products.json'), JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving products:', error);
    return false;
  }
};

const data = {
    products: [],
    setProducts: function (newData) { this.products = newData; }
}

const getAllProducts = async (req, res) => {
    data.products = await loadProducts();
    res.json(data.products);
}

const createNewProduct = async (req, res) => {
    data.products = await loadProducts();
    const newProduct = {
        id: data.products?.length ? data.products[data.products.length - 1].id + 1 : 1,
        name: req.body.name,
        description: req.body.description || '',
        price: req.body.price || 0,
        image: req.body.image || '',
        category: req.body.category || 'Uncategorized'
    }

    if (!newProduct.name) {
        return res.status(400).json({ 'message': 'Product name is required.' });
    }

    data.setProducts([...data.products, newProduct]);
    await saveProducts(data.products);
    res.status(201).json(data.products);
}

const updateProduct = async (req, res) => {
    data.products = await loadProducts();
    const product = data.products.find(p => p.id === parseInt(req.body.id));
    if (!product) {
        return res.status(400).json({ "message": `Product ID ${req.body.id} not found` });
    }
    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.image) product.image = req.body.image;
    if (req.body.category) product.category = req.body.category;
    
    const filteredArray = data.products.filter(p => p.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, product];
    data.setProducts(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    await saveProducts(data.products);
    res.json(data.products);
}

const deleteProduct = async (req, res) => {
    data.products = await loadProducts();
    const product = data.products.find(p => p.id === parseInt(req.body.id));
    if (!product) {
        return res.status(400).json({ "message": `Product ID ${req.body.id} not found` });
    }
    const filteredArray = data.products.filter(p => p.id !== parseInt(req.body.id));
    data.setProducts([...filteredArray]);
    await saveProducts(data.products);
    res.json(data.products);
}

const getProduct = async (req, res) => {
    data.products = await loadProducts();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(400).json({ "message": `Product ID ${req.params.id} not found` });
    }
    res.json(product);
}

export { getAllProducts, createNewProduct, updateProduct, deleteProduct, getProduct };
