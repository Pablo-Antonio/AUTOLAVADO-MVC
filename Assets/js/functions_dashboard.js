$(document).ready(function () {
  //cards();
  getUsuarios();
  getServicios();
  getVentas();
  getIngresos();

  //Graficos
  top10();
  ventasMes();
});

function getUsuarios() {
  $.ajax({
    method: "get",
    url: "../../Ajax/dashboardAjax.php?op=getUsers",
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#usrVig").text(datos.usuarios);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function getServicios() {
  $.ajax({
    method: "get",
    url: "../../Ajax/dashboardAjax.php?op=getServicios",
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#serVig").text(datos.servicios);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function getVentas() {
  $.ajax({
    method: "get",
    url: "../../Ajax/dashboardAjax.php?op=getVentas",
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $("#ventas").text(datos.ventas);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function getIngresos() {
  $.ajax({
    method: "get",
    url: "../../Ajax/dashboardAjax.php?op=getIngresos",
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      var ingresos = datos.ingresos == null ? 0 : datos.ingresos;
      $("#ingresos").text("$" + ingresos);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function top10() {
  $.ajax({
    method: "GET",
    url: "../../Ajax/dashboardAjax.php?op=getTop10",
  })
    .done(function (data) {
      //console.log(data);
      var datos = JSON.parse(data);
      top10Grafica(datos);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function top10Grafica(datos) {
  //console.log(datos);
  var pdata = [];
  var contador = 0;
  var colores = [
    "rgba(240,13,13,1)",
    "rgba(240,123,13,1)",
    "rgba(237,240,13,1)",
    "rgba(116,240,13,1)",
    "rgba(13,240,192,1)",
    "rgba(13,168,240,1)",
    "rgba(13,78,240,1)",
    "rgba(106,13,240,1)",
    "rgba(226,13,240,1)",
    "rgba(88,2,45,1)",
  ];

  var highlights = [
    "rgba(240,13,13,0.8)",
    "rgba(240,123,13,0.8)",
    "rgba(237,240,13,0.8)",
    "rgba(116,240,13,0.8)",
    "rgba(13,240,192,0.8)",
    "rgba(13,168,240,0.8)",
    "rgba(13,78,240,0.8)",
    "rgba(106,13,240,0.8)",
    "rgba(226,13,240,0.8)",
    "rgba(88,2,4,0.8)",
  ];

  $.each(datos, function (key, value) {
    pdata.push({
      value: value.cantidad,
      color: colores[contador],
      highlight: highlights[contador],
      label: value.nombre,
    });
    contador++;
  });

  var ctxp = $("#top10").get(0).getContext("2d");
  var pieChart = new Chart(ctxp).Pie(pdata);
}

function ventasMes() {
  var hoy = new Date();
  var year = hoy.getFullYear();
  $("#tittleVentasMes").text("Ventas Por Mes Año " + year);
  $.ajax({
    method: "POST",
    url: "../../Ajax/dashboardAjax.php?op=getVentasMes",
    data: { year: year },
  })
    .done(function (data) {
      console.log(data);
      var datos = JSON.parse(data);
      ventasMesGrafica(datos);
    })
    .fail(function () {
      msjAlert("error", "Error con el Servidor", "Error");
    });
}

function ventasMesGrafica(datos) {
  var totalVenta = Array(12);

  $.each(datos, function (key, value) {
    switch (value.Mes) {
      case "January":
        totalVenta[0] = value.Total;
        break;
      case "February":
        totalVenta[1] = value.Total;
        break;
      case "March":
        totalVenta[2] = value.Total;
        break;
      case "April":
        totalVenta[3] = value.Total;
        break;
      case "May":
        totalVenta[4] = value.Total;
        break;
      case "June":
        totalVenta[5] = value.Total;
        break;
      case "July":
        totalVenta[6] = value.Total;
        break;
      case "August":
        totalVenta[7] = value.Total;
        break;
      case "September":
        totalVenta[8] = value.Total;
        break;
      case "October":
        totalVenta[9] = value.Total;
        break;
      case "November":
        totalVenta[10] = value.Total;
        break;
      case "December":
        totalVenta[11] = value.Total;
        break;
    }
  });

  for (i = 0; i < totalVenta.length; i++) {
    if (totalVenta[i] == undefined) {
      totalVenta[i] = 0;
    }
  }

  var data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: totalVenta,
      },
    ],
  };
  var ctxl = $("#ventasMes").get(0).getContext("2d");
  var lineChart = new Chart(ctxl).Line(data);
}
