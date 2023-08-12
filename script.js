const selectCantProductos = document.querySelector("#select-1");
const selectCantPermitida = document.querySelector("#select-2");
const selectColores = document.querySelector("#select-3");
const detallesCompra = document.querySelector("#contenedor-informacion-compra");
const compraRealizada = document.querySelector("#contenedor-productos");
const spanCarritoCompraUno = document.querySelector("#contenedor-carrito-1");
const spanCarritoCompraDos = document.querySelector("#contenedor-carrito-2");


const ELECCION_CANT_PRODUC = "Cantidad de productos";
const ELECCION_CANT_PERMIT = "Cantidad de productos permitida por compra";
const ELECCION_COLORES = "Colores seleccionados";


let cantidadTotal = 0;
let posicionSlider = 0;


const IMAGEN_1 = "https://th.bing.com/th/id/OIP.MEN6rI9xH5OaSRv585rDQgHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_2 = "https://th.bing.com/th/id/OIP.HslV9rmsVL4IKIHI0NejvQHaHa?w=165&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_3 = "https://biolieve.net/wp-content/uploads/2017/06/agua-kefir-higo-limon-300x300.png";
const IMAGEN_4 = "https://th.bing.com/th/id/OIP.7QBHzLj30tQrvkggmsu_6QHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_5 = "https://th.bing.com/th/id/OIP.bljCk18c-C2d_zzalpn9cAHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_6 = "https://th.bing.com/th/id/OIP.U0S7WotgXEcH5jcGsqhrQAHaLH?w=141&h=212&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_7 = "https://th.bing.com/th/id/OIP.4mcN6r_vuva_AconAFJRTgHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_8 = "https://th.bing.com/th/id/OIP.V7erebbgETw1uU8CnLtDXwHaHa?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_9 = "https://th.bing.com/th/id/OIP.dNWaYXxxEfY957YxHm6zXQHaHa?w=185&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7";
const IMAGEN_10 = "https://th.bing.com/th/id/OIP.b-v_FCsz2LptlfE0KiOdjwHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7";

const NOMBRE_1 = "Yogurt Vegano";
const NOMBRE_2 = "Queso";
const NOMBRE_3 = "Kefir de Agua";
const NOMBRE_4 = "Tofu";
const NOMBRE_5 = "Hummus";
const NOMBRE_6 = "Pan Integral";
const NOMBRE_7 = "Galletas de Arroz";
const NOMBRE_8 = "Jugo de Naranja";
const NOMBRE_9 = "Crema de Mani";
const NOMBRE_10 = "Huevos Organicos";

const nombres = [NOMBRE_1, NOMBRE_2, NOMBRE_3, NOMBRE_4, NOMBRE_5, NOMBRE_6, NOMBRE_7, NOMBRE_8, NOMBRE_9, NOMBRE_10];
const imagenes = [IMAGEN_1, IMAGEN_2, IMAGEN_3, IMAGEN_4, IMAGEN_5, IMAGEN_6, IMAGEN_7, IMAGEN_8, IMAGEN_9, IMAGEN_10];

const conversionColores = {
  "Ninguno": "None",
  "Amarillo-Rosa": "Gold-Hotpink",
  "Gris-Verde": "lightslategrey-lawngreen",
  "Marron-Celeste": "Chocolate-Skyblue"
};

/**
 * Muestra la informacion de las opciones seleecionadas y llama a las otras funciones
 */
function muestraInfoCompra() {

  detallesCompra.innerHTML = "";

  const eleccionesCompra = [
    `${ELECCION_CANT_PRODUC}: ${selectCantProductos.value}`,
    `${ELECCION_CANT_PERMIT}: ${selectCantPermitida.value}`,
    `${ELECCION_COLORES}: ${selectColores.value}`
  ];

  for (let i = 0; i < eleccionesCompra.length; i++) {
    detallesCompra.innerHTML += `<ul>${eleccionesCompra[i]}</ul>`;
  }

  generaCssInfoCompra();
  mostrarProductos()
  coloresProductos()
  agregarMetodoPago()
  agregarCantidadPermitida()
  agregarBotonCompra()
}

/**
 * Aplica el css al contenedor de la info de la compra solo cuando se hace click al boton
 */
