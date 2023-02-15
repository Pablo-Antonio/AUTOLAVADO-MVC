<?php
require_once("../BD/Mysql.php");

class IndexModel extends Mysql
{

    public function __construct()
    {
        parent::__construct();
    }

    public function signin($usr)
    {
        $sql = "SELECT * FROM usuarios WHERE usuario = '$usr'";
        $request = $this->select($sql);
        return $request;
    }
}