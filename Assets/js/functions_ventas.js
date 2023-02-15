var tableVenCaj;
var tableSerVender;
let totalVenta = 0;
let infoVenta = [];
let contVenta = [];
$(document).ready(function () {
  listarServiciosVender();

  $("#btnCobVen").click(cobrarVenta);
  $("#btnCanVen").click(cancelarVenta);
});

var logo = new Image(); //Se crear el logo del ticket
logo.src = "../../Assets/img/logo.jpg"; //ruta del logo de la imagen

function listarServiciosVender() {
  tableSerVender = $("#tableSerVender").dataTable({
    aProcessing: true,
    aServerSide: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
    ajax: {
      url: "../../Ajax/serviciosAjax.php?op=getSell",
      dataSrc: "",
    },
    columns: [
      { data: "idServicio" },
      { data: "nombre" },
      { data: "descripcion" },
      { data: "precio" },
      { data: "acciones" },
    ],
    bDestroy: true,
    iDisplayLength: 10,
    order: [[0, "asc"]],
  });
}

//sin usar
function iniciarCarrito() {
  tableVenCaj = $("#tableVenCaj").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    },
  });
}

function totalCarrito(precioServicio, operacion) {
  precioServicio = parseFloat(precioServicio);
  totalVenta = parseFloat(totalVenta);
  switch (operacion) {
    case "+":
      totalVenta += precioServicio;
      $("#totalVenta").text("TOTAL: $" + totalVenta);
      break;
    case "-":
      totalVenta -= precioServicio;
      $("#totalVenta").text("TOTAL: $" + totalVenta);
      break;
  }
  //console.log("Total Venta: " + totalVenta);
}

