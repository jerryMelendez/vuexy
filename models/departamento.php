<?php
require('connection.php');
    class Departamento  {

        public function __construct() {
        }

        public function index(){
            $db = new connection();// conectamos a la base de datos
             $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM `departamentos`");
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