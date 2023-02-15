<?php
require_once("../BD/Mysql.php");

class VentasModel extends Mysql
{

    public function __construct()
    {
        parent::__construct();
    }

    public function nuevaVenta($datos)
    {
        $sql = "INSERT INTO ventas (fechaVenta,totalVenta,efectivo,atendio)
        VALUES (?,?,?,?)";
        $request = $this->insert($sql, $datos);
        return $request;
    }

    public function insertarServicios($datos)
    {
        $sql = "INSERT INTO serviciosvendidos (idServicio,cantidad,totalServicio,idVenta)
        VALUES (?,?,?,?)";
        $request = $this->insert($sql, $datos);
        return $request;
    }
}
