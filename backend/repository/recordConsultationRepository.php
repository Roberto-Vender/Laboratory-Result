<?php
require_once "mainRepository.php";

class recordConsultationRepository {
    private mainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new mainRepository();
    }

    public function getAllConsultations() {
        $query = "SELECT * FROM record_consultations";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getConsultationById($consultation_id) {
        $query = "SELECT * FROM record_consultations WHERE consultation_id = :CONSULTATION_ID";
        $params = [":CONSULTATION_ID" => $consultation_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function getConsultationsByPatientId($patient_id) {
        $query = "SELECT * FROM record_consultations WHERE patient_id = :PATIENT_ID";
        $params = [":PATIENT_ID" => $patient_id];
        return $this->main_repo->executeQuery($query, $params);
    }

    public function createConsultation(RecordConsultation $consultation) {
        $query = "INSERT INTO record_consultations (patient_id, doctor_id, visit_date, diagnosis, medical_advice) 
                  VALUES (:PATIENT_ID, :DOCTOR_ID, :VISIT_DATE, :DIAGNOSIS, :MEDICAL_ADVICE)";
        $params = $this->parameter($consultation);
        $this->main_repo->executeQuery($query, $params);
    }

    public function updateConsultation($consultation_id, RecordConsultation $consultation) {
        $query = "UPDATE record_consultations SET 
                  patient_id = :PATIENT_ID, 
                  doctor_id = :DOCTOR_ID,
                  visit_date = :VISIT_DATE,
                  diagnosis = :DIAGNOSIS,
                  medical_advice = :MEDICAL_ADVICE
                  WHERE consultation_id = :CONSULTATION_ID";
        $params = $this->parameter($consultation);
        $params[":CONSULTATION_ID"] = $consultation_id;
        $this->main_repo->executeQuery($query, $params);
    }

    private function parameter(RecordConsultation $consultation) {
        return [
            ":PATIENT_ID" => $consultation->getPatientId(),
            ":DOCTOR_ID" => $consultation->getDoctorId(),
            ":VISIT_DATE" => $consultation->getVisitDate(),
            ":DIAGNOSIS" => $consultation->getDiagnosis(),
            ":MEDICAL_ADVICE" => $consultation->getMedicalAdvice()
        ];
    }
}
?>
