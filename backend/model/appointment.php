<?php

class appointment implements JsonSerializable {
    private $app_id;
    private $app_date;
    private $app_track_id;
    private $app_res_status;
    private $serv_id;
    private $pat_id;

    public function setAppID($id){
        $this->app_id = $id;
    }
    public function getAppID(){
        return $this->app_id;
    }

    public function setAppDate($date){
        $this->app_date = $date;
    }
    public function getAppDate(){
        return $this->app_date;
    }

    public function setAppTrackID($id){
        $this->app_track_id = $id;
    }
    public function getAppTrackID(){
        return $this->app_track_id;
    }
    public function setAppResStatus($status){
        $this->app_res_status = $status;
    }
    public function getAppResStatus(){
        return $this->app_res_status;
    }

    public function setServID($id){
        $this->serv_id = $id;
    }
    public function getServID(){
        return $this->serv_id;
    }

    public function setPatID($id){
        $this->pat_id = $id;
    }
    public function getPatID(){
        return $this->pat_id;
    }

    public function jsonSerialize() {
        return [
            'app_id' => $this->app_id,
            'app_date' => $this->app_date,
            'app_track_id' => $this->app_track_id,
            'app_res_status' => $this->app_res_status,
            'serv_id' => $this->serv_id,
            'pat_id' => $this->pat_id,
        ];
    }
}
?>
