// Selección de elementos desde la pagina
const input = document.getElementById("agregarNuevaTarea");
const botonAgregar = document.getElementById("AgregarTareaBoton");
const listaDeTareas = document.getElementById("listaDeTareas");
const totalTareasElement = document.getElementById("totalTareas");
const tareasRealizadasElement = document.getElementById("tareasRealizadas");




// Arreglo de tareas inicial solicitado



let tareas = [
{ id: 1, descripcion: "Salir a correr", completado: false },

{ id: 2, descripcion: "Estudiar JavaScript", completado: false },

{ id: 3, descripcion: "Leer un libro", completado: false }

];


// Contadores
let totalTareas = tareas.length;
let tareasRealizadas = 0;

// Función para actualizar la lista de tareas en la página
function actualizarLista() {
  listaDeTareas.innerHTML = ""; // esto siempre se debe hacer

tareas.forEach(tarea => {
    // Crear un nuevo elemento <li> para la tarea
    const li = document.createElement("li");
    li.classList.add("tarea-item");

    // Crear un <p> para la descripción de la tarea
    const p = document.createElement("p");
    p.textContent = tarea.descripcion;
    p.id = "accion";
    if (tarea.completado) {
    p.classList.add("completado");
    p.style.textDecoration = "line-through";
    }

    //  el botón de tarea realizada
    const botonCheck = document.createElement("button");
    botonCheck.classList.add("icono-check");
    const iconoCheck = document.createElement("i");
    iconoCheck.classList.add("bi", "bi-check2-circle");
    botonCheck.appendChild(iconoCheck);

    // Crear el botón "Eliminar"
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("icono-eliminar");
    const iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add("bi", "bi-x-circle");
    botonEliminar.appendChild(iconoEliminar);

    // AL HACER CLICK
    botonCheck.addEventListener("click", () => marcarCompletada(tarea, p, iconoCheck));
    botonEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

    // SE AGREGAN AL LI
    li.appendChild(p);
    li.appendChild(botonCheck);
    li.appendChild(botonEliminar);

    // LISTA DE TAREAS
    listaDeTareas.appendChild(li);
});

  // Actualizar los contadores
actualizarResumen();
}

// Función para agregar una nueva tarea
function agregarTarea() {
const descripcion = input.value.trim();
if (descripcion === "") {
    alert("Por favor, ingresa una tarea válida.");
    return;
}

  // Crear un nuevo objeto de tarea
const nuevaTarea = {
    id: Date.now(), // el id exacto
    descripcion: descripcion,
    completado: false
};

tareas.push(nuevaTarea);
totalTareas++;
  input.value = ""; // SIEMPRE PARA DEJAR LIBRE DONDE SE ESCRIBE
actualizarLista();
}

// ASI MARCO COMO REALIZADA
function marcarCompletada(tarea, parrafo, icono) {
tarea.completado = !tarea.completado; // ! es como tromble o algo asi
if (tarea.completado) {
    parrafo.classList.add("completado");
    parrafo.style.textDecoration = "line-through";
    icono.style.color = "#2ecc71"; //verde fuerte
    tareasRealizadas++;
} else {
    parrafo.classList.remove("completado");
    parrafo.style.textDecoration = "none";
    icono.style.color = "#6e7b8c"; // Volver al color original
    tareasRealizadas--;
}
actualizarResumen();
}

// Función para eliminar una tarea
function eliminarTarea(id) {
tareas = tareas.filter(t => t.id !== id);
totalTareas--;
tareasRealizadas = tareas.filter(t => t.completado).length;
actualizarLista();
}

// Función para actualizar el resumen
function actualizarResumen() {
totalTareasElement.textContent = `Total de Tareas: ${totalTareas}`;
tareasRealizadasElement.textContent = `Total de Tareas Realizadas: ${tareasRealizadas}`;
}


botonAgregar.addEventListener("click", agregarTarea);
actualizarLista();
