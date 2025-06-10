<?php
require_once 'mainRepository.php';
class serviceRepository{
    private mainRepository $mainRepository;
    public function __construct(){
        $this->mainRepository = new mainRepository();
    }
    public function getAllService(){
        $query = "SELECT SERV_ID, SERV_NAME FROM SERVICE";
        return $this->mainRepository->executeQuery($query, []);
    }
    public function getServiceByID($id){
        $query = "SELECT SERV_ID, SERV_NAME FROM SERVICE WHERE SERV_ID = :ID";
        $params = [":ID" => $id];
        $result = $this->mainRepository->executeQuery($query, $params);
        return $this->mainRepository->buildResultList($result);
    }
    public function createService($data){
        $query = "INSERT INTO SERVICE (SERV_NAME) VALUES (:SERV_NAME)";
        $params = $this->parameter($data);
        $this->mainRepository->executeQuery($query, $params);
    }
    public function updateService($id,$data){
        $query = "UPDATE SERVICE SET SERV_NAME = :SERV_NAME WHERE SERV_ID = :ID";
        $params = $this->parameter($data);
        $params[":ID"] = $id;
        $this->mainRepository->executeQuery($query, $params);
    }
    public function deleteService($id){
        $query = "DELETE FROM SERVICE WHERE SERV_ID = :ID";
        $params[":ID"] = $id;
        $this->mainRepository->executeQuery($query, $params);
    }
    public function parameter($data){
        $params = [
            ":SERV_NAME" => $data->getServName()
        ];
        return $params;
    }
}
?>