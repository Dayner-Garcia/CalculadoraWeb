var pantalla = document.getElementById("pantalla");
var historial = document.getElementById("historial-list");

// pasar el numero que se agrego a la pantalla, toam el numero y lo agregar a la pantalla
function appendNumber(number) {
    pantalla.value += number;
}

// Agregar los operadores a la pantalla
function appendOperator(operator) {
    const expresion = pantalla.value;

    if (expresion.length === 0 || /[\+\-\*\/]$/.test(expresion)) {
        return;
    }
    pantalla.value += operator;
}

// Revisa la expresion, muestra el resultado y lo agrega al hsitorial mandandolo al local storage
function calculate() {
    try {
        // Validar antes de evaluar
        const expresion = pantalla.value;

        // Comprobar si hay operadores consecutivos
        if (/[\+\-\*\/]{2,}/.test(expresion)) {
            throw new Error("Entrada inválida: multiples operadores.");
        }

        // Comprobar si la expresión termina con un operador
        if (/[\+\-\*\/]$/.test(expresion)) {
            throw new Error("Entrada no valida: la expresión no puede terminar con un operador.");
        }

        // Evaluar
        var resultado = eval(expresion);
        pantalla.value = resultado;

        // Crear un nuevo elemento
        var operacion = document.createElement("li");
        operacion.textContent = expresion + " = " + resultado;

        // Agregar el elemento al historial
        historial.appendChild(operacion);

        // Guardar el historial en localStorage
        localStorage.setItem("historial", historial.innerHTML);

    } catch (error) {
        pantalla.value = "Error: " + error.message;
    }
}

// funcion para cambiar el signo
function  toggleSing (){
    if(pantalla.value){
        var valor = parseFloat(pantalla.value);
        pantalla.value = valor;
    }
}
// limpiar pantalla
function clearScreen() {
    pantalla.value = "";
}

// borrarhistorial del local storage
function clearHistorial() {
    historial.innerHTML = "";
    localStorage.removeItem("historial");
    alert("Historial limpiado");
    const clearButton = document.querySelector(".clear");
    clearButton.style.backgroundColor = "#e74c3c";
}


// Restaura el historial al actualizar la pagina
window.onload = function () {
    if (localStorage.getItem("historial")) {
        historial.innerHTML = localStorage.getItem("historial");
    }
};
