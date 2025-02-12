//Funcion para formatear fecha
export function formatDate(dateString) {
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

  const newDueDate = new Date(dateString);
  const day = newDueDate.getDate();
  const month = dueDateMonth[newDueDate.getMonth()];
  const year = newDueDate.getFullYear().toString().slice();
  return `${day}${month}${year}`;
}

//Funcion para crear plantilla
export function createTaskTemplate(descpription, formattedDate){
    const templeteTask = document.createElement("div");
    templeteTask.className = "todo-card";
    templeteTask.innerHTML = `
        <p class="description-text"></p>
        <p>
            <span class="state inprogress"></span>
            <span class="date">Fecha límite: ${formattedDate}</span>
        </p>
        <p>
        <span>
            <a href="" class="edit-button">editar</a>
            <a href="" class="finished-button">marcar como finalizada</a>
        </span>
        <a href="" class="delete">eliminar</a>
    </p>
    `;

    //Evitar vulnaravilidad XSS asignando el contenido de forma segura

    const addDescriptionText = templeteTask.querySelector(".description-text");
    addDescriptionText.textContent = descpription;
    return templeteTask
}