<?php
require ('connection.php');

// $idUser = $_GET['id']; // hay sanitizar variable por temas de seguridad
$db = new connection();// conectamos a la base de datos
$sql = "SELECT * FROM catproductos;";
$dataCourse = $db->getData($sql);//obtenemos un objeto de los cursos de la base por ejemplo en un STRING separados por comas,  un array
if ($dataCourse){
    echo json_encode($dataCourse);// hacemos un echo y convertimos a Json los datos para que la peticion AJAX recoja la información
}else{
    echo json_encode('0');
} 
