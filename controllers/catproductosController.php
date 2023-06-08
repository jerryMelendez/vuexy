<?php
// require ('connection.php');
require_once('../models/catproductos.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad
if (isset($_GET['function'])) {

    switch ($_GET['function']) {
        case 'function1':
            # code...
            $catproductos = new CatProductos();
            $catproductos->index();
            break;
        
        default:
            # code...
            $catproductos = new CatProductos();
            $catproductos->show($_GET['id']);
            break;
    }



    
}

?>