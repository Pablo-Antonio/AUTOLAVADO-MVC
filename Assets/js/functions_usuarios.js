var tableUsuarios;
$(document).ready(function () {
  listarUsuarios();

  validarTelefonos();
  nuevoUsuario();
  closeNewUsr();
  classNewUsr();

  cloeseView();

  updateUsr();
  classUpdUsr();
  closeUpdUsr();
});

function listarUsuarios() {
  tableUsuarios = $("#tableUsuarios").dataTable({
    aProcessing: true,
    aServerSide: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    ajax: {
      url: "../../Ajax/usuariosAjax.php?op=getAll",
      dataSrc: "",
    },
    columns: [
      { data: "nombre" },
      { data: "tipo" },
      { data: "status" },
      { data: "acciones" },
    ],
    resonsieve: "true",
    bDestroy: true,
    iDisplayLength: 10,
    order: [[0, "asc"]],
  });
}

function nuevoUsuario() {
  $("#formNew").submit(function (event) {
    event.preventDefault();
    validarFormNewClass();
    if (validarFormNew()) {
      var formNew = new FormData($("#formNew")[0]);
      var lonTel = $("#telefono").val().length;
      if (lonTel != 10) {
        $("#telefono").addClass("is-invalid");
        $("#valTel").show();
        msjAlert(
          "error",
          "El telefono debe tener solo 10 numeros",
          "Error Telefono"
        );
      } else {
        $("#telefono").removeClass("is-invalid");
        $("#valTel").hide();
        $.ajax({
          method: "POST",
          url: "../../Ajax/usuariosAjax.php?op=new",
          data: formNew,
          contentType: false,
          processData: false,
        })
          .done(function (data) {
            //console.log(data);
            var datos = JSON.parse(data);
            if (datos.status == true) {
              $("#formNew")[0].reset();
              classNewUsr();
              $("#mdlNewUsr").modal("hide");
              tableUsuarios.api().ajax.reload();
              msjAlert("success", datos.msg, "Éxito");
            } else {
              msjAlert("error", datos.msg, "Error");
            }
          })
          .fail(function () {
            msjAlert("error", "Error con el Servidor", "Error");
          });
      }
    }
  });
}

function validarFormNewClass() {
  if ($("#nombre").val() == "") {
    $("#nombre").addClass("is-invalid");
    $("#valUsr").show();
  } else {
    $("#nombre").removeClass("is-invalid");
    $("#valUsr").hide();
  }

  if ($("#descripcion").val() == "") {
    $("#descripcion").addClass("is-invalid");
    $("#valNom").show();
  } else {
    $("#descripcion").removeClass("is-invalid");
    $("#valNom").hide();
  }

  if ($("#precio").val() == "") {
    $("#precio").addClass("is-invalid");
    $("#valPass").show();
  } else {
    $("#precio").removeClass("is-invalid");
    $("#valPass").hide();
  }
}

