<?php

    class Modulo  {
        static $table_name = "modulo";
        static $primary_key = "id";

        private $id;
        private $titulo;
        private $descripcion;
        private $status;

        public function __construct($id, $titulo, $descripcion, $status) {
            $this->id = $id;
            $this->titulo = $titulo;
            $this->descripcion = $descripcion;
            $this->status = $status;
        }

        public function getId() {
            return $this->id;
        }

        public function getTitulo() {
            return $this->titulo;
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

        public function setTitulo($titulo) {
            $this->titulo = $titulo;
        }

        public function setDescripcion($descripcion){
            $this->descripcion = $descripcion;
        }

        public function setStatus($status) {
            $this->status = $status;
        }

    }

?>