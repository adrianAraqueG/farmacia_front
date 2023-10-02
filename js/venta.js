/**
 * START 
 */
let loaded = false;
let medicamentos = [];
let carrito = [];
API.getMedicamentos()
    .then((meds)=>{
        loaded = true;
        medicamentos = meds
        UI.printTableMeds('lista-medicamentos', medicamentos, 'allinfo');
        UI.printTableMeds('lista-carrito', medicamentos, 'cart');
    });

const inputBuscar = document.querySelector('#buscarMedicamento');
inputBuscar.addEventListener('keyup', buscarMedicamentos);

const btnVaciarCarrito = document.querySelector('#buscarMedicamento');
inputBuscar.addEventListener('keyup', buscarMedicamentos);


/**
 * FUNCTIONS
 */
function buscarMedicamentos() {

    if (inputBuscar.value === '') {
        UI.printTableMeds('lista-medicamentos', medicamentos, 'allinfo');
    } else {
        let busqueda = [];

        busqueda = medicamentos.filter(med => {return med.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase());});
        UI.printTableMeds('lista-medicamentos', busqueda, 'allinfo');
    }

}

function vaciarCarrito(){

}

function aggMed(id){
    let med = medicamentos.filter(med => {return med.id === id})[0];
    if(parseInt(med.stock) > 0){
        if(carrito.filter(med =>{return med.id === id}).length === 0){

            carrito.push({id, cant: 1, idProveedor: 0});
            medicamentos = medicamentos.map(med => { if(med.id === id){ med.stock -= 1} return med});

            UI.printTableMeds('lista-medicamentos', medicamentos,'allinfo');
            UI.printTableMeds('lista-carrito', medicamentos, 'cart');

        }else{
            carrito = carrito.map(med => { if(med.id === id){med.cant += 1} return med})
            medicamentos = medicamentos.map(med => { if(med.id === id){ med.stock -= 1;} return med});

            UI.printTableMeds('lista-medicamentos', medicamentos, 'allinfo');
            UI.printTableMeds('lista-carrito', medicamentos, 'cart');
        }
    }else{
        console.log('No hay más stock');
    }
}

function quitarMed(id){
    let regCart = carrito.filter(med => {return med.id === id}).length !== 0 ? carrito.filter(med => {return med.id === id})[0] : false;
    if(regCart){

        if(regCart.cant === 1){
            carrito = carrito.filter(reg => {if(reg.id !== regCart.id){ return reg}});
            medicamentos = medicamentos.map(med => { if(med.id === regCart.id){ med.stock += 1} return med});

            UI.printTableMeds('lista-medicamentos', medicamentos,'allinfo');
            UI.printTableMeds('lista-carrito', medicamentos,'cart');

        }else{
            carrito = carrito.map(med => { if(med.id === id){med.cant -= 1} return med})
            medicamentos = medicamentos.map(med => { if(med.id === regCart.id){ med.stock += 1} return med});

            UI.printTableMeds('lista-medicamentos', medicamentos, 'allinfo');
            UI.printTableMeds('lista-carrito', medicamentos, 'cart');
        }
        
    }else{
        console.log("No existe, no se puede reducir");
    }
}

