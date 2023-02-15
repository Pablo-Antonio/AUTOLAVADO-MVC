<?php
require_once("../BD/Mysql.php");

class UsuariosModel extends Mysql
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getAll()
    {
        $sql = "SELECT * FROM usuarios";
        $request = $this->select_all($sql);
        return $request;
    }

    public function new($datos)
    {
        $sql = "INSERT INTO usuarios (usuario,nombre,password,telefono,tipo)
        VALUES (?,?,?,?,?)";
        $request = $this->insert($sql, $datos);
        return $request;
    }

    public function show($idUsr)
    {
        $sql = "SELECT * FROM usuarios WHERE idUsr = $idUsr";
        $request = $this->select($sql);
        return $request;
    }

    public function verificarUsr($usuario){
        $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
        $request = $this->select($sql);
        return $request;
    }

    public function actualizar($idUsr, $datos)
    {
        $sql = "UPDATE usuarios SET usuario = ? , nombre = ?,
        password = ?, telefono = ?,  tipo = ? WHERE idUsr = $idUsr";
        $request = $this->update($sql, $datos);
        return $request;
    }

    public function actDes($idUsr, $datos)
    {
        $sql = "UPDATE usuarios SET status = ? WHERE idUsr = $idUsr";
        $request = $this->update($sql, $datos);
        return $request;
    }
}
