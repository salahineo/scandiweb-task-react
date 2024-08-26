<?php

// DB Connection
class Database {

  // Database Properties
  private string $host;
  private string $username;
  private string $password;
  private string $database;

  // Set Database Properties
  public function __construct($host, $username, $password, $database) {
    $this->host = $host;
    $this->username = $username;
    $this->password = $password;
    $this->database = $database;
  }

  // Connect to Database
  public function connect (): PDO {
    // Data Source Name
    $dsn = "mysql:host=$this->host;dbname=$this->database";

    // Return New PDO Instance
    return new PDO($dsn, $this->username, $this->password, [
      PDO::ATTR_EMULATE_PREPARES => false,
      PDO::ATTR_STRINGIFY_FETCHES => false,
    ]);
  }

}
