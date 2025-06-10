<?php
require_once 'repository/TestRepository.php';
require_once 'model/Test.php';
require_once 'service/serviceLogic.php';

class TestService {
    private TestRepository $testRepo;
    private ServiceLogic $serviceLogic;

    public function __construct() {
        $this->testRepo = new TestRepository();
        $this->serviceLogic = new ServiceLogic();
    }

    public function getAllTests() {
        $tests = $this->testRepo->getAllTests();
        $this->serviceLogic->checkExist($tests);
        return $this->testObjectList($tests);
    }

    public function getTestById($id) {
        $test = $this->testRepo->getTestById($id);
        $this->serviceLogic->checkExist($test);
        return $this->testObjectList($test);
    }

    public function createTest($data) {
        $test = $this->testObject($data);
        $this->testRepo->createTest($test);
    }

    public function updateTest($id, $data) {
        $this->getTestById($id); // check exists
        $test = $this->testObject($data);
        $this->testRepo->updateTest($id, $test);
    }

    private function testObject($data) {
        $test = new Test();
        $test->setTestID($data['test_id'] ?? null);
        $test->setTestName($data['test_name'] ?? null);
        return $test;
    }

    private function testObjectList($data) {
        $list = [];
        foreach ($data as $row) {
            $list[] = $this->testObject($row);
        }
        return $list;
    }
}
?>
