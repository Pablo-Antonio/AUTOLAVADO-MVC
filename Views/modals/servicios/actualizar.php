<!-- Modal -->
<div class="modal fade" id="mdlUpdSer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header badge-info">
                <h5 class="modal-title" id="exampleModalLabel">ACTUALIZAR SERVICIO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form autocomplete="off" id="formUpd">
                    <input type="hidden" name="hddUp" id="hddUp">
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Nombre</strong></label>
                        <input class="form-control is-invalid" id="nomUpd" name="nomUpd" placeholder="Ingrese el nombre del servicio" type="text">
                        <div class="form-control-feedback text-danger" id="valNomUpd"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Descripcion</strong></label>
                        <textarea id="desUpd" name="desUpd" rows="3" class="form-control is-invalid" placeholder="Ingrese la descripcion"></textarea>
                        <div class="form-control-feedback text-danger" id="valDesUpd"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Precio</strong></label>
                        <input class="form-control is-invalid" id="precioUpd" name="precioUpd" placeholder="Ingrese el precio del servicio" type="number">
                        <div class="form-control-feedback text-danger" id="valPreUpd"> *Campo Requerido </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="btnCloUpd">Cerrar</button>
                        <button type="submit" class="btn btn-info">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>