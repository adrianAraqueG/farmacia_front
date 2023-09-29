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
    static getMedicamento(){
        return fetch(API_URL + '/api/farmacia/medicamento')
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error('Hubo un problema:', error.message);
        });
    };
}


/**
 * IU
 */
class UI{
    static printTableMeds(idTable, regs, option) {
        const table = document.querySelector(`#${idTable}`);
        table.innerHTML = '';
        
        if(option === 'allinfo'){
            if(medicamentos.length > 0){
                document.querySelector('#meds-spinner').innerHTML = '';
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

    static printProveedores(){
        console.log('clientes');
    }
}