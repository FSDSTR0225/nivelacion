const form = document.querySelector("#main-form");
const todoContainer = document.querySelector("#todo-container");

// INSERT NEW TASK
// 1. Rellenar formulario
// 2. Comprobar que el formulario esta vacio
// 3. Ccuando pulso boton insertar se añade tarea al listado
// 4. Evitar la recarga automatica
// 5 eliminar

function handleSubmit(event) {
  event.preventDefault();

  const description = form.description.value.trim();
  const dueDate = form.duedate.value.trim();

  if (!description || !dueDate) {
    const fieldForm = document.querySelector("#field-form");
    fieldForm.textContent = "Descripcion o fecha requerida";
    return;
  }

  const dueDateMonth = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  let newDueDate = new Date(dueDate);
  let day = newDueDate.getDate(); //dia del mes
  let month = dueDateMonth[newDueDate.getMonth()]; //Mes abreviado
  let year = newDueDate.getFullYear().toString().slice(-2); //los 2 ultimos dias del año

  //plantilla tarea
  const templeteTask = document.createElement("div");
  templeteTask.className = "todo-card";
  templeteTask.innerHTML = `
    <p class="description-text"></p>
    <p>
        <span class="state inprogress"></span>
        <span class="date">Fecha limite ${day} ${month} ${year}</span>
    </p>
    <p>
        <span>
            <a href="" class="edit-button">editar</a>
            <a href="" class="finished-button">marcar como finalizada</a>
        </span>
            <a href="" class="delete">eliminar</a>
        </p>
    `;
  todoContainer.appendChild(templeteTask);
  console.log("Añadida plantilla");

  //Añadir descripcion a la plantilla evitando vulnerabilidad xss
  const addDescriptionText = templeteTask.querySelector(".description-text");
  addDescriptionText.textContent = description;
  console.log("añadido descpripcion");

  //Funcionalidades
  //Editar
  const editButton = templeteTask.querySelector(".edit-button");
  const editFunction = (event) => {
    event.preventDefault();

    const newDescription = prompt("Indica nueva tarea").trim();
    if (newDescription) {
      addDescriptionText.textContent = newDescription;
    }
  };

  //Finalizar tarea
  const finishTaskButton = templeteTask.querySelector(".finished-button");
  const finishTask = (event) => {
    event.preventDefault();
    const state = templeteTask.querySelector(".state");
    state.classList.remove("inprogress");
    state.classList.add("done");
    //eliminar tarea 5s despues de marcar como completada
    setTimeout(() => {
      templeteTask.remove();
    }, 5000);
  };

  //Eliminar tarea
  const deleteTaskButton = templeteTask.querySelector(".delete")
  const deleteTask = (event) => {
    event.preventDefault();
    templeteTask.remove()
  }

  editButton.addEventListener("click", editFunction)
  finishTaskButton.addEventListener("click", finishTask)
  deleteTaskButton.addEventListener("click", deleteTask)
}
form.addEventListener("submit", handleSubmit);
