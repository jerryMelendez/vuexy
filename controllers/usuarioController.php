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

        default:
            # code...
            break;

    }
    
}

?>