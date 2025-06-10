<?php
require_once "mainRepository.php";

class labResultRepository {
    private mainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new mainRepository();
    }

    public function getAllLabResults() {
        $query = "SELECT * FROM lab_results";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getLabResultById($lab_id) {
        $query = "SELECT * FROM lab_results WHERE lab_id = :LAB_ID";
        $params = [":LAB_ID" => $lab_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function getLabResultsByPatientId($patient_id) {
        $query = "SELECT * FROM lab_results WHERE patient_id = :PATIENT_ID";
        $params = [":PATIENT_ID" => $patient_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function createLabResult(LabResult $labResult) {
        $query = "INSERT INTO lab_results (patient_id, test_id, lab_file, lab_description, lab_date, lab_status) 
                  VALUES (:PATIENT_ID, :TEST_ID, :LAB_FILE, :LAB_DESCRIPTION, :LAB_DATE, :LAB_STATUS)";
        $params = $this->parameter($labResult);
        $this->main_repo->executeQuery($query, $params);
    }

    public function updateLabResult($lab_id, LabResult $labResult) {
        $query = "UPDATE lab_results SET 
                  lab_file = :LAB_FILE, 
                  lab_description = :LAB_DESCRIPTION, 
                  lab_status = 'Completed',
                  WHERE lab_id = :LAB_ID";
        $params = $this->parameter($labResult);
        $params[":LAB_ID"] = $lab_id;
        $this->main_repo->executeQuery($query, $params);
    }

    private function parameter(LabResult $labResult) {
        return [
            ":PATIENT_ID" => $labResult->getPatientId(),
            ":TEST_ID" => $labResult->getTestId(),
            ":LAB_FILE" => $labResult->getLabFile(),
            ":LAB_DESCRIPTION" => $labResult->getLabDescription(),
            ":LAB_DATE" => $labResult->getLabDate(),
            ":LAB_STATUS" => $labResult->getLabStatus(),
        ];
    }
}
?>
