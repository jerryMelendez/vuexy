<?php
require_once('../models/tiposervicio.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad
if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'index':
            # code...
            $tiposervicio = new TipoServicio();
            $tiposervicio->index();
            break;
        
        case 'show':
            # code...
            $tiposervicio = new TipoServicio();
            $tiposervicio->show($_GET['id']);
            break;
    }
    
}

?>