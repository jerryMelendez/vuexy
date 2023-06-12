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

        public function __construct($id, $borderColor, $backgroundColor, $start, $end, $idcliente, $idempleado, $estado, $nota, $idsucursal) {
            $this->id = $id;
            $this->borderColor = $borderColor;
            $this->backgroundColor = $backgroundColor;
            $this->start = $start;
            $this->end = $end;
            $this->idcliente = $idcliente;
            $this->idempleado = $idempleado;
            $this->estado = $estado;
            $this->nota = $nota;
            $this->idsucursal = $idsucursal;
        }

        public function create($cita){
            $db = new connection();// conectamos a la base de datos
             $mysqli = mysqli_prepare($db->connect(), "SINSERT INTO `citas`(`borderColor`, `backgroundColor`, `start`, `end`, `idcliente`, `idempleado`, `estado`, `nota`, `idsucursal`) VALUES (?,?,?,?,?,?,?,?,?)");
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