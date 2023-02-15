$(document).ready(function () {
  classLogin();
  validarUsr();
});

function validarUsr() {
  $("#formLogin").submit(function (event) {
    event.preventDefault();
    validarFormLoginClass();
    if (validarFormLogin()) {
      var formLogin = new FormData($("#formLogin")[0]);
      $.ajax({
        method: "POST",
        url: "Ajax/indexAjax.php?op=signin",
        data: formLogin,
        contentType: false,
        processData: false,
      })
        .done(function (data) {
          //console.log(data);
          var datos = JSON.parse(data);
          if (datos.status == true) {
            $("#hddIdLog").val(datos.msg);
            $("#divAlerta").hide();
            $(location).attr("href", "Views/ventas/ventas.php");
          } else {
            $("#formLogin")[0].reset();
            $("#divAlerta").show();
            $("#contAlert").text(datos.msg);
          }
        })
        .fail(function () {
          msjAlert("error", "Error con el Servidor", "Error");
        });
    }
  });
}

function validarFormLoginClass() {
  if ($("#usuario").val() == "") {
    $("#usuario").addClass("is-invalid");
    $("#valUsr").show();
  } else {
    $("#usuario").removeClass("is-invalid");
    $("#valUsr").hide();
  }

  if ($("#password").val() == "") {
    $("#password").addClass("is-invalid");
    $("#valPass").show();
  } else {
    $("#password").removeClass("is-invalid");
    $("#valPass").hide();
  }
}

function validarFormLogin() {
  var ban = false;

  if ($("#usuario").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#password").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  return ban;
}

function classLogin() {
  $("#usuario").removeClass("is-invalid");
  $("#password").removeClass("is-invalid");

  $("#valUsr").hide();
  $("#valPass").hide();

  $("#divAlerta").hide();
}
