<?php

class Admin implements JsonSerializable {
    private $admin_id;
    private $admin_name;
    private $email;
    private $password;

    public function setAdminID($id) {
        $this->admin_id = $id;
    }

    public function getAdminID() {
        return $this->admin_id;
    }

    public function setAdminName($name) {
        $this->admin_name = $name;
    }

    public function getAdminName() {
        return $this->admin_name;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getPassword() {
        return $this->password;
    }

    public function jsonSerialize() {
        return [
            'admin_id' => $this->admin_id,
            'admin_name' => $this->admin_name,
            'email' => $this->email,
            'password' => $this->password
        ];
    }
}
?>
