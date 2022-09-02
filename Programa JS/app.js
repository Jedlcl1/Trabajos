const orden = [];
const platos = [
    {
        id: 1,
        nombre: "Pollo Asado",
        precio: 180,
    },
    {
        id: 3,
        nombre: "Carne Asada",
        precio: 200,
    },
    {
        id: 4,
        nombre: "Café",
        precio: 30,
    }
];

const elementosDelDOM = (function () {
    const divDeComidas = document.getElementById("comidas");
    const divDeOrdenes = document.getElementById("ordenes_agregadas");
    const totalDeComida = document.getElementById("precio_total");
    const propinaSugerida = document.getElementById("propina_sugerida");
    const divDePlatos = document.getElementById("platos");
    return {
        divDeComidas, divDeOrdenes, totalDeComida, propinaSugerida, divDePlatos,
    }
})();

const funcionesDePantalla = (function () {
    const transformarAEtiquetas = objeto => `
    <div className="carta_de_comida">
    <div className="cabeza_de_carta">
        <h3>${objeto.nombre}</h3>
    </div>
    <div className="pie_de_carta">${objeto.precio}</div>
    <button id="agregar_a_orden">Agregar</button>
</div>
    `;
    const mostrarEnPantalla = (div) =>(string) => {
        div.innerHTML = "";
        div.innerHTML = string; 
    };

    const reducirEtiquetas = (acc,item)=>`${acc+item}` 

    const modificarArray = fn=> div=> array=>{
        if(array.length === 0) return;
        const stringDeEtiquetas= array.map(fn).reduce(reducirEtiquetas)
        mostrarEnPantalla(div)(stringDeEtiquetas)
    };

    const transformarEtiquetasDeOrden = (objeto) => `<div className="carta_de_ordenes">
        <h3>${objeto.nombre} ${objeto.precio}</h3>
    </div>`;

    const modificarArrayDePlatos = modificarArray(transformarAEtiquetas);
    const modificarArrayDeOrdenes = modificarArray(transformarEtiquetasDeOrden); 

    return{
        modificarArrayDePlatos, modificarArrayDeOrdenes,mostrarEnPantalla,
    };
})();

const {
    divDeComidas, divDeOrdenes, totalDeComida, propinaSugerida, divDePlatos
} = elementosDelDOM;

const agregarAOrden = (item)=>(array)=>{
    array.push(item);
};
const encontrarPlato = (nombre) => platos.find(item => item.nombre === nombre);

const sumarTotalDeComida = (array) => array.reduce((acc, item) => acc + parseInt(item.precio), 0);

const calcularPropina = (porcentaje) => (valor) => (porcentaje * valor)/100;

const obtenerPropina10 = calcularPropina(10);//se puede eleegir cualquier porcentaje para la propina.

const manejarElClick = (e) =>{
    if(e.target.id === "agregar_a_orden"){
        const nombreDelPLato = e.target.parentElement.childNodes[1].childNodes[1].innerText;
        agregarAOrden(encontrarPlato(nombreDelPLato))(orden);
        funcionesDePantalla.modificarArrayDeOrdenes(divDeOrdenes)(orden);
        funcionesDePantalla.mostrarEnPantalla(totalDeComida)(sumarTotalDeComida(orden));
        funcionesDePantalla.mostrarEnPantalla(propinaSugerida)(obtenerPropina10(sumarTotalDeComida(orden)));
    }
}

divDePlatos.onclick = manejarElClick;

funcionesDePantalla.modificarArrayDePlatos(divDeComidas)(platos);