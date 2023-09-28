/**
 * CONFIGURATIONS
 */
const LS = window.localStorage;
const API_URL = 'https://api.beautykatherin.com';



/**
 * API
 */

class API{
    static getMedicamentos(){
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
            regs.forEach(med => {
                table.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="./assets/img/med1.png" alt="med-img" style="width: 45px; height: 45px"
                                    class="rounded-circle" />
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
        
                        <td>
                            <button option="button" class="btn btn-secondary btn-floating fs-6 me-2">
                                -
                            </button>
                            <span class="fs-5">0</span>
                            <button option="button" class="btn btn-secondary btn-floating fs-6 ms-2">
                                +
                            </button>
                        </td>
                    </tr>
                    `;
            });
        }else if (option === 'cart'){
            regs.forEach(med => {
                table.innerHTML += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img src="./assets/img/med1.png" alt="med-img" style="width: 45px; height: 45px"
                                    class="rounded-circle" />
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
                            <button option="button" class="btn btn-secondary btn-floating fs-6 me-2">
                                -
                            </button>
                            <span class="fs-5">0</span>
                            <button option="button" class="btn btn-secondary btn-floating fs-6 ms-2">
                                +
                            </button>
                        </td>
                    </tr>
                    `;
            });
        }
    }
}