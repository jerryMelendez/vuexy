<?php
require('connection.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if (!class_exists('PHPMailer\PHPMailer\Exception'))
{
  require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
  require '../vendor/phpmailer/phpmailer/src/Exception.php';
  require '../vendor/phpmailer/phpmailer/src/SMTP.php';
}


    class Cliente{

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

         public function sendEmail($email, $sucursal, $categoria, $servicio, $fecha, $estilista, $cliente){
            //Create an instance; passing `true` enables exceptions
            $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host       = 'smtp.gmail.com';          //Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                $mail->Username   = 'mjerrymoises@gmail.com';       //SMTP username
                $mail->Password   = 'qqimvwomqnqxcccw';                         //SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                //Recipients
                $mail->setFrom('from@example.com', 'Mailer');
                $mail->addAddress($email, 'Jerry Melendez');     //Add a recipient
                // $mail->addAddress('jerrymelendez0@gmail.com');               //Name is optional
                // $mail->addReplyTo('jerrymelendez20@gmail.com', 'Information');
                // $mail->addCC('jerrymelendez20@gmail.com');
                // $mail->addBCC('bcc@example.com');

                //Attachments
                // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
                // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'Here is the subject';
                $mail->Body    = '
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <title></title>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                        <style>
                            .row-bigger{
                                min-height: 50px;
                            }
                            
                            td{
                                min-height: 50px;
                                width: 50%;
                                padding-top: 30px;
                                padding-bottom: 30px;
                            }
                            
                            .row-style{
                                background: rgb(228,228,228);
                                background: linear-gradient(180deg, rgba(228,228,228,1) 4%, rgba(255,255,255,1) 4%, rgba(255,255,255,1) 14%, rgba(228,228,228,1) 14%, rgba(228,228,228,1) 86%, rgba(255,255,255,1) 86%, rgba(255,255,255,1) 95%, rgba(228,228,228,1) 95%);
                            }
                            
                            .row-style2{
                                background: rgb(228,228,228);
                                background: linear-gradient(180deg, rgba(228,228,228,1) 4%, rgba(255,255,255,1) 4%, rgba(255,255,255,1) 14%, rgba(228,228,228,1) 14%, rgba(228,228,228,1) 86%, rgba(255,255,255,1) 86%, rgba(255,255,255,1) 95%, rgba(228,228,228,1) 95%);
                            }
                        </style>
                    </head>
                    <body>
                        <nav class="navbar navbar-expand-lg navbar-light"  style="background-color: #54BFF4;">
                            <a class="navbar-brand" href="#"></a>
                        </nav>
                        <div class="container">
                            <div class="row mt-4">
                                <div class="col" style="text-align: center;">
                                    <img class="rounded-circle border border-dark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjsB-q9wkytDGwhd6S5lI74cCVdqQaykwwaV3zo8NUwjOgcXaC7pSQ1OIMNolQdbZIyMQ" alt="">
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <p style="font-size: 18px;">Muchas gracias por realizar una reservacion de nuestro servicio</p>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <h5 style="width: 100%; text-align: center;">Los datos de su cita:</h5>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <table style="width: 100%;">
                                        <tbody style="font-weight: bold;">
                                            <tr class="row-style">
                                                <td><label>Sucursal:</label></td>
                                                <td><label id="infoSucursal">'.$sucursal.'</label></td>
                                            </tr>
                                            <tr>
                                                <td><label>Categoría:</label></td>
                                                <td><label id="infoCategoria">'.$categoria.'</label></td>
                                            </tr>
                                            <tr class="row-style">
                                                <td><label>Servicio:</label></td>
                                                <td><label id="infoServicio">'.$servicio.'</label></td>
                                            </tr>
                                            <tr>
                                                <td><label>Fecha:</label></td>
                                                <td><label id="infoFecha">'.$fecha.'</label></td>
                                            </tr>
                                            <tr class="row-style">
                                                <td><label>Estilista:</label></td>
                                                <td><label id="infoEstilista">'.$estilista.'</label></td>
                                            </tr>
                                            <tr>
                                                <td><label>Cliente:</label></td>
                                                <td><label id="infoCliente">'.$cliente.'</label></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </body>
                    <footer>
                        <nav class="navbar navbar-expand-lg navbar-light"  style="background-color: #3f88ad;">
                            <a class="navbar-brand" href="#"></a>
                        </nav>
                    </footer>
                </html>
                ';
                $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

                $mail->send();
                echo 'Message has been sent';
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }

        }

        

    }
?>