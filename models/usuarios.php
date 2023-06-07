<?php

    class Usuarios  {
        static $table_name = "usuarios";
        static $primary_key = "idusuario";

        private $idusuario;
        private $nombre;
        private $cedula;
        private $edad;
        private $email_user;
        private $usuario;
        private $password;
        private $cargo;
        private $celular;
        private $telefono;
        private $fechaingreso;
        private $salario;
        private $dialibre;
        private $rolid;
        private $idsucursal;
        private $status;
        private $avatar;

        public function __construct($idusuario, $nombre, $cedula, $edad, $email_user, $usuario, $password, $cargo, $celular, $telefono, $fechaingreso, $salario, $dialibre, $rolid, $idsucursal, $status, $avatar) {
            $this->idusuario = $idusuario;
            $this->nombre = $nombre;
            $this->cedula = $cedula;
            $this->edad = $edad;
            $this->email_user = $email_user;
            $this->usuario = $usuario;
            $this->password = $password;
            $this->cargo = $cargo;
            $this->celular = $celular;
            $this->telefono = $telefono;
            $this->fechaingreso = $fechaingreso;
            $this->salario = $salario;
            $this->dialibre = $dialibre;
            $this->rolid = $rolid;
            $this->idsucursal = $idsucursal;
            $this->status = $status;
            $this->avatar = $avatar;
        }

        public function getIdusuario() {
            return $this->idusuario;
        }

        public function getNombre() {
            return $this->nombre;
        }

        public function getCedula() {
            return $this->cedula;
        }

        public function getEdad() {
            return $this->edad;
        }

        public function getEmail_user() {
            return $this->email_user;
        }

        public function getUsuario() {
            return $this->usuario;
        }

        public function getPassword() {
            return $this->password;
        }

        public function getCargo() {
            return $this->cargo;
        }

        public function getCelular() {
            return $this->celular;
        }

        public function getTelefono() {
            return $this->telefono;
        }

        public function getFechaingreso() {
            return $this->fechaingreso;
        }

        public function getSalario() {
            return $this->salario;
        }

        public function getDialibre() {
            return $this->dialibre;
        }

        public function getRolid() {
            return $this->rolid;
        }

        public function getIdsucursal() {
            return $this->idsucursal;
        }

        public function getStatus() {
            return $this->status;
        }

        public function getAvatar() {
            return $this->avatar;
        }

        public function setIdusuario($idusuario) {
            $this->idusuario = $idusuario;
        }

        public function setNombre($nombre) {
            $this->nombre = $nombre;
        }

        public function setCedula($cedula) {
            $this->cedula = $cedula;
        }

        public function setEdad($edad) {
            $this->edad = $edad;
        }

        public function setEmail_user($email_user) {
            $this->email_user = $email_user;
        }

        public function setUsuario($usuario) {
            $this->usuario = $usuario;
        }

        public function setPassword($password) {
            $this->password = $password;
        }

        public function setCargo($cargo) {
            $this->cargo = $cargo;
        }

        public function setCelular($celular) {
            $this->celular = $celular;
        }

        public function setTelefono($telefono) {
            $this->telefono = $telefono;
        }

        public function setFechaingreso($fechaingreso) {
            $this->fechaingreso = $fechaingreso;
        }

        public function setSalario($salario) {
            $this->salario = $salario;
        }

        public function setDialibre($dialibre) {
            $this->dialibre = $dialibre;
        }

        public function setRolid($rolid) {
            $this->rolid = $rolid;
        }

        public function setIdsucursal($idsucursal) {
            $this->idsucursal = $idsucursal;
        }

        public function setStatus($status) {
            $this->status = $status;
        }

        public function setAvatar($avatar) {
            $this->avatar = $avatar;
        }

    }
?>