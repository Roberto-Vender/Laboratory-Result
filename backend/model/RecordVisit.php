<?php
class RecordVisit implements JsonSerializable {
    private $visit_id;
    private $patient_id;
    private $reason_for_visit;
    private $visit_date;

    public function getVisitDate() {
        return $this->visit_date;
    }
    public function setVisitDate($visit_date) {
        $this->visit_date = $visit_date;
    }

    public function getVisitId() {
        return $this->visit_id;
    }
    public function setVisitId($visit_id) {
        $this->visit_id = $visit_id;
    }

    public function getPatientId() {
        return $this->patient_id;
    }
    public function setPatientId($patient_id) {
        $this->patient_id = $patient_id;
    }

    public function getReasonForVisit() {
        return $this->reason_for_visit;
    }
    public function setReasonForVisit($reason_for_visit) {
        $this->reason_for_visit = $reason_for_visit;
    }

    public function jsonSerialize() {
        return [
            'visit_id' => $this->visit_id,
            'patient_id' => $this->patient_id,
            'reason_for_visit' => $this->reason_for_visit,
            'visit_date' => $this->visit_date
        ];
    }
}
?>
