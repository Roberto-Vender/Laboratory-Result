<?php
require_once 'service/DoctorService.php';

class DoctorController {
    private DoctorService $doctorService;

    public function __construct() {
        $this->doctorService = new DoctorService();
    }

    public function getAllDoctors() {
        try {
            $result = $this->doctorService->getAllDoctors();
            echo json_encode(["message" => "Successfully fetched doctors", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function getDoctorById($id) {
        try {
            $result = $this->doctorService->getDoctorById($id);
            echo json_encode(["message" => "Doctor found", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function createDoctor($data) {
        try {
            $this->doctorService->createDoctor($data);
            http_response_code(201);
            echo json_encode(["message" => "Doctor successfully created"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }

    public function updateDoctor($id, $data) {
        try {
            $this->doctorService->updateDoctor($id, $data);
            echo json_encode(["message" => "Doctor successfully updated"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
?>
