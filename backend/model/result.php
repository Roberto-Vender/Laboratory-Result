<?php

class result implements JsonSerializable {
    private $res_id;
    private $res_date;
    private $res_file;
    private $app_track_id;
    private $admin_id;

    public function setResID($id){
        $this->res_id = $id;
    }
    public function getResID(){
        return $this->res_id;
    }
    public function setResDate($date){
        $this->res_date = $date;
    }
    public function getResDate(){
        return $this->res_date;
    }
    public function setResFile($file){
        $this->res_file = $file;
    }
    public function getResFile(){
        return $this->res_file;
    }
    public function setAppTrackID($id){
        $this->app_track_id = $id;
    }
    public function getAppTrackID(){
        return $this->app_track_id;
    }
    public function setAdminID($id){
        $this->admin_id = $id;
    }
    public function getAdminID(){
        return $this->admin_id;
    }

    // Needed for JSON encoding
    public function jsonSerialize() {
        return [
            'res_id' => $this->res_id,
            'res_date' => $this->res_date,
            'res_file' => $this->res_file,
            'app_track_id' => $this->app_track_id,
            'admin_id' => $this->admin_id,
        ];
    }
}
?>
