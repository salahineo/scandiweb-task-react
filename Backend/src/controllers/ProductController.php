<?php

// Product Controller
class ProductController {

  // Product Model
  private $productModel;

  // Set Product Model
  public function __construct($productModel) {
    $this->productModel = $productModel;
  }

  // Process Request Method
  public function processRequest (string $method): void {
    // Check the method
    switch($method) {
      // Get Products
      case 'GET':
        $this->getResourceRequest();
        break;

      // New Product
      case 'POST':
        $this->createResourceRequest();
        break;

      // Mass Delete
      case 'DELETE':
        $this->deleteResourceRequest();
        break;

      default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        exit;
    }
  }


  // Create Resource Request
  private function createResourceRequest(): void {
    // Get Data Or Set To Empty Array
    $data = (array) json_decode(file_get_contents('php://input'), true);

    // Check if data is provided
    if ($data) {
      // Check for required fields
      if (!isset($data['name'], $data['price'], $data['sku'], $data['type'])) {
        http_response_code(400);
        echo json_encode(["message" => "Please fill the required fields"]);

        return;
      }

      // Check for required fields
      if (! ($data['type'] === 'DVD' || $data['type'] === 'Book' || $data['type'] === 'Furniture')) {
        http_response_code(400);
        echo json_encode(["message" => "Invalid Type, Please Don't Modify The Request :)"]);

        return;
      }

      // Check SKU Duplication
      if ($this->productModel->checkSKU($data['sku'])) {
        http_response_code(400);
        echo json_encode(["message" => "SKU already exists, please write another uniqe one"]);

        return;
      }

      // Create Product
      if ($this->productModel->createProduct($data)) {
        http_response_code(201);
        echo json_encode(["message" => "Product created"]);

        return;
      }

      // Failed to create product
      http_response_code(500);
      echo json_encode(["message" => "Failed to create product"]);
    }

    // No Data provided
    http_response_code(400);
    echo json_encode(["message" => "Product data should be provided"]);
  }

  // Delete Resource Request
  private function deleteResourceRequest(): void {
    // Get Data Or Set To Empty Array
    $ids = (array) json_decode(file_get_contents('php://input'), true);

    // Check if IDs are provided
    if ($ids) {
      // Delete Products
      if ($this->productModel->delete($ids)) {
        http_response_code(200);
        echo json_encode(["message" => "Selected products deleted"]);

        return;
      }

      // Failed to delete products
      http_response_code(500);
      echo json_encode(["message" => "Failed to delete product"]);

      return;
    }

    // No IDs provided
    http_response_code(400);
    echo json_encode(["message" => "Products IDs should be provided"]);
  }

  // Get Resource Request
  private function getResourceRequest(): void {
    http_response_code(200);
    echo json_encode($this->productModel->getProducts());
  }
}
