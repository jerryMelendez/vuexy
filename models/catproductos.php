<?php

    class CatProductos  {
        static $table_name = "catproductos";
        static $primary_key = "id";

        private $id;
        private $nombrecat;
        private $estado;

        public function __construct($id, $nombrecat, $estado) {
            $this->id = $id;
            $this->nombrecat = $nombrecat;
            $this->estado = $estado;
        }

        public function getId() {
            return $this->id;
        }

        public function getNombrecat() {
            return $this->nombrecat;
        }

        public function getEstado() {
            return $this->estado;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setNombrecat($nombrecat) {
            $this->nombrecat = $nombrecat;
        }

        public function setEstado($estado) {
            $this->estado = $estado;
        }
    }

?>