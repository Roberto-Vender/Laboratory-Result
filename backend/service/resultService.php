<?php
require_once "repository/resultRepository.php";
require_once "model/result.php";
require_once "service/serviceLogic.php";
class resultService {
    private resultRepository $resultRepository;
    private serviceLogic $serviceLogic;
    public function __construct(){
        $this->resultRepository = new resultRepository();
        $this->serviceLogic = new serviceLogic();
    }
    public function getAllResult(){
        $result = $this->resultRepository->getAllResult();
        $this->serviceLogic->checkExist($result);
        return $result;
    }
    public function getResultId($id){
        $result = $this->resultRepository->getAllResultById($id);
        $this->serviceLogic->checkExist($result);
        return $result;
    }
    public function createResult($data){
        $result = $this->resultObject($data);
        $this->resultRepository->createResult($result);
    }
    public function updateResult($id,$data){
        $this->getResultId($id);
        $result = $this->resultObject($data);
        $this->resultRepository->updateResult($result, $id);
    }
    public function resultObject($data){
        $result = new result();
        $result->setResID($data["res_id"] ?? NULL);
        $result->setAppTrackID($data["app_track_id"] ?? NULL);
        $result->setResFile($data["res_file"] ?? NULL);
        $result->setResDate($data["res_date"] ?? NULL);
        $result->setAdminID($data["admin_id"] ?? NULL);
        return $result;
    }
    public function resultObjectList($data){
        $resultList = [];
        foreach($data as $res){
            $resultList[] = $this->resultObject($res);
        }
        return $resultList;
    }
}
?>