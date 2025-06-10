<?php
require_once "service/resultService.php";
class resultController{
    private resultService $resultService;
    public function __construct(){
        $this->resultService = new resultService();
    }
    public function getAllResult()
    {
        try{
            $result = $this->resultService->getAllResult();
            echo json_encode(["message" => "Sucessfully get data", "data" => $result]);
        }catch(Exception $e){
            echo json_encode(["message" => "an error occured ".$e]);
        }
    }
    public function getResultById($id)
    {
        try{
            $result = $this->resultService->getResultId($id);
            echo json_encode(["message" => "Sucessfully get data", "data" => $result]);
        }catch(Exception $e){
            echo json_encode(["message" => "an error occured ".$e]);
        }
    }
    public function createResult()
{
    header('Content-Type: application/json');

    // Check if request method is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405); // Method Not Allowed
        echo json_encode([
            "error" => true, 
            "message" => "Invalid request method, POST required."
        ]);
        return;
    }

    try {
        // Check if file is uploaded
        if (!isset($_FILES['res_file'])) {
            throw new Exception("No file uploaded.");
        }

        // Check for upload errors
        if ($_FILES['res_file']['error'] !== UPLOAD_ERR_OK) {
            throw new Exception("Upload error code: " . $_FILES['res_file']['error']);
        }

        // Define upload directory
        $uploadDir = 'uploads/results/';

        // Create upload directory if it does not exist
        if (!file_exists($uploadDir)) {
            if (!mkdir($uploadDir, 0777, true) && !is_dir($uploadDir)) {
                throw new Exception("Failed to create upload directory.");
            }
        }

        // Sanitize and generate unique filename
        $originalFilename = $_FILES['res_file']['name'];
        $safeFilename = time() . '_' . preg_replace("/[^a-zA-Z0-9\._-]/", "", basename($originalFilename));

        // Move the uploaded file
        $destination = $uploadDir . $safeFilename;
        if (!move_uploaded_file($_FILES['res_file']['tmp_name'], $destination)) {
            throw new Exception("Failed to move uploaded file.");
        }

        // Validate and sanitize POST inputs
        $appTrackId = isset($_POST['app_track_id']) ? htmlspecialchars($_POST['app_track_id']) : null;
        $adminId = isset($_POST['admin_id']) ? htmlspecialchars($_POST['admin_id']) : null;

        if ($appTrackId === null || $adminId === null) {
            throw new Exception("Missing required POST data.");
        }

        // Prepare data array to save
        $data = [
            "res_file" => $safeFilename,
            "app_track_id" => $appTrackId,
            "admin_id" => $adminId
        ];

        // Call service to save data to DB
        $this->resultService->createResult($data);
        
        // Send success response
        echo json_encode([
            "error" => false,
            "message" => "Successfully created result"
        ]);
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            "error" => true, 
            "message" => "An error occurred: " . $e->getMessage()
        ]);
    }
}

    
    public function updateResult($id,$data)
    {
        try{
            $this->resultService->updateResult($id,$data);
            echo json_encode(["message" => "Sucessfully updated result"]);
        }catch(Exception $e){
            echo json_encode(["message" => "an error occured ".$e]);
        }
    }
}
?>