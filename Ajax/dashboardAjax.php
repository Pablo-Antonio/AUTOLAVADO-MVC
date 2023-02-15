<?php
require_once("../Models/dashboardModel.php");

if (strlen(session_id()) < 1) {
    session_start(); //Validamos si existe o no la sesión
}

$year = isset($_POST["year"]) ? $_POST["year"] : "";

$dashboard = new DashboardModel();

switch ($_GET["op"]) {
    case "getUsers":
        $arrData = $dashboard->getUsers();
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
    case "getServicios":
        $arrData = $dashboard->getServicios();
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
    case "getVentas":
        $arrData = $dashboard->getVentas();
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
    case "getIngresos":
        $arrData = $dashboard->getIngresos();
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
    case "getTop10":
        $arrData = $dashboard->getTop10();
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
    case "getVentasMes":
        $arrData = $dashboard->getVentasMes($year);
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;
}
