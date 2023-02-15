<?php
require_once("../template/header.php");


$ban = false;
if ($_SESSION['type'] == 'empleado') {
    $ban = false;
    require_once("../errors/404.php");
} else {
    require_once("../modals/usuarios/nuevo.php");
    require_once("../modals/usuarios/actualizar.php");
    require_once("../modals/usuarios/ver.php");
    $ban = true;
?>
    <main class="app-content">
        <div class="app-title">
            <div>
                <h1>Usuarios</h1>
                <p>Usuarios Registrados</p>
            </div>
            <ul class="app-breadcrumb breadcrumb">
                <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i><a href="<?= $BASE_URL ?>/Views/dashboard/dashboard.php"> Home </a></li>
                <li class="breadcrumb-item">Usuarios</li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="tile">
                    <div class="tile-body">
                        <div class="table-responsive">
                            <div>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" id="btnNewUsr" data-toggle="modal" data-target="#mdlNewUsr">
                                    <i class="fa fa-user-plus" aria-hidden="true"> Nuevo</i>
                                </button>
                            </div> <br>
                            <table class="table table-hover table-bordered" id="tableUsuarios">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Estatus</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>


<?php
}
require_once("../template/footer.php");
?>
<?php
if ($ban) {
?>
    <script src="<?= $BASE_MEDIA ?>/js/functions_usuarios.js"></script>
<?php
}
?>