/*------------------------------
  ✨Simulador Envio de Emails✨
-------------------------------*/

// Variables
const btnEnviar = document.querySelector('#enviar')

const inputEmail = document.querySelector('#email')
const inputAsunto = document.querySelector('#asunto')
const inputMensaje = document.querySelector('#mensaje')

// Add event listeners
eventListeners()
function eventListeners() {
  // Cuando la app arranca
  document.addEventListener('DOMContentLoaded', iniciarApp)
  // Campos de formulario
  inputEmail.addEventListener('blur', validarFormulario)
  inputAsunto.addEventListener('blur', validarFormulario)
  inputMensaje.addEventListener('blur', validarFormulario)
}

// Funciones
function iniciarApp() {
  // Deshabilitar button
  btnEnviar.setAttribute('disabled', true)
  btnEnviar.classList.add('opacity-50', 'cursor-not-allowed')
}
// Valida el formulario
function validarFormulario(e) {
  if (e.target.value.length > 0){
    if(e.target.parentElement.classList.contains('error')) {
      e.target.parentElement.classList.remove('error')
      ocultarError(e)
    }

    if(e.target.type === 'email') {
      
      const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if(er.test(e.target.value)) {
        e.target.parentElement.classList.remove('error')
        e.target.parentElement.classList.add('success')
      } else {
        e.target.parentElement.classList.remove('success')
        e.target.parentElement.classList.add('error')
        mostrarError(e, 'email no válido')
      }
    } else {
      e.target.parentElement.classList.remove('error')
      e.target.parentElement.classList.add('success')
    } 
    
  } else {
    if(e.target.parentElement.classList.contains('error')) {
      ocultarError(e)
    }
    e.target.parentElement.classList.remove('success')
    e.target.parentElement.classList.add('error')
    mostrarError(e, 'Campo obligatorio')
  }
}

function mostrarError(e, mensaje) {
  const mensajeError = document.createElement('span')
  mensajeError.textContent = mensaje
  mensajeError.classList.add('mensaje-error')

  const errores = e.target.parentElement.querySelectorAll('.mensaje-error')
  if(errores.length === 0) {
    e.target.parentElement.appendChild(mensajeError)
  }
}

function ocultarError(e) {
  const mensaje = document.querySelector('.mensaje-error')
  e.target.parentElement.removeChild(mensaje)
}