function generaCssInfoCompra() {
  detallesCompra.style.border = "3px solid rgb(1, 1, 21)";
  detallesCompra.style.marginTop = "20px";
  detallesCompra.style.backgroundColor = "lightcyan";
  detallesCompra.style.textAlign = "justify";
}

/**
 * Muestra cada contenedor de producto con sus elementos html
 */
function mostrarProductos() {

  let cantidadProductos = parseInt(selectCantProductos.value);

  compraRealizada.innerHTML = "";

  generaHtmlProductos(cantidadProductos);
  reiniciarSlider();
  crearBotonesSlider();

}

/** Inserta todas las imagenes y html a cada contenedor de los productos
 * 
 * @param {*} cantidadProductos muestra la cantidad de productos seleccionada
 */
function generaHtmlProductos(cantidadProductos) {
  let contenedorProductos = "contenedor productos por def";
  let nombresProductos = "contenedor nombres por def";
  let imgProductos = "contenedor img por def";

  for (let i = 0; i < cantidadProductos; i++) {
    contenedorProductos = creaContenedoresProductos(contenedorProductos);
    nombresProductos = creaTitulosProductos(nombresProductos, i);
    imgProductos = creaImgProductos(imgProductos, i);
    contenedorProductos.appendChild(nombresProductos);
    contenedorProductos.appendChild(imgProductos);
    compraRealizada.appendChild(contenedorProductos);
  }

}
/**
 * Crea cada uno de los contenedores de los productos
 * @param {HtmlDivElement} contenedorProductos contenedores de todos los productos
 * @returns html y la clase de cada uno de los productos
 */
function creaContenedoresProductos(contenedorProductos) {
  contenedorProductos = document.createElement("div");
  contenedorProductos.classList.add("productos");
  contenedorProductos.classList.add("card");
  return contenedorProductos;
}
/**
 * Crea e inserta todos los nombres a cada producto
 * @param {*HtmlH5Element} nombresProductos nombre correspondiente a cada producto
 * @param {*String} i nombres de todos los productos
 * @returns los titulos y la clase de los productos
 */
function creaTitulosProductos(nombresProductos, i) {
  nombresProductos = document.createElement("h6");
  nombresProductos.textContent = nombres[i];
  nombresProductos.classList.add("card-title");
  return nombresProductos;
}

/** Crea e inserta todas las imagenes a cada producto
 * 
 * @param {*HtmlImgElement} imgProductos iamgen correspondiente a cada producto
 * @param {*} i imagenes de todos los productos
 * @returns las imagenes y la clase de los productos
 */
function creaImgProductos(imgProductos, i) {
  imgProductos = document.createElement("img");
  imgProductos.src = imagenes[i];
  imgProductos.classList.add("card-img-top");
  return imgProductos;
}

/**
 * Recibe y aplica la opcion de colores seleccionada a cada uno de los productos
 */
function coloresProductos() {

  const opcionesColores = selectColores.value;
  const coloresRecibidos = conversionColores[opcionesColores].split("-");
  const aplicarColores = document.querySelectorAll(".productos");

  for (let i = 0; i < aplicarColores.length; i++) {
    colores = coloresRecibidos[i % coloresRecibidos.length];
    aplicarColores[i].style.backgroundColor = colores;
  }
}


function agregarMetodoPago() {
  const aplicarMetPago = document.querySelectorAll(".productos");
  let contenedorMetodoPago = "contenedor metodos de pago por def";

  for (let i = 0; i < aplicarMetPago.length; i++) {
    contenedorMetodoPago = document.createElement("div");
    contenedorMetodoPago.classList.add("metodo-pago");

    contenedorMetodoPago.appendChild(document.createElement("label")).textContent = "Seleccione metodo de pago";

    contenedorMetodoPago.appendChild(document.createElement("select")).innerHTML = `
        <option value="efec">Efectivo</option>
        <option value="debi">Debito</option>
        <option value="cred">Credito</option>
      `;

    aplicarMetPago[i].appendChild(contenedorMetodoPago);
  }
}


