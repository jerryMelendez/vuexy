
let steps = 1; // Variable que lleva el control de los pasos del formulario
let idsucursal; // id de la sucursal seleccionada
let nombreSucursal; // nombre de la sucursal seleccionada para mostrarlo en el campo nota de la cita
let idservicio; // id del servicio seleccionado
let nombreServicio; // nombre del servicio seleccionado para mostrarlo en el campo nota de la cita
let fechaCita;
let horaCita;
let idusuario;
let duracion;
let nombreCategoria; // nombre de la categoria seleccionada para mostrarlo en la info de la cita
let nombreEstilista; // nombre del estilista seleccionado para mostrarlo en la info de la cita
let arrayFecha; // arreglo que contiene la fecha de la cita
let departamentos = [];
let municipios = [];
let horas = [];


$('#sucursales').hide();
$('#horas').hide();
$('#formulario').hide();
$('#info').hide();
// Funcion que se ejecuta al presionar el boton de regresar
function backbutton(){
    if (nombreCategoria && (nombreCategoria.includes('Pestañas') || nombreCategoria.includes('Cejas') || nombreCategoria.includes('Párpados') || nombreCategoria.includes('Labios')))
    {
        switch(steps){
            case 1:
                break;
            case 2:
                $('#categorias').hide();
                $('#sucursales').show();
                steps--;
                break;
            case 3:
                $('#tiposervicio').hide();
                $('#categorias').show();
                steps--;
                break;
            case 4:
                $('#servicios').hide();
                $('#tiposervicio').show();
                steps--;
                break;
                break;
            case 5:
                $('#usuarios').hide();
                $('#servicios').show();
                steps--;
                break;
            case 6:
                $('#horas').hide();
                $('#usuarios').show();
                steps--;
                // restaurarHoras();
                break;
            case 7:
                $('#formulario').hide();
                $('#horas').show();
                steps--;
                break;
        }
    }
    else
    {
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
                $('#usuarios').hide();
                $('#servicios').show();
                steps--;
                break;
            case 5:
                $('#horas').hide();
                $('#usuarios').show();
                steps--;
                // restaurarHoras();
                break;
            case 6:
                $('#formulario').hide();
                $('#horas').show();
                steps--;
                break;
        }
    }
}

function showSucursales(){
    steps = 1;
    $('#inicio').hide();
    $('#sucursales').show();
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
            JSON.parse(result).forEach(sucursal => {
                cols += `
                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4" onclick="getCategorias(${sucursal.idsucursal}, '${sucursal.nombre}', '${sucursal.apertura}', '${sucursal.cierre}')">
                            <div class="card div-sucursales">
                                <div class="card-body">
                                    <h5>${sucursal.nombre}</h5>
                                    <label><i class="bi bi-geo-alt-fill"></i> ${sucursal.direccion}</label>
                                </div>
                            </div>
                        </div>`;
            });

            let html = `
                        <div class="container">
                            <div class="row">
                                <div class="col-12" style="text-align: center;">
                                    <img src="../assets/img/pages/logo.jpg" alt="lashes" style="width: 200px; height: auto;">
                                </div>
                            </div>
                                <div class="row mt-4">
                                    <div class="col-12" style="text-align: center;">
                                        <h5 style="color: #727f00">Elija una sucursal</h5>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    ${cols}
                            </div>
                         </div>`;
            $('#sucursales').html(html);
        },
        error: function(error){
            alert('Hubo un error en la peticion');
        }
    });
});

