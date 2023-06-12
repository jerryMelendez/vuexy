<?php
require('connection.php');
    class Citas{
        static $table_name = "citas";
        static $primary_key = "id";

        private $id;
        private $borderColor;
        private $backgroundColor;
        private $start;
        private $end;
        private $idcliente;
        private $idempleado;
        private $estado;
        private $nota;
        private $idsucursal;

        public function __construct() {

        }

        public function create($cita){
            $db = new connection();// conectamos a la base de datos

            $mysqli = mysqli_prepare($db->connect(), "INSERT INTO `citas`(`borderColor`, `backgroundColor`, `start`, `end`, `idcliente`, `idempleado`, `estado`, `nota`, `idsucursal`) VALUES (?,?,?,?,?,?,?,?,?)");
            $mysqli->bind_param("ssssiiisi", $cita['borderColor'], $cita['backgroundColor'], $cita['start'], $cita['end'], $cita['idcliente'], $cita['idempleado'], $cita['estado'], $cita['nota'], $cita['idsucursal']);
            $mysqli->execute();

            $result = $mysqli->get_result();
        
            echo json_encode($result);
            
            $db->close();
         }

        

    }
?>