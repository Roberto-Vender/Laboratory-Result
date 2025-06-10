<?php
require_once "mainRepository.php";
    class resultRepository{
    private mainRepository $mainRepository;
    public function __construct(){
        $this->mainRepository = new mainRepository();
    }
    public function getAllResult(){
        $query = "SELECT R.APP_TRACK_ID, R.RES_DATE, R.RES_FILE,ADM.ADMIN_FNAME,ADM.ADMIN_LNAME,A.APP_DATE,A.APP_RES_STATUS,S.SERV_NAME,P.PAT_FNAME,
        P.PAT_LNAME, P.PAT_MNAME, P.PAT_EXTENSION , P.PAT_DOB, P.PAT_EMAIL, P.PAT_ADDRESS, P.PAT_GENDER, P.PAT_CONTACT FROM RESULT AS R
        INNER JOIN APPOINTMENT AS A  ON A.APP_TRACK_ID = R.APP_TRACK_ID
        INNER JOIN ADMIN AS ADM  ON ADM.ADMIN_ID = R.ADMIN_ID
        INNER JOIN SERVICE AS S ON S.SERV_ID = A.SERV_ID
        INNER JOIN PATIENT AS P ON P.PAT_ID = A.PAT_ID";
        return $this->mainRepository->executeQuery($query, []);
    }
    public function getAllResultById($id){
        $query = "SELECT R.APP_TRACK_ID, R.RES_DATE, R.RES_FILE,ADM.ADMIN_FNAME,ADM.ADMIN_LNAME,A.APP_DATE,A.APP_RES_STATUS,S.SERV_NAME,P.PAT_FNAME,
        P.PAT_LNAME, P.PAT_MNAME, P.PAT_EXTENSION , P.PAT_DOB, P.PAT_EMAIL, P.PAT_ADDRESS, P.PAT_GENDER, P.PAT_CONTACT FROM RESULT AS R
        INNER JOIN APPOINTMENT AS A  ON A.APP_TRACK_ID = R.APP_TRACK_ID
        INNER JOIN ADMIN AS ADM  ON ADM.ADMIN_ID = R.ADMIN_ID
        INNER JOIN SERVICE AS S ON S.SERV_ID = A.SERV_ID
        INNER JOIN PATIENT AS P ON P.PAT_ID = A.PAT_ID WHERE R.RES_ID = :ID";
        return $this->mainRepository->executeQuery($query, [":ID" => $id]);
    }
    public function createResult($data){
        $query = "INSERT INTO RESULT (RES_FILE,APP_TRACK_ID,ADMIN_ID) VALUES (:RES_FILE,:APP_TRACK_ID,:ADMIN_ID)";
        $params = $this->parameter($data);
        $this->mainRepository->executeQuery($query, $params);
    }
    public function updateResult($data,$id){
        $query = "UPDATE RESULT SET RES_FILE = :RES_FILE, APP_TRACK_ID = :APP_TRACK_ID , ADMIN_ID = :ADMIN_ID WHERE RES_ID = :RES_ID";
        $params = $this->parameter($data);
        $params[":RES_ID"] = $id;
        $this->mainRepository->executeQuery($query, $params);
    }
    public function parameter($data){
        $params = [
            ":RES_FILE" => $data->getResFile(),
            ":APP_TRACK_ID" => $data->getAppTrackID(),
            ":ADMIN_ID" => $data->getAdminID()
        ];
        return $params;
    }
    }
?>