var pantalla = document.getElementById("pantalla");
var historial = document.getElementById("historial-list");

// pasar el numero que se agrego a la pantalla, toam el numero y lo agregar a la pantalla
function appendNumber(number) {
    pantalla.value += number;
}

// Agregar los operadores a la pantalla
function appendOperator(operator) {
    pantalla.value += operator;
}

// Revisa la expresion, muestra el resultado y lo agrega al hsitorial mandandolo al local storage
function calculate() {
    try {
        var resultado = eval(pantalla.value);
        pantalla.value = resultado;

        // Crear un nuevo elemento para la operacion
        var operacion = document.createElement("li");
        operacion.textContent = pantalla.value;

        // Agregar el lista al historial
        historial.appendChild(operacion);

        // Guardar el historial en localStorage
        localStorage.setItem("historial", historial.innerHTML);

    } catch (error) {
        pantalla.value = "error";
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
