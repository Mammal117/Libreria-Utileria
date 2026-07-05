# Utileria.js

Actividad: libreria-Utileria

Alumn: Ortiz Bautista Josue Ahuitz 

N.C:2161187

Profesora: Ing. Adelina Martínez Nieto


Libreria JavaScript de funciones puras (sin frameworks, sin componentes visuales) para validar datos de formularios, calcular edades y formatear informacion. Resuelve un problema muy comun en el desarrollo web: repetir la misma logica de validacion una y otra vez en distintos formularios. Con utileria.js, esa logica vive en un solo lugar y se reutiliza en cualquier pagina con solo importar el script.

Link de mi video https://drive.google.com/file/d/1Le_NtQ56ox53LdoFEdu8PrBhRYrDLQPP/view?usp=sharing


---
Tecnologias usadas:
HTML
CSS
Java Script
---

 Instalacion

1. Descarga o clona este repositorio.
2. Coloca el archivo `utileria.js` dentro de tu carpeta `/js`.
3. Importalo en el `<head>` o antes de cerrar el `<body>` de tu HTML:

```html
<script src="js/utileria.js"></script>
```

Listo. Todas las funciones quedan disponibles globalmente en esa pagina.

---

## Uso con ejemplos de codigo

 1. validarCorreo(correo)
Valida que una cadena tenga formato de correo electronico.

```javascript
function validarCorreo(correo) {
    if (typeof correo !== "string") return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo.trim());
}

// Ejemplo de uso:
validarCorreo("juan@gmail.com"); // true
validarCorreo("juan@gmail");     // false
```

 2. soloLetras(texto)
Valida que un texto contenga solo letras (incluye vocales acentuadas y ene con tilde).

```javascript
function soloLetras(texto) {
    if (typeof texto !== "string" || texto.trim() === "") return false;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(texto);
}

// Ejemplo de uso:
soloLetras("José Pérez"); // true
soloLetras("Ana2");       // false
```

 3. validarLongitud(numero, maxLongitud)
Valida que la cantidad de digitos de un numero no supere un maximo.

```javascript
function validarLongitud(numero, maxLongitud) {
    if (typeof numero !== "number" || isNaN(numero)) return false;
    const cantidadDigitos = Math.abs(Math.trunc(numero)).toString().length;
    return cantidadDigitos <= maxLongitud;
}

// Ejemplo de uso:
validarLongitud(12345, 5);  // true
validarLongitud(123456, 5); // false
```

 4. calcularEdad(fechaNacimiento)
Calcula la edad en anios completos a partir de una fecha de nacimiento.

```javascript
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

// Ejemplo de uso:
calcularEdad("2000-05-10"); // Ej: 26 (depende de la fecha actual)
```

 5. esMayorDeEdad(fechaNacimiento)
Valida si una persona es mayor de edad (18 anios o mas).

```javascript
function esMayorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    if (edad === -1) return false;
    return edad >= 18;
}

// Ejemplo de uso:
esMayorDeEdad("2000-05-10"); // true
esMayorDeEdad("2015-05-10"); // false
```

 6. validarPassword(password)
Valida que una contrasena tenga minimo 8 caracteres, mayuscula, minuscula, numero y caracter especial.

```javascript
function validarPassword(password) {
    if (typeof password !== "string") return false;

    const tieneLongitudMinima = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return tieneLongitudMinima && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

// Ejemplo de uso:
validarPassword("Abcdef1!"); // true
validarPassword("abcdefgh"); // false
```

---

 Seccion libre - funciones propias

 7. generarNombreUsuario(nombreCompleto)
Problema que resuelve: en un registro, sugerir automaticamente un nombre de usuario a partir del nombre completo (igual que hacen Gmail, Instagram, etc.), en vez de que el usuario tenga que pensarlo desde cero.

```javascript
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

// Ejemplo de uso:
generarNombreUsuario("Ana López"); // ej: "analopez482"
```

 8. validarTelefono(telefono)
Problema que resuelve: evitar que se guarden numeros telefonicos incompletos o con letras en formularios de contacto/registro. Permite que el usuario escriba espacios o guiones, los cuales se ignoran al validar.

```javascript
function validarTelefono(telefono) {
    if (typeof telefono !== "string") return false;
    const soloDigitos = telefono.replace(/[\s-]/g, "");
    const regex = /^[0-9]{10}$/;
    return regex.test(soloDigitos);
}

// Ejemplo de uso:
validarTelefono("951-123-45-67"); // true
validarTelefono("12345");         // false
```

---

 Integracion

- **index.html** - Formulario de registro que usa las 8 funciones (nombre, correo, telefono, numero, fecha de nacimiento, contrasena) y muestra la edad calculada dentro de una ventana modal al registrarse con exito.
- **login.html** - Formulario de inicio de sesion que usa validarCorreo() y validarPassword(), y simula un inicio de sesion mostrando un mensaje de bienvenida en un modal.

 IDs de los campos en index.html

Cada input del formulario de registro debe llevar exactamente este id para conectar con utileria.js (JavaScript distingue mayusculas de minusculas). A continuacion se explica campo por campo:

