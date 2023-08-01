<?php
require ('connection.php');

    class Servicios  {
        static $table_name = "servicios";
        static $primary_key = "idservicio";

        private $idservicio;
        private $idcategoria;
        private $servicio;
        private $duracion;
        private $idtipo;

        public function __construct() {
        }

        public function index(){
            $db = new connection();// conectamos a la base de datos
             $mysqli = mysqli_prepare($db->connect(), "select * from dbsgs.inventario where iservicio = 2;");
             $mysqli->execute();
 
             $result = $mysqli->get_result();
             $data = array();
             while ($row = $result->fetch_assoc()) {
                 array_push($data, $row);
             }
             echo json_encode($data);
             
             $db->close();
        }


        public function getByidCategoria($id, $idtipoServicio){
            $db = new connection();// conectamos a la base de datos
            if ($idtipoServicio == -1) {
                $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM dbsgs.inventario where idcat = ? and iservicio = 2"); // consultamos desde la tabla inventario
                $mysqli->bind_param("i", $id);
            }
            else
            {
                $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM dbsgs.inventario where idcat = ? and idtipo = ? and iservicio = 2"); // consultamos desde la tabla inventario
                $mysqli->bind_param("ii", $id, $idtipoServicio);
            }
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