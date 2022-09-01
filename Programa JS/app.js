const orden = [];
const platos = [
    {
        id: 1,
        nombre: "Pollo Asado",
        precio: 180,
    },
    {
        id: 2,
        nombre: "Pedazo de Pizza",
        precio: 25,
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
    const divDePlatos = document.getElementById("platoss");
    return {
        divDeComidas, divDeOrdenes, totalDeComida, propinaSugerida, divDePlatos
    }
})();

const funcionesDePantalla = (function () {
    const transformarAEtiquetas = objeto => {`
    <div className="carta_de_comida">
    <div className="cabeza_de_carta">
        <h3>objeto.nombre</h3>
    </div>
    <div className="pie_de_carta">objeto.precio</div>
    <button id="agregar_a_orden">Agregar</button>
</div>
    `;
    }
    const mostrarEnPantalla = (div) =>(string=> {
        div.innerHTML = "";
        div.innerHTML = string
    };

    const reducirEtiquetas = (acc,item)=>`${acc+item}`;

    const modificarArray = (fn)=> (div)=> (array)=>{
        if(array.length === 0) return;
        const stringDeEtiquetas= array.map(fn).reduce(reducirEtiquetas)
        mostrarEnPantalla(div)(stringDeEtiquetas);
    }

    const transformarEtiquetasDeOrden = objeto => `<div className="carta_de_ordenes">
        <h3>objeto.nombreobjeto.precio</h3>
    </div>`

    const modificarArrayDePlatos = modificarArray(transformarAEtiquetas);
    const modificarArrayDeOrdenes = modificarArray(transformarEtiquetasDeOrden); 

    return{
        modificarArrayDePlatos, modificarArrayDeOrdenes,mostrarEnPantalla
    };
})();



