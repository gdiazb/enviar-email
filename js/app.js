/*------------------------------
  ✨Simulador Envio de Emails✨
-------------------------------*/

// Variables
const btnEnviar = document.querySelector('#enviar')

const inputEmail = document.querySelector('#email')
const inputAsunto = document.querySelector('#asunto')
const inputMensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
  //campo obligatorio
  campoObligatorio(e)
  if(er.test(inputEmail.value) && inputAsunto.value != '' && inputMensaje.value != '') {
    btnEnviar.setAttribute('disabled', false)
    btnEnviar.classList.remove('opacity-50', 'cursor-not-allowed')
  }
}

function campoObligatorio(e) {
  if(e.target.value.length > 0) { // si el campo esta vacio
    if(e.target.type != 'email') { // si el campo no es de tipo email
      e.target.parentElement.classList.add('success')
    } else {
      // validación cuando el campo es de tipo email
      campoTypeEmail(e)
    }
  } else { // si el campo esta vacio
    if(e.target.parentElement.querySelector('.mensaje-error')) ocultarError(e)
    e.target.parentElement.classList.add('error')
    mostrarError(e, 'Campo obligatorio')
    if(e.target.parentElement.classList.contains('success')) {
      e.target.parentElement.classList.remove('success')
    }
  }
}

function campoTypeEmail(e) {
  
  if(er.test(e.target.value)) {
    ocultarError(e)
    e.target.parentElement.classList.add('success')
    if(e.target.parentElement.classList.contains('error')) {
      e.target.parentElement.classList.remove('error')
    }
  } else {
    e.target.parentElement.classList.add('error')
    if(e.target.parentElement.querySelector('.mensaje-error')) ocultarError(e)
    mostrarError(e, 'Email inválido')
    if(e.target.parentElement.classList.contains('success')) {
      e.target.parentElement.classList.remove('success')
    }
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
  const mensaje = e.target.parentElement.querySelector('.mensaje-error')
  e.target.parentElement.removeChild(mensaje)
}
