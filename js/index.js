
let steps = 1; // Variable que lleva el control de los pasos del formulario

// Funcion que se ejecuta al presionar el boton de regresar
function backbutton(){
    switch(steps){
        case 1:
            break;
        case 2:
            $('#categorias').hide();
            $('#sucursales').show();
            steps--;
            break;
        case 3:
            $('#servicios').hide();
            $('#categorias').show();
            steps--;
            break;
        case 4:
            $('#tiposervicio').hide();
            $('#servicios').show();
            steps--;
            break;
    }
}

// Peticion que se ejecuta al cargar la pagina
$( document ).ready(function() {
    let cols = ``;

    $.ajax({
        type: "GET",
        url: "../controllers/sucursalController.php",
        data: {
            function: 'index'
        },
        success: function(result) {
            // console.log(JSON.parse(result));
            JSON.parse(result).forEach(sucursal => {
                cols += `
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4" onclick="getCategorias()">
                            <div class="card div-sucursales">
                                <div class="card-body">
                                    ${sucursal.nombre}
                                </div>
                            </div>
                        </div>`;
            });

            let html = `
                        <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <h5>Selecciona la sucursal</h5>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="backbutton()">Atrás</button>
                                    </div>
                                </div>
                                <div class="row">
                                    ${cols}
                                </div>
                            </div>`;
            $('#sucursales').html(html);
        },
        error: function(error){
            alert('Hubo un error en la peticion');
            console.log(error);
        }
    });
});

// Funcion que se ejecuta al seleccionar una sucursal
function getCategorias() {
    steps++;
    let cols = ``;
    $.ajax({
        url: '../controllers/catproductosController.php',
        type: 'GET',
        data: {function: 'index'},
        success: function(result){
            let categorias;

            if (result !== 0){
                categorias = JSON.parse(result);
                
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < categorias.length; i++) {
                        cols += `
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4" onclick="getServiciosBySucursal(${categorias[i].id})">
                            <div class="card div-sucursales">
                                <div class="card-body">
                                    ${categorias[i].nombrecat}
                                </div>
                            </div>
                        </div>`;
                    }

                    resolve(cols);
                });

                prom.then(() => {
                    let html = `
                        <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <h5>Selecciona la categoría</h5>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="backbutton()">Atrás</button>
                                    </div>
                                </div>
                                <div class="row">
                                    ${cols}
                                </div>
                            </div>`;
                    
                    $('#sucursales').hide();
                    $('#categorias').show();
                    $('#categorias').html(html);
                });
            }
            else{
                categorias = false;
            }
        },
        error: function(error){
            alert('Hubo un error en la peticion');
            console.log(error);
        }

    });
}

// Funcion que se ejecuta al seleccionar una categoria
function getServiciosBySucursal(idSucursal){
    steps++;
    let cols = ``;
    $.ajax({
        url: '../controllers/servicioController.php',
        type: 'GET',
        data: {function: 'getByidCategoria', id: idSucursal},
        success: function(result){
            let servicios;

            if (result !== 0){
                servicios = JSON.parse(result);
                
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < servicios.length; i++) {
                        cols += `
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4" onclick="selectTipoServicio()">
                            <div class="card div-sucursales">
                                <div class="card-body">
                                    ${servicios[i].servicio}
                                </div>
                            </div>
                        </div>`;
                    }

                    resolve(cols);
                });

                prom.then(() => {
                    let html = `
                        <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <h5>Selecciona el servicio</h5>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="backbutton()">Atrás</button>
                                    </div>
                                </div>
                                <div class="row">
                                    ${cols}
                                </div>
                            </div>`;

                    $('#categorias').hide();
                    $('#servicios').show();
                    $('#servicios').html(html);
                });
            }
            else{
                servicios = false;
            }
        },
        error: function(error){
            alert('Hubo un error en la peticion');
            console.log(error);
        }
    });
}

function selectTipoServicio(){
    steps++;
    let cols = ``;
    $.ajax({
        url: '../controllers/tiposervicioController.php',
        type: 'GET',
        data: {function: 'index'},
        success: function(result){
            let tiposervicio;

            if (result !== 0){
                tiposervicio = JSON.parse(result);
                
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < tiposervicio.length; i++) {
                        cols += `
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4">
                            <div class="card div-sucursales">
                                <div class="card-body">
                                    ${tiposervicio[i].tiposervicio}
                                </div>
                            </div>
                        </div>`;
                    }

                    resolve(cols);
                });

                prom.then(() => {
                    let html = `
                        <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <h5>Selecciona el servicio</h5>
                                    </div>
                                    <div class="col-6">
                                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="backbutton()">Atrás</button>
                                    </div>
                                </div>
                                <div class="row">
                                    ${cols}
                                </div>
                            </div>`;

                    $('#servicios').hide();
                    $('#tiposervicio').show();
                    $('#tiposervicio').html(html);
                });
            }
            else{
                tiposervicio = false;
            }
        },
        error: function(error){
            alert('Hubo un error en la peticion');
            console.log(error);
        }
    });
}

