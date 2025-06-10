<?php
require_once 'repository/recordVisitRepository.php';
require_once 'model/RecordVisit.php';

class recordVisitService {
    private recordVisitRepository $repository;

    public function __construct() {
        $this->repository = new recordVisitRepository();
    }

    public function getAllVisits() {
        $results = $this->repository->getAllVisits();
        return $this->mapResultsToObjects($results);
    }

    public function getVisitById($visit_id) {
        $result = $this->repository->getVisitById($visit_id);
        if (empty($result)) {
            throw new Exception("Visit not found");
        }
        return $this->mapResultToObject($result[0]);
    }

    public function getVisitsByPatientId($patient_id) {
        $results = $this->repository->getVisitsByPatientId($patient_id);
        return $this->mapResultsToObjects($results);
    }

    public function createVisit($data) {
        $visit = $this->mapDataToVisit($data);
        $this->repository->createVisit($visit);
    }

    public function updateVisit($visit_id, $data) {
        $visit = $this->mapDataToVisit($data);
        $this->repository->updateVisit($visit_id, $visit);
    }

    private function mapResultsToObjects(array $results): array {
        $list = [];
        foreach ($results as $data) {
            $list[] = $this->mapResultToObject($data);
        }
        return $list;
    }

    private function mapResultToObject(array $data): RecordVisit {
        $visit = new RecordVisit();
        $visit->setVisitId($data['visit_id'] ?? null);
        $visit->setPatientId($data['patient_id'] ?? null);
        $visit->setReasonForVisit($data['reason_for_visit'] ?? null);
        $visit->setVisitDate($data['visit_date'] ?? null);
        return $visit;
    }

    private function mapDataToVisit($data): RecordVisit {
        $visit = new RecordVisit();
        $visit->setPatientId($data['patient_id'] ?? null);
        $visit->setReasonForVisit($data['reason_for_visit'] ?? null);
        $visit->setVisitDate($data['visit_date'] ?? null);
        return $visit;
    }
}
?>
