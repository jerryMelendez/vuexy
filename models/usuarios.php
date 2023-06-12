<?php
require('connection.php');
    class Usuarios  {
        static $table_name = "usuarios";
        static $primary_key = "idusuario";

        private $idusuario;
        private $nombre;
        private $cedula;
        private $edad;
        private $email_user;
        private $usuario;
        private $password;
        private $cargo;
        private $celular;
        private $telefono;
        private $fechaingreso;
        private $salario;
        private $dialibre;
        private $rolid;
        private $idsucursal;
        private $status;
        private $avatar;

        public function __construct() {
        }

        public function index(){
            $db = new connection();// conectamos a la base de datos
             $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM usuarios");
             $mysqli->execute();
 
             $result = $mysqli->get_result();
             $data = array();
             while ($row = $result->fetch_assoc()) {
                 array_push($data, $row);
             }
             echo json_encode($data);
             
             $db->close();
        }

        public function getByIdSucursal($idsucursal){
            $db = new connection();// conectamos a la base de datos
             $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM `usuarios` WHERE idsucursal = ?;");
             $mysqli->bind_param("i", $idsucursal);
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