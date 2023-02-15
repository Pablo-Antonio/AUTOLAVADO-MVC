<!-- Modal -->
<div class="modal fade" id="mdlNewUsr" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header badge-success">
                <h5 class="modal-title" id="exampleModalLabel">NUEVO USUARIO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form autocomplete="off" id="formNew">
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Usuario</strong></label>
                        <input class="form-control is-invalid" id="usuario" name="usuario" 
                        placeholder="Ingrese el nombre de usuario" type="text">
                        <div class="form-control-feedback text-danger" id="valUsr"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Nombre</strong></label>
                        <input class="form-control is-invalid" id="nombre" name="nombre" 
                        placeholder="Ingrese el nombre del empleado" type="text">
                        <div class="form-control-feedback text-danger" id="valNom"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Contraseña</strong></label>
                        <input class="form-control is-invalid" id="password" name="password" 
                        placeholder="Ingrese la contraseña" type="text">
                        <div class="form-control-feedback text-danger" id="valPass"> *Campo Requerido</div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="inputDanger1"><strong>Telefono</strong></label>
                        <input class="form-control is-invalid" id="telefono" name="telefono" 
                        placeholder="Ingrese el telefono" type="text">
                        <div class="form-control-feedback text-danger" id="valTel"> *Campo Requerido </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleSelect1"><strong>Tipo</strong</label>
                        <select class="form-control" id="tipo" name="tipo">
                            <option value="administrador">Administrador</option>
                            <option value="empleado">Empleado</option>
                        </select>
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