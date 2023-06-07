<?php
    class Horarios{
        static $table_name = "horarios";
        static $primary_key = "id";

        private $id;
        private $idusuario;
        private $LU;
        private $MA;
        private $MI;
        private $JU;
        private $VI;
        private $SA;
        private $DO;
        private $HIS;
        private $HFS;
        private $HIFS;
        private $HFFS;

        public function __construct($id, $idusuario, $LU, $MA, $MI, $JU, $VI, $SA, $DO, $HIS, $HFS, $HIFS, $HFFS) {
            $this->id = $id;
            $this->idusuario = $idusuario;
            $this->LU = $LU;
            $this->MA = $MA;
            $this->MI = $MI;
            $this->JU = $JU;
            $this->VI = $VI;
            $this->SA = $SA;
            $this->DO = $DO;
            $this->HIS = $HIS;
            $this->HFS = $HFS;
            $this->HIFS = $HIFS;
            $this->HFFS = $HFFS;
        }

        public function getId() {
            return $this->id;
        }

        public function getIdusuario() {
            return $this->idusuario;
        }

        public function getLU() {
            return $this->LU;
        }

        public function getMA() {
            return $this->MA;
        }

        public function getMI() {
            return $this->MI;
        }

        public function getJU() {
            return $this->JU;
        }

        public function getVI() {
            return $this->VI;
        }

        public function getSA() {
            return $this->SA;
        }

        public function getDO() {
            return $this->DO;
        }

        public function getHIS() {
            return $this->HIS;
        }

        public function getHFS() {
            return $this->HFS;
        }

        public function getHIFS() {
            return $this->HIFS;
        }

        public function getHFFS() {
            return $this->HFFS;
        }

        public function setId($id) {
            $this->id = $id;
        }

        public function setIdusuario($idusuario) {
            $this->idusuario = $idusuario;
        }

        public function setLU($LU) {
            $this->LU = $LU;
        }

        public function setMA($MA) {
            $this->MA = $MA;
        }

        public function setMI($MI) {
            $this->MI = $MI;
        }

        public function setJU($JU) {
            $this->JU = $JU;
        }

        public function setVI($VI) {
            $this->VI = $VI;
        }

        public function setSA($SA) {
            $this->SA = $SA;
        }

        public function setDO($DO) {
            $this->DO = $DO;
        }

        public function setHIS($HIS) {
            $this->HIS = $HIS;
        }

        public function setHFS($HFS) {
            $this->HFS = $HFS;
        }

        public function setHIFS($HIFS) {
            $this->HIFS = $HIFS;
        }

        public function setHFFS($HFFS) {
            $this->HFFS = $HFFS;
        }

    }
?>