<?php
class LabResult implements JsonSerializable {
    private $lab_id;
    private $patient_id;
    private $test_id;
    private $lab_file;
    private $lab_description;
    private $lab_date;
    private $lab_status;

    public function getLabId() {
        return $this->lab_id;
    }
    public function setLabId($lab_id) {
        $this->lab_id = $lab_id;
    }

    public function getPatientId() {
        return $this->patient_id;
    }
    public function setPatientId($patient_id) {
        $this->patient_id = $patient_id;
    }

    public function getTestId() {
        return $this->test_id;
    }
    public function setTestId($test_id) {
        $this->test_id = $test_id;
    }

    public function getLabFile() {
        return $this->lab_file;
    }
    public function setLabFile($lab_file) {
        $this->lab_file = $lab_file;
    }

    public function getLabDescription() {
        return $this->lab_description;
    }
    public function setLabDescription($lab_description) {
        $this->lab_description = $lab_description;
    }

    public function getLabDate() {
        return $this->lab_date;
    }
    public function setLabDate($lab_date) {
        $this->lab_date = $lab_date;
    }

    public function getLabStatus() {
        return $this->lab_status;
    }
    public function setLabStatus($lab_status) {
        $this->lab_status = $lab_status;
    }

    public function jsonSerialize() {
        return [
            'lab_id' => $this->lab_id,
            'patient_id' => $this->patient_id,
            'test_id' => $this->test_id,
            'lab_file' => $this->lab_file,
            'lab_description' => $this->lab_description,
            'lab_date' => $this->lab_date,
            'lab_status' => $this->lab_status
        ];
    }
}
?>
