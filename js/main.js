/* Clase constructora de productos */
class Producto {
    constructor(id, nombre, categoria, marca, precio, img) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.categoria = categoria;
        this.marca = marca;
        this.precio = parseFloat(precio);
        this.img = img;
    }
}
/* Instanciamos productos */
const producto1 = new Producto(1, "Procesador Intel Core i9 12900KF 5.2GHz Turbo Socket 1700", "Procesador", "Intel", 134850, "producto1.png");
const producto2 = new Producto(2, "Procesador Intel Core i7 12700K 5.0GHz Turbo Socket 1700", "Procesador", "Intel", 109500, "producto2.png");
const producto3 = new Producto(3, "Procesador AMD Ryzen 9 5950X 4.9GHz Turbo AM4", "Procesador", "AMD", 157750, "producto3.png");
const producto4 = new Producto(4, "Procesador AMD Ryzen 9 5900X 4.8GHz Turbo AM4", "Procesador", "AMD", 115250, "producto4.png");
const producto5 = new Producto(5, "Placa de Video ASUS GeForce RTX 3090 24GB GDDR6X ROG STRIX GAMING White OC", "Placa de Video", "Asus", 391150, "producto5.png");
const producto6 = new Producto(6, "Placa de Video MSI GeForce RTX 3090 24GB GDDR6X GAMING X TRIO", "Placa de Video", "MSI", 359900, "producto6.png");
const producto7 = new Producto(7, "Mother Gigabyte Z590 Aorus Ultra Socket 1200 10th Gen", "Motherboard", "Gigabyte", 75850, "producto7.png");
const producto8 = new Producto(8, "Mother ASUS ROG STRIX Z590-I GAMING WIFI", "Motherboard", "Asus", 66070, "producto8.png");
const producto9 = new Producto(9, "Gabinete Cooler Master COSMOS C700M ARGB E-ATX", "Gabinete", "Cooler Master", 110590, "producto9.png");
const producto10 = new Producto(10, "Gabinete Thermaltake V200 Tempered Glass Ryzen Edition", "Gabinete", "Thermaltake", 8290, "producto10.png");





const stockProductos = [];
stockProductos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosDiv = document.getElementById("productos");
const carritoDiv = document.getElementById("carrito");








// --------------------------FUNCIONES--------------------------

/* Crear Cards */
function crearCards(array) {
    productosDiv.innerHTML = ``;
    array.forEach(producto => {
        productosDiv.innerHTML += `<div class="card">
        <h3>${producto.nombre}</h3>
        <img src="./img/productos/${producto.img}">
        <p>$${producto.precio}</p>
        <button id="btnAgregarCarrito${producto.id}">Agregar</button>
        </div>`;
    })
    funcionBotonAgregar(array);
}

/* Seleccionar Boton Agregar al Carrito */
function funcionBotonAgregar(array) {
    array.forEach(producto => {
        document.getElementById(`btnAgregarCarrito${producto.id}`).addEventListener("click", () => {
            agregarAlCarrito(producto);
        })
    })
}

/* Funcion Agregar al Carrito */
function agregarAlCarrito(producto) {
    let existe = carrito.some(prod => prod.id === producto.id);
    if (existe === false) {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    else {
        let prodFind = carrito.find(prod => prod.id === producto.id);
        prodFind.cantidad++;
    }
    renderizarCarrito();
}

/* Funcion Renderizar Carrito */
function renderizarCarrito() {
    carritoDiv.innerHTML = ``;
    carrito.forEach(prod => {
        carritoDiv.innerHTML += `<div class="carritoCard">
        <h3>${prod.nombre}</h3>
        <p>Cantidad: ${prod.cantidad}</p>
        <p>Precio: $${prod.precio}</p>
        <button id="btnBorrarCarrito${prod.id}">Borrar</button>
        <button id="btnBorrarUnoCarrito${prod.id}">-</button>
        </div>`;
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarDelCarrito();
    borrarUnoDelCarrito();
}

/* Funcion Borrar Elemento Completo del Carrito */
function borrarDelCarrito() {
    carrito.forEach((producto => {
        document.getElementById(`btnBorrarCarrito${producto.id}`).addEventListener("click", () => {
            let indice = carrito.findIndex(el => el.id === producto.id);
            carrito.splice(indice, 1);
            renderizarCarrito();
        })
    }))
}

/* Funcion Borrar un Elemento del Carrito */
function borrarUnoDelCarrito() {
    carrito.forEach((producto => {
        document.getElementById(`btnBorrarUnoCarrito${producto.id}`).addEventListener("click", () => {
            if (producto.cantidad === 1) {
                let indice = carrito.findIndex(el => el.id === producto.id);
                carrito.splice(indice, 1);
            }
            else {
                producto.cantidad--;
            }
            renderizarCarrito();
        })
    }))
}

/* Filtrar busqueda */
function filtrarNombre(arr, filtro) {
    const filtrado = arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filtro);
    });
    return filtrado;
}

