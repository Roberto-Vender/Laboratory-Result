<?php
require_once 'mainRepository.php';

class DoctorRepository {
    private MainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new MainRepository();
    }

    public function getAllDoctors() {
        $query = "SELECT * FROM doctors";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getDoctorById($id) {
        $query = "SELECT * FROM doctors WHERE doctor_id = :ID";
        return $this->main_repo->executeQuery($query, [":ID" => $id]);
    }

    public function createDoctor($data) {
        $query = "INSERT INTO doctors (doctor_name, doctor_email, specialization) VALUES (:NAME, :EMAIL, :SPEC)";
        $params = $this->parameter($data);
        $this->main_repo->executeQuery($query, $params);
    }

    public function updateDoctor($id, $data) {
        $query = "UPDATE doctors SET doctor_name = :NAME, doctor_email = :EMAIL, specialization = :SPEC WHERE doctor_id = :ID";
        $params = $this->parameter($data);
        $params[":ID"] = $id;
        $this->main_repo->executeQuery($query, $params);
    }

    private function parameter($data) {
        return [
            ":NAME" => $data->getDoctorName(),
            ":EMAIL" => $data->getDoctorEmail(),
            ":SPEC" => $data->getSpecialization()
        ];
    }
}
?>
