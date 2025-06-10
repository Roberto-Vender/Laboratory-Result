<?php
require_once "mainRepository.php";

class recordVisitRepository {
    private mainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new mainRepository();
    }

    public function getAllVisits() {
        $query = "SELECT * FROM record_visits";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getVisitById($visit_id) {
        $query = "SELECT * FROM record_visits WHERE visit_id = :VISIT_ID";
        $params = [":VISIT_ID" => $visit_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function getVisitsByPatientId($patient_id) {
        $query = "SELECT * FROM record_visits WHERE patient_id = :PATIENT_ID";
        $params = [":PATIENT_ID" => $patient_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function createVisit(RecordVisit $visit) {
        $query = "INSERT INTO record_visits (patient_id, reason_for_visit) VALUES (:PATIENT_ID, :REASON_FOR_VISIT)";
        $params = $this->parameter($visit);
        $this->main_repo->executeQuery($query, $params);
    }

    public function updateVisit($visit_id, RecordVisit $visit) {
        $query = "UPDATE record_visits SET patient_id = :PATIENT_ID, reason_for_visit = :REASON_FOR_VISIT WHERE visit_id = :VISIT_ID";
        $params = $this->parameter($visit);
        $params[":VISIT_ID"] = $visit_id;
        $this->main_repo->executeQuery($query, $params);
    }

    private function parameter(RecordVisit $visit) {
        return [
            ":PATIENT_ID" => $visit->getPatientId(),
            ":REASON_FOR_VISIT" => $visit->getReasonForVisit()
        ];
    }
}
?>
