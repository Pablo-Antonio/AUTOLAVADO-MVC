<?php
require_once("../template/header.php");
?>
<main class="app-content">
    <div class="app-title">
        <div>
            <h1>Corte de Caja</h1>
            <p>Realizar Corte de Caja</p>
        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i><a href="<?=$BASE_URL?>/Views/dashboard/dashboard.php"> Home </a></li>
            <li class="breadcrumb-item">Corte de Caja</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">

                    <div class="row">
                        <div class="col-lg-6">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-success" id="btnReaCorte" title="REALIZAR CORTE">
                                <i class="fa fa-list-alt" aria-hidden="true"> Realizar Corte</i>
                            </button>
                            <button type="button" class="btn btn-info" id="btnImpCorte" title="IMPRIMIR CORTE">
                                <i class="fa fa-file-pdf-o" aria-hidden="true"> Imprimir</i>
                            </button>
                            <button type="button" class="btn btn-danger" id="btnLimCorte" title="LIMPIAR CORTE">
                                <i class="fa fa-eraser" aria-hidden="true"> Limpiar</i>
                            </button>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="" class="form-control-label">SELECCIONA UNA FECHA</label>
                                <input class="form-control is-invalid" type="date" id="dateCorte">
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="mx-auto">
                                <h4>CORTE DE CAJA</h4>
                                <form class="form-horizontal">
                                    <div class="form-group row">
                                        <label class="control-label col-md-3"><strong>Corte: </strong></label>
                                        <div class="col-md-4">
                                            <p id="viewFechaHora"></p>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3"><strong>Cajero: </strong></label>
                                        <div class="col-md-8">
                                            <p id="viewCajero"></p>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3"><strong>Fecha: </strong></label>
                                        <div class="col-md-8">
                                            <p id="viewFechaCorte"></p>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3"><strong>No. Ventas: </strong></label>
                                        <div class="col-md-8">
                                            <p id="viewCantidad"></p>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="control-label col-md-3"><strong>Total: </strong></label>
                                        <div class="col-md-8">
                                            <p id="viewTotal"></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
require_once("../template/footer.php");
?>

<script src="<?= $BASE_MEDIA ?>/js/functions_reportes.js"></script>