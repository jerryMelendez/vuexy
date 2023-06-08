<?php

    class Connection{
        private $host = "localhost";
        private $usuario = "root";
        private $pass = "root";
        private $db = "dbsgs";

        private $connection;

        function __construct()
        {
        }

        function connect(){
            $this->connection = mysqli_connect(
                $this->host,
                $this->usuario,
                $this->pass,
                $this->db
            );

            $this->connection->set_charset("utf8");

            if(mysqli_connect_errno()){
                print("Error al conectarse");
            }

            return $this->connection;
        }

        function getData($sql)
        {
            $data = array();
            $result = mysqli_query($this->connection, $sql);
    
            $error = mysqli_error($this->connection);
    
            if (empty($error)) {
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        array_push($data, $row);
                    }
                }
            } else {
                throw new Exception($error);
            }
            return $data;
        }
    
        function numRows($sql)
        {
            $result = mysqli_query($this->connection, $sql);
            $error = mysqli_error($this->connection);
    
            if (empty($error)) {
                return mysqli_num_rows($result);
            } else {
                throw new Exception($error);
            }
        }

        function close(){
            mysqli_close($this->connection);
        }
    }

?>