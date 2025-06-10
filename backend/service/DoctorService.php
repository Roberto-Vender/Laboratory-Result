<?php
require_once 'repository/DoctorRepository.php';
require_once 'model/Doctor.php';
require_once 'service/serviceLogic.php';

class DoctorService {
    private DoctorRepository $doctorRepo;
    private ServiceLogic $serviceLogic;

    public function __construct() {
        $this->doctorRepo = new DoctorRepository();
        $this->serviceLogic = new ServiceLogic();
    }

    public function getAllDoctors() {
        $doctors = $this->doctorRepo->getAllDoctors();
        $this->serviceLogic->checkExist($doctors);
        return $this->doctorObjectList($doctors);
    }

    public function getDoctorById($id) {
        $doctor = $this->doctorRepo->getDoctorById($id);
        $this->serviceLogic->checkExist($doctor);
        return $this->doctorObjectList($doctor);
    }

    public function createDoctor($data) {
        $doctor = $this->doctorObject($data);
        $this->doctorRepo->createDoctor($doctor);
    }

    public function updateDoctor($id, $data) {
        $this->getDoctorById($id); // ensure exists
        $doctor = $this->doctorObject($data);
        $this->doctorRepo->updateDoctor($id, $doctor);
    }

    private function doctorObject($data) {
        $doctor = new Doctor();
        $doctor->setDoctorID($data["doctor_id"] ?? null);
        $doctor->setDoctorName($data["doctor_name"] ?? null);
        $doctor->setDoctorEmail($data["doctor_email"] ?? null);
        $doctor->setSpecialization($data["specialization"] ?? null);
        return $doctor;
    }

    private function doctorObjectList($data) {
        $list = [];
        foreach ($data as $row) {
            $list[] = $this->doctorObject($row);
        }
        return $list;
    }
}
?>
