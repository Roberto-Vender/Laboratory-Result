<?php
require_once 'service/medicalCertificateService.php';

class medicalCertificateController {
    private medicalCertificateService $service;

    public function __construct() {
        $this->service = new medicalCertificateService();
    }

    public function getAllCertificates() {
        try {
            $certificates = $this->service->getAllCertificates();
            echo json_encode(["message" => "Successfully retrieved certificates", "data" => $certificates]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

    public function getCertificateById($certificate_id) {
        try {
            $certificate = $this->service->getCertificateById($certificate_id);
            echo json_encode(["message" => "Successfully retrieved certificate", "data" => $certificate]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(["message" => "Medical certificate not found"]);
        }
    }

    public function getCertificatesByPatientId($patient_id) {
        try {
            $certificates = $this->service->getCertificatesByPatientId($patient_id);
            echo json_encode(["message" => "Successfully retrieved certificates", "data" => $certificates]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

    public function createCertificate() {
        try {
            // Ensure upload directory exists
            $uploadDir = __DIR__ . '/../uploads/results/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
    
            // Get data from form
            $patient_id = $_POST['patient_id'] ?? null;
            $issued_date = $_POST['issued_date'] ?? null;
            $details = $_POST['details'] ?? '';
    
            // Validate fields
            if (!$patient_id || !$issued_date || !isset($_FILES['certificate_file'])) {
                throw new Exception("Missing required fields");
            }
    
            // Handle file upload
            $file = $_FILES['cert_file'];
            $filename = time() . '_' . basename($file['name']); // make unique
            $targetPath = $uploadDir . $filename;
    
            if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
                throw new Exception("Failed to upload certificate file");
            }
    
            // Prepare data
            $data = [
                "patient_id" => $patient_id,
                "issued_date" => $issued_date,
                "certificate_file" => $filename,
                "details" => $details
            ];
    
            // Save to database
            $this->service->createCertificate($data);
    
            echo json_encode(["message" => "Medical certificate created successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to create medical certificate: " . $e->getMessage()]);
        }
    }
    

    public function updateCertificate($certificate_id, $data) {
        try {
            $this->service->updateCertificate($certificate_id, $data);
            echo json_encode(["message" => "Medical certificate updated successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to update medical certificate: " . $e->getMessage()]);
        }
    }
}
?>
