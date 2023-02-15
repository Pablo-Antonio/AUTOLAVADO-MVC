<?php
require_once("../template/header.php");

$ban = false;
if ($_SESSION['type'] == 'empleado') {
    $ban = false;
    require_once("../errors/404.php");
} else {
    require_once("../modals/servicios/nuevo.php");
    require_once("../modals/servicios/actualizar.php");
    require_once("../modals/servicios/ver.php");
    $ban = true;
?>
    <main class="app-content">
        <div class="app-title">
            <div>
                <h1>Servicios</h1>
                <p>Servicios Registrados</p>
            </div>
            <ul class="app-breadcrumb breadcrumb">
                <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i><a href="<?= $BASE_URL ?>/Views/dashboard/dashboard.php"> Home </a></li>
                <li class="breadcrumb-item">Servicios</li>
            </ul>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="tile">
                    <div class="tile-body">
                        <div class="table-responsive">
                            <div>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" id="btnNewSer" data-toggle="modal" data-target="#mdlNewSer">
                                    <i class="fa fa-plus-square" aria-hidden="true"> Nuevo</i>
                                </button>
                            </div> <br>
                            <table class="table table-hover table-bordered" id="tableServicios">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
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
    <script src="<?= $BASE_MEDIA ?>/js/functions_servicios.js"></script>
<?php
}
?>