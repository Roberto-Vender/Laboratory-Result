<?php
require_once 'mainRepository.php';

class TestRepository {
    private MainRepository $main_repo;

    public function __construct() {
        $this->main_repo = new MainRepository();
    }

    public function getAllTests() {
        $query = "SELECT * FROM tests";
        return $this->main_repo->executeQuery($query, []);
    }

    public function getTestById($id) {
        $query = "SELECT * FROM tests WHERE test_id = :ID";
        return $this->main_repo->executeQuery($query, [":ID" => $id]);
    }

    public function createTest($data) {
        $query = "INSERT INTO tests (test_name) VALUES (:NAME)";
        $params = [":NAME" => $data->getTestName()];
        $this->main_repo->executeQuery($query, $params);
    }

    public function updateTest($id, $data) {
        $query = "UPDATE tests SET test_name = :NAME WHERE test_id = :ID";
        $params = [
            ":NAME" => $data->getTestName(),
            ":ID" => $id
        ];
        $this->main_repo->executeQuery($query, $params);
    }
}
?>
