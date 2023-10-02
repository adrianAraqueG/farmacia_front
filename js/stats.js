window.onload = function() {
    const selectElement = document.getElementById("select-endpoints");
    selectElement.selectedIndex = 0;
};

const mainSection = document.querySelector('#endpoints-section');
const selectEndpoint = document.querySelector('#select-endpoints');

selectEndpoint.addEventListener('change', () =>{
    endpointOption = selectEndpoint.value;

    switch(endpointOption){
        case 'medsBajoStock':
            UI.showSpinner('endpoints-section');
            API.getMedicamentosBajoStock()
                .then(response =>{
                    UI.deleteSpinner();
                    UI.printMeds(mainSection, response);
                });
            break;
        case 'medsXProveedor':
            UI.showSpinner('endpoints-section');

            let proveedor = prompt('Nombre del Proveedor: ');
            API.getMedicamentosPorProveedor(proveedor)
                .then(response =>{
                    UI.deleteSpinner();
                    mainSection.innerHTML = `
                        <h2 class="me-auto">${proveedor}</h2>
                    `;

                    console.log(response);
                    UI.printMeds(mainSection, response);
                });
            break;
        case 'ventasXMed':
            UI.showSpinner('endpoints-section');

            let medicamento = prompt('Nombre del Medicamento: ');
            API.getTotalVentaMedicamento(medicamento)
                .then(response =>{
                    UI.deleteSpinner();
                    mainSection.innerHTML = `
                        <h2 class="me-auto">${medicamento}</h2>
                        <p class="me-auto">Total de ventas: ${response}</p>
                    `;
                });
            break;
        case 'ventasTotalesXProveedor':
            UI.showSpinner('endpoints-section');

            API.getTotalMedicamentosVendidos()
                .then(response =>{
                    UI.deleteSpinner();
                    response.forEach(reg => {
                        mainSection.innerHTML += `
                            <h2 class="me-auto">${reg.nombreProveedor}</h2>
                            <p class="me-auto">Total de ventas: ${reg.totalVendido}</p>
                        `
                    });
                    
                });
            break;
        case 'medsNoVendidos':
            UI.showSpinner('endpoints-section');

            API.getTotalMedicamentosNOVendidos()
                .then(response =>{
                    UI.deleteSpinner();
                    UI.printMeds(mainSection, response);
                });
            break;
        case 'provsAndMeds':
            UI.showSpinner('endpoints-section');

            API.getProveedoresMedicamentos()
                .then(response =>{
                    UI.deleteSpinner();
                    console.log(response);
                    UI.printProovs(mainSection, response);
                });
            break;
        case 'recetas2023':
            UI.showSpinner('endpoints-section');

            API.getRecetas2023()
                .then(response =>{
                    UI.deleteSpinner();
                    console.log(response);
                    UI.printRecetaYCliente(mainSection, response);
                });
            break;
        case 'medsCaducanAntes2024':
            UI.showSpinner('endpoints-section');

            API.getMedsCanducanAntes2024()
                .then(response =>{
                    UI.deleteSpinner();
                    UI.printMeds(mainSection, response);
                });
            break;
        case 'totalRecaudado':
            UI.showSpinner('endpoints-section');

            API.getTotalDineroRecaudado()
                .then(response =>{
                    UI.deleteSpinner();
                    mainSection.innerHTML = `
                        <h2 class="me-auto">Total Venta de Medicamentos: $${response}</h2>
                    `;
                });
            break;
        case 'medMasCaro':
            UI.showSpinner('endpoints-section');

            API.getMedicamentoMasCaro()
                .then(response =>{
                    UI.deleteSpinner();
                    UI.printMeds(mainSection, [response]);
                });
            break;
        default:
            console.log('Invalido');
            break;
    }
});
