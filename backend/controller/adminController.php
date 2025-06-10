<?php
require_once 'service/adminService.php';

class AdminController {
    private AdminService $adminService;

    public function __construct() {
        $this->adminService = new AdminService();
    }

    public function getAdmin() {
        try {
            $result = $this->adminService->getAdmin();
            echo json_encode(["message" => "Successfully retrieved data", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public function getAdminById($id) {
        try {
            $result = $this->adminService->getAdminById($id);
            echo json_encode(["message" => "Successfully retrieved data", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public function getAdminByEmail($email) {
        try {
            $result = $this->adminService->getAdminByEmail($email);
            echo json_encode(["message" => "Successfully retrieved data", "data" => $result]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public function createAdmin($data) {
        try {
            $this->adminService->createAdmin($data);
            echo json_encode(["message" => "Successfully created admin"]);
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }

    public function loginAdmin($data) {
        try {
            $email = htmlspecialchars($data["email"]);
            $password = htmlspecialchars($data["password"]);

            $admin = $this->adminService->getAdminByEmail($email);

            if ($admin) {
                if ($admin->getEmail() === $email && password_verify($password, $admin->getPassword())) {
                    http_response_code(200);
                    echo json_encode(["message" => "Login successful!", "data" => $admin]);
                } else {
                    http_response_code(401);
                    echo json_encode(["message" => "Incorrect credentials"]);
                }
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Incorrect credentials"]);
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
        }
    }
}
?>
