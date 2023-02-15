var logo = new Image(); //Se crear el logo del ticket
logo.src = "../../Assets/img/logo.jpg"; //ruta del logo de la imagen
let banCorte = false;
let banReporte = false;

$(document).ready(function () {
  buscarTicket();
  classTicket();

  validarFechaCorte();
  classCorteCaja();
  limpiarCorte()
  $("#btnLimCorte").click(limpiarCorte);
  $("#btnImpCorte").click(validarPdfCorte);

  validarFechaReporte();
  classReporte();
  limpiarReporte();
  $("#btnLimRep").click(limpiarReporte);
  $("#btnImpRep").click(validarPdfReporte);
});

/**************************** METODOS TICKET ****************************/
function validarCamposTicket() {
  var ban = false;
  if ($("#ticket").val() == "") {
    $("#ticket").addClass("is-invalid");
    $("#valTicket").show();
  } else {
    $("#ticket").removeClass("is-invalid");
    $("#valTicket").hide();
  }

  if ($("#ticket").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }
  return ban;
}

function classTicket() {
  $("#ticket").removeClass("is-invalid");
  $("#valTicket").hide();
}

function buscarTicket() {
  $("#btnBusTick").on("click", function () {
    if (validarCamposTicket()) {
      var ticket = $("#ticket").val();
      $.ajax({
        method: "POST",
        url: "../../Ajax/reportesAjax.php?op=buscarTicket",
        data: { ticket: ticket },
      })
        .done(function (data) {
          //console.log(data);
          var datos = JSON.parse(data);
          if (!datos.length) {
            msjAlert("error", "FOLIO: " + ticket, " NO REGISTRADO");
            $("#ticket").val("");
          } else {
            $("#ticket").val("");
            msjAlert("success", "FOLIO: " + ticket, "IMPRIMIENDO TICKET");
            Ticket(datos);
          }
        })
        .fail(function () {
          msjAlert("error", "Error con el Servidor", "Error");
        });
    }
  });
}

function largoTicket(datos) {
  var largo = 65;
  for (let i = 0; i < datos.length; i++) {
    largo += 25;
  }
  largo += 50;
  return largo;
}

function Ticket(datos) {
  var opciones = {
    orientation: "p",
    unit: "mm",
    format: [58, largoTicket(datos)], //son 58 mm del ancho del papel
  };

  let y = 65; //para acomodar lo elementos del ticket

  let pdf = new jsPDF(opciones); //Se crea un objeto de tipo PDF
  pdf.addImage(logo, "JPEG", 15, 5, 25, 25); //se agregra el logo a la cabecera del pdf

  //tipografia del ticket
  pdf.setFontSize(8);
  pdf.setFont("courier");
  pdf.setFontType("normal");

  //cabecera del ticket
  pdf.text(3, 35, "AUTOLAVADO REFORMA LE AGREDECE");
  pdf.text(18, 40, "SU PREFERENCIA");

  //tamaño del contenido
  pdf.setFontSize(6);

  //datos generales del ticket
  pdf.text(2, 50, "FECHA/HORA: " + datos[0].fechaVenta);
  pdf.text(2, 55, "LE ATENDIO: " + datos[0].atendio);
  pdf.text(2, 60, "NO. TICKET: " + datos[0].idVenta);

  //contenido de los servicios vendidos del ticket
  for (let i = 0; i < datos.length; i++) {
    pdf.text(0, y, "___________________________________________________");
    y += 5;
    pdf.text(2, y, "ID:" + datos[i].idServicio);
    y += 5;
    pdf.text(2, y, "DESCRIPCIÓN DEL PRODUCTO: ");
    y += 5;
    pdf.text(2, y, datos[i].nombre);
    y += 5;
    pdf.text(
      2,
      y,
      "CANT: $" +
        datos[i].cantidad +
        "  P.UNIT: $" +
        datos[i].totalServicio / datos[i].cantidad
    );
    y += 5;
    pdf.text(2, y, "TOTAL: $" + datos[i].totalServicio);
    pdf.text(0, y, "___________________________________________________");
  }

  //footer del ticket
  y += 7;
  pdf.text(2, y, "TOTAL: $" + datos[0].totalVenta);
  y += 5;
  pdf.text(2, y, "EFECTIVO: $" + datos[0].efectivo);
  y += 5;
  pdf.text(2, y, "CAMBIO: $" + (datos[0].efectivo - datos[0].totalVenta));
  y += 10;
  pdf.text(7, y, "QUEJAS, SUGERENCIAS O ACLARACIONES");
  y += 5;
  pdf.text(18, y, "AL TEL: 7354160194");
  y += 7;
  pdf.text(5, y, "DIRECCION: AV.Reforma# 134 C.P:62744");
  y += 5;
  pdf.text(15, y, "Municipio de Cuautla");

  pdf.save("No: " + datos[0].idVenta + ".pdf");
}

/**************************** METODOS CORTE CAJA ****************************/

