<?php
require_once("../Models/serviciosModel.php");

if (strlen(session_id()) < 1) {
    session_start(); //Validamos si existe o no la sesión
}

$idServicio = isset($_POST["idServicio"]) ? $_POST["idServicio"] : "";
$opcion = isset($_POST["opcion"]) ? $_POST["opcion"] : "";

$nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : "";
$descripcion = isset($_POST["descripcion"]) ? $_POST["descripcion"] : "";
$precio = isset($_POST["precio"]) ? $_POST["precio"] : "";

$nomUpd = isset($_POST["nomUpd"]) ? $_POST["nomUpd"] : "";
$desUpd = isset($_POST["desUpd"]) ? $_POST["desUpd"] : "";
$precioUpd = isset($_POST["precioUpd"]) ? $_POST["precioUpd"] : "";


$servicios = new ServiciosModel();

switch ($_GET["op"]) {
    case "getAll":
        $arrData = $servicios->getAll();
        for ($i = 0; $i < count($arrData); $i++) {
            $btnView = '';
            $btnUpd = '';
            if ($arrData[$i]["status"] == 0) {
                $arrData[$i]["status"] = '<div class="toggle-flip"><label>
                <input type="checkbox" id="chck' . $arrData[$i]["idServicio"] . '" onClick="status(' . $arrData[$i]["idServicio"] . ')">
                <span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF">
                </span></label></div>';

                $btnView = '<button class="btn btn-info btn-sm" onClick="viewSer(' . $arrData[$i]["idServicio"] . ')" title="Ver Servicio"><i class="fa fa-eye"></i></button>';
                $btnUpd = '<button class="btn btn-primary btn-sm" onClick="viewFormUpd(' . $arrData[$i]["idServicio"] . ')" title="Actualizar Servicio"><i class="fa fa-pencil-square"></i></button>';
                $arrData[$i]["acciones"]  = '<div class="text-center">' . $btnView . ' ' . $btnUpd .  '</div>';
            } else {
                $arrData[$i]["status"] =
                    '<div class="toggle-flip"><label>
                <input type="checkbox" checked="checked" id="chck' . $arrData[$i]["idServicio"] . '" onClick="status(' . $arrData[$i]["idServicio"] . ')">
                <span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF">
                </span></label></div>';
                $btnView = '<button class="btn btn-info btn-sm" onClick="viewSer(' . $arrData[$i]["idServicio"] . ')" title="Ver Servicio"><i class="fa fa-eye"></i></button>';
                $btnUpd = '<button class="btn btn-primary btn-sm" onClick="viewFormUpd(' . $arrData[$i]["idServicio"] . ')" title="Actualizar Servicio"><i class="fa fa-pencil-square"></i></button>';
                $arrData[$i]["acciones"]  = '<div class="text-center">' . $btnView . ' ' . $btnUpd .  '</div>';
            }
        }
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;

    case "getSell":
        $arrData = $servicios->getSell();
        for ($i = 0; $i < count($arrData); $i++) {
            $btnView = '<button class="btn btn-success btn-sm" onClick="agregarCarrito(' . $arrData[$i]["idServicio"] . ')" title="Agregar Servicio"><i class="fa fa-plus-square"> Agregar</i></button>';
            $btn = '<div class="text-center">' . $btnView . '</div>';
            $arrData[$i]["acciones"] = $btn;
        }
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;

    case "new":
        $precioUpd = doubleval($precioUpd);
        $datos = array($nombre, $descripcion, $precio);
        $request = $servicios->new($datos);
        if ($request > 0) {
            $arrResponse = array('status' => true, 'msg' => 'Servicio Registrado.');
        } else {
            $arrResponse = array('status' => false, 'msg' => 'No es posible registrar el servicio.');
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;

    case "show":
        $arrData = $servicios->show($idServicio);
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;

    case "update":
        $precioUpd = doubleval($precioUpd);
        $datos = array($nomUpd, $desUpd, $precioUpd);
        $request = $servicios->actualizar($idServicio, $datos);
        if ($request > 0) {
            $arrResponse = array('status' => true, 'msg' => 'Servicio Actualizado Correctamente.');
        } else {
            $arrResponse = array('status' => false, 'msg' => 'No es posible actualizar el servicio.');
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;

    case "actDes":
        $datos = array($opcion);
        $request = $servicios->actDes($idServicio, $datos);
        if ($request > 0) {
            if ($opcion == 0) {
                $msg = "Servicio Desactivado.";
                $bandera = true;
            } else {
                $msg = "Servicio Activado.";
                $bandera = true;
            }
        } else {
            if ($opcion == 0) {
                $msg = "No es posible Desactivar el servicio";
                $bandera = false;
            } else {
                $msg = "No es posible Activar el servicio";
                $bandera = false;
            }
        }
        $arrResponse = array('status' => $bandera, 'msg' => $msg);
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;
}
