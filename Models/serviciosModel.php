<?php
require_once("../BD/Mysql.php");

class ServiciosModel extends Mysql
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $sql = "SELECT * FROM servicios";
        $request = $this->select_all($sql);
        return $request;
    }

    public function getSell()
    {
        $sql = "SELECT * FROM servicios WHERE status = 1";
        $request = $this->select_all($sql);
        return $request;
    }

    public function new($datos){
        $sql = "INSERT INTO servicios (nombre,descripcion,precio)
        VALUES (?,?,?)";
        $request = $this->insert($sql,$datos);
        return $request;
    }

    public function show($idServicio)
    {
        $sql = "SELECT * FROM servicios WHERE idServicio = $idServicio";
        $request = $this->select($sql);
        return $request;
    }

    public function actualizar($idServicio,$datos){
        $sql = "UPDATE servicios SET nombre = ? , descripcion = ?,
        precio = ? WHERE idServicio = $idServicio";
        $request = $this->update($sql,$datos);
        return $request;
    }

    public function actDes($idServicio,$datos){
        $sql = "UPDATE servicios SET status = ? WHERE idServicio = $idServicio";
        $request = $this->update($sql,$datos);
        return $request;
    }
}
