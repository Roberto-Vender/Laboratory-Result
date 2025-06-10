<?php
require_once "service/patientService.php";

class PatientController {
    private PatientService $patientService;

    public function __construct() {
        $this->patientService = new PatientService();
    }

    public function getAllPatient() {
        try {
            $patients = $this->patientService->getAllPatient();
            echo json_encode([
                "message" => "Successfully retrieved patients",
                "data" => $patients
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function getPatientById($id) {
        try {
            $patient = $this->patientService->getPatientById($id);
            echo json_encode([
                "message" => "Successfully retrieved patient",
                "data" => $patient
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function createPatient($data) {
        try {
            $this->patientService->createPatient($data);
            http_response_code(201);
            echo json_encode(["message" => "Successfully created patient"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function updatePatient($id, $data) {
        try {
            $this->patientService->updatePatient($id, $data);
            echo json_encode(["message" => "Successfully updated patient"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
