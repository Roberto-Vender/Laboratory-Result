<?php
require_once "mainRepository.php";
class appointmentRepository{
    private mainRepository $mainRepository;
    public function __construct(){
        $this->mainRepository = new mainRepository();
    }
    public function getAllAppointment(){
        $query = "SELECT A.APP_ID,A.APP_DATE,A.APP_TRACK_ID,A.APP_RES_STATUS,P.PAT_FNAME,P.PAT_LNAME,P.PAT_MNAME,P.PAT_EXTENSION,P.PAT_ID,S.SERV_ID,S.SERV_NAME FROM APPOINTMENT AS A
        INNER JOIN SERVICE AS S ON A.SERV_ID = S.SERV_ID
        INNER JOIN PATIENT AS P ON A.PAT_ID = P.PAT_ID";
        return $this->mainRepository->executeQuery($query, []);
    }
    public function getAllAppointmentById($id){
        $query = "SELECT A.APP_ID,A.APP_DATE,A.APP_TRACK_ID,A.APP_RES_STATUS,P.PAT_FNAME,P.PAT_LNAME,P.PAT_MNAME,P.PAT_EXTENSION,P.PAT_ID,S.SERV_ID,S.SERV_NAME FROM APPOINTMENT AS A
        INNER JOIN SERVICE AS S ON A.SERV_ID = S.SERV_ID
        INNER JOIN PATIENT AS P ON A.PAT_ID = P.PAT_ID WHERE A.APP_ID = :ID";
        return $this->mainRepository->executeQuery($query, [":ID" => $id]);
    }
    public function createAppointment($data){
        $query = "INSERT INTO APPOINTMENT (APP_TRACK_ID,SERV_ID,PAT_ID) VALUES (:TRACK_ID,:SERV_ID,:PAT_ID)";
        $params = $this->parameter($data);
        $this->mainRepository->executeQuery($query, $params);
    }
    public function updateAppointment($id,$data){
        $query = "UPDATE APPOINTMENT SET APP_RES_STATUS = :STAT WHERE APP_ID = :ID";
        $this->mainRepository->executeQuery($query,[":STAT" => $data->getAppResStatus(),":ID" => $id]);
    }
    public function parameter($data){
        $params= [
            ":TRACK_ID" => $data->getAppTrackID(),
            ":SERV_ID" =>$data->getServID(),
            ":PAT_ID" =>$data->getPatID()
        ];
        if(!empty($data->getAppResStatus())){
            $data[":STAT"] = $data->getAppResStatus();
        }
        return $params;
    }
}
?>