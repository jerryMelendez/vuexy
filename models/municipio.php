<?php
require('connection.php');
    class Municipio  {

        public function __construct() {
        }

        public function getByDepartamento($iddepartamento){
            $db = new connection();// conectamos a la base de datos
             $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM `municipios` WHERE iddepartamento = ?;");
             $mysqli->bind_param("i", $iddepartamento);
             $mysqli->execute();
 
             $result = $mysqli->get_result();
             $data = array();
             while ($row = $result->fetch_assoc()) {
                 array_push($data, $row);
             }
             echo json_encode($data);
             
             $db->close();
        }

       
    }
?>