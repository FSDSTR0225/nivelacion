/*ampliación 
desmarcar la opción completeButton appenchilder
hacer que parpade
y  localestoras
elimiar las que estan marcadas
*/
const form = document.querySelector(".main-form");

const div = document.querySelector(".task-container");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Formulario enviado correctamente!");

  const description = form.description.value.trim();
  const dueDate = form.duedate.value;

  if (!description || !dueDate) {
    alert("Debes completar todos los cambios");
    return;
  }

  const taskDiv = document.createElement("div");
  taskDiv.innerHTML =`
    <p class="description-text">${description}</p>
            <p><span class="todo">TO DO</span> fecha limite: ${dueDate}</p>
            <p>
                <a href="#" class="edit">EDITAR</a>
                <a href="#" class="complete">MARCAR COMO FINALIZADA</a>
                <a href="#" class="remove">ELIMINAR</a>
    </p>`;


    const editButton=taskDiv.querySelector(".edit");
    const completeButton=taskDiv.querySelector(".complete");
    const removeButton=taskDiv.querySelector(".remove");
    
    
    editButton.addEventListener('click',function (event) {
        event.preventDefault();

        const  newDescription = prompt('Indica el nuevo texto');
        if (newDescription){
            taskDiv.querySelector(".description-text").textContent= newDescription;
        }

    });

    
    completeButton.addEventListener('click',function (event) {
      event.preventDefault();
      const status = taskDiv.querySelector("span");
      status.textContent="DONE";
      status.className="done";


    });


    removeButton.addEventListener('click',function (event) {
        event.preventDefault();
        
        taskDiv.remove();
  
      });


    
    
    //   setTimeout(() => {
        
    //   }, timeout);
      setInterval(() => {
        
      }, interval);
   
    
    div.appendChild(taskDiv);

    form.reset();

});