// Funcion que se ejecuta al seleccionar una sucursal
function getCategorias(idsucursall, nombreSuc, apertura, cierre) {
    horas=[];
    today = new Date();
    idsucursal = idsucursall;
    nombreSucursal = nombreSuc;
    steps++;
    let cols = ``;

    const startDate = new Date(today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' ' + apertura);
    const endDate = new Date(today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' ' + cierre);
    const diff = Math.abs(endDate - startDate);
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff / (1000 * 60)) % 60);
    for (let i = startDate.getHours(); i <= endDate.getHours() - 1; i++) {
        if (i !== 12){
            for (let j = 0; j < 60; j += 30) {
                if (j === 0) {
                    horas.push(`${i}:00`);
                } else {
                    horas.push(`${i}:${j}`);
                }
            }
        }
    }

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
                        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3" onclick="getTipoServicio(${categorias[i].id}, '${categorias[i].nombrecat}')">
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
                                    <div class="col">
                                        <div class="col" style="text-align: left;">
                                            <button type="button" class="btn-atras" onclick="backbutton()"><strong><label style="cursor: pointer;">Regresar</label></strong></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12" style="text-align: center;">
                                        <img src="../assets/img/pages/logo.jpg" alt="lashes" style="width: 200px; height: auto;">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col" style="text-align: center;">
                                        <h5 style="color: #727f00">Selecciona el tipo de trabajo</h5>
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
        }

    });
}

