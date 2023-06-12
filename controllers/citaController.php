<?php
// require ('connection.php');
require_once('../models/citas.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad

if (isset($_POST['function'])) {

    switch ($_POST['function']) {
        case 'create':
            # code...
            $citas = new Citas();
            $citas->create($_POST['cita']);
            break;
        
        default:
            # code...
            break;
    }
}

?>