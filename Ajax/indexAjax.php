<?php
require_once("../Models/indexModel.php");

if (strlen(session_id()) < 1) {
    session_start(); //Validamos si existe o no la sesión
}

$usr = isset($_POST["usuario"]) ? $_POST["usuario"] : "";
$pass = isset($_POST["password"]) ? $_POST["password"] : "";

$index = new IndexModel();
switch ($_GET["op"]) {
    case "signin":
        $arrResponse = "";
        $request = $index->signin($usr);
        //print_r($request);
        if (!empty($request)) {
            if ($request['status'] == 1) {
                if (password_verify(strval($pass), $request['password'])) {
                    $_SESSION['idUsr'] = $request['idUsr'];
                    $_SESSION['nombre'] = $request['nombre'];
                    $_SESSION['session'] = 'si';
                    $_SESSION['type'] =  $request['tipo'];
                    $arrResponse = array('status' => true, 'msg' => $request['idUsr']);
                } else {
                    $arrResponse = array('status' => false, 'msg' => 'Usuario y/o contraseña incorrectos.');
                }
            } else {
                $arrResponse = array('status' => false, 'msg' => 'Usuario Dado de Baja.');
            }
        } else {
            $arrResponse = array('status' => false, 'msg' => 'Usuario y/o contraseña incorrectos.');
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
        break;
    case "logout":
        //Limpiamos las variables de sesión   
        session_unset();
        //Destruìmos la sesión
        session_destroy();
        //Redireccionamos al login
        header("Location: ../index.php");
        break;
}
