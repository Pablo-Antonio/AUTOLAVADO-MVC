<?php
require_once("../Models/reportesModel.php");

if (strlen(session_id()) < 1) {
    session_start(); //Validamos si existe o no la sesión
}

$ticket = isset($_POST["ticket"]) ? $_POST["ticket"] : "";
$fecha = isset($_POST["fecha"]) ? $_POST["fecha"] : "";
$fechaDe = isset($_POST["fechaDe"]) ? $_POST["fechaDe"] : "";
$fechaHasta = isset($_POST["fechaHasta"]) ? $_POST["fechaHasta"] : "";


$reportes = new ReportesModel();
switch ($_GET["op"]) {
    case "buscarTicket":
        $arrData = $reportes->buscarTicket($ticket);
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
    case "buscarCorte":
        $arrData = $reportes->corteCaja($fecha);
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;

    case "reporteMensual":
        $arrData = $reportes->reporteMensual($fechaDe, $fechaHasta);
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
}
