<?php
require_once "service/appointmentService.php";
class appointmentController{
    private appointmentService $appointmentService;
    public function __construct(){
        $this->appointmentService = new appointmentService();
    }
    public function getAllAppointment(){
        try{
            $appointment = $this->appointmentService->getAllAppointment();
            echo json_encode(["message" => "Sucessfully get data", "data" => $appointment]);
        }catch(Exception $e){
            echo json_encode(["message" => $e->getMessage()]);
            http_response_code(400);
        }
    }
    public function getAppointmentById($id){
        try{
            $appointment = $this->appointmentService->getAppointmentById($id);
            echo json_encode(["message" => "Sucessfully get data", "data" => $appointment]);
        }catch(Exception $e){
            echo json_encode(["message" => $e->getMessage()]);
            http_response_code(400);
        }
    }
    public function createAppointment($data){
        try{
            $this->appointmentService->createAppointment($data);
            echo json_encode(["message" => "Sucessfully created appointment"]);
        }catch(Exception $e){
            echo json_encode(["message" => $e->getMessage()]);
            http_response_code(400);
        }
    }
    public function updateAppointment($id,$data){
        try{
            $this->appointmentService->updateAppointment($id,$data);
            echo json_encode(["message" => "Sucessfully updated appointment"]);
        }catch(Exception $e){
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
?>