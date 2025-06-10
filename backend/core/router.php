<?php
require_once "controller/adminController.php";
require_once "controller/appointmentController.php";
require_once "controller/patientController.php";
require_once "controller/resultController.php";
require_once "controller/serviceController.php";
require_once "controller/doctorController.php";
require_once "controller/testController.php";
require_once "controller/labResultController.php";
require_once "controller/medicalCertificateController.php";
require_once "controller/recordVisitController.php";
require_once "controller/recordConsultationController.php";

class Router{
    private adminController $adminController;
    private appointmentController $appointmentController;
    private patientController $patientController;
    private resultController $resultController;
    private serviceController $serviceController;
    private doctorController $doctorController;
    private testController $testController;
    private labResultController $labResultController;
    private medicalCertificateController $medicalCertificateController;
    private recordVisitController $recordVisitController;
    private recordConsultationController $recordConsultationController;
    
    public function __construct()
    {
        $this->adminController = new adminController();
        $this->appointmentController = new appointmentController();
        $this->patientController = new patientController();
        $this->resultController = new resultController();
        $this->serviceController = new serviceController();
        $this->doctorController = new doctorController();
        $this->testController = new testController();
        $this->labResultController = new labResultController();
        $this->medicalCertificateController = new medicalCertificateController();
        $this->recordVisitController = new recordVisitController();
        $this->recordConsultationController = new recordConsultationController();
    }

    public function route()
    {
        $requestUri = explode("?", $_SERVER['REQUEST_URI'], 2)[0];
        $method = $_SERVER['REQUEST_METHOD'];
        switch($method){
            case 'GET':
                // Existing GET routes
                $this->getRequest("Admin",$requestUri,$this->adminController,'getAdminById','getAdmin');
                $this->getRequest("Service",$requestUri,$this->serviceController,'getServiceByID','getAllService');
                $this->getRequest("Appointment",$requestUri,$this->appointmentController,'getAppointmentByID','getAllAppointment');
                $this->getRequest("Patient",$requestUri,$this->patientController,'getPatientByID','getAllPatient');
                $this->getRequest("Result",$requestUri,$this->resultController,'getResultByID','getAllResult');

                // New GET routes for added controllers
                $this->getRequest("Doctor",$requestUri,$this->doctorController,'getDoctorByID','getAllDoctors');
                $this->getRequest("Test",$requestUri,$this->testController,'getTestByID','getAllTests');
                $this->getRequest("LabResult",$requestUri,$this->labResultController,'getLabResultByID','getAllLabResults');
                $this->getRequest("MedicalCertificate",$requestUri,$this->medicalCertificateController,'getCertificateByID','getAllCertificates');
                $this->getRequest("RecordVisit",$requestUri,$this->recordVisitController,'getVisitByID','getAllVisits');
                $this->getRequest("RecordConsultation",$requestUri,$this->recordConsultationController,'getConsultationByID','getAllConsultations');
                break;
            case 'POST':
                // Existing POST routes
                $this->postRequest("Admin",$requestUri,$this->adminController,"createAdmin");
                $this->postRequest("Admin/Login",$requestUri,$this->adminController,"loginAdmin");
                $this->postRequest("Service",$requestUri,$this->serviceController,"createService");
                $this->postRequest("Appointment",$requestUri,$this->appointmentController,"createAppointment");
                $this->postRequest("Patient",$requestUri,$this->patientController,"createPatient");
                $this->postRequest("Result",$requestUri,$this->resultController,"createResult");

                // New POST routes for added controllers
                $this->postRequest("Doctor",$requestUri,$this->doctorController,"createDoctor");
                $this->postRequest("Test",$requestUri,$this->testController,"createTest");
                $this->postRequest("LabResult",$requestUri,$this->labResultController,"createLabResult");
                $this->postRequest("MedicalCertificate",$requestUri,$this->medicalCertificateController,"createCertificate");
                $this->postRequest("RecordVisit",$requestUri,$this->recordVisitController,"createVisit");
                $this->postRequest("RecordConsultation",$requestUri,$this->recordConsultationController,"createConsultation");
                break;
            case 'PUT':
                // Existing PUT route
                $this->putRequest("Appointment",$requestUri,$this->appointmentController,"updateAppointment");

                // New PUT routes for other entities (example pattern)
                $this->putRequest("Doctor",$requestUri,$this->doctorController,"updateDoctor");
                $this->putRequest("Test",$requestUri,$this->testController,"updateTest");
                $this->putRequest("LabResult",$requestUri,$this->labResultController,"updateLabResult");
                $this->putRequest("MedicalCertificate",$requestUri,$this->medicalCertificateController,"updateCertificate");
                $this->putRequest("RecordVisit",$requestUri,$this->recordVisitController,"updateVisit");
                $this->putRequest("RecordConsultation",$requestUri,$this->recordConsultationController,"updateConsultation");
                break;
            default:
                http_response_code(404);
                break;
        }
    }
    private function getRequest($model,$requestUri,$controller,$methodById,$methodAll){
        if ($requestUri === "/api/{$model}") {
            $id = isset($_GET['id']) ? (int) htmlspecialchars($_GET['id']) : null;
            if ($id !== null) {
                $controller->$methodById($id);
            } else {
                $controller->$methodAll();
            }
        }
        if (preg_match("/\/api\/{$model}\/(\d+)/", $requestUri, $matches)) {
            $controller->$methodById($matches[1]);
        }
}
private function postRequest($model, $requestUri, $controller, $method)
{
    error_log("Request URI: " . $_SERVER['REQUEST_URI'] . " Method: " . $_SERVER['REQUEST_METHOD']);
    if ($requestUri === "/api/{$model}") {

        // If file is uploaded (multipart/form-data)
        if (!empty($_FILES)) {
            $controller->$method(); // Let controller directly access $_FILES and $_POST
        } else {
            // For JSON data
            $entity = json_decode(file_get_contents("php://input"), true);
            $controller->$method($entity);
        }
    }
}
private function putRequest($model,$requestUri,$controller,$method){
        if (preg_match("/\/api\/{$model}\/Update\/(\d+)/", $requestUri, $matches)) {
            $entity = json_decode(file_get_contents("php://input"), true);
            $controller->$method($matches[1],$entity);
        }
}



    // Reuse existing private functions getRequest, postRequest, putRequest, deleteRequest here
}
