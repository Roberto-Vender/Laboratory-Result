<?php
require_once "database.php";
class mainRepository{
    private $conn;
    private database $database;
    public function __construct(){
        $this->database = new database();
        $this->conn = $this->database->getConnection();
    }
    public function buildResultList($data){
        if (!isset($data[0]) || empty($data[0])) {
            throw new Exception("First element in data is null or undefined");
        }
        return $data[0];
    }
    
    public function executeQuery($query,$params){
        $sql = $this->conn->prepare($query);
        $sql->execute($params);
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>  