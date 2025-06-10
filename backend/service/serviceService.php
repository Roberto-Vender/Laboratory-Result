<?php
require_once "repository/serviceRepository.php";
require_once "model/service.php";
require_once "service/serviceLogic.php";
class serviceService{
    private serviceRepository $serviceRepository;
    private serviceLogic $serviceLogic;
    public function __construct(){
        $this->serviceRepository = new serviceRepository();
        $this->serviceLogic = new serviceLogic();
    }
    public function getAllService(){
        $service = $this->serviceRepository->getAllService();
        $this->serviceLogic->checkExist($service);
        return $this->serviceObjectList($service);
    }
    public function getServiceById($id){
        $service = $this->serviceRepository->getServiceByID($id);
        $this->serviceLogic->checkExist($service);
        return $this->serviceObject($service);
    }
    public function createService($data){
        $service = $this->serviceObject($data);
        $this->serviceRepository->createService($service);
    }
    public function updateService($id,$data){
        $this->getServiceById($id);
        $service = $this->serviceObject($data);
        $this->serviceRepository->updateService($id, $service);
    }
    public function serviceObject($data){
        $service = new service();
        $service->setServId($data["serv_id"] ?? NULL);
        $service->setServName($data["serv_name"] ?? NULL);
        return $service;
    }
    public function serviceObjectList($data){
        $serviceList = [];
        foreach($data as $service){
            $serviceList[] = $this->serviceObject($service);
        }
        return $serviceList;
    }
}
?>