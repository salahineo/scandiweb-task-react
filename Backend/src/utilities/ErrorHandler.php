<?php

// Error Handler
class ErrorHandler {

  // Handle Exception
  /**
   * @throws JsonException
   */
  public static function handleException(Throwable $e): void {
    // Set Response Code
    http_response_code(500);

    // Return JSON
    echo json_encode([
      'code' => $e->getCode(),
      'error' => $e->getMessage(),
      'file' => $e->getFile(),
      'line' => $e->getLine()
    ], JSON_THROW_ON_ERROR);
  }
}
