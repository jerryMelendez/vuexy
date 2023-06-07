<?php

    class Rol {
        static $table_name = "rol";
        static $primary_key = "id";

        private $id;
        private $nombrerol;
        private $descripcion;
        private $status;

        public function __construct($id, $nombrerol, $descripcion, $status) {
            $this->id = $id;
            $this->nombrerol = $nombrerol;
            $this->descripcion = $descripcion;
            $this->status = $status;
        }

        public function getId() {
            return $this->id;
        }

        public function getNombrerol() {
            return $this->nombrerol;
        }

        public function getDescripcion() {
            return $this->descripcion;
        }

        public function getStatus() {
            return $this->status;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setNombrerol($nombrerol) {
            $this->nombrerol = $nombrerol;
        }

        public function setDescripcion($descripcion){
            $this->descripcion = $descripcion;
        }

        public function setStatus($status) {
            $this->status = $status;
        }
    }
?>