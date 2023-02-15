<?php
require_once("../Models/usuariosModel.php");

if (strlen(session_id()) < 1) {
    session_start(); //Validamos si existe o no la sesión
}

$idUsr = isset($_POST["idUsr"]) ? $_POST["idUsr"] : "";
$opcion = isset($_POST["opcion"]) ? $_POST["opcion"] : "";

$usuario = isset($_POST["usuario"]) ? $_POST["usuario"] : "";
$nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : "";
$password = isset($_POST["password"]) ? $_POST["password"] : "";
$telefono = isset($_POST["telefono"]) ? $_POST["telefono"] : "";
$tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : "";

$usrUpd = isset($_POST["usrUpd"]) ? $_POST["usrUpd"] : "";
$nomUpd = isset($_POST["nomUpd"]) ? $_POST["nomUpd"] : "";
$passUpd = isset($_POST["passUpd"]) ? $_POST["passUpd"] : "";
$telUpd = isset($_POST["telUpd"]) ? $_POST["telUpd"] : "";
$tipoUpd = isset($_POST["tipoUpd"]) ? $_POST["tipoUpd"] : "";

$usuarios = new UsuariosModel();

switch ($_GET["op"]) {
    case "getAll":
        $arrData = $usuarios->getAll();
        for ($i = 0; $i < count($arrData); $i++) {
            $btnView = '';
            $btnUpd = '';
            if ($arrData[$i]["status"] == 0) {
                $arrData[$i]["status"] = '<div class="toggle-flip"><label>
                <input type="checkbox" id="chck' . $arrData[$i]["idUsr"] . '" onClick="status(' . $arrData[$i]["idUsr"] . ')">
                <span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF">
                </span></label></div>';
                $btnView = '<button class="btn btn-info btn-sm" onClick="viewUsr(' . $arrData[$i]["idUsr"] . ')" title="Ver Usuario"><i class="fa fa-eye"></i></button>';
                $btnUpd = '<button class="btn btn-primary btn-sm" onClick="viewFormUpd(' . $arrData[$i]["idUsr"] . ')" title="Actualizar Usuario"><i class="fa fa-pencil-square"></i></button>';
                $arrData[$i]["acciones"] = '<div class="text-center">' . $btnView . ' ' . $btnUpd .  '</div>';
            } else {
                $arrData[$i]["status"] = '<div class="toggle-flip"><label>
                <input type="checkbox" checked="checked" id="chck' . $arrData[$i]["idUsr"] . '" onClick="status(' . $arrData[$i]["idUsr"] . ')">
                <span class="flip-indecator" data-toggle-on="ON" data-toggle-off="OFF">
                </span></label></div>';
                $btnView = '<button class="btn btn-info btn-sm" onClick="viewUsr(' . $arrData[$i]["idUsr"] . ')" title="Ver Usuario"><i class="fa fa-eye"></i></button>';
                $btnUpd = '<button class="btn btn-primary btn-sm" onClick="viewFormUpd(' . $arrData[$i]["idUsr"] . ')" title="Actualizar Usuario"><i class="fa fa-pencil-square"></i></button>';
                $arrData[$i]["acciones"] = '<div class="text-center">' . $btnView . ' ' . $btnUpd .  '</div>';
            }
        }
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;

    case "new":
        $password = password_hash(strval($password), PASSWORD_DEFAULT);

        $request = $usuarios->verificarUsr($usuario);
        if (!empty($request)) {
            $arrResponse = array('status' => false, 'msg' => 'Nombre de usuario Registrado.');
        } else {
            $datos = array($usuario,$nombre,$password,$telefono,$tipo);

            $request = $usuarios->new($datos);

            if ($request > 0) {
                $arrResponse = array('status' => true, 'msg' => 'Usuario Registrado.');
            } else {
                $arrResponse = array('status' => false, 'msg' => 'No es posible registrar el usuario.');
            }
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;

    case "show":
        $arrData = $usuarios->show($idUsr);
        echo json_encode($arrData, JSON_UNESCAPED_UNICODE);
        break;

    case "update":
        $passUpd = password_hash(strval($passUpd), PASSWORD_DEFAULT);
        $datos = array($usrUpd,$nomUpd,$passUpd,$telUpd,$tipoUpd);
        $request = $usuarios->actualizar($idUsr, $datos);
        if ($request > 0) {
            $arrResponse = array('status' => true, 'msg' => 'Usuario Actualizado Correctamente.');
        } else {
            $arrResponse = array('status' => false, 'msg' => 'No es posible actualizar el usuario.');
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;

    case "actDes":
        $datos = array($opcion);
        $request = $usuarios->actDes($idUsr, $datos);
        if ($request > 0) {
            if ($opcion == 0) {
                $msg = "Usuario Desactivado.";
                $bandera = true;
            } else {
                $msg = "Usuario Activado.";
                $bandera = true;
            }
        } else {
            if ($opcion == 0) {
                $msg = "No es posible Desactivar el Usuario";
                $bandera = false;
            } else {
                $msg = "No es posible Activar el Usuario";
                $bandera = false;
            }
        }
        $arrResponse = array('status' => $bandera, 'msg' => $msg);
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;
}
