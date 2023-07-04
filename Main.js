// Arrow function como constructor de Autos
const Auto = (modelo, color, precio) => ({
    modelo,
    color,
    precio
  });
  
  // Array de autos
  let autos = [
    Auto("208 Active", "blanco", 10000),
    Auto("208 Active", "rojo", 11000),
    Auto("2008 Allure", "azul", 12500),
    Auto("2008 Allure", "negro", 13500),
    Auto("Partner Confort", "blanco", 14000),
    Auto("Partner Confort", "azul", 14500),
    Auto("408 Feline", "azul", 16500),
    Auto("408 Feline", "rojo", 17000),
  ];
  
  // Función para mostrar el menú y obtener la opción seleccionada
  function mostrarMenu() {
    let menu = "Seleccione una opción:\n 0.Salir\n";
  
    for (let i = 0; i < autos.length; i++) {
      menu = menu + `${i + 1}. ${autos[i].modelo} (${autos[i].color})\n`;
    }
  
    menu = menu + "9. Filtrar por precio máximo";
  
    const opcionSeleccionada = parseInt(prompt(menu));
    return opcionSeleccionada;
  }
  
  // Función para filtrar autos por precio máximo
  function filtrarPorPrecioMaximo(precioMaximo) {
    const autosFiltrados = autos.filter(auto => auto.precio <= precioMaximo);
  
    if (autosFiltrados.length > 0) {
      console.log(`Autos encontrados con precio máximo de $${precioMaximo}:`);
      autosFiltrados.forEach(auto => {
        console.log(`${auto.modelo} (${auto.color}) - Precio: $${auto.precio}`);
      });
    } else {
      console.log(`No se encontraron autos con precio máximo de $${precioMaximo}.`);
    }
  }
  
  let opcion = mostrarMenu();
  
  while (opcion !== 0) {
    switch (opcion) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        const indiceModelo = opcion - 1;
        const autoSeleccionado = autos[indiceModelo];
  
        const formaPago = prompt("Seleccione la forma de pago:\n1. Contado\n2. Financiación");
  
        if (formaPago === "1") {
          // Pago de contado
          alert(`El precio del auto seleccionado es: $${autoSeleccionado.precio}`);
        } else if (formaPago === "2") {
          // Financiación
          alert(`El precio del auto seleccionado es: $${autoSeleccionado.precio}`);
  
          let montoFinanciado = parseFloat(prompt("Ingrese el monto a financiar:"));
          let mesesFinanciacion = parseInt(prompt("Ingrese la cantidad de meses de financiación:"));
  
          while (isNaN(montoFinanciado) || isNaN(mesesFinanciacion) || montoFinanciado <= 0 || mesesFinanciacion <= 0) {
            alert("Por favor, ingrese valores numéricos válidos y mayores a cero.");
            montoFinanciado = parseFloat(prompt("Ingrese el monto a financiar:"));
            mesesFinanciacion = parseInt(prompt("Ingrese la cantidad de meses de financiación:"));
          }
  
          const tasaInteresAnual = 0.3; // Tasa de interés anual del 30%
          const tasaInteresMensual = tasaInteresAnual / 12; // Tasa de interés mensual
          const precioFinal = montoFinanciado * (1 + tasaInteresMensual * mesesFinanciacion);
          const valorCuota = precioFinal / mesesFinanciacion;
  
          alert(`Monto financiado: $${montoFinanciado}`);
          alert(`Cantidad de cuotas: ${mesesFinanciacion}`);
          alert(`Valor de cada cuota: $${valorCuota.toFixed(2)}`);
        } else {
          alert("Forma de pago inválida. Por favor, seleccione una opción válida.");
        }
        break;
      case 9:
        const precioMaximoFiltrar = parseFloat(prompt("Ingrese el precio máximo para filtrar:"));
  
        if (!isNaN(precioMaximoFiltrar) && precioMaximoFiltrar > 0) {
          filtrarPorPrecioMaximo(precioMaximoFiltrar);
        } else {
          console.log("Precio máximo inválido. No se realizará el filtrado.");
        }
        break;
      default:
        alert("Opción inválida. Por favor, seleccione una opción válida.");
        break;
    }
  
    opcion = mostrarMenu();
  }
  
  alert("Gracias por utilizar nuestro servicio. ¡Hasta luego!");
  