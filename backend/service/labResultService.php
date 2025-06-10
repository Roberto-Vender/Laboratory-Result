<?php
require_once 'repository/labResultRepository.php';
require_once 'model/LabResult.php';

class labResultService {
    private labResultRepository $labResultRepository;

    public function __construct() {
        $this->labResultRepository = new labResultRepository();
    }

    public function getAllLabResults() {
        $results = $this->labResultRepository->getAllLabResults();
        return $this->mapResultsToObjects($results);
    }

    public function getLabResultById($lab_id) {
        $result = $this->labResultRepository->getLabResultById($lab_id);
        if(empty($result)) {
            throw new Exception("Lab result not found");
        }
        return $this->mapResultToObject($result[0]);
    }

    public function getLabResultsByPatientId($patient_id) {
        $results = $this->labResultRepository->getLabResultsByPatientId($patient_id);
        return $this->mapResultsToObjects($results);
    }

    public function createLabResult($data) {
        $labResult = $this->mapDataToLabResult($data);
        $this->labResultRepository->createLabResult($labResult);
    }

    public function updateLabResult($lab_id, $data) {
        $labResult = $this->mapDataToLabResult($data);
        $this->labResultRepository->updateLabResult($lab_id, $labResult);
    }

    private function mapResultsToObjects(array $results): array {
        $list = [];
        foreach ($results as $data) {
            $list[] = $this->mapResultToObject($data);
        }
        return $list;
    }

    private function mapResultToObject(array $data): LabResult {
        $labResult = new LabResult();
        $labResult->setLabId($data['lab_id'] ?? null);
        $labResult->setPatientId($data['patient_id'] ?? null);
        $labResult->setTestId($data['test_id'] ?? null);
        $labResult->setLabFile($data['lab_file'] ?? null);
        $labResult->setLabDescription($data['lab_description'] ?? null);
        $labResult->setLabDate($data['lab_date'] ?? null);
        $labResult->setLabStatus($data['lab_status'] ?? null);
        return $labResult;
    }

    private function mapDataToLabResult($data): LabResult {
        // $data can be array or object depending on your input
        $labResult = new LabResult();
        $labResult->setPatientId($data['patient_id'] ?? null);
        $labResult->setTestId($data['test_id'] ?? null);
        $labResult->setLabFile($data['lab_file'] ?? null);
        $labResult->setLabDescription($data['lab_description'] ?? null);
        $labResult->setLabDate($data['lab_date'] ?? date('Y-m-d'));
        $labResult->setLabStatus($data['lab_status'] ?? 'Pending');
        return $labResult;
    }
}
?>
