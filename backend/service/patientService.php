<?php
require_once "repository/patientRepository.php";
require_once "model/patient.php";
require_once "service/serviceLogic.php";

class PatientService {
    private PatientRepository $patientRepository;
    private ServiceLogic $serviceLogic;

    public function __construct() {
        $this->patientRepository = new PatientRepository();
        $this->serviceLogic = new ServiceLogic();
    }

    public function getAllPatient() {
        $patients = $this->patientRepository->getAllPatient();
        $this->serviceLogic->checkExist($patients);
        return $this->patientObjectList($patients);
    }

    public function getPatientById($id) {
        $patient = $this->patientRepository->getAllPatientById($id);
        $this->serviceLogic->checkExist($patient);
        return $this->patientObject($patient);
    }

    public function createPatient($data) {
        $patient = $this->patientObject($data);
        $this->patientRepository->createPatient($patient);
    }

    public function updatePatient($id, $data) {
        $this->getPatientById($id); // Validate existence
        $patient = $this->patientObject($data);
        $this->patientRepository->updatePatient($id, $patient);
    }

    private function patientObject($data) {
        $patient = new Patient();
        $patient->setPatientID($data["patient_id"] ?? NULL);
        $patient->setFirstName($data["first_name"] ?? NULL);
        $patient->setLastName($data["last_name"] ?? NULL);
        $patient->setDob($data["dob"] ?? NULL);
        $patient->setGender($data["gender"] ?? NULL);
        $patient->setContact($data["contact"] ?? NULL);
        $patient->setAddress($data["address"] ?? NULL);
        return $patient;
    }

    private function patientObjectList($data) {
        $patientList = [];
        foreach ($data as $pat) {
            $patientList[] = $this->patientObject($pat);
        }
        return $patientList;
    }
}
?>
