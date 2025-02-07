// Comprobamos que tenemos el JS bien enlazado al HTML
console.log("Correctamente enlazado!");

// Seleccionamos del DOM los elementos con los que vamos a necesitar trabajar
// y los almacenamos en variables para poder trabajar con ellos
const form = document.querySelector(".main-form");
const taskContainer = document.querySelector(".task-container");

// PASOS PARA INSERTAR UNA NUEVA TAREA
// 1. El botón Insertar desencadena el comportamiento
// 2. Comprobar que el formulario no está vacío
// 3. Añadir la tarea al listado de tareas

// Detectamos cuándo el usuario envía el formulario pulsando el botón Insertar y,
// a partir de ahí, ejecutamos las acciones correspondientes
form.addEventListener("submit", function (event) {
  // Evitamos que se produzca el comportamiento por defecto de un formulario HTML,
  // es decir, la recarga de la página
  event.preventDefault();

  // Seleccionamos del DOM los elementos con los que vamos a necesitar trabajar
  // y los almacenamos en variables para poder trabajar con ellos. En este caso,
  // accedemos a ellos directamente a través del formulario (form)
  const description = form.description.value.trim();
  const dueDate = form.duedate.value;

  // Comprobamos que el formulario no está vacío
  if (!description || !dueDate) {
    alert("Debes completar todos los campos");
    return;
  }

  // Generamos elemento del DOM de la tarea a añadir. Este es el elemento que
  // insertaremos en el DOM una vez esté listo
  const taskDiv = document.createElement("div");
  taskDiv.innerHTML = `
    <p class="description-text">${description}</p>
    <p><span class="todo">TO DO</span> Fecha límite: ${dueDate}</p>
    <p>
      <a href="#" class="edit">EDITAR</a>
      <a href="#" class="complete">MARCAR COMO FINALIZADA</a>
      <a href="#" class="remove">ELIMINAR</a>
    </p>
  `;

  // Añadimos las funcionalidades de los botones al elemento del DOM a insertar

  // Funcionalidad de EDITAR
  const editButton = taskDiv.querySelector(".edit");

  editButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Has clicado sobre el Edit Button!");

    const newDescription = prompt("Indica el nuevo texto de la tarea:");
    if (newDescription) {
      taskDiv.querySelector(".description-text").textContent = newDescription;
    }
  });

  // Funcionalidad de MARCAR COMO COMPLETADA
  const completeButton = taskDiv.querySelector(".complete");

  completeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const status = taskDiv.querySelector("span");
    status.textContent = "DONE";
    status.className = "done";
  });

  // Funcionalidad de ELIMINAR
  const removeButton = taskDiv.querySelector(".remove");

  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
    taskDiv.remove();
  });

  // Añadimos la tarea al listado de tareas, añadiéndola al DOM
  taskContainer.appendChild(taskDiv);

  // Restablecemos los valores del formulario
  form.reset();

  // Para trabajar con código que queremos que se ejecute DESPUÉS DE X tiempo o CADA X tiempo:
  // setTimeout(() => {
  // console.log('Una acción que se ejecuta al cabo de 5 segundos')
  // }, 5000);

  // setInterval(() => {
  //   console.log("Una ejecución cada segundo");
  // }, 1000);
});
