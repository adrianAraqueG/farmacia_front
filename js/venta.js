/**
 * CARGAR DATOS LOCALES
 */
let loaded = false;
let medicamentos = [];
API.getMedicamentos()
    .then((meds)=>{
        loaded = true;
        medicamentos = meds;
        UI.printTableMeds('lista-medicamentos', medicamentos, 'allinfo');
        UI.printTableMeds('lista-carrito', medicamentos, 'cart');
    });

const inputBuscar = document.querySelector('#buscarMedicamento');
inputBuscar.addEventListener('keyup', buscarMedicamentos);


function buscarMedicamentos() {

    if (inputBuscar.value === '') {
        UI.printTableMeds('lista-medicamentos', medicamentos, 'allinfo');
    } else {
        let busqueda = [];

        busqueda = medicamentos.filter(med => {return med.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase());});
        UI.printTableMeds('lista-medicamentos', busqueda, 'allinfo');
    }

}

