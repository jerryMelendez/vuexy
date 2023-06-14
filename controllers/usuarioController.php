<?php
require_once('../models/usuarios.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad
if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'index':
            # code...
            $usuario = new Usuarios();
            $usuario->index();
            break;
        
        case 'getByIdSucursal':
            $usuario = new Usuarios();
            $usuario->getByIdSucursal($_GET['idsucursal']);
            break;
        
        case 'getUsuariosDisponibles':
            $usuario = new Usuarios();
            $usuario->getUsuariosDisponibles($_GET['idsucursal'], $_GET['dia'], $_GET['idservicio']);
            break;
        default:
            # code...
            break;

    }
    
}

?>