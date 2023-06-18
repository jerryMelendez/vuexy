<?php
// require ('connection.php');
require_once('../models/municipio.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad

if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'getByDepartamento':
            # code...
            $municipio = new Municipio();
            $municipio->getByDepartamento($_GET['iddepartamento']);
            break;
        default:
            # code...
            break;
    }
}

?>