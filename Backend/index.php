<?php

// Strict Types
declare(strict_types=1);

// Basic Autoloader
spl_autoload_register(function ($class) {
  // Sub-Directories Classes
  $dirs = array(
    'config',
    'controllers',
    'models',
    'utilities'
  );

  // Iterate Over Directories
  foreach( $dirs as $dir ) {
    if (file_exists(__DIR__ . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR . $class . '.php')) {
      // Require The Class
      require (__DIR__ . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $dir . DIRECTORY_SEPARATOR . $class . '.php');
      return;
    }
  }
});

// Error Handler
set_exception_handler('ErrorHandler::handleException');

// Set Headers
header("Content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("HTTP/1.1 200 OK");
  exit();
}

// Get The Requested URI
$parts = explode('/', $_SERVER['REQUEST_URI']);

// Check for the products route
if ($parts[1] !== 'products') {
  http_response_code(400);
  echo json_encode(['message' => 'No route found']);
  exit;
}

// Create Instance of Database
$db = new Database('localhost', 'root', '', 'sw_task');

// Create Instance of Product Model
$productModel = new ProductModel($db);

// Create Instance of Product Controller
$productController = new ProductController($productModel);

// Get The Request Method
$productController->processRequest($_SERVER['REQUEST_METHOD']);

