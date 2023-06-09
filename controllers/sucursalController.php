<?php
require_once('../models/sucursal.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad
if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'index':
            # code...
            $sucursal = new Sucursal();
            $sucursal->index();
            break;
        
        default:
            # code...
            // $catproductos = new CatProductos();
            // $catproductos->show($_GET['id']);
            break;
    }



    
}

?>