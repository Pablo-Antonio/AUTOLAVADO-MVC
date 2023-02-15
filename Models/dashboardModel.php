<?php
require_once("../BD/Mysql.php");

class DashboardModel extends Mysql
{

    public function __construct()
    {
        parent::__construct();
    }

    public function getUsers()
    {
        $sql = "SELECT COUNT(idUsr) as usuarios FROM usuarios WHERE status = 1";
        $request = $this->select($sql);
        return $request;
    }

    public function getServicios()
    {
        $sql = "SELECT COUNT(idServicio) as servicios FROM servicios WHERE status = 1";
        $request = $this->select($sql);
        return $request;
    }

    public function getVentas()
    {
        $sql = "SELECT COUNT(idVenta) as ventas FROM ventas WHERE DAY(fechaVenta) = DAY(CURDATE())";
        $request = $this->select($sql);
        return $request;
    }

    public function getIngresos()
    {
        $sql = "SELECT SUM(totalVenta) as ingresos FROM ventas WHERE DAY(fechaVenta) = DAY(CURDATE())";
        $request = $this->select($sql);
        return $request;
    }

    public function getTop10()
    {
        $sql = "SELECT sv.idServicio, COUNT(sv.idServicio) as cantidad, 
        SUM(sv.totalServicio) as total, s.nombre as nombre
        FROM serviciosvendidos as sv
        INNER JOIN servicios as s
        ON sv.idServicio = s.idServicio
        GROUP BY idServicio ASC LIMIT 0,10";
        $request = $this->select_all($sql);
        return $request;
    }

    public function getVentasMes($year)
    {
        $sql = "SELECT SUM(totalVenta) AS Total, MONTHNAME(fechaVenta) AS Mes 
        FROM ventas WHERE YEAR(fechaVenta) = '$year' GROUP BY Mes";
        $request = $this->select_all($sql);
        return $request;
    }
}
