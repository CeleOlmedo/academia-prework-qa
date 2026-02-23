
//Parte 1 - Variables y Tipos

// Declaración de variables constantes y modificables
const nombre = "Celeste";
let edad = 25;
let esEstudiante = true;
let ubicacion = "Córdoba, Argentina";
let telefono = "3178901234";

//Parte 2 - Funcion suma

//Funcion que recibe como parámetro 2 números y devuelve la suma
function suma(a, b) {
    return a + b;
}

//Imprimimos en pantalla un ejemplo de la función
console.log("La suma de 3 y 8 es:", suma(3, 8));

//Parte 3 - Crear un Array de objetos con 3 casos de prueba

//Declaración del array
const casosDePrueba = [
    { id: 1, titulo: "Registro correcto", esperado: "Usuario registrado correctamente" },
    { id: 2, titulo: "Contraseña incorrecta", esperado: "La contraseña es incorrecta" },
    { id: 3, titulo: "Usuario no existe", esperado: "El usuario no existe" },
];

// Recorremos el array e imprimimos cada caso
casosDePrueba.forEach(caso => {
    console.log("------------------------");
    console.log("ID:", caso.id);
    console.log("Título:", caso.titulo);
    console.log("Resultado esperado:", caso.esperado);
    console.log("------------------------");
});

//Parte 4 - Async/Await

// Función que simula una espera de 3 segundos
function esperar() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Listo después de esperar");
        }, 3000);
    });
}

// Función async que usa await
async function ejecutarAsync() {
    console.log("Esperando...");
    let mensaje = await esperar();
    console.log(mensaje);
}

ejecutarAsync();