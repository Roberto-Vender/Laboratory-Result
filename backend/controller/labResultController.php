<?php
require_once 'service/labResultService.php';

class labResultController {
    private labResultService $labResultService;

    public function __construct() {
        $this->labResultService = new labResultService();
    }

    public function getAllLabResults() {
        try {
            $results = $this->labResultService->getAllLabResults();
            echo json_encode(["message" => "Successfully retrieved data", "data" => $results]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public function getLabResultById($lab_id) {
        try {
            $result = $this->labResultService->getLabResultById($lab_id);
            echo json_encode(["message" => "Successfully retrieved data", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(["message" => "Lab result not found"]);
        }
    }

    public function getLabResultsByPatientId($patient_id) {
        try {
            $results = $this->labResultService->getLabResultsByPatientId($patient_id);
            echo json_encode(["message" => "Successfully retrieved data", "data" => $results]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public function createLabResult() {
        try {
            // Ensure the upload directory exists
            $uploadDir = __DIR__ . '/../uploads/results/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
    
            // Get POST data
            $patient_id = $_POST['patient_id'] ?? null;
            $test_id = $_POST['test_id'] ?? null;
            $lab_description = $_POST['lab_description'] ?? '';
    
            // Check required fields
            if (!$patient_id || !$test_id || !isset($_FILES['lab_file'])) {
                throw new Exception("Missing required fields.");
            }
    
            // Handle the file upload
            $file = $_FILES['lab_file'];
            $filename = time() . '_' . basename($file['name']); // unique name
            $targetPath = $uploadDir . $filename;
    
            if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
                throw new Exception("Failed to upload file.");
            }
    
            // Prepare data for service
            $data = [
                "patient_id" => $patient_id,
                "test_id" => $test_id,
                "lab_file" => $filename,
                "lab_description" => $lab_description
            ];
    
            // Save to database
            $this->labResultService->createLabResult($data);
    
            echo json_encode(["message" => "Successfully created lab result"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to create lab result: " . $e->getMessage()]);
        }
    }
    

    public function updateLabResult($lab_id, $data) {
        try {
            $this->labResultService->updateLabResult($lab_id, $data);
            echo json_encode(["message" => "Successfully updated lab result"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to update lab result: " . $e->getMessage()]);
        }
    }
}
?>