function validarFechaCorte() {
  $("#btnReaCorte").on("click", function () {
    if (!validarCampoCorte()) {
      msjAlert("warning", "", "FECHA REQUERIDA");
      banCorte = false;
    } else {
      banCorte = true;
      var fecha = $("#dateCorte").val();
      $.ajax({
        method: "POST",
        url: "../../Ajax/reportesAjax.php?op=buscarCorte",
        data: { fecha: fecha },
      })
        .done(function (data) {
          //console.log(data);
          var datos = JSON.parse(data);
          if (datos.ventas == 0) {
            banCorte = false;
            limpiarCorte();
            msjAlert("warning", "", "NO HAY VENTAS EN LA FECHA: " + fecha);
          } else {
            var hoy = new Date();
            var fechaHora =
              hoy.getFullYear() +
              "-" +
              (hoy.getMonth() + 1) +
              "-" +
              hoy.getDate() +
              " " +
              hoy.getHours() +
              ":" +
              hoy.getMinutes() +
              ":" +
              hoy.getSeconds();

            $("#viewFechaHora").text(fechaHora);
            $("#viewCajero").text($("#hddNomLog").val());
            $("#viewFechaCorte").text(fecha);
            $("#viewCantidad").text(datos.ventas);
            $("#viewTotal").text(datos.total);

            msjAlert("success", "", "MOSTRANDO DATOS");
          }
        })
        .fail(function () {
          msjAlert("error", "Error con el Servidor", "Error");
        });
    }
  });
}

function validarPdfCorte() {
  if (banCorte) {
    imprimirCorte();
    limpiarCorte();
  } else {
    msjAlert("warning", "SELECCIONA UNA FECHA PARA HACER EL CORTE", "");
  }
}

function imprimirCorte() {
  var opciones = {
    orientation: "p",
    unit: "mm",
    format: [58, 140], //son 58 mm del ancho del papel
  };

  let pdf = new jsPDF(opciones); //Se crea un objeto de tipo PDF
  pdf.addImage(logo, "JPEG", 15, 5, 25, 25); //se agregra el logo a la cabecera del pdf

  //tipografia del ticket
  pdf.setFontSize(8);
  pdf.setFont("courier");
  pdf.setFontType("normal");

  //cabecera del ticket
  pdf.text(3, 35, "AUTOLAVADO REFORMA LE AGREDECE");
  pdf.text(18, 40, "SU PREFERENCIA");

  //tamaño del contenido
  pdf.setFontSize(10);

  //datos generales del ticket
  pdf.setFontType("bold");
  pdf.text(7, 48, "*** CORTE DE CAJA *** ");
  pdf.setFontSize(7);
  pdf.setFontType("normal");
  pdf.text(1, 55, "FECHA/HORA: " + $("#viewFechaHora").text());
  pdf.text(1, 60, "CAJERO: " + $("#viewCajero").text());

  pdf.setFontSize(8);
  pdf.text(0, 70, "------------------------------------");
  pdf.setFontSize(7);
  pdf.text(2, 75, "FECHA: " + $("#viewFechaCorte").text());
  pdf.text(2, 80, "No. VENTAS: " + $("#viewCantidad").text());
  pdf.text(2, 85, "TOTAL VENTAS: $" + $("#viewTotal").text());
  pdf.setFontSize(8);
  pdf.text(0, 90, "------------------------------------");

  pdf.setFontSize(7);
  pdf.text(3, 100, "QUEJAS, SUGERENCIAS O ACLARACIONES");
  pdf.text(16, 105, "AL TEL: 7354160194");
  pdf.text(2, 110, "DIRECCION: AV.Reforma# 134 C.P:62744");
  pdf.text(13, 115, "Municipio de Cuautla");

  pdf.save("CORTE: " + $("#viewFechaCorte").text() + ".pdf");
}

function validarCampoCorte() {
  var ban = false;
  if ($("#dateCorte").val() == "") {
    $("#dateCorte").addClass("is-invalid");
  } else {
    $("#dateCorte").removeClass("is-invalid");
  }

  if ($("#dateCorte").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }
  return ban;
}

function classCorteCaja() {
  $("#dateCorte").removeClass("is-invalid");
}

function limpiarCorte() {
  $("#viewFechaHora").text("");
  $("#viewCajero").text("");
  $("#viewFechaCorte").text("");
  $("#viewCantidad").text("");
  $("#viewTotal").text("");

  $("#dateCorte").val("");
  banCorte = false;
}

