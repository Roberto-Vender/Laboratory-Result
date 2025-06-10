<?php
require_once "database.php";
class DashboardController{
    private database $db;
    public function __construct(){
        $this->db = new database();
    }
    public function getDashboardData(){
        try {
            $conn = $this->db->getConnection();
            $query = "SELECT COUNT(*) AS total_patients FROM patients";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $totalPatients = $stmt->fetch(PDO::FETCH_ASSOC)['total_patients'] ?? 0;

            $query = "SELECT COUNT(*) AS total_lab FROM lab_results";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $totalLabResults = $stmt->fetch(PDO::FETCH_ASSOC)['total_appointments'] ?? 0;

            $query = "SELECT COUNT(*) AS total_history FROM records_visits";
            echo json_encode([
                "message" => "Successfully retrieved dashboard data",
                "data" => [
                    "total_patients" => $totalPatients,
                    "total_appointments" => $totalLabResults
                ]
            ]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}