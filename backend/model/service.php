<?php

class service implements JsonSerializable {
    private $serv_id;
    private $serv_name;

    public function setServId($id){
        $this->serv_id = $id;
    }
    public function getServId(){
        return $this->serv_id;
    }
    public function setServName($name){
        $this->serv_name = $name;
    }
    public function getServName(){
        return $this->serv_name;
    }

    // For JSON encoding
    public function jsonSerialize() {
        return [
            'serv_id' => $this->serv_id,
            'serv_name' => $this->serv_name,
        ];
    }
}
?>
