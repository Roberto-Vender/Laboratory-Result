<?php
require_once 'repository/adminRepository.php';
require_once 'service/serviceLogic.php';
require_once 'model/admin.php';

class AdminService {
    private AdminRepository $adminRepository;
    private ServiceLogic $serviceLogic;

    public function __construct() {
        $this->adminRepository = new AdminRepository();
        $this->serviceLogic = new ServiceLogic();
    }

    public function getAdmin() {
        $result = $this->adminRepository->getAdmin();
        $this->serviceLogic->checkExist($result);
        return $this->adminObjectList($result);
    }

    public function getAdminById($id) {
        $result = $this->adminRepository->getAdminById($id);
        $this->serviceLogic->checkExist($result);
        return $this->adminObjectList($result);
    }

    public function getAdminByEmail($email) {
        $result = $this->adminRepository->getAdminByEmail($email);
        return $this->adminObject($result);
    }

    public function createAdmin($data) {
        $admin = $this->adminObject($data);

        // Hash the password before saving
        $hashedPassword = password_hash($admin->getPassword(), PASSWORD_DEFAULT);
        $admin->setPassword($hashedPassword);

        $this->adminRepository->createAdmin($admin);
    }

    private function adminObject($data) {
        $admin = new Admin();
        $admin->setAdminID($data['admin_id'] ?? null);
        $admin->setAdminName($data['admin_name'] ?? null);
        $admin->setEmail($data['email'] ?? null);
        $admin->setPassword($data['password'] ?? null);
        return $admin;
    }

    private function adminObjectList($data) {
        $adminList = [];
        foreach ($data as $item) {
            $adminList[] = $this->adminObject($item);
        }
        return $adminList;
    }
}