/**************************** METODOS REPORTE MENSUAL ****************************/
function validarFechaReporte() {
  $("#btnReaRep").on("click", function () {
    if (!validarCamposReporte()) {
      msjAlert("warning", "", "AMBAS FECHAS SON REQUERIDAS");
      banReporte = false;
    } else {
      banReporte = true;
      var fechaDe = $("#dateFrom").val();
      var fechaHasta = $("#dateTo").val();
      $.ajax({
        method: "POST",
        url: "../../Ajax/reportesAjax.php?op=reporteMensual",
        data: { fechaDe: fechaDe, fechaHasta: fechaHasta },
      })
        .done(function (data) {
          //console.log(data);
          var datos = JSON.parse(data);
          if (datos.ventas == 0) {
            banReporte = false;
            limpiarReporte();
            msjAlert(
              "warning",
              "DEL: " + fechaDe + " HASTA: " + fechaHasta,
              "SIN VENTAS"
            );
          } else {
            var hoy = new Date();
            var fechaHora =
              hoy.getFullYear() +
              "-" +
              (hoy.getMonth() + 1) +
              "-" +
              hoy.getDate() +
              " " +
              hoy.getHours() +
              ":" +
              hoy.getMinutes() +
              ":" +
              hoy.getSeconds();

            $("#viewFechaHoraRep").text(fechaHora);
            $("#viewCajeroRep").text($("#hddNomLog").val());
            $("#viewFechaDe").text(fechaDe);
            $("#viewFechaHasta").text(fechaHasta);
            $("#viewCantidadRep").text(datos.ventas);
            $("#viewTotalRep").text(datos.total);

            msjAlert("success", "", "MOSTRANDO DATOS");
          }
        })
        .fail(function () {
          msjAlert("error", "Error con el Servidor", "Error");
        });
    }
  });
}

function validarPdfReporte() {
  if (banReporte) {
    imprimirReporte();
    limpiarReporte();
  } else {
    msjAlert(
      "warning",
      "SELECCIONA EL RANGO DE FECHAS PARA HACER EL REPORTE",
      ""
    );
  }
}

function imprimirReporte() {
  var opciones = {
    orientation: "p",
    unit: "mm",
    format: [58, 140], //son 58 mm del ancho del papel
  };

  let pdf = new jsPDF(opciones); //Se crea un objeto de tipo PDF
  pdf.addImage(logo, "JPEG", 15, 5, 25, 25); //se agregra el logo a la cabecera del pdf

  //tipografia del ticket
  pdf.setFontSize(8);
  pdf.setFont("courier");
  pdf.setFontType("normal");

  //cabecera del ticket
  pdf.text(3, 35, "AUTOLAVADO REFORMA LE AGREDECE");
  pdf.text(18, 40, "SU PREFERENCIA");

  //tamaño del contenido
  pdf.setFontSize(10);

  //datos generales del ticket
  pdf.setFontType("bold");
  pdf.text(4, 48, "*** REPORTE MENSUAL *** ");
  pdf.setFontSize(7);
  pdf.setFontType("normal");
  pdf.text(1, 55, "FECHA/HORA: " + $("#viewFechaHoraRep").text());
  pdf.text(1, 60, "CAJERO: " + $("#viewCajeroRep").text());

  pdf.setFontSize(8);
  pdf.text(0, 70, "------------------------------------");
  pdf.setFontSize(7);
  pdf.text(2, 75, "DE: " + $("#viewFechaDe").text());
  pdf.text(2, 80, "HASTA: " + $("#viewFechaHasta").text());
  pdf.text(2, 85, "No. VENTAS: " + $("#viewCantidadRep").text());
  pdf.text(2, 90, "TOTAL VENTAS: $" + $("#viewTotalRep").text());
  pdf.setFontSize(8);
  pdf.text(0, 95, "------------------------------------");

  pdf.setFontSize(7);
  pdf.text(3, 105, "QUEJAS, SUGERENCIAS O ACLARACIONES");
  pdf.text(16, 110, "AL TEL: 7354160194");
  pdf.text(2, 115, "DIRECCION: AV.Reforma# 134 C.P:62744");
  pdf.text(13, 120, "Municipio de Cuautla");

  pdf.save(
    "REPORTE: " +
      $("#viewFechaDe").text() +
      " / " +
      $("#viewFechaHasta").text() +
      ".pdf"
  );
}

function validarCamposReporte() {
  var ban = false;
  if ($("#dateFrom").val() == "") {
    $("#dateFrom").addClass("is-invalid");
  } else {
    $("#dateFrom").removeClass("is-invalid");
  }

  if ($("#dateTo").val() == "") {
    $("#dateTo").addClass("is-invalid");
  } else {
    $("#dateTo").removeClass("is-invalid");
  }

  if ($("#dateFrom").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }

  if ($("#dateTo").val() == "") {
    ban = false;
    return;
  } else {
    ban = true;
  }
  return ban;
}

function classReporte() {
  $("#dateFrom").removeClass("is-invalid");
  $("#dateTo").removeClass("is-invalid");
}

function limpiarReporte() {
  $("#viewFechaHoraRep").text("");
  $("#viewCajeroRep").text("");
  $("#viewFechaDe").text("");
  $("#viewFechaHasta").text("");
  $("#viewCantidadRep").text("");
  $("#viewTotalRep").text("");

  $("#dateFrom").val("");
  $("#dateTo").val("");

  banReporte = false;
}
