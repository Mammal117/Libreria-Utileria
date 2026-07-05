function validarCorreo(correo) {
    if (typeof correo !== "string") return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo.trim());
}

function soloLetras(texto) {
    if (typeof texto !== "string" || texto.trim() === "") return false;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(texto);
}

function validarLongitud(numero, maxLongitud) {
    if (typeof numero !== "number" || isNaN(numero)) return false;
    const cantidadDigitos = Math.abs(Math.trunc(numero)).toString().length;
    return cantidadDigitos <= maxLongitud;
}

function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return -1;

    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const noHaCumplidoAnios =
        hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());

    if (noHaCumplidoAnios) {
        edad--;
    }

    return edad;
}

function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    if (edad === -1) return false;
    return edad >= 18;
}

function validarPassword(password) {
    if (typeof password !== "string") return false;

    const tieneLongitudMinima = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return tieneLongitudMinima && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

function generarNombreUsuario(nombreCompleto) {
    if (typeof nombreCompleto !== "string" || nombreCompleto.trim() === "") return "";

    const sinAcentos = nombreCompleto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const soloLetrasYEspacios = sinAcentos.replace(/[^a-z\s]/g, "");
    const nombreUnido = soloLetrasYEspacios.replace(/\s+/g, "");

    const numeroAleatorio = Math.floor(Math.random() * 900) + 100;

    return nombreUnido + numeroAleatorio;
}

function validarTelefono(telefono) {
    if (typeof telefono !== "string") return false;
    const soloDigitos = telefono.replace(/[\s-]/g, "");
    const regex = /^[0-9]{10}$/;
    return regex.test(soloDigitos);
}

function procesarFormulario() {
        let nombre = document.getElementById("nombre").value.trim();
        let correo = document.getElementById("correo").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let fechaNacimiento = document.getElementById("fechaNacimiento").value;
        let password = document.getElementById("password").value;
        let numero = Number(document.getElementById("numero").value);
        let longitudValida = validarLongitud(numero, 5);

        let nombreValido = soloLetras(nombre);
        let correoValido = validarCorreo(correo);
        let telefonoValido = validarTelefono(telefono);
        let mayorDeEdad = esMayorDeEdad(fechaNacimiento);
        let passwordValida = validarPassword(password);

        if (!nombreValido) {
            alert("El nombre solo debe contener letras.");
            return;
        }
        if (!correoValido) {
            alert("El correo no tiene un formato válido.");
            return;
        }
        if (!telefonoValido) {
            alert("El teléfono debe tener 10 dígitos.");
            return;
        }
        if(!longitudValida){
            alert("El numero no debe tener mas de 5 digitos.");
            return;
        }

        if (!mayorDeEdad) {
            alert("Debes ser mayor de edad para registrarte.");
            return;
        }
        if (!passwordValida) {
            alert("La contraseña necesita mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres.");
            return;
        }

        let edad = calcularEdad(fechaNacimiento);
        document.getElementById("mensajeModal").textContent =
            nombre + ", tu edad calculada es de " + edad + " años. ¡Bienvenido/a!";

        document.getElementById("resultadoUsuario").value = generarNombreUsuario(nombre);

        document.getElementById("modalEdad").classList.add("activo");
    }

    function cerrarModal() {
        document.getElementById("modalEdad").classList.remove("activo");
    }

    function iniciarSesion() {
        let correo = document.getElementById("correo").value.trim();
        let password = document.getElementById("password").value;

        if (!validarCorreo(correo)) {
            alert("El correo no tiene un formato válido.");
            return;
        }

        if (!validarPassword(password)) {
            alert("La contraseña necesita mayúscula, minúscula, número, carácter especial y mínimo 8 caracteres.");
            return;
        }

        document.getElementById("mensajeModal").textContent =
            "Bienvenido/a, " + correo + ". Tu sesión se inició correctamente.";

        document.getElementById("modalEdad").classList.add("activo");
    }

    function cerrarModal() {
        document.getElementById("modalEdad").classList.remove("activo");
    }