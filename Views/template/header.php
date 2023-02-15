<?php
require_once("../../Helpers/helpers.php");

session_start();
if (!$_SESSION['session']) {
    header('Location: ' . $BASE_URL . '');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="description" content="Vali is a responsive and free admin theme built with Bootstrap 4, SASS and PUG.js. It's fully customizable and modular.">
    <!-- Twitter meta-->
    <title>Auto Lavado Reforma</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Main CSS-->
    <link rel="stylesheet" type="text/css" href="<?= $BASE_MEDIA ?>/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?= $BASE_MEDIA ?>/js/plugins/sweetalert/sweetalert2.min.css">
    <!-- Font-icon css-->
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body class="app sidebar-mini">
    <!-- Navbar-->
    <header class="app-header"><a class="app-header__logo" href="">Bievenido</a>
        <!-- Sidebar toggle button--><a class="app-sidebar__toggle" href="" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
        <!-- Navbar Right Menu-->
        <ul class="app-nav">
            <!-- User Menu-->
            <li class="dropdown"><a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i class="fa fa-user fa-lg"></i></a>
                <ul class="dropdown-menu settings-menu dropdown-menu-right">
                    <li><a class="dropdown-item" href="<?= $BASE_URL ?>/Ajax/indexAjax.php?op=logout"><i class="fa fa-sign-out fa-lg"></i> Cerrar Sesion</a></li>
                </ul>
            </li>
        </ul>
    </header>
    <!-- Sidebar menu-->
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">
        <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="<?= $BASE_MEDIA ?>/img/usr.png" alt="User Image" width="50px">
            <div>
                <p class="app-sidebar__user-name"><?= $_SESSION['nombre'] ?></p>
                <input type="hidden" id="hddNomLog" value="<?= $_SESSION['nombre'] ?>">
                <p class="app-sidebar__user-designation"><?= $_SESSION['type'] ?></p>
                <input type="hidden" id="hddIdLog" value="<?= $_SESSION['idUsr'] ?>">
            </div>
        </div>
        <ul class="app-menu">
            <li><a class="app-menu__item" href="<?=$BASE_URL?>/Views/dashboard/dashboard.php"><i class="app-menu__icon fa fa-dashboard"></i><span class="app-menu__label">Dashboard</span></a></li>
            <li class="treeview"><a class="app-menu__item" href="" data-toggle="treeview"><i class="app-menu__icon fa fa-shopping-cart"></i><span class="app-menu__label">Ventas</span><i class="treeview-indicator fa fa-angle-right"></i> </a>
                <ul class="treeview-menu">
                    <li><a class="treeview-item" href="<?=$BASE_URL?>/Views/ventas/ventas.php"><i class="icon fa fa-circle-o"></i> Ventas</a></li>
                    <li><a class="treeview-item" href="<?=$BASE_URL?>/Views/ventas/buscarTicket.php"><i class="icon fa fa-circle-o"></i> Buscar Ticket</a></li>
                </ul>
            </li>

            <li><a class="app-menu__item" href="<?=$BASE_URL?>/Views/usuarios/usuarios.php"><i class="app-menu__icon fa fa fa-users"></i><span class="app-menu__label">Usuarios</span></a></li>
            <li><a class="app-menu__item" href="<?=$BASE_URL?>/Views/servicios/servicios.php"><i class="app-menu__icon fa fa-car"></i><span class="app-menu__label">Servicios</span></a></li>

            <li class="treeview"><a class="app-menu__item" href="" data-toggle="treeview"><i class="app-menu__icon fa fa-bar-chart"></i><span class="app-menu__label">Reportes</span><i class="treeview-indicator fa fa-angle-right"></i> </a>
                <ul class="treeview-menu">
                    <li><a class="treeview-item" href="<?=$BASE_URL?>/Views/ventas/corteCaja.php"><i class="icon fa fa-circle-o"></i> Corte Caja</a></li>
                    <li><a class="treeview-item" href="<?=$BASE_URL?>/Views/ventas/reporteMensual.php"><i class="icon fa fa-circle-o"></i> Reporte Mensual</a></li>
                </ul>
            </li>

        </ul>
    </aside>