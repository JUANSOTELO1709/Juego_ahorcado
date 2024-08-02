//Seletores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = (document.getElementById(
  "btn-nuevo-juego"
).style.display = "none");
let btnSalirDesaparecer = (document.getElementById("btn-salir").style.display =
  "none");
let divAgregarPalabra = (document.getElementById(
  "agregar-palabra"
).style.display = "none");
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");

var palabras = [
  "BOGOTA",
  "MONTERIA",
  "CALI",
  "CARTAGENA",
  "IBAGUE",
  "SANTAMARTA",
  "PASTO",
  "MEDELLIN",
];


var tablero = document.getElementById("horca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8;
let letraElegida = [];

//eventos

// captura el id "iniciar-juego" en el click y direcciona el program al método dque inicia el juego
document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
};

// captura el id "btn-guardar", guarda la palabra agregada y inicia el juego
document.getElementById("btn-guardar").onclick = () => {
  guardarPalabra();
};

//actualiza la pantalla cuando el usuario hace click en el botón "nuevo juego"
btnNuevoJuego.addEventListener("click", function () {
  location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el botón "salir"
btnSalir.addEventListener("click", function () {
  location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el botón "cancelar"
btnCancelar.addEventListener("click", function () {
  location.reload();
});

//sortea la palabra que será usada en el ahorcado
function escojerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
  return palabra;
}

// verifica cual es la letra en que el usuario hizo clic
function verificarLetraClicada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key);
    return true;
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function adicionarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1;
  }
}

/**
 * The function "verificarFinJuego" checks if the chosen letter is incorrect and updates the incorrect
 * letters list, triggering a loss condition if the number of errors exceeds a set limit.
 * @param letra - The `verificarFinJuego` function seems to be checking if the game should end based on
 * the chosen letter. However, it looks like some parts of the code are missing, such as the
 * definitions for `letraElegida`, `palabraSecreta`, `letrasIncorrectas
 */
function verificarFinJuego(letra) {
  if (letraElegida.length < palabraSecreta.length) {
    letrasIncorrectas.push(letra);

    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste();
    } else if (letraElegida.length < palabraSecreta.length) {
      adicionarLetraIncorrecta(letra);
      escribirLetraIncorrecta(letra, errores);
    }
  }
}

//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {
    ganaste();
  }
}

/**
 * The function "verificarLetra" checks if a given keyCode corresponds to a letter in the English
 * alphabet.
 * @param keyCode - The `keyCode` parameter in the `verificarLetra` function is expected to be a number
 * representing the key code of a keyboard key. The function checks if the key code corresponds to a
 * letter in the English alphabet (uppercase letters A-Z) by ensuring that the key code is between 65
 * @returns The function `verificarLetra` is checking if the `keyCode` parameter is a number within the
 * range of uppercase letters in the ASCII table (65 to 90). If the `keyCode` meets these conditions,
 * the function returns `true`, indicating that the keyCode corresponds to an uppercase letter.
 * Otherwise, it returns `false`.
 */
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

//hace con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
function ensenarPantallaDeAgregarPalabra() {
  document.getElementById("div-desaparece").style.display = "none";
  document.getElementById("agregar-palabra").style.display = "block";
}

// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {
  //captura lo que el usuario ha digitado
  let nuevaPalabra = document.getElementById("input-nueva-palavra").value;

  // incluye la palabra que el usuario digitó en el array de las palabras a seren sorteadas
  if (nuevaPalabra !== "") {
    palabras.push(nuevaPalabra.toUpperCase());
    alert("La palabra fue guardada");

    // hace con que los componentes de la pantalla de agregar palabra desaparezcan
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  } else {
    alert("Ninguna palabra ha sido digitada");
  }
}

//inicia el juego
function iniciarJuego() {
  // hace con que los de iniciar juego e agregar palabra desaparezcan
  document.getElementById("div-desaparece").style.display = "none";

  //llama la función que dibuja el tablero del ahorcado
  dibujarTablero();

  //llama la función que sortea la palabra
  escojerPalabraSecreta();

  //llama la función que dibuja las líneas donde el usuario escribirá
  dibujarLineas();

  // hace con que los botones de nuevo juego e salir aparezcan
  document.getElementById("btn-nuevo-juego").style.display = "block";
  document.getElementById("btn-salir").style.display = "block";

  // captura la letra que el usuario escribió
  document.onkeydown = (e) => {
    // pone la letra en letra mayuscula
    let letra = e.key.toUpperCase();
    //verifica si el usuario todavia no ha perdido
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          adicionarLetraCorrecta(palabraSecreta.indexOf(letra));
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escrribirLetraCorrecta(i);
              verificarVencedor(letra);
            }
          }
        }
        // si el usuario cometió más errores de los que son permitidos,
        //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
        else {
          if (!verificarLetraClicada(e.key) && !verificarVencedor(letra))
            return;
          dibujarAhorcado(errores);
          verificarFinJuego(letra);
        }
      }
    } else {
      alert("has atingido el límite de letras incorrectas");
    }
  };
}
