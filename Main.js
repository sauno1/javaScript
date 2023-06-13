let pesos=0
let tiempo=0

function calcularInteres() {
    let esCliente = prompt("¿Sos cliente del banco?")
    let tasa;
    if (esCliente.toLowerCase() === "si") {
        tasa = 0.5;
    } else {
        tasa = 0.7;
    }

    let pesos = parseFloat(prompt("Ingrese cantidad de Pesos"));
    let tiempo = parseFloat(prompt("Ingrese cantidad de años"));
    
    let interes = (pesos * tasa * tiempo);

    console.log("El interés es: $" + interes);
}
calcularInteres();

// Esto es una calculadora de interés de un préstamo. Si sos cliente del banco tenes una taza mas económica que si no lo sos.