/* Evento Busqueda */
function eventoBusqueda() {
    const btnBuscador = document.getElementById("btnBuscadorProductos");
    const buscador = document.getElementById("buscadorProductos");
    btnBuscador.addEventListener("click", (e) => {
        e.preventDefault();
        let resultadoBusqueda = filtrarNombre(stockProductos, buscador.value.toLowerCase());
        console.log(resultadoBusqueda);
        crearCards(resultadoBusqueda);
    })
}

/* Filtrar array por propiedad categoria */
function filtrarCategoria(arr, filtro) {
    const filtrado = arr.filter(el => el.categoria.toLowerCase() === filtro.toLowerCase())
    return filtrado;
}

/* Evento de filtro por categoria */
function eventoCategoria() {
    const btnCategoria = document.getElementById("btn-categoria"),
        radioProcesador = document.getElementById("filtro-procesador"),
        radioPlaca = document.getElementById("filtro-placa"),
        radioMother = document.getElementById("filtro-mother"),
        radioGabinete = document.getElementById("filtro-gabinete");

    btnCategoria.addEventListener("click", (e) => {
        e.preventDefault();
        let resultado;
        if (radioProcesador.checked) {
            resultado = filtrarCategoria(stockProductos, "procesador");
        }
        else if (radioPlaca.checked) {
            resultado = filtrarCategoria(stockProductos, "placa de video");
        }
        else if (radioMother.checked) {
            resultado = filtrarCategoria(stockProductos, "motherboard");
        }
        else if (radioGabinete.checked) {
            resultado = filtrarCategoria(stockProductos, "gabinete");
        }
        else {
            resultado = stockProductos;
        }
        console.log(resultado);
        crearCards(resultado);
    })
}

/* Filtrar array por propiedad marca */
function filtrarMarca(arr, filtro) {
    const filtrado = arr.filter(el => el.marca.toLowerCase() === filtro.toLowerCase())
    return filtrado;
}

/* Evento de filtro por marcas */
function eventoMarca() {
    const btnMarca = document.getElementById("btn-marca"),
    radioIntel = document.getElementById("filtro-intel"),
    radioAmd = document.getElementById("filtro-amd"),
    radioAsus = document.getElementById("filtro-asus"),
    radioMsi = document.getElementById("filtro-msi"),
    radioGigabyte = document.getElementById("filtro-gigabyte"),
    radioCoolerMaster = document.getElementById("filtro-cooler_master"),
    radioThermaltake = document.getElementById("filtro-thermaltake");

btnMarca.addEventListener("click", (e) => {
    e.preventDefault();
    if (radioIntel.checked) {
        resultado = filtrarMarca(stockProductos, "intel");
    }
    else if (radioAmd.checked) {
        resultado = filtrarMarca(stockProductos, "amd");
    }
    else if (radioAsus.checked) {
        resultado = filtrarMarca(stockProductos, "asus");
    }
    else if (radioMsi.checked) {
        resultado = filtrarMarca(stockProductos, "msi");
    }
    else if (radioGigabyte.checked) {
        resultado = filtrarMarca(stockProductos, "gigabyte");
    }
    else if (radioCoolerMaster.checked) {
        resultado = filtrarMarca(stockProductos, "cooler master");
    }
    else if (radioThermaltake.checked) {
        resultado = filtrarMarca(stockProductos, "thermaltake");
    }
    else {
        resultado = stockProductos;
    }
    crearCards(resultado);
})  
}

/* Filtrar array por rango de precios */
function filtrarPrecio(arr, min, max) {
    const filtrado = arr.filter((el) => {
        return el.precio > min && el.precio < max
    })
    return filtrado;
}

/* Filtrar precio mayor que */
function filtrarMayorQue(arr, min) {
    const filtrado = arr.filter((el) => {
        return el.precio > min
    })
    return filtrado;
}

/* Filtrar precio menor que */
function filtrarMenorQue(arr, max) {
    const filtrado = arr.filter((el) => {
        return el.precio < max
    })
    return filtrado;
}

/* Evento de filtro por precio */
function eventoPrecioMinMax() {
    const btnPrecio = document.getElementById("btn-precio"),
    precioMinimo = document.getElementById("precioMinimo"),
    precioMaximo = document.getElementById("precioMaximo");

btnPrecio.addEventListener("click", (e) => {
    e.preventDefault();
    let resultado;
    if (precioMaximo.value == "") {
        resultado = filtrarMayorQue(stockProductos, precioMinimo.value);
    }
    else if (precioMinimo.value == "") {
        resultado = filtrarMenorQue(stockProductos, precioMaximo.value);
    }
    else if (precioMinimo.value == "" && precioMaximo.value == "") {
        resultado = stockProductos;
    }
    else {
        resultado = filtrarPrecio(stockProductos, precioMinimo.value, precioMaximo.value);
    }
    crearCards(resultado);
})
}

/* Evento Boton Restear Filtro */
    const btnResetFiltro = document.getElementById("btn-reset-filtro");
    const formularios = document.getElementsByClassName("formulario");
    
















// ---------------LLAMADA DE FUNCIONES--------------------

crearCards(stockProductos);
renderizarCarrito();
eventoBusqueda();
eventoCategoria();
eventoMarca();
eventoPrecioMinMax();



