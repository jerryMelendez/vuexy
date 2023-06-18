<?php
// require ('connection.php');
require_once('../models/departamento.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad

if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'index':
            # code...
            $departamento = new Departamento();
            $departamento->index();
            break;
        default:
            # code...
            break;
    }
}

?>