//importar las funciones dede utils.
import { formatDate, createTaskTemplate } from "./utils.js";

const form = document.querySelector("#main-form");
const todoContainer = document.querySelector("#todo-container");

//Configurar los event listeners de cada tarea
function setupEventListeners(taskElement) {
  //llamar a los botones
  const editButton = taskElement.querySelector(".edit-button");
  const finishTaskButton = taskElement.querySelector(".finished-button");
  const deleteTaskButton = taskElement.querySelector(".delete");

  //Funcionalidad editar
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newDescription = prompt("Indica nueva tarea").trim();
    //verificar si hay descripcion y añadirla
    if (newDescription) {
      taskElement.querySelector(".description-text").textContent =
        newDescription;
    }
  });

  //Funcionalidad de finalizar tarea
  finishTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    const stateTask = taskElement.querySelector(".state");
    stateTask.classList.remove("inprogress");
    stateTask.classList.add("done");
    setTimeout(() => {
      taskElement.remove();
    }, 5000);
  });

  deleteTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      taskElement.remove();
    }
  });
}

//Funcion para manejar datos del formulario

function handleSubmit(event) {
  event.preventDefault();
  //Recuperamos el valor de los campos del formulario y eliminamos espacios
  const description = form.description.value.trim();
  const dueDate = form.duedate.value.trim();

  //Verificamos que estos campos esten rellenos
  const fieldForm = document.querySelector("#field-form");
  if (!description || !dueDate) {
    fieldForm.textContent = "Descripción o fecha requerida";
    return;
  }

  //Guardamos el resultado de las funciones format date y createTaskTemplate
  const formattedDate = formatDate(dueDate);
  const templateTask = createTaskTemplate(description, formattedDate);
  //Pasamos el templete al div todoContainer
  todoContainer.appendChild(templateTask);
  //Agregamos als funcinalidades a la plantilla
  setupEventListeners(templateTask);
  form.reset()
  fieldForm.textContent = ""
}

export { handleSubmit };
