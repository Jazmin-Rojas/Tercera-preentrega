const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const historialBtn = document.getElementById("historial");
const modal = document.getElementById("modal");
const historialContent = document.getElementById("historial-content");
const closeModalBtn = document.querySelector(".close");

let mostrarHistorial = false;  

historialBtn.addEventListener("click", () => {
    const historial = obtenerHistorial();
    if (historial.length > 0) {
        historialContent.innerHTML = "<p>" + historial.join("</p><p>") + "</p>";
        modal.style.display = "block";
        mostrarHistorial = true;  
    } 
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

function obtenerHistorial() {
    const historial = localStorage.getItem("historial");
    return historial ? JSON.parse(historial) : [];
}

function agregarAlHistorial(operacion) {
    const historial = obtenerHistorial();
    historial.push(operacion);
    localStorage.setItem("historial", JSON.stringify(historial));
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const apretarBoton = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            mostrarHistorial = false;  
            return;  
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "ERROR") {
                pantalla.textContent = "0"; 
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }  
            mostrarHistorial = false;  
            return;  
        }

        if (boton.id === "igual") {
            try {
                const resultado = eval(pantalla.textContent);
                agregarAlHistorial(`${pantalla.textContent} = ${resultado}`);
                pantalla.textContent = resultado;
                mostrarHistorial = true;  
            } catch {
                pantalla.textContent = "ERROR";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "ERROR") {
            pantalla.textContent = apretarBoton;
            mostrarHistorial = false;  
        } else {
            pantalla.textContent += apretarBoton;
            mostrarHistorial = false;  }

        if (mostrarHistorial) {
            pantalla.textContent = "Historial";
            mostrarHistorial = false; 
        }
    });
});
