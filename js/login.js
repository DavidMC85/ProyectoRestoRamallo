const loginForm = document.getElementById("loggin");
const emailInput = loginForm.elements.namedItem("uname");
const passwordInput = loginForm.elements.namedItem("psw");

// Obtener valores del LocalStorage
const storedEmail = localStorage.getItem("email");
const storedPassword = localStorage.getItem("password");
console.log (document.compatMode)
// Agregar evento "submit" al formulario
loginForm.addEventListener("submit", (event) => {
    // Prevenir el envío del formulario
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    // Verificar si el email y la contraseña ingresados coinciden con los almacenados
    if (emailValue === storedEmail && passwordValue === storedPassword) {
        // Redireccionar al usuario al HTML "cartas.html"
        window.location.href = "/cartas.html";
        Swal.fire({
            title: 'Bienvenido!',
            text: 'A continuacion arma tu pedido a tu gusto!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    } else {
        // Mostrar mensaje de error
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
            })
    }
});