function validarFormNew() {
  var ban = false;

  if ($("#nombre").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#descripcion").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#precio").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  return ban;
}

function classNewUsr() {
  $("#usuario").removeClass("is-invalid");
  $("#nombre").removeClass("is-invalid");
  $("#password").removeClass("is-invalid");
  $("#telefono").removeClass("is-invalid");

  $("#valUsr").hide();
  $("#valNom").hide();
  $("#valPass").hide();
  $("#valTel").hide();
}

function closeNewUsr() {
  $("#btnCloNew").on("click", function () {
    $("#formNew")[0].reset();
    classNewUsr();
    $("#mdlNewUsr").modal("hide");
  });
}

function validarTelefonos() {
  $("#telefono").keyup(function () {
    this.value = (this.value + "").replace(/[^0-9]/g, "");
  });

  $("#telUpd").keyup(function () {
    this.value = (this.value + "").replace(/[^0-9]/g, "");
  });
}

function status(idUsr) {
  var opc = 0;

  $("#chck" + idUsr).prop("checked") ? (opc = 1) : (opc = 0);

  $.ajax({
    method: "POST",
    url: "../../Ajax/usuariosAjax.php?op=actDes",
    data: { opcion: opc, idUsr: idUsr },
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      if (datos.status == true) {
        tableUsuarios.api().ajax.reload();
        msjAlert("success", datos.msg, "Éxito");
      } else {
        msjAlert("error", datos.msg, "Error");
      }
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function viewUsr(idUsr) {
  $.ajax({
    method: "POST",
    url: "../../Ajax/usuariosAjax.php?op=show",
    data:{idUsr:idUsr}
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#staView").removeClass("badge-success");
      $("#staView").removeClass("badge-danger");
      $("#mdlViewUsr").modal("show");
      $("#usrView").text(datos.usuario);
      $("#nomView").text(datos.nombre);
      $("#telView").text(datos.telefono);
      $("#tipoView").text(datos.tipo);

      var tipo = datos.status == 1 ? "ACTIVO" : "INACTIVO";
      var color = datos.status == 1 ? "badge-success" : "badge-danger";
      $("#staView").text(tipo);
      $("#staView").addClass(color);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function cloeseView() {
  $("#btnCloView").on("click", function () {
    $("#mdlViewUsr").modal("hide");
  });
}

function viewFormUpd(idUsr) {
  $.ajax({
    method: "POST",
    url: "../../Ajax/usuariosAjax.php?op=show",
    data:{idUsr:idUsr}
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#mdlUpdUsr").modal("show");
      $("#hidUPd").val(datos.idUsr);
      $("#usrUpd").val(datos.usuario);
      $("#nomUpd").val(datos.nombre);
      $("#telUpd").val(datos.telefono);
      $("#tipoUpd").val(datos.tipo);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function updateUsr() {
  $("#formUpd").submit(function (event) {
    event.preventDefault();
    validarFormUpdClass();
    if (validarFormUpd()) {
      var lonTel = $("#telUpd").val().length;
      if (lonTel != 10) {
        $("#telUpd").addClass("is-invalid");
        $("#valTelUpd").show();
        msjAlert(
          "error",
          "El telefono debe tener solo 10 numeros",
          "Error Telefono"
        );
        return;
      } else {
        $("#telUpd").removeClass("is-invalid");
        $("#valTelUpd").hide();
        var formUpd = new FormData($("#formUpd")[0]);
        var idUser = $("#hidUPd").val();
        formUpd.append("idUsr", idUser);
        $.ajax({
          method: "POST",
          url: "../../Ajax/usuariosAjax.php?op=update",
          data: formUpd,
          contentType: false,
          processData: false,
        })
          .done(function (data) {
            //console.log(data);
            var datos = JSON.parse(data);
            if (datos.status == true) {
              $("#formUpd")[0].reset();
              classUpdUsr();
              $("#mdlUpdUsr").modal("hide");
              tableUsuarios.api().ajax.reload();
              msjAlert("success", datos.msg, "Éxito");
            } else {
              msjAlert("error", datos.msg, "Error");
            }
          })
          .fail(function () {
            msjAlert("error", "Error con el Servidor", "Error");
          });
      }
    }
  });
}

function validarFormUpdClass() {
  if ($("#usrUpd").val() == "") {
    $("#usrUpd").addClass("is-invalid");
    $("#valUsrUpd").show();
  } else {
    $("#usrUpd").removeClass("is-invalid");
    $("#valUsrUpd").hide();
  }

  if ($("#nomUpd").val() == "") {
    $("#nomUpd").addClass("is-invalid");
    $("#valNomUpd").show();
  } else {
    $("#nomUpd").removeClass("is-invalid");
    $("#valNomUpd").hide();
  }

  if ($("#passUpd").val() == "") {
    $("#passUpd").addClass("is-invalid");
    $("#valPassUpd").show();
  } else {
    $("#passUpd").removeClass("is-invalid");
    $("#valPassUpd").hide();
  }

  if ($("#telUpd").val() == "") {
    $("#telUpd").addClass("is-invalid");
    $("#valTelUpd").show();
  } else {
    $("#telUpd").removeClass("is-invalid");
    $("#valTelUpd").hide();
  }
}

function validarFormUpd() {
  var ban = false;

  if ($("#usrUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#nomUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#passUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#telUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  return ban;
}

function classUpdUsr() {
  $("#usrUpd").removeClass("is-invalid");
  $("#nomUpd").removeClass("is-invalid");
  $("#passUpd").removeClass("is-invalid");
  $("#telUpd").removeClass("is-invalid");

  $("#valUsrUpd").hide();
  $("#valNomUpd").hide();
  $("#valPassUpd").hide();
  $("#valTelUpd").hide();
}

function closeUpdUsr() {
  $("#btnCloUpd").on("click", function () {
    $("#formUpd")[0].reset();
    classUpdUsr();
    $("#mdlUpdUsr").modal("hide");
  });
}
