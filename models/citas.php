<?php
    class Citas{
        static $table_name = "citas";
        static $primary_key = "id";

        private $id;
        private $borderColor;
        private $backgroundColor;
        private $start;
        private $end;
        private $idcliente;
        private $idempleado;
        private $estado;
        private $nota;
        private $idsucursal;

        public function __construct($id, $borderColor, $backgroundColor, $start, $end, $idcliente, $idempleado, $estado, $nota, $idsucursal) {
            $this->id = $id;
            $this->borderColor = $borderColor;
            $this->backgroundColor = $backgroundColor;
            $this->start = $start;
            $this->end = $end;
            $this->idcliente = $idcliente;
            $this->idempleado = $idempleado;
            $this->estado = $estado;
            $this->nota = $nota;
            $this->idsucursal = $idsucursal;
        }

        public function getId() {
            return $this->id;
        }

        public function getBorderColor() {
            return $this->borderColor;
        }

        public function getBackgroundColor() {
            return $this->backgroundColor;
        }

        public function getStart() {
            return $this->start;
        }

        public function getEnd() {
            return $this->end;
        }

        public function getIdcliente() {
            return $this->idcliente;
        }

        public function getIdempleado() {
            return $this->idempleado;
        }

        public function getEstado() {
            return $this->estado;
        }

        public function getNota() {
            return $this->nota;
        }

        public function getIdsucursal() {
            return $this->idsucursal;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setBorderColor($borderColor) {
            $this->borderColor = $borderColor;
        }

        public function setBackgroundColor($backgroundColor) {
            $this->backgroundColor = $backgroundColor;
        }

        public function setStart($start) {
            $this->start = $start;
        }

        public function setEnd($end) {
            $this->end = $end;
        }

        public function setIdcliente($idcliente) {
            $this->idcliente = $idcliente;
        }

        public function setIdempleado($idempleado) {
            $this->idempleado = $idempleado;
        }

        public function setEstado($estado) {
            $this->estado = $estado;
        }

        public function setNota($nota) {
            $this->nota = $nota;
        }

        public function setIdsucursal($idsucursal) {
            $this->idsucursal = $idsucursal;
        }

    }
?>