<?php
require_once 'repository/medicalCertificateRepository.php';
require_once 'model/MedicalCertificate.php';

class medicalCertificateService {
    private medicalCertificateRepository $repository;

    public function __construct() {
        $this->repository = new medicalCertificateRepository();
    }

    public function getAllCertificates() {
        $results = $this->repository->getAllCertificates();
        return $this->mapResultsToObjects($results);
    }

    public function getCertificateById($certificate_id) {
        $result = $this->repository->getCertificateById($certificate_id);
        if (empty($result)) {
            throw new Exception("Medical certificate not found");
        }
        return $this->mapResultToObject($result[0]);
    }

    public function getCertificatesByPatientId($patient_id) {
        $results = $this->repository->getCertificatesByPatientId($patient_id);
        return $this->mapResultsToObjects($results);
    }

    public function createCertificate($data) {
        $certificate = $this->mapDataToCertificate($data);
        $this->repository->createCertificate($certificate);
    }

    public function updateCertificate($certificate_id, $data) {
        $certificate = $this->mapDataToCertificate($data);
        $this->repository->updateCertificate($certificate_id, $certificate);
    }

    private function mapResultsToObjects(array $results): array {
        $list = [];
        foreach ($results as $data) {
            $list[] = $this->mapResultToObject($data);
        }
        return $list;
    }

    private function mapResultToObject(array $data): MedicalCertificate {
        $certificate = new MedicalCertificate();
        $certificate->setCertificateId($data['certificate_id'] ?? null);
        $certificate->setPatientId($data['patient_id'] ?? null);
        $certificate->setRequestDate($data['request_date'] ?? null);
        $certificate->setIssuedDate($data['issued_date'] ?? null);
        $certificate->setCertificateFile($data['certificate_file'] ?? null);
        $certificate->setDetails($data['details'] ?? null);
        return $certificate;
    }

    private function mapDataToCertificate($data): MedicalCertificate {
        $certificate = new MedicalCertificate();
        $certificate->setPatientId($data['patient_id'] ?? null);
        $certificate->setRequestDate($data['request_date'] ?? date('Y-m-d'));
        $certificate->setIssuedDate($data['issued_date'] ?? null);
        $certificate->setCertificateFile($data['certificate_file'] ?? null);
        $certificate->setDetails($data['details'] ?? null);
        return $certificate;
    }
}
?>