function agregarCantidadPermitida() {

  const aplicarCantPermitida = document.querySelectorAll(".productos");
  let contenedoresCantidades = "contenedor cantidad permitida por def";
  const cantRecibidas = parseInt(selectCantPermitida.value);

  for (let i = 0; i < aplicarCantPermitida.length; i++) {
    contenedoresCantidades = document.createElement("div");
    contenedoresCantidades.classList.add("cantidades-permitidas");

    contenedoresCantidades.appendChild(document.createElement("label")).textContent = "Seleccione cantidad";
    selectCantidades = document.createElement("select");

    for (let i = 0; i < cantRecibidas; i++) {
      selectCantidades.appendChild(document.createElement("option")).textContent = i + 1;
      selectCantidades.lastChild.value = i + 1;
    }

    contenedoresCantidades.appendChild(selectCantidades);
    aplicarCantPermitida[i].appendChild(contenedoresCantidades);
  }
}

/**
  * Crea e inserta el boton de compra a cada uno de los productos
  */
function agregarBotonCompra() {

  const aplicarBtnCompra = document.querySelectorAll(".productos");
  let botonCompra = "botones de compra por def";

  for (let i = 0; i < aplicarBtnCompra.length; i++) {
    botonCompra = document.createElement("button");
    botonCompra.textContent = "Comprar";
    botonCompra.classList.add("boton-compra");

    botonCompra.addEventListener("click", ComprarProducto);

    aplicarBtnCompra[i].appendChild(botonCompra);
  }

}

/**
 * Agrega la cantidad permitida seleccionada al carrito de compras
 */
function ComprarProducto(event) {
  const botonCantPermProducto = event.target;
  const contenedorProductos = botonCantPermProducto.closest(".productos");
  const cantCarritoCompra = contenedorProductos.querySelectorAll(".cantidades-permitidas select");
  let cantidadSeleccionada = "cantidad seleccionada por def"

  for (let i = 0; i < cantCarritoCompra.length; i++) {
    cantidadSeleccionada = parseInt(cantCarritoCompra[i].value);
    cantidadTotal += cantidadSeleccionada;
  }

  spanCarritoCompraUno.innerHTML = cantidadTotal + "+";
  spanCarritoCompraDos.innerHTML = cantidadTotal + "+";
}

/**
 * Slider de los contenedores de los productos
 * @param {*} direccion permite la ejecucion del slider
 */
function slideProductos(direccion) {
  let slider = document.getElementById("slider");
  let anchoContenedor = document.getElementById("slider-container").offsetWidth;
  let anchoProducto = document.querySelector(".productos").offsetWidth;
  let productosVisibles = Math.floor(anchoContenedor / anchoProducto);
  let maxDesplazamiento = (document.querySelectorAll(".productos").length - productosVisibles) * anchoProducto;

  posicionSlider += direccion * anchoProducto;

  posicionSlider = Math.max(posicionSlider, -maxDesplazamiento);
  posicionSlider = Math.min(posicionSlider, 0);

  slider.style.transform = `translateX(${posicionSlider}px)`;

}

/**
 * Crea los botones para poder manejar el slider
 */
function crearBotonesSlider() {
  let botonAnterior = document.createElement("button");
  let botonSiguiente = document.createElement("button");
  let sliderContainer = document.getElementById("slider-container");

  funcionalidadBotones(botonAnterior, botonSiguiente);

  sliderContainer.insertAdjacentElement("beforebegin", botonAnterior);
  sliderContainer.insertAdjacentElement("afterend", botonSiguiente);
}

/**
 * 
 * @param {*HtmltElement} botonAnterior permite el desplazamiento hacia el siguiente producto
 * @param {*HtmltElement} botonSiguiente permite el desplazamiento hacia el producto anterior
 */
function funcionalidadBotones(botonAnterior, botonSiguiente) {
  botonAnterior.id = "anterior";
  botonAnterior.innerHTML = "&#10094;";
  botonAnterior.addEventListener("click", () => slideProductos(1));

  botonSiguiente.id = "siguiente";
  botonSiguiente.innerHTML = "&#10095;";
  botonSiguiente.addEventListener("click", () => slideProductos(-1));
}

/**
 * Reinicia el slider
 */
function reiniciarSlider() {
  const slider = document.getElementById('slider');
  slider.style.transform = 'translateX(0)';
}