<!-- Modal -->
<div class="modal fade" id="mdlNewSer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header badge-success">
                <h5 class="modal-title" id="exampleModalLabel">NUEVO SERVICIO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form autocomplete="off" id="formNew">
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Nombre</strong></label>
                        <input class="form-control is-invalid" id="nombre" name="nombre" placeholder="Ingrese el nombre del servicio" type="text">
                        <div class="form-control-feedback text-danger" id="valNom"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Descripcion</strong></label>
                        <textarea id="descripcion" name="descripcion" rows="3" class="form-control is-invalid" placeholder="Ingrese la descripcion"></textarea>
                        <div class="form-control-feedback text-danger" id="valDes"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Precio</strong></label>
                        <input class="form-control is-invalid" id="precio" name="precio" placeholder="Ingrese el precio del servicio" type="number">
                        <div class="form-control-feedback text-danger" id="valPre"> *Campo Requerido </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" id="btnCloNew">Cerrar</button>
                        <button type="submit" class="btn btn-success">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>