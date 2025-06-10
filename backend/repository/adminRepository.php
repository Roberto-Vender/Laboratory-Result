<?php
require_once 'database.php';
require_once 'mainRepository.php';

class AdminRepository {
    private MainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new MainRepository();
    }

    public function getAdmin() {
        $query = "SELECT admin_id, admin_name, email, password FROM admin";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getAdminById($id) {
        $query = "SELECT admin_id, admin_name, email, password FROM admin WHERE admin_id = :ID";
        return $this->main_repo->executeQuery($query, [":ID" => $id]);
    }

    public function getAdminByEmail($email) {
        $query = "SELECT admin_id, admin_name, email, password FROM admin WHERE email = :EMAIL";
        $params = [":EMAIL" => $email];
        $result = $this->main_repo->executeQuery($query, $params);
        return $this->main_repo->buildResultList($result);
    }

    public function createAdmin($data) {
        $query = "INSERT INTO admin (admin_name, email, password) VALUES (:ADMIN_NAME, :EMAIL, :PASSWORD)";
        $params = $this->parameter($data);
        $this->main_repo->executeQuery($query, $params);
    }

    private function parameter($data) {
        return [
            ":ADMIN_NAME" => $data->getAdminName(),
            ":EMAIL" => $data->getEmail(),
            ":PASSWORD" => $data->getPassword() // Already hashed in service
        ];
    }
}
