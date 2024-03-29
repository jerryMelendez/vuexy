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

        // Obtener las horas ocupadas de la fecha y el empleado seleccionado
        public function getHorasOcupadas($fecha, $idempleado){
            $db = new connection();// conectamos a la base de datos

            $mysqli = mysqli_prepare($db->connect(), "select concat(HOUR(start), ':', MINUTE(start)) as hora from citas where idempleado = ? and YEAR(start) = ? and MONTH(start) = ? and DAY(start) = ?;");
            $mysqli->bind_param("isss", $idempleado, $fecha[0], $fecha[1], $fecha[2]);
            $mysqli->execute();

            $result = $mysqli->get_result();
            $horasOcupadas = array();
            while ($row = $result->fetch_assoc()) {
                $horasOcupadas[] = $row['hora'];
            }
            $mysqli->close();
            echo json_encode($horasOcupadas);
        }

        public function create($cita){

            $db = new connection();// conectamos a la base de datos

            $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM clientes where cel_whatsapp = ? or email = ?");
            $mysqli->bind_param("ss", $cita['whatsapp'], $cita['email_cliente']);
            $mysqli->execute();

            $result = $mysqli->get_result();
            while ($row = $result->fetch_assoc()) {
                $cita['idcliente'] = $row['idclientes'];
            }
        
            // si el usuario existe en la base de datos
            if ($result->num_rows > 0){
                $cita["tipo"] = 1;
                
                $query = "INSERT INTO `citas`(`borderColor`, `backgroundColor`, `start`, `end`, `idcliente`, `idempleado`, `estado`, `nota`, `idsucursal`, `origen`, `tipo`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    // var_dump($query);
                    $mysqli = mysqli_prepare($db->connect(), $query);
                    $mysqli->bind_param("ssssiiisiii", $cita['borderColor'], $cita['backgroundColor'], $cita['start'], $cita['end'], $cita['idcliente'], $cita['idempleado'], $cita['estado'], $cita['nota'], $cita['idsucursal'], $cita['origen'], $cita['tipo']);
                    $mysqli->execute();

                    $result = $mysqli->get_result();

                    $idCita = $mysqli->insert_id;
                
                    // var_dump($result);
                    // Guardar en la tabla citas_servicios
                    // $query = "INSERT into citas_servicios(idcita, idservicio) VALUES(?, ?)";
                    $query = "INSERT INTO `citas_servicios`(`idcita`, `idcliente`, `idservicio`, `idespecialista`, `fecha_inicio`, `fecha_final`, `cantidad`, `esproducto`) VALUES (?,?,?,?,?,?,0,0)";
                    $mysqliCitaServ = mysqli_prepare($db->connect(), $query);
                    $mysqliCitaServ->bind_param("iiiiss", $idCita, $cita['idcliente'], $cita['id_servicio'], $cita['idempleado'], $cita['start'], $cita['end']);
                    $mysqliCitaServ->execute();

                    $resultCitaServ = $mysqliCitaServ->get_result();

                
                    $mysqli->close();
                    echo("Cita creada correctamente");
            }
            else {
                // guardar el cliente en la base de datos
                $mysqli = mysqli_prepare($db->connect(), "INSERT INTO `dbsgs`.`clientes` (`nombre`, `cel_claro`, `cel_tigo`, `cel_whatsapp`, `cedula`, `fecha_nacimiento`, `edad`, `email`, `fecha_alta`, `iddepartamento`, `idmunicipio`, `barrio`, `foto`, `estado`, `sexo`, `origen`) 
                VALUES (?, ' ', ' ', ?, '', '1900-01-01', '23', ?, '".date('Y-m-d')."', ?, ?, ' ', ' ', '1', ?, ?);");

                $mysqli->bind_param("ssssssi", $cita['nombre_cliente'], $cita['whatsapp'], $cita['email_cliente'], $cita['id_departamento'], $cita['id_municipio'], $cita['sexo'], $cita['origen']);
                $mysqli->execute();

                $resultInsertCliente = $mysqli->get_result();

                $cita["idcliente"] = $mysqli->insert_id;

                if ($resultInsertCliente) { // si no se ejecuta correctamente la insercion
                    echo json_encode($mysqli->error);
                    $mysqli->close();
                }
                else{ // si se ejecuta correctamente la insercion
                    $cita["tipo"] = 0;

                    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
                    $query = "INSERT INTO `citas`(`borderColor`, `backgroundColor`, `start`, `end`, `idcliente`, `idempleado`, `estado`, `nota`, `idsucursal`, `origen`, `tipo`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                    $mysqli = mysqli_prepare($db->connect(), $query);
                    $mysqli->bind_param("ssssiiisiii", $cita['borderColor'], $cita['backgroundColor'], $cita['start'], $cita['end'], $cita['idcliente'], $cita['idempleado'], $cita['estado'], $cita['nota'], $cita['idsucursal'], $cita['origen'], $cita['tipo']);
                    $mysqli->execute();

                    $result = $mysqli->get_result();

                    $idCita = $mysqli->insert_id;

                    // Guardar en la tabla citas_servicios
                    $query = "INSERT into citas_servicios(`idcita`, `idcliente`, `idservicio`, `idespecialista`, `fecha_inicio`, `fecha_final`, `cantidad`, `esproducto`) VALUES (?,?,?,?,?,?,0,0)";
                    $mysqliCitaServ = mysqli_prepare($db->connect(), $query);
                    $mysqliCitaServ->bind_param("iiiiss", $idCita, $cita['idcliente'], $cita['id_servicio'], $cita['idempleado'], $cita['start'], $cita['end']);
                    $mysqliCitaServ->execute();

                    $resultCitaServ = $mysqliCitaServ->get_result();

                
                    $mysqli->close();
                    echo("Cita creada correctamente");
                }
                

            }

        }
        

    }
?>