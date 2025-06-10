<?php
class RecordConsultation implements JsonSerializable {
    private $consultation_id;
    private $patient_id;
    private $doctor_id;
    private $visit_date;
    private $diagnosis;
    private $medical_advice;

    public function getConsultationId() {
        return $this->consultation_id;
    }
    public function setConsultationId($consultation_id) {
        $this->consultation_id = $consultation_id;
    }

    public function getPatientId() {
        return $this->patient_id;
    }
    public function setPatientId($patient_id) {
        $this->patient_id = $patient_id;
    }

    public function getDoctorId() {
        return $this->doctor_id;
    }
    public function setDoctorId($doctor_id) {
        $this->doctor_id = $doctor_id;
    }

    public function getVisitDate() {
        return $this->visit_date;
    }
    public function setVisitDate($visit_date) {
        $this->visit_date = $visit_date;
    }

    public function getDiagnosis() {
        return $this->diagnosis;
    }
    public function setDiagnosis($diagnosis) {
        $this->diagnosis = $diagnosis;
    }

    public function getMedicalAdvice() {
        return $this->medical_advice;
    }
    public function setMedicalAdvice($medical_advice) {
        $this->medical_advice = $medical_advice;
    }

    public function jsonSerialize() {
        return [
            'consultation_id' => $this->consultation_id,
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'visit_date' => $this->visit_date,
            'diagnosis' => $this->diagnosis,
            'medical_advice' => $this->medical_advice
        ];
    }
}
?>
