<?php
class MedicalCertificate implements JsonSerializable {
    private $certificate_id;
    private $patient_id;
    private $request_date;
    private $issued_date;
    private $certificate_file;
    private $details;

    public function getCertificateId() {
        return $this->certificate_id;
    }
    public function setCertificateId($certificate_id) {
        $this->certificate_id = $certificate_id;
    }

    public function getPatientId() {
        return $this->patient_id;
    }
    public function setPatientId($patient_id) {
        $this->patient_id = $patient_id;
    }

    public function getRequestDate() {
        return $this->request_date;
    }
    public function setRequestDate($request_date) {
        $this->request_date = $request_date;
    }

    public function getIssuedDate() {
        return $this->issued_date;
    }
    public function setIssuedDate($issued_date) {
        $this->issued_date = $issued_date;
    }

    public function getCertificateFile() {
        return $this->certificate_file;
    }
    public function setCertificateFile($certificate_file) {
        $this->certificate_file = $certificate_file;
    }

    public function getDetails() {
        return $this->details;
    }
    public function setDetails($details) {
        $this->details = $details;
    }

    public function jsonSerialize() {
        return [
            'certificate_id' => $this->certificate_id,
            'patient_id' => $this->patient_id,
            'request_date' => $this->request_date,
            'issued_date' => $this->issued_date,
            'certificate_file' => $this->certificate_file,
            'details' => $this->details
        ];
    }
}
?>
