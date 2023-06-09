<?php
require ('connection.php');
    class Sucursal  {
        static $table_name = "sucursal";
        static $primary_key = "idsucursal";

        private $idsucursal;
        private $nombre;

        public function __construct() {}

        public function index(){
            $db = new connection();// conectamos a la base de datos
            $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM sucursal;");
            $mysqli->execute();

            $result = $mysqli->get_result();
            $data = array();
            while ($row = $result->fetch_assoc()) {
                array_push($data, $row);
            }
            echo json_encode($data);

            $db->close();
        }

        // public function getIdsucursal() {
        //     return $this->idsucursal;
        // }

        // public function getNombre() {
        //     return $this->nombre;
        // }

        // public function setIdsucursal($idsucursal) {
        //     $this->idsucursal = $idsucursal;
        // }

        // public function setNombre($nombre) {
        //     $this->nombre = $nombre;
        // }

    }

?>