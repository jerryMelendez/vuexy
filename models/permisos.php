<?php

    class Permisos {
        static $table_name = "permisos";
        static $primary_key = "idpermiso";

        private $idpermiso;
        private $rolid;
        private $moduloid;
        private $r;
        private $w;
        private $u;
        private $d;

        public function __construct($idpermiso, $rolid, $moduloid, $r, $w, $u, $d) {
            $this->idpermiso = $idpermiso;
            $this->rolid = $rolid;
            $this->moduloid = $moduloid;
            $this->r = $r;
            $this->w = $w;
            $this->u = $u;
            $this->d = $d;
        }

        public function getIdpermiso() {
            return $this->idpermiso;
        }

        public function getRolid() {
            return $this->rolid;
        }

        public function getModuloid() {
            return $this->moduloid;
        }

        public function getR() {
            return $this->r;
        }

        public function getW() {
            return $this->w;
        }

        public function getU() {
            return $this->u;
        }

        public function getD() {
            return $this->d;
        }

        public function setIdpermiso($idpermiso) {
            $this->idpermiso = $idpermiso;
        }

        public function setRolid($rolid) {
            $this->rolid = $rolid;
        }

        public function setModuloid($moduloid) {
            $this->moduloid = $moduloid;
        }

        public function setR($r) {
            $this->r = $r;
        }

        public function setW($w) {
            $this->w = $w;
        }

        public function setU($u) {
            $this->u = $u;
        }

        public function setD($d) {
            $this->d = $d;
        }
    }

?>