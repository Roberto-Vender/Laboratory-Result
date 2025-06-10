<?php
require_once 'service/recordConsultationService.php';

class recordConsultationController {
    private recordConsultationService $service;

    public function __construct() {
        $this->service = new recordConsultationService();
    }

    public function getAllConsultations() {
        try {
            $consultations = $this->service->getAllConsultations();
            echo json_encode(["message" => "Successfully retrieved consultations", "data" => $consultations]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

    public function getConsultationById($consultation_id) {
        try {
            $consultation = $this->service->getConsultationById($consultation_id);
            echo json_encode(["message" => "Successfully retrieved consultation", "data" => $consultation]);
        } catch (Exception $e) {
            http_response_code(404);
            echo json_encode(["message" => "Consultation not found"]);
        }
    }

    public function getConsultationsByPatientId($patient_id) {
        try {
            $consultations = $this->service->getConsultationsByPatientId($patient_id);
            echo json_encode(["message" => "Successfully retrieved consultations", "data" => $consultations]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Error: " . $e->getMessage()]);
        }
    }

    public function createConsultation($data) {
        try {
            $this->service->createConsultation($data);
            echo json_encode(["message" => "Consultation created successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to create consultation: " . $e->getMessage()]);
        }
    }

    public function updateConsultation($consultation_id, $data) {
        try {
            $this->service->updateConsultation($consultation_id, $data);
            echo json_encode(["message" => "Consultation updated successfully"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "Failed to update consultation: " . $e->getMessage()]);
        }
    }
}
?>
