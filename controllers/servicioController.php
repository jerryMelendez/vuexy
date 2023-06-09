<?php
require_once('../models/servicios.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad
if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'index':
            # code...
            $servicio = new Servicios();
            $servicio->index();
            break;
        
        case 'getByidCategoria':
            # code...
            $servicio = new Servicios();
            $servicio->getByidCategoria($_GET['id']);
            break;
    }



    
}

?>