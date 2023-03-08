const productos = [
   { nombre :"iphone 7",
    id :" iphone-7",
    imagen :"./img/iphone.jpeg",
    precio :2000,
    categoria:{
    id: "iphone",
    nombre :"iphone"}
    }   ,
    { nombre :"iphone 7s",
    id :" iphone-7s",
    imagen :"./img/iphone.jpeg",
    precio :2000,
    categoria :{
    id: "iphone",
    nombre :"iphone"}
    },
    { nombre :"iphone x",
    id :" iphone-x",
    imagen :"./img/iphone.jpeg",
    precio :3000,
    categoria :{
    id: "iphone",
    nombre :"iphone"}
    },
    { nombre :"iphone 8",
    id :" iphone-8",
    imagen :"./img/iphone.jpeg",
    precio :2000,
    categoria:{
    id: "iphone",
    nombre :"iphone"}

    },
    { nombre :"iphone 10",
    id :" iphone-10",
    imagen :"./img/iphone.jpeg",
    precio :3000,
    categoria :{
    id: "iphone-",
    nombre: "iphone"}
    },
    { nombre :"samsung j7",
    id :" samsung-j7",
    imagen :"./img/samguns.jpeg",
    precio :2500,
    categoria :{
    id: "samsung",
    nombre: "samsung"}
    },
    { nombre :"samsung x5",
    id :" samsung-x5",
    imagen :"./img/samguns.jpeg",
    precio :2500,
    categoria :{
    id: "samsung",
    nombre: "samsung"}
    },
    { nombre :"samsung j9",
    id :" samsung-j9",
    imagen :"./img/samguns.jpeg",
    precio :2500,
    categoria :{
    id: "samsung",
    nombre: "samsung"}
    },
    { nombre :"samsung j8",
    id :" samsung-j8",
    imagen :"./img/samguns.jpeg",
    precio :2700,
    categoria :{
    id: "samsung",
    nombre: "samsung"}
    },  
     { nombre :"motorola 4",
    id :" motorola-4",
    imagen :"./img/motorola.png",
    precio :2750,
    categoria :{
    id: "motorola",
    nombre: "motorola"}
    },
    { nombre :"motorola 5",
    id :" motorola-5",
    imagen :"./img/motorola.png",
    precio :2950,
    categoria :{
    id: "motorola",
    nombre: "motorola"}
    },
    { nombre :"motorola 7",
    id :" motorola-7",
    imagen :"./img/motorola.png",
    precio :3750,
    categoria :{
    id: "motorola",
    nombre: "motorola"}
    },
    { nombre :"motorola 10",
    id :" motorola-10",
    imagen :"./img/motorola.png",
    precio :3350,
    categoria :{
    id: "motorola",
    nombre: "motorola"}
    },
    { nombre :"motorola 9",
    id :" motorola-9",
    imagen :"./img/motorola.png",
    precio :2350,
    categoria :{
    id: "motorola",
    nombre: "motorola"}
    },



];



const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {



    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    console.log(productosEnCarrito)

    actualizarNumerito();
   

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
