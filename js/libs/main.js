/**
 * CONFIGURATIONS
 */
const LS = window.localStorage;
const API_URL = 'https://api.beautykatherin.com';

console.log('Cambio 1');

/**
 * API
 */
class API{
    static getMedicamentos(){
        return fetch(API_URL + '/api/farmacia/medicamento')
        .then(async response => {
            let result = await response.json();;
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    };

    static getMedicamentosBajoStock(){
        return fetch(API_URL + '/api/farmacia/medicamento/consultaMedicamentosBajoStock')
        .then(async response => {
            let result = await response.json();;
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getMedicamentosPorProveedor(nombreProveedor){
        return fetch(API_URL + `/api/farmacia/medicamento/consultaPorProveedor/${nombreProveedor}`)
        .then(async response => {
            let result = await response.json();;
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getTotalVentaMedicamento(medicamento){
        return fetch(API_URL + `/api/farmacia/medicamento/totalVentas/${medicamento}`)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getTotalMedicamentosVendidos(){
        return fetch(API_URL + `/api/farmacia/proveedor/totalMedicamentosVendidos`)
        .then(async response => {
            let result = await response.json();
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }
    
    static getTotalMedicamentosNOVendidos(){
        return fetch(API_URL + `/api/farmacia/medicamento/medicamentosNoVendidos`)
        .then(async response => {
            let result = await response.json();
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getProveedoresMedicamentos(){
        return fetch(API_URL + `/api/farmacia/proveedor/proveedores-medicamentos`)
        .then(async response => {
            let result = await response.json();
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getRecetas2023(){
        return fetch(API_URL + `/api/farmacia/recetamedica/recetas-post-2023`)
        .then(async response => {
            let result = await response.json();
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getMedsCanducanAntes2024(){
        return fetch(API_URL + `/api/farmacia/medicamento/caducan-antes-2024`)
        .then(async response => {
            let result = await response.json();
            return result.$values;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getTotalDineroRecaudado(){
        return fetch(API_URL + `/api/farmacia/detalleventa/total-recaudado`)
        .then(async response => {
            let result = await response.json();
            return result;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }

    static getMedicamentoMasCaro(){
        return fetch(API_URL + `/api/farmacia/medicamento/medicamento-mas-caro`)
        .then(async response => {
            let result = await response.json();
            return result;
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    }
}


/**
 * IU
 */
class UI{

    /**
     * VENDER
     */
    static printTableMeds(idTable, regs, option) {
        const table = document.querySelector(`#${idTable}`);
        table.innerHTML = '';
        
        if(option === 'allinfo'){
            if(medicamentos.length > 0){
                try{
                    document.querySelector('#meds-spinner').innerHTML = '';
                }catch(err){
                    console.log('no spinner');
                }
                
            }else{
                document.querySelector('#meds-spinner').innerHTML = `
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                `;
            }

            regs.forEach(med => {
                let cantCart = 0;
                carrito.forEach(regCart => {
                    if(regCart.id === med.id){
                        cantCart = regCart.cant;
                    }
                });

                table.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="./assets/img/med1.png" alt="med-img" style="width: 45px; height: 45px"
                                    class="" />
                                <div class="ms-3">
                                    <p class="fw-bold mb-0">${med.nombre}</p>
                                    <p class="badge badge-success rounded-pill d-inline mb-0">${med.concentracion}</p>
                                    <p class="mb-0 mt-2">$${med.precio}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${med.dosisRecomendada}</p>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">${med.contraindicaciones}</p>
                        </td>
                        <td>
                            <span class="badge badge-danger rounded-pill d-inline fs-6">${med.stock}</span>
                        </td>
        
                        <td class="add-buttons">
                            <button option="button" class="btn btn-secondary btn-floating fs-6 me-2" onclick="quitarMed(${med.id})">
                                -
                            </button>
                            <span class="fs-5">${cantCart}</span>
                            <button option="button" class="btn btn-secondary btn-floating fs-6 ms-2" onclick="aggMed(${med.id})">
                                +
                            </button>
                        </td>
                    </tr>
                    `;
            });
        }else if (option === 'cart'){
            if(carrito.length > 0){
                document.querySelector('#carrito-vacio').innerHTML = '';
            }else{
                document.querySelector('#carrito-vacio').innerHTML = `
                <h4 class="text-secondary mt-3">El carrito está vacío...</h4>
                `;
            }

            medicamentos.forEach(med => {
                carrito.forEach(regCart => {
                    if(regCart.id === med.id){
                        table.innerHTML += `
                        <tr>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="./assets/img/med1.png" alt="med-img" style="width: 45px; height: 45px"
                                        class="" />
                                    <div class="ms-3">
                                        <p class="fw-bold mb-0">${med.nombre}</p>
                                        <p class="badge badge-success rounded-pill d-inline mb-0">${med.concentracion}</p>
                                        <p class="mb-0 mt-2">$${med.precio}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="fw-normal mb-1">${med.dosisRecomendada}</p>
                            </td>
                            <td class="add-buttons">
                                <button option="button" class="btn btn-secondary btn-floating fs-6 me-2" onclick="quitarMed(${med.id})">
                                    -
                                </button>
                                <span class="fs-5">${regCart.cant}</span>
                                <button option="button" class="btn btn-secondary btn-floating fs-6 ms-2" onclick="aggMed(${med.id})">
                                    +
                                </button>
                            </td>
                        </tr>
                        `;
                    }
                });
            });
        }
        
    }

    static printProovs(section, regs){
        section.innerHTML = `
        <!-- LISTAR MEDICAMENTOS -->
            <div class="table-responsive rounded-3">
                <table class="table table-secondary table-striped align-middle mb-0 bg-white">
                    <thead class="bg-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Medicamentos</th>
                        </tr>
                    </thead>
                    <tbody id="tabla">
                    </tbody>
                </table>

            </div>
        `;

        regs.forEach(reg =>{
            document.querySelector('#tabla').innerHTML += `
                <tr>
                    <td>
                    <p class="fw-normal mb-1">${reg.nombreProveedor}</p>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${reg.direccion}</p>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${reg.telefono}</p>
                    </td>
                    <td>
                        <p>${reg.medicamentos.$values}</p>
                    </td>
                </tr>
                `;
        });
    }



    /**
     * ENDPOINTS
     */
    static printMeds(section, regs){
        section.innerHTML += `
            <!-- LISTAR MEDICAMENTOS -->
            <div class="table-responsive rounded-3">
                <table class="table table-secondary table-striped align-middle mb-0 bg-white">
                    <thead class="bg-light">
                        <tr>
                            <th>Medicamento</th>
                            <th>Intervalos de Administración</th>
                            <th>Contraindicaciones</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody id="tabla">
                    </tbody>
                </table>

            </div>
        `;
        console.log(regs);
        regs.forEach(med => {
            document.querySelector('#tabla').innerHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="./assets/img/med1.png" alt="med-img" style="width: 45px; height: 45px"
                                class="" />
                            <div class="ms-3">
                                <p class="fw-bold mb-0">${med.nombre}</p>
                                <p class="badge badge-success rounded-pill d-inline mb-0">${med.concentracion}</p>
                                <p class="mb-0 mt-2">$${med.precio}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${med.dosisRecomendada}</p>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${med.contraindicaciones}</p>
                    </td>
                    <td>
                        <span class="badge badge-danger rounded-pill d-inline fs-6">${med.stock}</span>
                    </td>
                </tr>
                `;
        });
    }

    static printRecetaYCliente(section, regs){
        section.innerHTML = `
        <!-- LISTAR MEDICAMENTOS -->
            <div class="table-responsive rounded-3">
                <table class="table table-secondary table-striped align-middle mb-0 bg-white">
                    <thead class="bg-light">
                        <tr>
                            <th>Cliente</th>
                            <th>Detalle Receta</th>
                            <th>Emisión</th>
                        </tr>
                    </thead>
                    <tbody id="tabla">
                    </tbody>
                </table>

            </div>
        `;

        regs.forEach(reg => {
            if(reg.cliente){
                document.querySelector('#tabla').innerHTML += `
                <tr>
                    <td>
                        <p class="fw-normal mb-1">${reg.cliente.nombre}</p>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${reg.cliente.recetasMedicas.$values.forEach(rec => {return 'wtf'})}</p>
                    </td>
                    <td>
                        <p class="fw-normal mb-1">${reg.contraindicaciones}</p>
                    </td>
                    <td>
                        <span class="badge badge-danger rounded-pill d-inline fs-6">${reg.stock}</span>
                    </td>
                </tr>
                `;
            }
        });
    }


    /**
     * SPINNERS
     */
    static showSpinner(divID){
        const divToShow = document.querySelector(`#${divID}`);

        divToShow.innerHTML = `
        <div id="spinner" class="container d-flex justify-content-center">
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        `;
    }

    static deleteSpinner(){
        try{
            const spinner = document.querySelector('#spinner');
            spinner.remove();
        }catch(err){
            console.log(err);
        }
    }
}