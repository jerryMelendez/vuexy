<?php

    class TipoServicio  {
        static $table_name = "tiposervicio";
        static $primary_key = "id";

        private $id;
        private $tiposervicio;

        public function __construct($id, $tiposervicio) {
            $this->id = $id;
            $this->tiposervicio = $tiposervicio;
        }

        public function getId() {
            return $this->id;
        }

        public function getTiposervicio() {
            return $this->tiposervicio;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setTiposervicio($tiposervicio) {
            $this->tiposervicio = $tiposervicio;
        }
    }

?>