var tableServicios;
$(document).ready(function () {
  listarServicios();

  nuevoServicio();
  classNewSer();
  closeNewSer();

  updateSer();
  closeUpd();
  classUpdSer();
});

function listarServicios() {
  tableServicios = $("#tableServicios").dataTable({
    aProcessing: true,
    aServerSide: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    ajax: {
      url: "../../Ajax/serviciosAjax.php?op=getAll",
      dataSrc: "",
    },
    columns: [
      { data: "idServicio" },
      { data: "nombre" },
      { data: "precio" },
      { data: "status" },
      { data: "acciones" },
    ],
    resonsieve: "true",
    bDestroy: true,
    iDisplayLength: 10,
    order: [[0, "asc"]],
  });
}

function status(idServicio) {
  var opc = 0;

  $("#chck" + idServicio).prop("checked") ? (opc = 1) : (opc = 0);

  $.ajax({
    method: "POST",
    url: "../../Ajax/serviciosAjax.php?op=actDes",
    data: { opcion: opc, idServicio: idServicio },
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      if (datos.status == true) {
        tableServicios.api().ajax.reload();
        msjAlert("success", datos.msg, "Éxito");
      } else {
        msjAlert("error", datos.msg, "Error");
      }
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function nuevoServicio() {
  $("#formNew").submit(function (event) {
    event.preventDefault();
    validarFormNewClass();
    if (validarFormNew()) {
      var formNew = new FormData($("#formNew")[0]);
      $.ajax({
        method: "POST",
        url: "../../Ajax/serviciosAjax.php?op=new",
        data: formNew,
        contentType: false,
        processData: false,
      })
        .done(function (data) {
          //console.log(data);
          var datos = JSON.parse(data);
          if (datos.status == true) {
            $("#formNew")[0].reset();
            //clean();
            $("#mdlNewSer").modal("hide");
            tableServicios.api().ajax.reload();
            msjAlert("success", datos.msg, "Éxito");
          } else {
            msjAlert("error", datos.msg, "Error");
          }
        })
        .fail(function () {
          msjAlert("error", "Error con el Servidor", "Error");
        });
    }
  });
}

function validarFormNewClass() {
  if ($("#nombre").val() == "") {
    $("#nombre").addClass("is-invalid");
    $("#valNom").show();
  } else {
    $("#nombre").removeClass("is-invalid");
    $("#valNom").hide();
  }

  if ($("#descripcion").val() == "") {
    $("#descripcion").addClass("is-invalid");
    $("#valDes").show();
  } else {
    $("#descripcion").removeClass("is-invalid");
    $("#valDes").hide();
  }

  if ($("#precio").val() == "") {
    $("#precio").addClass("is-invalid");
    $("#valPre").show();
  } else {
    $("#precio").removeClass("is-invalid");
    $("#valPre").hide();
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

function classNewSer() {
  $("#nombre").removeClass("is-invalid");
  $("#descripcion").removeClass("is-invalid");
  $("#precio").removeClass("is-invalid");

  $("#valNom").hide();
  $("#valDes").hide();
  $("#valPre").hide();
}

function closeNewSer() {
  $("#btnCloNew").on("click", function () {
    $("#formNew")[0].reset();
    classNewSer();
    $("#mdlNewSer").modal("hide");
  });
}

function viewSer(idServicio) {
  $.ajax({
    method: "POST",
    url: "../../Ajax/serviciosAjax.php?op=show",
    data:{idServicio:idServicio}
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#staView").removeClass("badge-success");
      $("#staView").removeClass("badge-danger");
      $("#mdlViewSer").modal("show");
      $("#usrView").text(datos.idServicio);
      $("#nomView").text(datos.nombre);
      $("#desView").text(datos.descripcion);
      $("#precioView").text("$" + datos.precio);

      var tipo = datos.status == 1 ? "ACTIVO" : "INACTIVO";
      var color = datos.status == 1 ? "badge-success" : "badge-danger";
      $("#staView").text(tipo);
      $("#staView").addClass(color);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function viewFormUpd(idServicio) {
  $.ajax({
    method: "POST",
    url: "../../Ajax/serviciosAjax.php?op=show",
    data:{idServicio:idServicio}
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#mdlUpdSer").modal("show");
      $("#hddUp").val(datos.idServicio);
      $("#nomUpd").val(datos.nombre);
      $("#desUpd").val(datos.descripcion);
      $("#precioUpd").val(datos.precio);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function updateSer() {
  $("#formUpd").submit(function (event) {
    event.preventDefault();
    validarFormUpdClass();
    if (validarFormUpd()) {
      var formUpd = new FormData($("#formUpd")[0]);
      var idServicio = $("#hddUp").val();
      formUpd.append("idServicio", idServicio);
      $.ajax({
        method: "POST",
        url: "../../Ajax/serviciosAjax.php?op=update",
        data: formUpd,
        contentType: false,
        processData: false,
      })
        .done(function (data) {
          //console.log(data);
          var datos = JSON.parse(data);
          if (datos.status == true) {
            $("#formUpd")[0].reset();
            classUpdSer();
            $("#mdlUpdSer").modal("hide");
            tableServicios.api().ajax.reload();
            msjAlert("success", datos.msg, "Éxito");
          } else {
            msjAlert("error", datos.msg, "Error");
          }
        })
        .fail(function () {
          msjAlert("error", "Error con el Servidor", "Error");
        });
    }
  });
}

function closeUpd() {
  $("#btnCloUpd").on("click", function () {
    $("#formUpd")[0].reset();
    classUpdSer();
    $("#mdlUpdSer").modal("hide");
  });
}

function validarFormUpdClass() {
  if ($("#nomUpd").val() == "") {
    $("#nomUpd").addClass("is-invalid");
    $("#valNomUpd").show();
  } else {
    $("#nomUpd").removeClass("is-invalid");
    $("#valNomUpd").hide();
  }

  if ($("#desUpd").val() == "") {
    $("#desUpd").addClass("is-invalid");
    $("#valDesUpd").show();
  } else {
    $("#desUpd").removeClass("is-invalid");
    $("#valDesUpd").hide();
  }

  if ($("#precioUpd").val() == "") {
    $("#precioUpd").addClass("is-invalid");
    $("#valPreUpd").show();
  } else {
    $("#precioUpd").removeClass("is-invalid");
    $("#valPreUpd").hide();
  }
}

function validarFormUpd() {
  var ban = false;

  if ($("#nomUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#desUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#precioUpd").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  return ban;
}

function classUpdSer() {
  $("#nomUpd").removeClass("is-invalid");
  $("#desUpd").removeClass("is-invalid");
  $("#precioUpd").removeClass("is-invalid");

  $("#valNomUpd").hide();
  $("#valDesUpd").hide();
  $("#valPreUpd").hide();
}
