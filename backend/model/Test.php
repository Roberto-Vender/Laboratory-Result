<?php
class Test implements JsonSerializable {
    private $test_id;
    private $test_name;

    public function setTestID($id) {
        $this->test_id = $id;
    }
    public function getTestID() {
        return $this->test_id;
    }

    public function setTestName($name) {
        $this->test_name = $name;
    }
    public function getTestName() {
        return $this->test_name;
    }

    public function jsonSerialize() {
        return [
            'test_id' => $this->test_id,
            'test_name' => $this->test_name
        ];
    }
}
?>
