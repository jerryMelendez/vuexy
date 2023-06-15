<?php
// require ('connection.php');
require_once('../models/clientes.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad

if (isset($_POST['function'])) {

    switch ($_POST['function']) {
        case 'getTipoCita':
            # code...
            $citas = new Citas();
            $citas->getTipoCita($_POST['whatsapp'], $_POST['email']);
            break;
        
        default:
            # code...
            break;
    }
}

?>