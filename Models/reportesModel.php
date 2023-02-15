<?php
require_once("../BD/Mysql.php");

class ReportesModel extends Mysql
{

    public function __construct()
    {
        parent::__construct();
    }

    public function buscarTicket($idVenta)
    {
        $sql = "SELECT v.idVenta, v.fechaVenta, v.efectivo, v.totalVenta, v.atendio, 
        sv.idServicio, sv.cantidad, sv.totalServicio, sv.idVenta,
        s.nombre, u.nombre as atendio
        FROM ventas as v
        INNER JOIN serviciosvendidos as sv
        ON v.idVenta = sv.idVenta
        INNER JOIN servicios as s
        ON sv.idServicio = s.idServicio
        INNER JOIN usuarios as u
        ON v.atendio = u.idUsr
        WHERE v.idVenta = $idVenta";
        $request = $this->select_all($sql);
        return $request;
    }

    function corteCaja($fecha)
    {
        $sql = "SELECT SUM(totalVenta) as total, COUNT(idVenta) as ventas FROM ventas 
        WHERE DAY(fechaVenta) = DAY('$fecha')";
        $request = $this->select($sql);
        return $request;
    }

    function reporteMensual($fechaDe, $fechaHasta)
    {
        $sql = "SELECT SUM(totalVenta) as total, COUNT(idVenta) as ventas FROM ventas 
        WHERE DAY(fechaVenta) BETWEEN DAY('$fechaDe') and DAY('$fechaHasta')";
        $request = $this->select($sql);
        return $request;
    }
}
