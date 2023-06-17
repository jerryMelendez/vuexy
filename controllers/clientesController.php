<?php
// require ('connection.php');
require_once('../models/clientes.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad

if (isset($_POST['function'])) {

    switch ($_POST['function']) {
        case 'getTipoCita':
            # code...
            $cliente = new Cliente();
            $cliente->getTipoCita($_POST['whatsapp'], $_POST['email']);
            break;
        case 'sendEmail':
            $cliente = new Cliente();
            $cliente->sendEmail($_POST['email'], $_POST['sucursal'], $_POST['categoria'], $_POST['servicio'], $_POST['fecha'], $_POST['estilista'], $_POST['cliente']);
            break;
        default:
            # code...
            break;
    }
}

?>