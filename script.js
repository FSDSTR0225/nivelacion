const form = document.querySelector(".main-form");
const div = document.querySelector(".task-container");

document.addEventListener("DOMContentLoaded", cargarTareasGuardadas);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = form.description.value.trim();
  const dueDate = form.duedate.value;

  if (!description || !dueDate) {
    alert("Debes completar todos los campos");
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.innerHTML = `
    <p class="description-text">${description}</p>
    <p><span class="todo">TO DO</span> fecha límite: ${dueDate}</p>
    <p>
      <a href="#" class="edit">EDITAR</a>
      <a href="#" class="complete">MARCAR COMO FINALIZADA</a>
      <a href="#" class="remove">ELIMINAR</a>
    </p>
  `;

  div.appendChild(taskDiv);

  // Agregar eventos a los botones
  agregarEventos(taskDiv);

  form.reset();
  guardarTareas();
});

// Agregar eventos a los botones de cada tarea
function agregarEventos(taskDiv) {
  const editButton = taskDiv.querySelector(".edit");
  const completeButton = taskDiv.querySelector(".complete");
  const removeButton = taskDiv.querySelector(".remove");

  // Asegúrate de que los botones están siendo encontrados antes de agregar los eventos
  if (editButton) {
    editButton.addEventListener('click', function (event) {
      event.preventDefault();
      const newDescription = prompt('Indica el nuevo texto');
      if (newDescription) {
        taskDiv.querySelector(".description-text").textContent = newDescription;
      }
      guardarTareas();
    });
  }

  if (completeButton) {
    completeButton.addEventListener('click', function (event) {
      event.preventDefault();
      const status = taskDiv.querySelector("span");

      if (status.textContent === "DONE") {
        status.textContent = "TO DO";
        status.className = "todo";
        completeButton.innerHTML = "MARCAR COMO FINALIZADA";
      } else {
        status.textContent = "DONE";
        status.className = "done";
        completeButton.innerHTML = "DESMARCAR COMO FINALIZADA";
      }

      guardarTareas();
    });
  }

  if (removeButton) {
    removeButton.addEventListener('click', function (event) {
      event.preventDefault();
      const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar esta tarea?");
    
      if (confirmacion) {
        taskDiv.remove(); // Eliminar la tarea si el usuario confirma
        guardarTareas();
      }
    });
  }
}

// Eliminar tareas completadas cada 10 segundos
setInterval(() => {
  document.querySelectorAll(".done").forEach(span => {
    span.closest("div").remove();
    guardarTareas(); // Guardar después de eliminar
  });
}, 10000);

// Guardar tareas en localStorage
function guardarTareas() {
  const tareas = [];
  document.querySelectorAll(".task-container div").forEach(task => {
    tareas.push({
      descripcion: task.querySelector(".description-text").textContent,
      estado: task.querySelector("span").className,
      fecha: task.querySelector("p span").nextSibling.textContent.trim()
    });
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Cargar tareas guardadas desde localStorage
function cargarTareasGuardadas() {
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach(tarea => {
    const taskDiv = document.createElement("div");
    taskDiv.innerHTML = `
      <p class="description-text">${tarea.descripcion}</p>
      <p><span class="${tarea.estado}">${tarea.estado === "done" ? "DONE" : "TO DO"}</span> ${tarea.fecha}</p>
      <p>
        <a href="#" class="edit">EDITAR</a>
        <a href="#" class="complete">${tarea.estado === "done" ? "DESMARCAR COMO FINALIZADA" : "MARCAR COMO FINALIZADA"}</a>
        <a href="#" class="remove">ELIMINAR</a>
      </p>
    `;

    div.appendChild(taskDiv);

    // Agregar eventos a los botones de tareas cargadas desde localStorage
    agregarEventos(taskDiv);
  });
}
