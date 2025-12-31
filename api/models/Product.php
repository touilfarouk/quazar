<?php
class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $description;
    public $price;
    public $category_id;
    public $image;
    public $created;
    
    // For file upload
    public $image_file;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all products
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get single product
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $row['name'];
        $this->description = $row['description'];
        $this->price = $row['price'];
        $this->category_id = $row['category_id'];
        $this->created = $row['created'];
    }

    // Upload image file
    private function uploadImage() {
        if(empty($this->image_file['tmp_name'])) {
            return true; // No file to upload
        }
        
        $target_dir = "/productsPicturesFolder/";
        $imageFileType = strtolower(pathinfo($this->image_file['name'], PATHINFO_EXTENSION));
        $new_filename = uniqid('product_', true) . '.' . $imageFileType;
        $target_file = $_SERVER['DOCUMENT_ROOT'] . $target_dir . $new_filename;
        
        // Check if image file is an actual image
        $check = getimagesize($this->image_file['tmp_name']);
        if($check === false) {
            throw new Exception("File is not an image.");
        }
        
        // Check file size (max 5MB)
        if ($this->image_file['size'] > 5000000) {
            throw new Exception("Sorry, your file is too large. Maximum size is 5MB.");
        }
        
        // Allow certain file formats
        $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];
        if(!in_array($imageFileType, $allowed_types)) {
            throw new Exception("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
        }
        
        // Try to upload file
        if (move_uploaded_file($this->image_file['tmp_name'], $target_file)) {
            $this->image = $target_dir . $new_filename;
            return true;
        } else {
            throw new Exception("Sorry, there was an error uploading your file.");
        }
    }
    
    // Create product
    public function create() {
        try {
            // Handle image upload if file is present
            if(isset($this->image_file)) {
                $this->uploadImage();
            }
            
            $query = "INSERT INTO " . $this->table_name . " 
                     SET name=:name, description=:description, price=:price, 
                         category_id=:category_id, image=:image, created=:created";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));
        $this->created = date('Y-m-d H:i:s');

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":created", $this->created);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update product
    public function update() {
        try {
            // Handle image upload if file is present
            if(isset($this->image_file)) {
                $this->uploadImage();
                $image_sql = ", image=:image";
            } else {
                $image_sql = "";
            }
            
            $query = "UPDATE " . $this->table_name . " 
                     SET name=:name, description=:description, price=:price, 
                         category_id=:category_id{$image_sql} 
                     WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = htmlspecialchars(strip_tags($this->price));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));
        $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":description", $this->description);
            $stmt->bindParam(":price", $this->price);
            $stmt->bindParam(":category_id", $this->category_id);
            if(!empty($image_sql)) {
                $stmt->bindParam(":image", $this->image);
            }
            $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete product
    public function delete() {
        // First get the image path before deleting
        $query = "SELECT image FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Delete the image file if it exists
        if(!empty($row['image']) && file_exists($_SERVER['DOCUMENT_ROOT'] . $row['image'])) {
            unlink($_SERVER['DOCUMENT_ROOT'] . $row['image']);
        }
        
        // Now delete the product
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
