/*------------------------------
  ✨Simulador Envio de Emails✨
-------------------------------*/

// Variables
const btnEnviar = document.querySelector('#enviar')
const formulario = document.querySelector('#enviar-mail')
const resetBtn = document.querySelector('#resetBtn')

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
  //Enviar formulario
  formulario.addEventListener('submit', enviarFormulario)
  resetBtn.addEventListener('click', resetForm)
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
    btnEnviar.removeAttribute('disabled')
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
    if(e.target.parentElement.querySelector('.mensaje-error')) ocultarError(e)
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

function enviarFormulario(e) {
  e.preventDefault()
  const spinner = document.querySelector('#spinner')
  toggleVisibility(inputEmail)
  toggleVisibility(inputAsunto)
  toggleVisibility(inputMensaje)
  spinner.style.display = 'flex'
  // Después de 3 segundos ocultar spinner y mostrar el mensaje
  setTimeout(() => {
    spinner.style.display = 'none'
    const mensajeSuccess = document.createElement('p')
    mensajeSuccess.classList.add('form__message--success')
    mensajeSuccess.textContent = 'El mensaje se envió correctamente ✅'
    formulario.insertBefore(mensajeSuccess, spinner)

    setTimeout(() => {
      mensajeSuccess.remove()
      toggleVisibility(inputEmail)
      toggleVisibility(inputAsunto)
      toggleVisibility(inputMensaje)
      resetForm(e)
    }, 5000)

  }, 3000)
}

function toggleVisibility(campo) {
  if(campo.parentElement.classList.contains('form__input--visible')) {
    campo.parentElement.classList.remove('form__input--visible')
    campo.parentElement.classList.add('form__input--hide')
  } else {
    campo.parentElement.classList.remove('form__input--hide')
    campo.parentElement.classList.add('form__input--visible')
  }
}

function resetForm(e) {
  e.preventDefault()
  formulario.reset();
}