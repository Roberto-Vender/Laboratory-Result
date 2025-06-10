<?php

class serviceLogic{

    public function checkExist($data){
        if(empty($data)){
            throw new Exception("No data found");
        }
    }
}
?>