<?php

    class Sucursal  {
        static $table_name = "sucursal";
        static $primary_key = "idsucursal";

        private $idsucursal;
        private $nombre;

        public function __construct($idsucursal, $nombre, $direccion, $telefono, $status) {
            $this->idsucursal = $idsucursal;
            $this->nombre = $nombre;
        }

        public function getIdsucursal() {
            return $this->idsucursal;
        }

        public function getNombre() {
            return $this->nombre;
        }

        public function setIdsucursal($idsucursal) {
            $this->idsucursal = $idsucursal;
        }

        public function setNombre($nombre) {
            $this->nombre = $nombre;
        }

    }

?>