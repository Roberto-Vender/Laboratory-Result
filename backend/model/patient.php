<?php

class Patient implements JsonSerializable {
    private $patient_id;
    private $first_name;
    private $last_name;
    private $dob;
    private $gender;
    private $contact;
    private $address;

    public function setPatientID($id){
        $this->patient_id = $id;
    }
    public function getPatientID(){
        return $this->patient_id;
    }

    public function setFirstName($firstname){
        $this->first_name = $firstname;
    }
    public function getFirstName(){
        return $this->first_name;
    }

    public function setLastName($lastname){
        $this->last_name = $lastname;
    }
    public function getLastName(){
        return $this->last_name;
    }

    public function setDob($dob){
        $this->dob = $dob;
    }
    public function getDob(){
        return $this->dob;
    }

    public function setGender($gender){
        $this->gender = $gender;
    }
    public function getGender(){
        return $this->gender;
    }

    public function setContact($contact){
        $this->contact = $contact;
    }
    public function getContact(){
        return $this->contact;
    }

    public function setAddress($address){
        $this->address = $address;
    }
    public function getAddress(){
        return $this->address;
    }

    // For JSON encoding
    public function jsonSerialize() {
        return [
            'patient_id' => $this->patient_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'dob' => $this->dob,
            'gender' => $this->gender,
            'contact' => $this->contact,
            'address' => $this->address,
        ];
    }
}
?>
