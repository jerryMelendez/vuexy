<?php

    class UsuarioServicio{
        static $table_name = "usuarioservicio";
        static $primary_key = "id";

        private $id;
        private $idusuario;
        private $idservicio;

        public function __construct($id, $idusuario, $idservicio) {
            $this->id = $id;
            $this->idusuario = $idusuario;
            $this->idservicio = $idservicio;
        }

        public function getId() {
            return $this->id;
        }

        public function getIdusuario() {
            return $this->idusuario;
        }

        public function getIdservicio() {
            return $this->idservicio;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setIdusuario($idusuario) {
            $this->idusuario = $idusuario;
        }

        public function setIdservicio($idservicio) {
            $this->idservicio = $idservicio;
        }
    }

?>