function agregarCarrito(idServicio) {
  $.ajax({
    method: "POST",
    url: "../../Ajax/serviciosAjax.php?op=show",
    data:{idServicio:idServicio}
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      msjAlert("success", "", "Agredado: " + datos.nombre);
      var bnt =
        '<button class="btn btn-danger btn-sm" onClick="quitarCarrito(' +
        datos.idServicio +
        ')" title="Eliminar Servicio"><i class="fa fa-cart-arrow-down"></i></button>';
      validarServicio(datos, bnt);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function validarServicio(datos, bnt) {
  var ban = false;
  $("#tableVenCaj tbody tr").each(function () {
    if (datos.idServicio == $(this).find("td").eq(0).text()) {
      ban = true;
      var cantidad = $(this).find("td").eq(2).text();
      var precio = $(this).find("td").eq(3).text();
      precio = parseFloat(precio);
      var pu = precio / cantidad;
      totalCarrito(pu, "+");
      precio += pu;
      cantidad++;
      $(this).find("td").eq(2).text(cantidad);
      $(this).find("td").eq(3).text(precio);
    }
  });

  if (!ban) {
    totalCarrito(datos.precio, "+");
    var tr = "<tr id=fila" + datos.idServicio + ">";
    tr += "<td>" + datos.idServicio + "</td>";
    tr += "<td>" + datos.nombre + "</td>";
    tr += "<td>" + 1 + "</td>";
    tr += "<td>" + datos.precio + "</td>";
    tr += "<td>" + bnt + "</td>";
    tr += "</tr>";
    $("#tableVenCaj").append(tr);
  }
}

function quitarCarrito(idServicio) {
  if (
    $("#fila" + idServicio)
      .find("td")
      .eq(2)
      .text() == 1
  ) {
    var precio = $("#fila" + idServicio)
      .find("td")
      .eq(3)
      .text();
    totalCarrito(precio, "-");
    $("#fila" + idServicio).remove();
  } else {
    var auxPre = 0;
    var cantidad = $("#fila" + idServicio)
      .find("td")
      .eq(2)
      .text();
    var precio = $("#fila" + idServicio)
      .find("td")
      .eq(3)
      .text();
    auxPre = precio;
    precio /= cantidad;
    totalCarrito(precio, "-");
    cantidad--;
    auxPre -= precio;
    $("#fila" + idServicio)
      .find("td")
      .eq(2)
      .text(cantidad);
    $("#fila" + idServicio)
      .find("td")
      .eq(3)
      .text(auxPre);
  }
}

function cancelarVenta() {
  Swal.fire({
    title: "¿ESTÁS SEGURO?",
    text: "¿DESEA CANCELAR LA VENTA ACTUAL?",
    type: "warning",
    allowOutsideClick: false, //para que no se cierra al dar clic afuera
    //allowEnterKey:true, //cuando pulse la letra enter podra quitar el mensaje
    showCancelButton: true,
    confirmButtonText: "Sí, cancelar",
    cancelButtonText: "No, seguir vendiendo",
  }).then((resultado) => {
    if (resultado.value) {
      if (!validarVenta()) {
        msjAlert("warning", "", "VENTA VACIA");
      } else {
        $("#tableVenCaj tbody").empty();
        totalVenta = 0;
        $("#totalVenta").text("TOTAL: $0");
        msjAlert("success", "VENTA CANCELADA", "OPERACION EXITOSA");
        console.log("Total Venta: " + totalVenta);
      }
    }
  });
}

function cobrarVenta() {
  if (!validarVenta()) {
    msjAlert("warning", "", "VENTA VACIA");
  } else {
    validarPagoVenta();
  }
}

function validarVenta() {
  var contador = 0;
  var bandera = false;
  $("#tableVenCaj tbody tr").each(function () {
    //primero cuenta la cantidad de elementos que tiene la venta
    contador++;
  });

  var bandera = contador != 0 ? true : false;
  return bandera;
}

async function validarPagoVenta() {
  const { value: pago } = await Swal.fire({
    title: "TOTAL: $" + totalVenta,
    html: '<label>PAGO CON:</label><input id="swal-input1" type="number" class="swal2-input">',
    allowOutsideClick: false,
    focusConfirm: false,
    preConfirm: () => {
      return document.getElementById("swal-input1").value;
    },
  });

  if (pago < totalVenta) {
    //si el dinero ingresado es menor a la cantidad a pagar
    Swal.fire("Dinero insuficiente, total a pagar: $" + totalVenta);
  } else {
    //si el dinero es suficiente para pagar
    Swal.fire({
      title: "SU CAMBIO :$" + (pago - totalVenta),
      allowOutsideClick: false, //para que no se cierra al dar clic afuera
    }).then(function () {
      obtenerDatosVenta(pago);
    });
  }
}

function obtenerDatosVenta(pago) {
  var hoy = new Date();
  var fecha =
    hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  var fechaHora = fecha + " " + hora;
  var datos = Array();
  datos.push({
    totalVenta: totalVenta,
    efectivo: pago,
    fechaVenta: fechaHora,
    atendio: $("#hddIdLog").val(),
  });

  infoVenta = datos;

  $.ajax({
    method: "POST",
    url: "../../Ajax/ventasAjax.php?op=nueva",
    data: { datosVenta: datos },
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      if (datos.status == true) {
        //pasamos el id de la venta
        obtenerDatosCarrito(datos.msg, pago);
      } else {
        msjAlert("error", datos.msg, "Error");
      }
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function obtenerDatosCarrito(idVenta, pago) {
  var datos = Array();
  $("#tableVenCaj tbody tr").each(function () {
    datos.push({
      idServicio: $(this).find("td").eq(0).text(),
      nombre: $(this).find("td").eq(1).text(),
      cantidad: $(this).find("td").eq(2).text(),
      totalServicio: $(this).find("td").eq(3).text(),
      idVenta: idVenta,
    });
  });

  contVenta = datos;

  $.ajax({
    method: "POST",
    url: "../../Ajax/ventasAjax.php?op=insertarServicios",
    data: { serviciosVenta: datos },
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      if (datos.status == true) {
        totalVenta = 0;
        $("#tableVenCaj tbody").empty();
        $("#totalVenta").text("TOTAL: $0");
        console.log("Total Venta: " + totalVenta);
        imprimirTicket(idVenta, pago);
      } else {
        msjAlert("error", datos.msg, "Error");
      }
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function imprimirTicket(idVenta, efectivo) {
  Swal.fire({
    title: "ID Venta: " + idVenta,
    text: "¿Desea imprimir el ticket?",
    type: "success",
    allowOutsideClick: false, //para que no se cierra al dar clic afuera
    //allowEnterKey:true, //cuando pulse la letra enter podra quitar el mensaje
    showCancelButton: true,
    confirmButtonText: "Sí, imprimir",
    cancelButtonText: "Cancelar",
  }).then((resultado) => {
    if (resultado.value) {
      // Hicieron click en "Sí", se imprime el ticket
      Ticket(idVenta, efectivo);
    } else {
      msjAlert("success", "VENTA REALIZADA", "OPERACION EXITOSA");
    }
  });
}

function largoTicket() {
  var largo = 65;
  for (let i = 0; i < contVenta.length; i++) {
    largo += 25;
  }
  largo += 50;
  return largo;
}

function Ticket(idVenta, efectivo) {
  var opciones = {
    orientation: "p",
    unit: "mm",
    format: [58, largoTicket()], //son 58 mm del ancho del papel
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
  pdf.text(2, 50, "FECHA/HORA: " + infoVenta[0].fechaVenta);
  pdf.text(2, 55, "LE ATENDIO: " + $("#hddNomLog").val()); //se obtiene el nombre del vendedor logueado
  pdf.text(2, 60, "NO. TICKET: " + idVenta);

  //contenido de los servicios vendidos del ticket
  for (let i = 0; i < contVenta.length; i++) {
    pdf.text(0, y, "___________________________________________________");
    y += 5;
    pdf.text(2, y, "ID:" + contVenta[i].idServicio);
    y += 5;
    pdf.text(2, y, "DESCRIPCIÓN DEL PRODUCTO: ");
    y += 5;
    pdf.text(2, y, contVenta[i].nombre);
    y += 5;
    pdf.text(
      2,
      y,
      "CANT: $" +
        contVenta[i].cantidad +
        "  P.UNIT: $" +
        contVenta[i].totalServicio / contVenta[i].cantidad
    );
    y += 5;
    pdf.text(2, y, "TOTAL: $" + contVenta[i].totalServicio);
    pdf.text(0, y, "___________________________________________________");
  }

  //footer del ticket
  y += 7;
  pdf.text(2, y, "TOTAL: $" + infoVenta[0].totalVenta);
  y += 5;
  pdf.text(2, y, "EFECTIVO: $" + efectivo);
  y += 5;
  pdf.text(2, y, "CAMBIO: $" + (efectivo - infoVenta[0].totalVenta));
  y += 10;
  pdf.text(7, y, "QUEJAS, SUGERENCIAS O ACLARACIONES");
  y += 5;
  pdf.text(18, y, "AL TEL: 7354160194");
  y += 7;
  pdf.text(5, y, "DIRECCION: AV.Reforma# 134 C.P:62744");
  y += 5;
  pdf.text(15, y, "Municipio de Cuautla");

  infoVenta = [];
  contVenta = [];

  pdf.save(idVenta + ".pdf");
}
