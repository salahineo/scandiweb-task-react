<?php

// Product Model
class ProductModel {
  // Database Connection
  private PDO $connection;


  // Set Database Connection
  public function __construct(Database $database) {
    $this->connection = $database->connect();
  }

  // Get All Products
  public function getProducts()
  : array {
    // Query
    $query = "SELECT * FROM products ORDER BY id";

    // Return All Products
    return $this->connection->query($query)->fetchAll(PDO::FETCH_ASSOC);
  }


  // Delete Products (Mass Delete)
  public function delete(array $ids): bool {

    // Basic Query
    $query = "DELETE FROM products WHERE ";

    // Loop Through IDs
    foreach($ids as $id) {
        foreach($id as $value) {
          // Append ID
          $query .= "id = ". $value;

          // Check if not last ID
          if ($value !== end($id)) {
            $query .= " OR ";
          }
        }
    }

    // Prepare & Execute Statement
    return $this->connection->prepare($query)->execute();
  }

  // Create New Product
  public function createProduct(array $data)
  : bool {
    // Query
    $query = "INSERT INTO products 
                (
                   name, 
                   price, 
                   sku, 
                   type,
                   size_mb,  
                   weight_kg,
                   width_cm,
                   height_cm,
                   length_cm
                 ) 
              VALUES 
               (
                   :name, 
                   :price, 
                   :sku, 
                   :type,
                   :size_mb,  
                   :weight_kg,
                   :width_cm,
                   :height_cm,
                   :length_cm
                 )";

    // Prepare Statement
    $statement = $this->connection->prepare($query);

    // Bind Parameters
    $statement->bindParam(':name', $data['name']);
    $statement->bindParam(':price', $data['price']);
    $statement->bindParam(':sku', $data['sku']);
    $statement->bindParam(':type', $data['type']);
    $statement->bindParam(':size_mb', $data['size_mb']);
    $statement->bindParam(':weight_kg', $data['weight_kg']);
    $statement->bindParam(':width_cm', $data['width_cm']);
    $statement->bindParam(':height_cm', $data['height_cm']);
    $statement->bindParam(':length_cm', $data['length_cm']);

    // Execute Statement
    return $statement->execute();
  }


  // Check SKU Exists
  public function checkSKU (string $sku): bool {
    // Query
    $query = "SELECT COUNT(*) as count FROM products WHERE sku = :sku";

    // Prepare & Execute Statement
    $stmt = $this->connection->prepare($query);
    $stmt->bindParam(":sku", $sku);
    $stmt->execute();

    // Fetch Result
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row['count'] > 0;
  }
}
