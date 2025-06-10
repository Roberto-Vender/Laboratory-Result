<?php
require_once 'service/recordVisitService.php';

class recordVisitController {
    private recordVisitService $service;

    public function __construct() {
        $this->service = new recordVisitService();
    }

    public function getAllVisits() {
        try {
            $visits = $this->service->getAllVisits();
            echo json_encode(["message" => "Successfully retrieved visits", "data" => $visits]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

    public function getVisitById($visit_id) {
        try {
            $visit = $this->service->getVisitById($visit_id);
            echo json_encode(["message" => "Successfully retrieved visit", "data" => $visit]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(["message" => "Visit not found"]);
        }
    }

    public function getVisitsByPatientId($patient_id) {
        try {
            $visits = $this->service->getVisitsByPatientId($patient_id);
            echo json_encode(["message" => "Successfully retrieved visits", "data" => $visits]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

    public function createVisit($data) {
        try {
            $this->service->createVisit($data);
            echo json_encode(["message" => "Visit created successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to create visit: " . $e->getMessage()]);
        }
    }

    public function updateVisit($visit_id, $data) {
        try {
            $this->service->updateVisit($visit_id, $data);
            echo json_encode(["message" => "Visit updated successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to update visit: " . $e->getMessage()]);
        }
    }
}
?>
