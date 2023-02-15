<?php
require_once("../Models/ventasModel.php");

if (strlen(session_id()) < 1) {
    session_start(); //Validamos si existe o no la sesión
}

$datosVenta = isset($_POST["datosVenta"]) ? $_POST["datosVenta"] : "";
$serviciosVenta = isset($_POST["serviciosVenta"]) ? $_POST["serviciosVenta"] : "";

$ventas = new VentasModel();

switch ($_GET["op"]) {
    case "nueva":
        $arrResponse = "";
        $datos = [];
        foreach ($datosVenta as $dato) {
            $datos = [
                $dato["fechaVenta"], $dato["totalVenta"], $dato["efectivo"], $dato["atendio"]
            ];
        }
        $request = $ventas->nuevaVenta($datos);
        if ($request > 0) {
            $arrResponse = array('status' => true, 'msg' => $request);
        } else {
            $arrResponse = array('status' => false, 'msg' => 'No es posible realizar la venta.');
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;
    case "insertarServicios":
        $arrResponse = "";
        $datos = [];
        foreach ($serviciosVenta as $servicio) {
            $datos = [
                $servicio["idServicio"], $servicio["cantidad"], $servicio["totalServicio"], $servicio["idVenta"]
            ];
            $ventas->insertarServicios($datos);
        }
        $arrResponse = array('status' => true, 'msg' => "VENTA REALIZADA");
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;
}
