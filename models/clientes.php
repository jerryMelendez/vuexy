<?php
require('connection.php');
    class Citas{

        public function __construct() {

        }

        // Esta funcion es para comprobar si el usuario existe en la base de datos
        // Devolverá 0 si el cliente se crea y retornará 1 si el cliente ya existe
        public function getTipoCita($cliente){
            $db = new connection();// conectamos a la base de datos

            $mysqli = mysqli_prepare($db->connect(), "SELECT * FROM clientes where cel_whatsapp = ? or email = ?");
            $mysqli->bind_param("ss", $cliente['whatsapp'], $cliente['email']);
            $mysqli->execute();

            $result = $mysqli->get_result();
        
            var_dump($result->num_rows);

            // si el usuario existe en la base de datos
            if ($result->num_rows > 0){
                return 1;
            }
            else {
                return 0;

                // guardar el cliente en la base de datos

            }

            
            $db->close();
         }

        

    }
?>