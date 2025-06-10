<?php
require_once "mainRepository.php";

class medicalCertificateRepository {
    private mainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new mainRepository();
    }

    public function getAllCertificates() {
        $query = "SELECT * FROM medical_certificates";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getCertificateById($certificate_id) {
        $query = "SELECT * FROM medical_certificates WHERE certificate_id = :CERTIFICATE_ID";
        $params = [":CERTIFICATE_ID" => $certificate_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function getCertificatesByPatientId($patient_id) {
        $query = "SELECT * FROM medical_certificates WHERE patient_id = :PATIENT_ID";
        $params = [":PATIENT_ID" => $patient_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function createCertificate(MedicalCertificate $certificate) {
        $query = "INSERT INTO medical_certificates 
            (patient_id, request_date, issued_date, certificate_file, details) 
            VALUES (:PATIENT_ID, :REQUEST_DATE, :ISSUED_DATE, :CERTIFICATE_FILE, :DETAILS)";
        $params = $this->parameter($certificate);
        $this->main_repo->executeQuery($query, $params);
    }

    public function updateCertificate($certificate_id, MedicalCertificate $certificate) {
        $query = "UPDATE medical_certificates SET
            patient_id = :PATIENT_ID,
            request_date = :REQUEST_DATE,
            issued_date = :ISSUED_DATE,
            certificate_file = :CERTIFICATE_FILE,
            details = :DETAILS
            WHERE certificate_id = :CERTIFICATE_ID";
        $params = $this->parameter($certificate);
        $params[":CERTIFICATE_ID"] = $certificate_id;
        $this->main_repo->executeQuery($query, $params);
    }

    private function parameter(MedicalCertificate $certificate) {
        return [
            ":PATIENT_ID" => $certificate->getPatientId(),
            ":REQUEST_DATE" => $certificate->getRequestDate(),
            ":ISSUED_DATE" => $certificate->getIssuedDate(),
            ":CERTIFICATE_FILE" => $certificate->getCertificateFile(),
            ":DETAILS" => $certificate->getDetails()
        ];
    }
}
?>
