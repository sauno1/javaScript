const Auto = (modelo, color, precio, imagen) => ({
  modelo,
  color,
  precio,
  imagen
});

let autos = [
  Auto("208 Active", "blanco", 10000, "./img/208 blanco.jpg"),
  Auto("208 Active", "gris", 11000, "./img/208 gris.jpg"),
  Auto("2008 Allure", "blanco", 12500, "./img/2008 blanca.jpg"),
  Auto("2008 Allure", "negro", 13500, "./img/2008 negra.jpg"),
  Auto("Partner Confort", "blanco", 14000, "./img/partner blanca.jpg"),
  Auto("Partner Confort", "negra", 14500, "./img/partner negra.jpg"),
];

let carrito = [];

function mostrarMenu() {
  let menu = "<h2>Seleccione un auto:</h2>";

  for (let i = 0; i < autos.length; i++) {
    menu += `
      <div class="card">
        <img src="${autos[i].imagen}">
        <h3>${autos[i].modelo} $${autos[i].precio}</h3>
        <p>Color: ${autos[i].color}</p>
        <button class="agregarBtn" data-index="${i}">Agregar al carrito</button>
      </div>
    `;
  }

  menu += `
    <div class="card">
      <h3>Filtrar por precio máximo</h3>
      <input type="number" id="precioMaximoInput" step="0.01" min="0">
      <button id="filtrarBtn">Filtrar</button>
    </div>
    <div class="card">
      <h3>Pago</h3>
      <button id="contadoBtn">Contado</button>
      <button id="financiacionBtn">Financiación</button>
    </div>
    <div class="card">
      <h3>Vaciar carrito</h3>
      <button id="vaciarBtn">Vaciar carrito</button>
    </div>
  `;

  document.getElementById("menu").innerHTML = menu;

  const agregarButtons = document.querySelectorAll(".agregarBtn");
  agregarButtons.forEach((button) => {
    button.addEventListener("click", agregarAlCarrito);
  });

  const filtrarBtn = document.getElementById("filtrarBtn");
  filtrarBtn.addEventListener("click", filtrarPorPrecioMaximo);

  const contadoBtn = document.getElementById("contadoBtn");
  contadoBtn.addEventListener("click", pagarContado);

  const financiacionBtn = document.getElementById("financiacionBtn");
  financiacionBtn.addEventListener("click", pagarFinanciacion);

  const vaciarBtn = document.getElementById("vaciarBtn");
  vaciarBtn.addEventListener("click", vaciarCarrito);
}

function agregarAlCarrito(event) {
  const index = event.target.dataset.index;
  const auto = autos[index];
  carrito.push(auto);
  mostrarMensaje(`El auto "${auto.modelo}" ha sido agregado al carrito.`);
}

function pagarContado() {
  let total = 0;
  carrito.forEach((auto) => {
    total += auto.precio;
  });
  mostrarMensaje(`El precio total de los autos seleccionados es: $${total}`);
}

function pagarFinanciacion() {
  let total = 0;
  carrito.forEach((auto) => {
    total += auto.precio;
  });
  mostrarMensaje(`Total: $${total} Monto a financiar:`);

  const montoFinanciadoInput = `<p>Total: $${total}</p>
    <h3>Monto a financiar:</h3>
    <input type="number" id="montoFinanciadoInput" step="0.01" min="0">
    <h3>Cantidad de cuotas:</h3>
    <input type="number" id="cuotasInput" step="1" min="1">
    <button id="calcularCuotasBtn">Calcular Cuotas</button>
  `;

  mostrarMensaje(montoFinanciadoInput);

  const calcularCuotasBtn = document.getElementById("calcularCuotasBtn");
  calcularCuotasBtn.addEventListener("click", calcularCuotas);
}

function calcularCuotas() {
  const montoFinanciado = parseFloat(document.getElementById("montoFinanciadoInput").value);
  const cuotas = parseInt(document.getElementById("cuotasInput").value);
  const tasaInteresAnual = 0.3;
  const tasaInteresMensual = tasaInteresAnual / 12;
  const precioFinal = montoFinanciado * (1 + tasaInteresMensual * cuotas);
  const valorCuota = precioFinal / cuotas;

  const resultadoCuotas = `
    <h3>Detalles de la financiación:</h3>
    <p>Total: $${precioFinal.toFixed(2)}</p>
    <p>Monto a financiar: $${montoFinanciado.toFixed(2)}</p>
    <p>Valor de cada cuota: $${valorCuota.toFixed(2)}</p>
  `;

  mostrarMensaje(resultadoCuotas);
}

function filtrarPorPrecioMaximo() {
  const precioMaximo = parseFloat(document.getElementById("precioMaximoInput").value);

  if (!isNaN(precioMaximo) && precioMaximo > 0) {
    const autosFiltrados = autos.filter((auto) => auto.precio <= precioMaximo);

    if (autosFiltrados.length > 0) {
      let resultadoFiltrado = `Autos encontrados con precio máximo de $${precioMaximo}:`;

      autosFiltrados.forEach((auto) => {
        resultadoFiltrado += `
          <div class="card">
            <img src="${auto.imagen}" alt="${auto.modelo}">
            <h3>${auto.modelo}</h3>
            <p>Color: ${auto.color}</p>
            <p>Precio: $${auto.precio}</p>
          </div>
        `;
      });

      mostrarMensaje(resultadoFiltrado);
    } else {
      mostrarMensaje(`No se encontraron autos con precio máximo de $${precioMaximo}.`);
    }
  } else {
    mostrarMensaje("Precio máximo inválido.");
  }
}

function vaciarCarrito() {
  carrito = [];
  mostrarMensaje("El carrito ha sido vaciado.");
  
}

// Función para guardar el carrito en el localStorage
function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeStorage() {
  const carritoJSON = localStorage.getItem("carrito");
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
}

// Llamada a la función para cargar el carrito desde el localStorage
cargarCarritoDesdeStorage();

function mostrarMensaje(mensaje) {
  document.getElementById("output").innerHTML = mensaje;
}

mostrarMenu();





  