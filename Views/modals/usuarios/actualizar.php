<!-- Modal -->
<div class="modal fade" id="mdlUpdUsr" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header badge-info">
                <h5 class="modal-title" id="exampleModalLabel">ACTUALIZAR USUARIO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form autocomplete="off" id="formUpd">
                    <input type="hidden" id="hidUPd">
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Usuario</strong></label>
                        <input class="form-control is-invalid" id="usrUpd" name="usrUpd" 
                        placeholder="Ingrese el nombre de usuario" type="text">
                        <div class="form-control-feedback text-danger" id="valUsrUpd"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Nombre</strong></label>
                        <input class="form-control is-invalid" id="nomUpd" name="nomUpd" 
                        placeholder="Ingrese el nombre del empleado" type="text">
                        <div class="form-control-feedback text-danger" id="valNomUpd"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Contraseña</strong></label>
                        <input class="form-control is-invalid" id="passUpd" name="passUpd" 
                        placeholder="Ingrese la contraseña" type="text">
                        <div class="form-control-feedback text-danger" id="valPassUpd"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Telefono</strong></label>
                        <input class="form-control is-invalid" id="telUpd" name="telUpd" 
                        placeholder="Ingrese el telefono" type="text">
                        <div class="form-control-feedback text-danger" id="valTelUpd"> *Campo Requerido </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleSelect1"><strong>Tipo</strong</label>
                        <select class="form-control" id="tipoUpd" name="tipoUpd">
                            <option value="administrador">Administrador</option>
                            <option value="empleado">Empleado</option>
                        </select>
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