<?php
require_once 'service/TestService.php';

class TestController {
    private TestService $testService;

    public function __construct() {
        $this->testService = new TestService();
    }

    public function getAllTests() {
        try {
            $result = $this->testService->getAllTests();
            echo json_encode(["message" => "Tests retrieved successfully", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function getTestById($id) {
        try {
            $result = $this->testService->getTestById($id);
            echo json_encode(["message" => "Test retrieved successfully", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function createTest($data) {
        try {
            $this->testService->createTest($data);
            http_response_code(201);
            echo json_encode(["message" => "Test created successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function updateTest($id, $data) {
        try {
            $this->testService->updateTest($id, $data);
            echo json_encode(["message" => "Test updated successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
?>
