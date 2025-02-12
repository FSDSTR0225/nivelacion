//Importar funcion handlesubmit
import { handleSubmit } from "./domHandlers.js";

//Seleccionamos el formulario y añadimos el event listener
const form = document.querySelector("#main-form")
form.addEventListener("submit", handleSubmit)