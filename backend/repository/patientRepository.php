<?php
require_once "mainRepository.php";

class PatientRepository {
    private MainRepository $mainRepository;

    public function __construct() {
        $this->mainRepository = new MainRepository();
    }

    public function getAllPatient() {
        $query = "SELECT * FROM patients";
        return $this->mainRepository->executeQuery($query, []);
    }

    public function getAllPatientById($id) {
        $query = "SELECT * FROM patients WHERE patient_id = :ID";
        $params = [":ID" => $id];
        $result = $this->mainRepository->executeQuery($query, $params);
        return $this->mainRepository->buildResultList($result);
    }

    public function createPatient($data) {
        $query = "INSERT INTO patients (first_name, last_name, dob, gender, contact, address)
                  VALUES (:FNAME, :LNAME, :DOB, :GENDER, :CONTACT, :ADDRESS)";
        $params = $this->parameter($data);
        $this->mainRepository->executeQuery($query, $params);
    }

    public function updatePatient($id, $data) {
        $query = "UPDATE patients SET first_name = :FNAME, last_name = :LNAME, dob = :DOB,
                  gender = :GENDER, contact = :CONTACT, address = :ADDRESS
                  WHERE patient_id = :ID";
        $params = $this->parameter($data);
        $params[":ID"] = $id;
        $this->mainRepository->executeQuery($query, $params);
    }

    private function parameter($data) {
        return [
            ":FNAME" => $data->getFirstName(),
            ":LNAME" => $data->getLastName(),
            ":DOB" => $data->getDob(),
            ":GENDER" => $data->getGender(),
            ":CONTACT" => $data->getContact(),
            ":ADDRESS" => $data->getAddress(),
        ];
    }
}
