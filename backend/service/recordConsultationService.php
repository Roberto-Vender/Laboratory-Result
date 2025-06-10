<?php
require_once 'repository/recordConsultationRepository.php';
require_once 'model/RecordConsultation.php';

class recordConsultationService {
    private recordConsultationRepository $repository;

    public function __construct() {
        $this->repository = new recordConsultationRepository();
    }

    public function getAllConsultations() {
        $results = $this->repository->getAllConsultations();
        return $this->mapResultsToObjects($results);
    }

    public function getConsultationById($consultation_id) {
        $result = $this->repository->getConsultationById($consultation_id);
        if (empty($result)) {
            throw new Exception("Consultation not found");
        }
        return $this->mapResultToObject($result[0]);
    }

    public function getConsultationsByPatientId($patient_id) {
        $results = $this->repository->getConsultationsByPatientId($patient_id);
        return $this->mapResultsToObjects($results);
    }

    public function createConsultation($data) {
        $consultation = $this->mapDataToConsultation($data);
        $this->repository->createConsultation($consultation);
    }

    public function updateConsultation($consultation_id, $data) {
        $consultation = $this->mapDataToConsultation($data);
        $this->repository->updateConsultation($consultation_id, $consultation);
    }

    private function mapResultsToObjects(array $results): array {
        $list = [];
        foreach ($results as $data) {
            $list[] = $this->mapResultToObject($data);
        }
        return $list;
    }

    private function mapResultToObject(array $data): RecordConsultation {
        $consultation = new RecordConsultation();
        $consultation->setConsultationId($data['consultation_id'] ?? null);
        $consultation->setPatientId($data['patient_id'] ?? null);
        $consultation->setDoctorId($data['doctor_id'] ?? null);
        $consultation->setVisitDate($data['visit_date'] ?? null);
        $consultation->setDiagnosis($data['diagnosis'] ?? null);
        $consultation->setMedicalAdvice($data['medical_advice'] ?? null);
        return $consultation;
    }

    private function mapDataToConsultation($data): RecordConsultation {
        $consultation = new RecordConsultation();
        $consultation->setPatientId($data['patient_id'] ?? null);
        $consultation->setDoctorId($data['doctor_id'] ?? null);
        $consultation->setVisitDate($data['visit_date'] ?? date('Y-m-d'));
        $consultation->setDiagnosis($data['diagnosis'] ?? null);
        $consultation->setMedicalAdvice($data['medical_advice'] ?? null);
        return $consultation;
    }
}
?>
