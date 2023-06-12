
let steps = 1; // Variable que lleva el control de los pasos del formulario
let idsucursal; // id de la sucursal seleccionada
let fechaCita;
let horaCita;
let idusuario;
let duracion;

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
        case 5:
            $('#usuarios').hide();
            $('#tiposervicio').show();
            steps--;
            break;
        case 6:
            $('#horas').hide();
            $('#usuarios').show();
            steps--;
            break;
        case 7:
            $('#formulario').hide();
            $('#horas').show();
            steps--;
            break;
    }
}

// evento seleccionar fecha
function selectFecha(event){
    fechaCita = event.target.value;
}

// Peticion que se ejecuta al cargar la pagina
$( document ).ready(function() {
    let cols = ``;
    $('#horas').hide();
    $('#formulario').hide();
    
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
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4" onclick="getCategorias(${sucursal.idsucursal})">
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
                                    <div class="col-6" style="text-align: right;">
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
function getCategorias(idsucursall) {
    idsucursal = idsucursall;
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
                        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3" onclick="getServiciosBySucursal(${categorias[i].id})">
                            <div class="card div-categorias">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4 mt-3">
                                                <img src="../assets/img/categorias/${categorias[i].foto}" class="rounded-circle" style="max-width: 80px; min-width: 80px; max-height: 80px; min-height: 80px; border: #FFC275 3px solid;" alt="Avatar" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8 mt-3">
                                                <label style="cursor: pointer;"><strong>${categorias[i].nombrecat}</strong></label>
                                            </div>
                                        </div>
                                    </div>
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
                                    <div class="col-6" style="text-align: right;">
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
                        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3" onclick="selectTipoServicio(${servicios[i].duracion})">
                            <div class="card div-servicios">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4 mt-3">
                                                <img src="../assets/img/servicios/${servicios[i].foto}" class="rounded-circle" style="max-width: 80px; min-width: 80px; max-height: 80px; min-height: 80px; border: #FFC275 3px solid;" alt="Avatar" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8 mt-3">
                                                <label style="cursor: pointer;"><strong>${servicios[i].servicio}</strong></label>
                                            </div>
                                        </div>
                                    </div>
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
                                    <div class="col-6" style="text-align: right;">
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

// cargar los tipos de servicios
function selectTipoServicio(duration){
    steps++;
    duracion = duration;
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
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4" onclick="getUsuarios()">
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
                                    <div class="col-6" style="text-align: right;">
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

// cargar los estilistas
function getUsuarios(){
    steps++;
    let cols = ``;
    $.ajax({
        url: '../controllers/usuarioController.php',
        type: 'GET',
        data: {function: 'getByIdSucursal', idsucursal},
        success: function(result){
            let usuarios;

            if (result !== 0){
                usuarios = JSON.parse(result);
                
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < usuarios.length; i++) {
                        cols += `
                        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3">
                            <div class="card div-usuarios" onclick="selecEstilista(${usuarios[i].idusuario})">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4 mt-3">
                                                <img src="../assets/img/avatars/${usuarios[i].avatar}" class="rounded-circle" style="width: 80px;" alt="Avatar" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8 mt-3">
                                                <label style="cursor: pointer;"><strong>${usuarios[i].nombre}</strong></label>
                                            </div>
                                        </div>
                                    </div>
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
                            <div class="col-6"></div>
                            <div class="col-6" style="text-align: right;">
                                <button type="button" class="btn btn-outline-primary btn-sm" onclick="backbutton()">Atrás</button>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <label style="font-weight: bold">Seleccione la fecha de su reserva:</label>
                            </div>
                            <div class="col">
                                <input id="inputFecha" type="date" class="form-control" onchange="selectFecha(event)">
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col">
                                <label style="font-weight: bold">Seleccione el estilista</label>
                            </div>
                        </div>
                        <div class="row mt-4">
                            ${cols}
                    </div>`;

                    $('#tiposervicio').hide();
                    $('#usuarios').show();
                    $('#usuarios').html(html);
                });
            }
            else{
                usuarios = false;
            }
        },
        error: function(error) {
            alert('Hubo un error en la peticion');
            console.log(error);
        }
    });
}

function selecEstilista(idusuarioSeleccionado){
    idusuario = idusuarioSeleccionado;
    if(fechaCita){
         steps++;
        $('#usuarios').hide();
        $('#horas').show();
    }
    else{
        console.log('fecha no seleccionada');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor seleccione una fecha para continuar',
          })
    }
}

function SelectHora(hora){
    console.log(hora);
    steps++;
    horacita = hora;
    $('#horas').hide();
    $('#formulario').show();
}

function selectDepartamento(event){
    console.log(event);
}

function agendarCita(){
    console.log(fechaCita + ' ' + horacita + ':00:00');
    const fecha = new Date(fechaCita + ' ' + horacita + ':00');
    console.log(fecha);
    const end = new Date(fecha.setMinutes(fecha.getMinutes() + duracion));
    console.log(end);
    const cita = {
        borderColor: '#DF8EFF',
        backgroundColor: '#F0CAFF',
        start: fechaCita + ' ' + horacita + ':00:00',
        end: end.getFullYear() + '-' + end.getMonth() + '-' + end.getDay() + ' ' + end.getHours() + ':' + end.getMinutes() + ':00',
        idcliente: 1,
        idempleado: idusuario,
        estado: 1,
        nota: 'nota',
        idsucursal: idsucursal,
    }
    $.ajax({
        url: '../controllers/citaController.php',
        type: 'POST',
        data: {function: 'create', cita},
        success: function(result){
            console.log(result);
        },
        error: function(error) {
            alert('Hubo un error en la peticion');
            console.log(error);
        }
    });

}