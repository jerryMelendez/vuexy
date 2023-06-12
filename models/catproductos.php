<?php
require ('connection.php');

    class CatProductos  {
        static $table_name = "catproductos";
        static $primary_key = "id";

        private $id;
        private $nombrecat;
        private $foto;
        private $estado;

        public function __construct() {
        }

        public function index(){
            $db = new connection();// conectamos a la base de datos
            $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM catproductos;");
            $mysqli->execute();

            $result = $mysqli->get_result();
            $data = array();
            while ($row = $result->fetch_assoc()) {
                array_push($data, $row);
            }
            echo json_encode($data);

            $db->close();
        }

        public function show($id){
           $db = new connection();// conectamos a la base de datos
            $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM catproductos where id = ?;");
            $mysqli->bind_param("i", $id);
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