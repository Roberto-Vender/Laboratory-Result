<?php
require_once "repository/appointmentRepository.php";
require_once "model/appointment.php";
require_once "service/serviceLogic.php";
class appointmentService{
    public appointmentRepository $appointmentRepository;
    public serviceLogic $serviceLogic;
    public function __construct(){
        $this->appointmentRepository = new appointmentRepository();
        $this->serviceLogic = new serviceLogic();
    }
    public function getAllAppointment(){
        $result = $this->appointmentRepository->getAllAppointment();
        $this->serviceLogic->checkExist($result);
        return $result;
    
    }
    public function getAppointmentById($id){
        $result = $this->appointmentRepository->getAllAppointmentById($id);
        $this->serviceLogic->checkExist($result);
        return $result;
    }
    public function createAppointment($data){
        $appointment = $this->appointmentObject($data);
        $this->appointmentRepository->createAppointment($appointment);
    }
    public function updateAppointment($id,$data){
        $this->getAppointmentById($id);
        $appointment = $this->appointmentObject($data);
        $this->appointmentRepository->updateAppointment($id,$appointment);
    }
    public function appointmentObject($data){
        $appointment = new appointment();
        $appointment->setAppID($data["app_id"] ?? NULL);
        $appointment->setAppTrackID($data["app_track_id"] ?? NULL);
        $appointment->setAppDate($data["app_date"] ?? NULL);
        $appointment->setAppResStatus($data["app_res_status"] ?? NULL);
        $appointment->setServID($data["serv_id"] ?? NULL);
        $appointment->setPatID($data["pat_id"] ?? NULL);
        return $appointment;
    }
    public function appointmentObjectList($data){
        $appointmentList = [];
        foreach($data as $app){
            $appointmentList[] = $this->appointmentObject($app);
        }
        return $appointmentList;
    }
}
?>