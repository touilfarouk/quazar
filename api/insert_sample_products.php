<?php
// Include database connection
include_once 'config/database.php';

// Sample products data
$products = [
    [
        'name' => 'Premium T-Shirt',
        'description' => 'High-quality cotton t-shirt for everyday wear',
        'price' => 29.99,
        'category_id' => 1,
        'image' => null
    ],
    [
        'name' => 'Wireless Earbuds',
        'description' => 'Crystal clear sound with noise cancellation',
        'price' => 89.99,
        'category_id' => 2,
        'image' => null
    ],
    [
        'name' => 'Smart Watch',
        'description' => 'Track your fitness and stay connected',
        'price' => 199.99,
        'category_id' => 2,
        'image' => null
    ],
    [
        'name' => 'Leather Wallet',
        'description' => 'Genuine leather wallet with multiple card slots',
        'price' => 49.99,
        'category_id' => 3,
        'image' => null
    ],
    [
        'name' => 'Stainless Steel Water Bottle',
        'description' => 'Keep your drinks hot or cold for hours',
        'price' => 24.99,
        'category_id' => 4,
        'image' => null
    ]
];

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Prepare SQL statement
    $query = "INSERT INTO products (name, description, price, category_id, image, created) 
              VALUES (:name, :description, :price, :category_id, :image, NOW())";
    $stmt = $db->prepare($query);
    
    $inserted = 0;
    
    // Insert each product
    foreach ($products as $product) {
        $stmt->bindParam(":name", $product['name']);
        $stmt->bindParam(":description", $product['description']);
        $stmt->bindParam(":price", $product['price']);
        $stmt->bindParam(":category_id", $product['category_id']);
        $stmt->bindParam(":image", $product['image']);
        
        if($stmt->execute()) {
            $inserted++;
        }
    }
    
    echo "Successfully inserted $inserted products.";
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
