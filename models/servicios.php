<?php

    class Servicios  {
        static $table_name = "servicios";
        static $primary_key = "idservicio";

        private $idservicio;
        private $idcategoria;
        private $servicio;
        private $duracion;
        private $idtipo;

        public function __construct($idservicio, $idcategoria, $servicio, $duracion, $idtipo) {
            $this->idservicio = $idservicio;
            $this->idcategoria = $idcategoria;
            $this->servicio = $servicio;
            $this->duracion = $duracion;
            $this->idtipo = $idtipo;
        }

        public function getIdservicio() {
            return $this->idservicio;
        }

        public function getIdcategoria() {
            return $this->idcategoria;
        }

        public function getServicio() {
            return $this->servicio;
        }

        public function getDuracion() {
            return $this->duracion;
        }

        public function getIdtipo() {
            return $this->idtipo;
        }

        public function setIdservicio($idservicio) {
            $this->idservicio = $idservicio;
        }

        public function setIdcategoria($idcategoria) {
            $this->idcategoria = $idcategoria;
        }

        public function setServicio($servicio) {
            $this->servicio = $servicio;
        }

        public function setDuracion($duracion) {
            $this->duracion = $duracion;
        }

        public function setIdtipo($idtipo) {
            $this->idtipo = $idtipo;
        }
    }

?>