// Obtener tipo de servicios
function getTipoServicio(idcategoria, nombreCat){
    if (nombreCat.includes('Pestañas') || nombreCat.includes('Cejas') || nombreCat.includes('Párpados') || nombreCat.includes('Labios'))
    {
        let cols = ``;
        steps++;
        $.ajax({
            url: '../controllers/tiposervicioController.php',
            type: 'GET',
            data: {function: 'index'},
            success: function(result){
                let tipoServicios = [];

                if (result !== 0){
                    tipoServicios = JSON.parse(result);
                    const prom = new Promise((resolve) => {
                        for (let i = 0; i < tipoServicios.length; i++) {
                            cols += `
                            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3" onclick="getServiciosByCategoria(${idcategoria}, '${nombreCat}')">
                                <div class="card div-servicios">
                                    <div class="card-body">
                                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8 mt-3">
                                            <label style="cursor: pointer;"><strong>${tipoServicios[i].tiposervicio}</strong></label>
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
                                    <div class="col">
                                            <div class="col" style="text-align: left;">
                                                <button type="button" class="btn-atras" onclick="backbutton()"><strong><label style="cursor: pointer;">Regresar</label></strong></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12" style="text-align: center;">
                                            <img src="../assets/img/pages/logo.jpg" alt="lashes" style="width: 200px; height: auto;">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <h5 style="color: #727f00">Seleccione un modo</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        ${cols}
                                    </div>
                                </div>`;
    
                        $('#categorias').hide();
                        $('#tiposervicio').show();
                        $('#tiposervicio').html(html);
                    });
                }
                else{
                    servicios = false;
                }
            },
            error: function(error){
                alert('Hubo un error en la peticion');
            }
        })
    }
    else
    {
        getServiciosByCategoria(idcategoria, nombreCat);
    }
}

// Funcion que se ejecuta al seleccionar una categoria
function getServiciosByCategoria(idcategoria, nombreCat){
    steps++;
    nombreCategoria = nombreCat;
    let cols = ``;
    $.ajax({
        url: '../controllers/servicioController.php',
        type: 'GET',
        data: {function: 'getByidCategoria', id: idcategoria},
        success: function(result){
            let servicios;

            if (result !== 0){
                servicios = JSON.parse(result);
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < servicios.length; i++) {
                        cols += `
                        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3" onclick="getUsuarios(${servicios[i].idprod}, '${servicios[i].nombre}')">
                            <div class="card div-servicios">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4 mt-3">
                                                <img src="../assets/img/servicios/${servicios[i].foto}" class="rounded-circle" style="max-width: 80px; min-width: 80px; max-height: 80px; min-height: 80px; border: #FFC275 3px solid;" alt="Avatar" />
                                            </div>
                                            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-8 mt-3">
                                                <label style="cursor: pointer;"><strong>${servicios[i].nombre}</strong></label>
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
                                    <div class="col">
                                            <div class="col" style="text-align: left;">
                                                <button type="button" class="btn-atras" onclick="backbutton()"><strong><label style="cursor: pointer;">Regresar</label></strong></button>
                                            </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12" style="text-align: center;">
                                        <img src="../assets/img/pages/logo.jpg" alt="lashes" style="width: 200px; height: auto;">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <h5 style="color: #727f00">Selecciona el servicio</h5>
                                    </div>
                                </div>
                                <div class="row">
                                    ${cols}
                                </div>
                            </div>`;

                    $('#categorias').hide();
                    $('#tiposervicio').hide();
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
        }
    });
}

// cargar los estilistas
function getUsuarios(idserv, nombreserv){
    steps++;
    idservicio = idserv;
    nombreServicio = nombreserv;

    let html = `
                     <div class="container">
                        <div class="row">
                            <div class="col" style="text-align: left;">
                                <button type="button" class="btn-atras" onclick="backbutton()"><strong><label style="cursor: pointer;">Regresar</label></strong></button>
                            </div>
                        </div>
                         <div class="row">
                                    <div class="col-12" style="text-align: center;">
                                        <img src="../assets/img/pages/logo.jpg" alt="lashes" style="width: 200px; height: auto;">
                                    </div>
                            </div>
                         <div class="row mt-4">
                             <div class="col">
                                 <label style="font-weight: bold; color: #727f00">Seleccione la fecha:</label>
                             </div>
                             <div class="col">
                                 <input id="inputFecha" type="date" class="form-control" onchange="selectFecha(event)" style="border:#B7EC00 2px solid; color: #727f00">
                             </div>
                         </div>
                         <div class="row mt-4">
                             <div class="col">
                                 <label style="font-weight: bold; color: #727f00">Seleccione el especialista</label>
                             </div>
                         </div>
                         <div id="div-users" class="row mt-4">

                         </div>
                     </div>`;

                    $('#servicios').hide();
                    $('#usuarios').show();
                    $('#usuarios').html(html);
}    

// evento seleccionar fecha
function selectFecha(event){
    fechaCita = event.target.value;
    fecha = new Date(fechaCita);
    const dias = ['LU','MA','MI','JU','VI','SA','DO'];

    let cols = ``;
    $.ajax({
        url: '../controllers/usuarioController.php',
        type: 'GET',
        data: {function: 'getUsuariosDisponibles', idsucursal, idservicio, dia: dias[fecha.getDay()]},
        success: function(result){
            let usuarios;
            if (result !== 0){
                usuarios = JSON.parse(result);
                const prom = new Promise((resolve) => {
                    for (let i = 0; i < usuarios.length; i++) {
                        cols += `
                        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-3">
                            <div class="card div-usuarios" onclick="selecEstilista(${usuarios[i].idusuario}, '${usuarios[i].nombre}')">
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-4 mt-3">
                                                <img src="../assets/img/avatars/${usuarios[i].avatar}" class="rounded-circle" style="width: 80px; border:#B7EC00 2px solid;" alt="Avatar" />
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

                    // $('#tiposervicio').hide();
                    $('#div-users').html(cols);
                });
            }
            else{
                usuarios = false;
            }
        },
        error: function(error) {
            alert('Hubo un error en la peticion');
        }
    });
}

function selecEstilista(idusuarioSeleccionado, nombreEst){
    idusuario = idusuarioSeleccionado;
    nombreEstilista = nombreEst;
    if(fechaCita){
        steps++;
        arrayFecha = fechaCita.split('-');

        $.ajax({
            url: '../controllers/citaController.php',
            type: 'POST',
            data: {function: 'getHorasOcupadas', fecha: arrayFecha, idempleado: idusuario},
            success: function(result){
                let horasOcupadas = JSON.parse(result);
                
                comprobarHoras(horasOcupadas);
            },
            error: function(error){
                alert('Hubo un error en la peticion');
            }
        });

        $('#usuarios').hide();
        $('#horas').show();
        llenarDivHoras();
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor seleccione una fecha para continuar',
          });
    }
}

function SelectHora(hora){
    steps++;
    horacita = hora;
    $.ajax({
        url: '../controllers/departamentoController.php',
        type: 'GET',
        data: {function: 'index'},
        success: function(result){
            arrayDepartamentos = JSON.parse(result);
            for (let i = 0; i < arrayDepartamentos.length; i++) {
                $('#Departamento').append($('<option>', { 
                    value: arrayDepartamentos[i].iddepartamento,
                    text : arrayDepartamentos[i].nombre
                }));
                
            }
            
        },
        error: function(error){
        }
    });
    $('#horas').hide();
    $('#formulario').show();
}

function selectDepartamento(event){
    $('#Municipio').empty();
    $.ajax({
        url: '../controllers/municipioController.php',
        type: 'GET',
        data: {function: 'getByDepartamento', iddepartamento: event.target.value},
        success: function(result){
            arrayMunicipios = JSON.parse(result);
            for (let i = 0; i < arrayMunicipios.length; i++) {
                $('#Municipio').append($('<option>', { 
                    value: arrayMunicipios[i].idmunicipios,
                    text : arrayMunicipios[i].nombre
                }));
                
            }
            
        },
        error: function(error){
        }
    });

}

function agendarCita(){
    const fecha = new Date(fechaCita + ' ' + horacita);

    // Faltan los campos idcliente y tipo, estos se establecen al comprobar 
    // que si el cliente esta registrado o no
    const cita = {
        borderColor: '#B6CF02',
        backgroundColor: '#B6CF02',
        start: fechaCita + ' ' + horacita,
        end: fechaCita + ' ' + horacita,
        idempleado: idusuario,
        estado: 1, // agendado
        origen: 2, // origen web
        nota: 'Un servicio de ' + nombreServicio + ' agendado desde la web',
        idsucursal: idsucursal,
        nombre_cliente: $('#nombreCliente').val(),
        whatsapp: $('#whatsapp').val(),
        email_cliente: $('#email_cliente').val(),
        id_departamento: $('#Departamento').val(),
        id_municipio: $('#Municipio').val(),
        id_servicio: idservicio
    }

    Swal.fire({
            icon: 'question',
            title: '¿Desea agendar esta cita?',
            text: 'Se agendará una cita para el cliente '+$('#nombreCliente').val()+' el día ' + arrayFecha[2] + '/' + arrayFecha[1] + '/' + arrayFecha[0] + ' a las ' + horacita + ' con el especialista ' + nombreEstilista
            + ' para el servicio de ' + nombreServicio,
            showCancelButton: true,
            confirmButtonColor: '#B6CF02',
            iconColor: '#B6CF02',
            confirmButtonText: `Agendar`,
            cancelButtonText: `Cancelar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $.ajax({
                    url: '../controllers/citaController.php',
                    type: 'POST',
                    data: {function: 'create', cita},
                    success: function(result){
                        if (result === 'Cita creada correctamente'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Cita agendada',
                                text: 'Su cita ha sido agendada correctamente',
                                confirmButtonColor: '#B6CF02',
                                iconColor: '#B6CF02'
                              });
                            $('#parrafoDetalleCita').text('Muchas gracias ' + $('#nombreCliente').val() + ' por realizar una reservación de nuestros servicios a continuación se muestran los detalles de la cita, puede revisar su correo electrónico donde le hemos enviado estos datos');
                            $('#infoSucursal').text(nombreSucursal);
                            $('#infoCategoria').text(nombreCategoria);
                            $('#infoServicio').text(nombreServicio);
                            $('#infoFecha').text(arrayFecha[2] + '/' + arrayFecha[1] + '/' + arrayFecha[0]);
                            $('#infoHora').text(horacita + (horacita.startsWith('0') || horacita.startsWith('10') || horacita.startsWith('11') ? ' am' : ' pm   '));
                            $('#infoEstilista').text(nombreEstilista);
                            $('#formulario').hide();
                            $('#info').show();

                            // Enviamos el email al cliente
                            $.ajax({
                                type: "POST",
                                url: "../controllers/clientesController.php",
                                data:{
                                    function: 'sendEmail',
                                    email: $('#email_cliente').val(),
                                    sucursal: nombreSucursal,
                                    categoria: nombreCategoria,
                                    servicio: nombreServicio,
                                    fecha: arrayFecha[2] + '/' + arrayFecha[1] + '/' + arrayFecha[0] + ' ' + horacita,
                                    estilista: nombreEstilista,
                                    cliente: $('#nombreCliente').val()
                                },
                                success: function(result){
                                },
                                error: function(error){
                                }
                            })
                        }
                    },
                    error: function(error) {
                        alert('Hubo un error en la peticion');
                    }
                });
            }
            else if (result.isDenied) {
            }

        }
    );

}


// Funcion para deshabilitar las horas que ya estan ocupadas
function comprobarHoras(horasOcupadas){
    const prom = new Promise((resolve) => {
        for (let i = 0; i < horasOcupadas.length; i++) {
            const HM = horasOcupadas[i].split(':');
            let h = '';
            let m = '';
            
            h = HM[0];
            

            if (HM[1].length === 1)
            {
                m = '0' + HM[1];
            }
            else
            {
                m = HM[1];
            }

            horasOcupadas[i] = h + ':' + m;
        }
        resolve(horasOcupadas);
    });

    prom.then(() => {
        for (let i = 0; i < horasOcupadas.length; i++) {        
            for (let j = 0; j < horas.length; j++) {
                if(horas[j] === horasOcupadas[i]){
                    const HM = horas[j].split(':');
                    $(`#div${HM[0]+HM[1]}`).removeClass('div-horas');
                    $(`#div${HM[0]+HM[1]}`).addClass('div-disabled');
                    $(`#label${HM[0]+HM[1]}`).text(function(index, text) {
                        return text + " (Ocupado)";
                    });
                }
            }
        }
    });

    // if(horasOcupadas.includes('8:0')){
    //     $('#08').removeClass('div-horas');
    //     $('#08').addClass('div-disabled');
    //     $("#label08").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horasOcupadas.includes('8:30')){
    //     $('#0830').removeClass('div-horas');
    //     $('#0830').addClass('div-disabled');
    //     $("#label0830").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horasOcupadas.includes('9:0')){
    //     $('#09').removeClass('div-horas');
    //     $('#09').addClass('div-disabled');
    //     $("#label09").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('9:30')){
    //     $('#0930').removeClass('div-horas');
    //     $('#0930').addClass('div-disabled');
    //     $("#label0930").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('10:0')){
    //     $('#10').removeClass('div-horas');
    //     $('#10').addClass('div-disabled');
    //     $("#label10").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('10:30')){
    //     $('#1030').removeClass('div-horas');
    //     $('#1030').addClass('div-disabled');
    //     $("#label1030").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('11:0')){
    //     $('#11').removeClass('div-horas');
    //     $('#11').addClass('div-disabled');
    //     $("#label11").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('11:30')){
    //     $('#1130').removeClass('div-horas');
    //     $('#1130').addClass('div-disabled');
    //     $("#label1130").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('13:0')){
    //     $('#13').removeClass('div-horas');
    //     $('#13').addClass('div-disabled');
    //     $("#label13").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('13:30')){
    //     $('#1330').removeClass('div-horas');
    //     $('#1330').addClass('div-disabled');
    //     $("#label1330").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('14:0')){
    //     $('#14').removeClass('div-horas');
    //     $('#14').addClass('div-disabled');
    //     $("#label14").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('14:30')){
    //     $('#1430').removeClass('div-horas');
    //     $('#1430').addClass('div-disabled');
    //     $("#label1430").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('15:0')){
    //     $('#15').removeClass('div-horas');
    //     $('#15').addClass('div-disabled');
    //     $("#label15").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('15:30')){
    //     $('#1530').removeClass('div-horas');
    //     $('#1530').addClass('div-disabled');
    //     $("#label1530").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('16:0')){
    //     $('#16').removeClass('div-horas');
    //     $('#16').addClass('div-disabled');
    //     $("#label16").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
    // if(horas.includes('16:30')){
    //     $('#1630').removeClass('div-horas');
    //     $('#1630').addClass('div-disabled');
    //     $("#label1630").text(function(index, text) {
    //         return text + " (Ocupado)";
    //     });
    // }
}

// Funcion para restaurar las horas por si el usuario retrocede
function restaurarHoras(){
    $('#08').removeClass();
    $('#08').addClass('div-horas');
    $('#08').addClass('card');
    $("#label08").text('8 am');

    $('#0830').removeClass();
    $('#0830').addClass('div-horas');
    $('#0830').addClass('card');
    $("#label0830").text('8:30 am');

    $('#09').removeClass();
    $('#09').addClass('div-horas');
    $('#09').addClass('card');
    $("#label09").text('9 am');

    $('#0930').removeClass();
    $('#0930').addClass('div-horas');
    $('#0930').addClass('card');
    $("#label0930").text('8:30 am');

    $('#10').removeClass();
    $('#10').addClass('div-horas');
    $('#10').addClass('card');
    $("#label10").text('10 am');

    $('#1030').removeClass();
    $('#1030').addClass('div-horas');
    $('#1030').addClass('card');
    $("#label1030").text('10:30 am');

    $('#11').removeClass();
    $('#11').addClass('div-horas');
    $('#11').addClass('card');
    $("#label11").text('11 am');

    $('#1130').removeClass();
    $('#1130').addClass('div-horas');
    $('#1130').addClass('card');
    $("#label1130").text('11:30 am');

    $('#13').removeClass();
    $('#13').addClass('div-horas');
    $('#13').addClass('card');
    $("#label13").text('1 pm');

    $('#1330').removeClass();
    $('#1330').addClass('div-horas');
    $('#1330').addClass('card');
    $("#label1330").text('1:30 pm');

    $('#14').removeClass();
    $('#14').addClass('div-horas');
    $('#14').addClass('card');
    $("#label14").text('2 pm');

    $('#1430').removeClass();
    $('#1430').addClass('div-horas');
    $('#1430').addClass('card');
    $("#label1430").text('2:30 pm');

    $('#15').removeClass();
    $('#15').addClass('div-horas');
    $('#15').addClass('card');
    $("#label15").text('3 pm');

    $('#1530').removeClass();
    $('#1530').addClass('div-horas');
    $('#1530').addClass('card');
    $("#label1530").text('3:30 pm');

    $('#16').removeClass();
    $('#16').addClass('div-horas');
    $('#16').addClass('card');
    $("#label16").text('4 pm');

    $('#1630').removeClass();
    $('#1630').addClass('div-horas');
    $('#1630').addClass('card');
    $("#label1630").text('4:30 pm');
}

// Funcion para llenar las horas con el array que se lleno
function llenarDivHoras(){
    let html = `<div class="container">
                    <div class="row mt-5">
                        <div class="col">
                                <div class="col" style="text-align: left;">
                                    <button type="button" class="btn-atras" onclick="backbutton()"><strong><label style="cursor: pointer;">Regresar</label></strong></button>
                                </div>
                        </div>
                    </div>
                    <div class="row">
                                    <div class="col-12" style="text-align: center;">
                                        <img src="../assets/img/pages/logo.jpg" alt="lashes" style="width: 200px; height: auto;">
                                    </div>
                            </div>
                    <div class="row mt-4">
                        <div class="col" style="text-align: center;">
                            <h5 style="color: #727f00">Seleccione la hora de su cita</h5>
                        </div>
                    </div>`;

    const prom = new Promise((resolve) => {
        for (let i = 0; i < Math.ceil((horas.length)/6); i++) {
            html += `<div class="row">`;
            for (let j = 0; j < 6; j++) {
                if (horas[(i*6)+j])
                {
                    const HM = horas[(i*6)+j].split(':');
                    html += `
                    <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 mt-4">
                        <div id="div${HM[0]+HM[1]}" class="card div-horas" onclick="SelectHora('${horas[(i*6)+j]}')">
                            <label id="label${HM[0]+HM[1]}" class="centrarHora">${convertirHoraAMPM(horas[(i*6)+j])}</label>
                        </div>
                    </div>
                    `;
                }
            }
            html += `</div>`;
        }
        resolve(html);
    });

    prom.then(()=>{
        html += `</div>`;

        $('#horas').html(html);
    });
}

function convertirHoraAMPM(hora24) {
    const HM = hora24.split(':');
    let hora12 = HM[0];
    let minutos = HM[1];
    let sufijo = "AM";
  
    if (Number(HM[0]) >= 12) {
      hora12 = Number(HM[0]) - 12;
      sufijo = "PM";
    }
  
    if (hora12 === 0) {
      hora12 = 12;
    }
  
    return `${hora12}:${minutos} ${sufijo}`;
  }