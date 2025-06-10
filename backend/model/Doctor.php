<?php

class Doctor implements JsonSerializable {
    private $doctor_id;
    private $doctor_name;
    private $doctor_email;
    private $specialization;

    public function setDoctorID($id) {
        $this->doctor_id = $id;
    }
    public function getDoctorID() {
        return $this->doctor_id;
    }

    public function setDoctorName($name) {
        $this->doctor_name = $name;
    }
    public function getDoctorName() {
        return $this->doctor_name;
    }

    public function setDoctorEmail($email) {
        $this->doctor_email = $email;
    }
    public function getDoctorEmail() {
        return $this->doctor_email;
    }

    public function setSpecialization($specialization) {
        $this->specialization = $specialization;
    }
    public function getSpecialization() {
        return $this->specialization;
    }

    public function jsonSerialize() {
        return [
            'doctor_id' => $this->doctor_id,
            'doctor_name' => $this->doctor_name,
            'doctor_email' => $this->doctor_email,
            'specialization' => $this->specialization
        ];
    }
}
?>