- **Nombre completo**: input de tipo text, con id="nombre". Lo validan las funciones soloLetras() y generarNombreUsuario().
- **Correo electronico**: input de tipo text, con id="correo". Lo valida la funcion validarCorreo().
- **Telefono**: input de tipo text, con id="telefono". Lo valida la funcion validarTelefono().
- **Numero**: input de tipo number, con id="numero". Lo valida la funcion validarLongitud().
- **Fecha de nacimiento**: input de tipo date, con id="fechaNacimiento". La usan las funciones calcularEdad() y esMayorDeEdad().
- **Contrasena**: input de tipo password, con id="password". La valida la funcion validarPassword().
- **Usuario sugerido (resultado, de solo lectura)**: input de tipo text, con id="resultadoUsuario". Se llena automaticamente con el resultado de generarNombreUsuario().

 Script de integracion en index.html (procesarFormulario)

Este es el bloque que conecta el formulario de registro con las 6 funciones obligatorias mas las 2 propias. Valida cada campo y, si todo es correcto, calcula la edad, la muestra en el modal y sugiere el nombre de usuario:

```javascript
function procesarFormulario() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let numero = Number(document.getElementById("numero").value);
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let password = document.getElementById("password").value;

    if (!soloLetras(nombre)) {
        alert("El nombre solo debe contener letras.");
        return;
    }
    if (!validarCorreo(correo)) {
        alert("El correo no tiene un formato valido.");
        return;
    }
    if (!validarTelefono(telefono)) {
        alert("El telefono debe tener 10 digitos.");
        return;
    }
    if (!validarLongitud(numero, 5)) {
        alert("El numero no debe tener mas de 5 digitos.");
        return;
    }
    if (!esMayorDeEdad(fechaNacimiento)) {
        alert("Debes ser mayor de edad para registrarte.");
        return;
    }
    if (!validarPassword(password)) {
        alert("La contrasena necesita mayuscula, minuscula, numero, caracter especial y minimo 8 caracteres.");
        return;
    }

    let edad = calcularEdad(fechaNacimiento);
    document.getElementById("mensajeModal").textContent =
        nombre + ", tu edad calculada es de " + edad + " anios. Bienvenido/a!";

    document.getElementById("resultadoUsuario").value = generarNombreUsuario(nombre);

    document.getElementById("modalEdad").classList.add("activo");
}

function cerrarModal() {
    document.getElementById("modalEdad").classList.remove("activo");
}
```

 Script de integracion en login.html (iniciarSesion)

Este bloque conecta el formulario de login con validarCorreo() y validarPassword(). Si ambos campos son validos, simula un inicio de sesion mostrando un mensaje de bienvenida en el modal (no hay backend ni base de datos real, solo se valida el formato):

```javascript
function iniciarSesion() {
    let correo = document.getElementById("correo").value.trim();
    let password = document.getElementById("password").value;

    if (!validarCorreo(correo)) {
        alert("El correo no tiene un formato valido.");
        return;
    }

    if (!validarPassword(password)) {
        alert("La contrasena necesita mayuscula, minuscula, numero, caracter especial y minimo 8 caracteres.");
        return;
    }

    document.getElementById("mensajeModal").textContent =
        "Bienvenido/a, " + correo + ". Tu sesion se inicio correctamente.";

    document.getElementById("modalEdad").classList.add("activo");
}

function cerrarModal() {
    document.getElementById("modalEdad").classList.remove("activo");
}
```

 CSS requerido para que el modal funcione

El modal necesita estas reglas en styles.css para permanecer oculto hasta que el registro o el login sean exitosos, y aparecer como ventana flotante centrada (no como texto fijo en la pagina):

```css
.modal-fondo{
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-fondo.activo{
    display: flex;
}

.modal-caja{
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}
```
<img width="1907" height="955" alt="image" src="https://github.com/user-attachments/assets/f0447d14-a674-461a-aee7-cc5355e13fef" />
<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/823444f2-f446-4148-bfe4-9d8536694eb6" />


¿Qué problema resuelve este formulario?
Cuando alguien se registra en un sitio web, es común que cometa errores sin darse cuenta: escribe su correo mal, elige una contraseña débil y fácil de adivinar, olvida completar algún campo, o incluso mete letras donde debería ir un número de teléfono. Sin una validación adecuada, esos datos incorrectos terminan guardándose tal cual, generando cuentas con información inválida o insegura.
Este formulario de registro resuelve ese problema validando cada campo en tiempo real, antes de aceptar el registro:

Verifica que el nombre contenga solo letras, evitando números o símbolos por error.
Confirma que el correo electrónico tenga un formato válido.
Revisa que el teléfono tenga exactamente 10 dígitos.
Obliga a que la contraseña sea realmente segura (mayúscula, minúscula, número y carácter especial).
Calcula automáticamente la edad a partir de la fecha de nacimiento y bloquea el registro si la persona es menor de edad.
Como valor agregado, sugiere un nombre de usuario automáticamente a partir del nombre ingresado, ahorrándole ese paso al usuario.

---

Las 6 funciones obligatorias estan implementadas y documentadas correctamente. El formulario de index.html usa las 6 validaciones, incluyendo validarLongitud() sobre el campo numero. La ventana modal (#modalEdad) muestra la edad calculada al registrarse con exito, y ya cuenta con el CSS de overlay necesario para funcionar como ventana flotante. El archivo login.html usa validarPassword y validarCorreo, y ademas simula un inicio de sesion mostrando un mensaje de bienvenida. Las 2 funciones adicionales de invencion propia (validarTelefono y generarNombreUsuario) tambien estan completas y documentadas igual que las obligatorias.
