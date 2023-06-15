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

            $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM clientes where cel_whatsapp = ? or email = ?");
            $mysqli->bind_param("ss", $cita['whatsapp'], $cita['email']);
            $mysqli->execute();

            $result = $mysqli->get_result();
            while ($row = $result->fetch_assoc()) {
                $cita['idcliente'] = $row['idclientes'];
            }
        
            // var_dump($result->num_rows);

            // si el usuario existe en la base de datos
            if ($result->num_rows > 0){
                // var_dump("existe");
                $cita["tipo"] = 1;
                
                $query = "INSERT INTO `citas`(`borderColor`, `backgroundColor`, `start`, `end`, `idcliente`, `idempleado`, `estado`, `nota`, `idsucursal`, `origen`, `tipo`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    // var_dump($query);
                    $mysqli = mysqli_prepare($db->connect(), $query);
                    $mysqli->bind_param("ssssiiisiii", $cita['borderColor'], $cita['backgroundColor'], $cita['start'], $cita['end'], $cita['idcliente'], $cita['idempleado'], $cita['estado'], $cita['nota'], $cita['idsucursal'], $cita['origen'], $cita['tipo']);
                    $mysqli->execute();

                    $result = $mysqli->get_result();
                
                    // var_dump($result);
                    $mysqli->close();
                    echo("Cita creada correctamente");
            }
            else {
                // var_dump("no existe");
                // guardar el cliente en la base de datos
                $mysqli = mysqli_prepare($db->connect(), "INSERT INTO `dbsgs`.`clientes` (`nombre`, `cel_claro`, `cel_tigo`, `cel_whatsapp`, `cedula`, `fecha_nacimiento`, `edad`, `email`, `fecha_alta`, `iddepartamento`, `idmunicipio`, `barrio`, `foto`, `estado`) 
                VALUES (?, ' ', ' ', ?, '', '2000-01-01', '23', ?, '2023-01-01', ?, '1', ' ', ' ', '1');");

                $mysqli->bind_param("ssss", $cita['nombre_cliente'], $cita['whatsapp'], $cita['email_cliente'], $cita['id_departamento']);
                $mysqli->execute();

                $resultInsertCliente = $mysqli->get_result();

                $cita["idcliente"] = $mysqli->insert_id;

                // var_dump($resultInsertCliente);

                if ($resultInsertCliente) { // si no se ejecuta correctamente la insercion
                    echo json_encode($mysqli->error);
                    $mysqli->close();
                }
                else{ // si se ejecuta correctamente la insercion
                    $cita["tipo"] = 0;

                    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
                    $query = "INSERT INTO `citas`(`borderColor`, `backgroundColor`, `start`, `end`, `idcliente`, `idempleado`, `estado`, `nota`, `idsucursal`, `origen`, `tipo`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    // var_dump($query);
                    $mysqli = mysqli_prepare($db->connect(), $query);
                    $mysqli->bind_param("ssssiiisiii", $cita['borderColor'], $cita['backgroundColor'], $cita['start'], $cita['end'], $cita['idcliente'], $cita['idempleado'], $cita['estado'], $cita['nota'], $cita['idsucursal'], $cita['origen'], $cita['tipo']);
                    $mysqli->execute();

                    $result = $mysqli->get_result();
                
                    // var_dump($result);
                    $mysqli->close();
                    echo("Cita creada correctamente");
                }
                

            }

        }
        

    }
?>