//variables
//botones
const ingresar = document.getElementById("ingresar");
const mostrarPlatos = document.getElementById("mostrar");
const ordenarPrecio = document.getElementById("ordenarPrecio");
const ordenarProducto = document.getElementById("ordenarProducto");
const filtrarPlato = document.getElementById("filtrarPlato");
const filtrarPais = document.getElementById("filtrarPais");
const resetear = document.querySelector("#resetear");
const elemento = document.querySelector("#tabla");
const listaPlatos = document.getElementById("tabla");
let nuevoPlato = [];

let platoJson = []; //variable donde guardo el objeto traido desde json
let tablaContent;
let tablaContentPrecio;
let tablaContentProducto;
let tablaContentFiltroPais;
let tablaContentFiltroPlato;
let ordenadosPrecio = [];
let ordenadosProducto = [];

class comidas {
  constructor(nombre, ingredientes, pais, precio) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.pais = pais;
    this.precio = precio;
  }
}

//funcionalidad de los botones
ingresar.onclick = function (e) {
  ingreso();
};
mostrarPlatos.onclick = function (e) {
  mostrarPlato();
};
ordenarPrecio.onclick = function (e) {
  ordenPrecio();
};
ordenarProducto.onclick = function (e) {
  ordenProducto();
};
filtrarPlato.onclick = function (e) {
  filtradoPlato();
};
filtrarPais.onclick = function (e) {
  filtradoPais();
};
resetear.addEventListener("click", () => {
  reset();
});

//funciones
function ver(mostrar) {
  let infoMostrar = "Mostrar los Platos guardados en el LocalStorage";
  let infoOrdenarPrecio = "Ordenar todos los platos por Precio";
  let infoOrdenarProducto = "Ordenar todos los platos por Producto";
  let infofiltrarPlato = "busqueda de platos por su nombre";
  let infofiltrarPais = "busqueda de platos por su pais de origen";
  let inforesetear = "Limpiar Tabla pero no borra los datos del local storage";

  //implementacion de Tostify para los Botones
  if (mostrar == "infoMostrar") {
    Toastify({
      text: infoMostrar,
      className: "info",
      stopOnFocus: true,
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infoOrdenarPrecio") {
    Toastify({
      text: infoOrdenarPrecio,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infoOrdenarProducto") {
    Toastify({
      text: infoOrdenarProducto,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infofiltrarPlato") {
    Toastify({
      text: infofiltrarPlato,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "infofiltrarPais") {
    Toastify({
      text: infofiltrarPais,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  } else if (mostrar == "inforesetear") {
    Toastify({
      text: inforesetear,
      className: "info",
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
  }
}

function ingreso() {
  let nombre = document.getElementById("formNombre").value;
  let ingredientes = document.getElementById("formIngredientes").value;
  let pais = document.getElementById("formPais").value;
  let precio = document.getElementById("formPrecio").value;

  nuevoPlato.push(new comidas(nombre, ingredientes, pais, precio));

  //guardado del plato en el localStorage.
  localStorage.setItem("plato", JSON.stringify(nuevoPlato));
  //en platoJson guardo el objeto del localstorage y luego la variable platoJson la utilizo para el resto de funciones.
  platoJson = JSON.parse(localStorage.getItem("plato"));

  document.getElementById("formNombre").value = "";
  document.getElementById("formIngredientes").value = "";
  document.getElementById("formPais").value = "";
  document.getElementById("formPrecio").value = "";

    //implementacion de Tostify para el ingreso de un plato
  Toastify({
    text: "Se guardo Correctamente",
    className: "info",
    stopOnFocus: true,
    gravity: "top",
    position: "center",
    style: { background: "green" },
  }).showToast();
}

function mostrarPlato() {
  reset();
  for (let item of platoJson) {
    tablaContent += `
    <tr>
      <td>${item.nombre}</td>
      <td>${item.ingredientes}</td>
      <td>${item.pais}</td>
      <td>${item.precio}</td>
  </td>`;
  }
  listaPlatos.innerHTML += tablaContent;
}

function ordenPrecio() {
  reset();

  ordenadosPrecio = platoJson.map((elemento) => elemento);
  ordenadosPrecio.sort(function (a, b) {
    return a.precio - b.precio;
  });

  for (let item1 of ordenadosPrecio) {
    tablaContentPrecio += `
      <tr>
        <td>${item1.nombre}</td>
        <td>${item1.ingredientes}</td>
        <td>${item1.pais}</td>
        <td>${item1.precio}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContentPrecio;
}

function ordenProducto() {
  reset();
  ordenadosProducto = platoJson.map((elemento) => elemento);
  ordenadosProducto.sort(function (a, b) {
    //funcion Optimizada
    a.nombre > b.nombre ? 1 : -1;
    return 0;
  });

  for (let item1 of ordenadosProducto) {
    tablaContentProducto += `
      <tr>
        <td>${item1.nombre}</td>
        <td>${item1.ingredientes}</td>
        <td>${item1.pais}</td>
        <td>${item1.precio}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContentProducto;
}

function filtradoPlato() {
  reset();
  let platoF = prompt("ingrese el nombre del plato que quiere buscar");
  let platoFiltrado = platoJson.filter((plato) => plato.nombre == platoF);

  for (let plato of platoFiltrado) {
    tablaContentFiltroPlato += `
    <tr>
      <td>${plato.nombre}</td>
      <td>${plato.ingredientes}</td>
      <td>${plato.pais}</td>
      <td>${plato.precio}</td>
    </td>
  `;
  }
  listaPlatos.innerHTML += tablaContentFiltroPlato;
}

function filtradoPais() {
  reset();
  let platoA = prompt("ingrese el pais de origen del plato que quiere buscar");
  let paisFiltrado = platoJson.filter((plato) => plato.pais == platoA);

  for (let plato of paisFiltrado) {
    tablaContentFiltroPais += `
    <tr>
       <td>${plato.nombre}</td>
       <td>${plato.ingredientes}</td>
       <td>${plato.pais}</td>
       <td>${plato.precio}</td>
    </tr>
   `;
  }
  listaPlatos.innerHTML += tablaContentFiltroPais;
}

function reset() {
  elemento.innerHTML = `
  <table id="tabla" class="w-75 m-5 table table-bordered table-striped table-dark">
  <tr>
      <th>Plato</th>
      <th>ingredientes</th>
      <th>pais de origen</th>
      <th>Precio</th>
  </tr>
  </table>`;

  tablaContent = ``;
  tablaContentPrecio = ``;
  tablaContentProducto = ``;
  tablaContentFiltroPais = ``;
  tablaContentFiltroPlato = ``;
}
