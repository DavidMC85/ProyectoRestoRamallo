// Obtener elementos del DOM
const registroForm = document.getElementById("registro");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("psw");
const repeatPasswordInput = document.getElementById("psw-repeat");

// Agregar evento "submit" al formulario
registroForm.addEventListener("submit", (event) => {
    // Prevenir el envío del formulario
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const emailValue = encodeURIComponent(emailInput.value);
    const passwordValue = encodeURIComponent(passwordInput.value);
    const repeatPasswordValue = encodeURIComponent(repeatPasswordInput.value);

    // Verificar si la contraseña y la repetición de la contraseña coinciden
    if (passwordValue !== repeatPasswordValue) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Guardar los valores en el LocalStorage
    localStorage.setItem("email", emailValue);
    localStorage.setItem("password", passwordValue);

    // Enviar el formulario
    registroForm.submit();
});

