-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)


CREATE TABLE `categoria` (
  `ca_id` int NOT NULL AUTO_INCREMENT,
  `ca_nombre` varchar(100) NOT NULL,
  `ca_f_create` datetime DEFAULT NULL,
  `ca_f_update` datetime DEFAULT NULL,
  `ca_u_create` varchar(100) DEFAULT NULL,
  `ca_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '1' COMMENT '1:activo\n0:inactivo',
  PRIMARY KEY (`ca_id`),
  UNIQUE KEY `ca_id_UNIQUE` (`ca_id`)
);



--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `cl_id` int NOT NULL AUTO_INCREMENT,
  `cl_nombre` varchar(100) NOT NULL,
  `cl_apellido` varchar(100) NOT NULL,
  `cl_dni` int NOT NULL,
  `cl_direccion` varchar(100) NOT NULL,
  `cl_email` varchar(100) NOT NULL,
  `cl_telefono` int NOT NULL,
  `cl_f_create` datetime DEFAULT NULL,
  `cl_f_update` datetime DEFAULT NULL,
  `cl_u_create` varchar(100) DEFAULT NULL,
  `cl_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '1' COMMENT '1:activo\n0:inactivo',
  PRIMARY KEY (`cl_id`),
  UNIQUE KEY `cl_id_UNIQUE` (`cl_id`),
  UNIQUE KEY `cl_dni_UNIQUE` (`cl_dni`),
  UNIQUE KEY `cl_direccion_UNIQUE` (`cl_direccion`),
  UNIQUE KEY `cl_email_UNIQUE` (`cl_email`),
  UNIQUE KEY `cl_telefono_UNIQUE` (`cl_telefono`)
);

--
-- Table structure for table `vendedor`
--

CREATE TABLE `vendedor` (
  `ve_id` int NOT NULL AUTO_INCREMENT,
  `ve_nombre` varchar(100) NOT NULL,
  `ve_apellido` varchar(100) NOT NULL,
  `ve_dni` int NOT NULL,
  `ve_direccion` varchar(100) NOT NULL,
  `ve_email` varchar(100) NOT NULL,
  `ve_telefono` int NOT NULL,
  `ve_usuario` varchar(100) NOT NULL,
  `ve_clave` varchar(100) NOT NULL,
  `ve_f_create` datetime DEFAULT NULL,
  `ve_f_update` datetime DEFAULT NULL,
  `ve_u_create` varchar(100) DEFAULT NULL,
  `ve_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '1' COMMENT '1:activo\n0:inactivo',
  PRIMARY KEY (`ve_id`),
  UNIQUE KEY `ve_id_UNIQUE` (`ve_id`),
  UNIQUE KEY `ve_dni_UNIQUE` (`ve_dni`),
  UNIQUE KEY `ve_direccion_UNIQUE` (`ve_direccion`),
  UNIQUE KEY `ve_email_UNIQUE` (`ve_email`),
  UNIQUE KEY `ve_telefono_UNIQUE` (`ve_telefono`),
  UNIQUE KEY `ve_usuario_UNIQUE` (`ve_usuario`),
  UNIQUE KEY `ve_clave_UNIQUE` (`ve_clave`)
);

--
-- Table structure for table `comprobante`
--

CREATE TABLE `comprobante` (
  `co_id` int NOT NULL AUTO_INCREMENT,
  `co_fecha` datetime NOT NULL,
  `co_f_create` datetime DEFAULT NULL,
  `co_f_update` datetime DEFAULT NULL,
  `co_u_create` varchar(100) DEFAULT NULL,
  `co_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '1' COMMENT '1:activo\n0:inactivo',
  `cl_id` int NOT NULL,
  `ve_id` int NOT NULL,
  PRIMARY KEY (`co_id`),
  UNIQUE KEY `co_id_UNIQUE` (`co_id`),
  KEY `fk_co_cl_idx` (`cl_id`),
  KEY `fk_co_ve_idx` (`ve_id`),
  CONSTRAINT `fk_co_cl` FOREIGN KEY (`cl_id`) REFERENCES `cliente` (`cl_id`),
  CONSTRAINT `fk_co_ve` FOREIGN KEY (`ve_id`) REFERENCES `vendedor` (`ve_id`)
);

--
-- Table structure for table `producto`
--

CREATE TABLE `producto` (
  `pr_id` int NOT NULL AUTO_INCREMENT,
  `pr_nombre` varchar(100) NOT NULL,
  `pr_precio` decimal(10,0) NOT NULL,
  `pr_stock` int NOT NULL,
  `pr_f_create` datetime DEFAULT NULL,
  `pr_f_update` datetime DEFAULT NULL,
  `pr_u_create` varchar(100) DEFAULT NULL,
  `pr_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '1' COMMENT '1:activo\n0:inactivo',
  `ca_id` int NOT NULL,
  PRIMARY KEY (`pr_id`),
  UNIQUE KEY `pr_id_UNIQUE` (`pr_id`),
  KEY `fk_pr_ca_idx` (`ca_id`),
  CONSTRAINT `fk_pr_ca` FOREIGN KEY (`ca_id`) REFERENCES `categoria` (`ca_id`)
);

--
-- Table structure for table `detalle_comprobante`
--

CREATE TABLE `detalle_comprobante` (
  `dec_id` int NOT NULL AUTO_INCREMENT,
  `dec_cantidad` int NOT NULL,
  `dec_f_create` datetime DEFAULT NULL,
  `dec_f_update` datetime DEFAULT NULL,
  `dec_u_create` varchar(100) DEFAULT NULL,
  `dec_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '1' COMMENT '1:activo\n0:inactivo',
  `pr_id` int NOT NULL,
  `ca_id` int NOT NULL,
  `co_id` int NOT NULL,
  `cl_id` int NOT NULL,
  `ve_id` int NOT NULL,
  PRIMARY KEY (`dec_id`),
  UNIQUE KEY `dec_id_UNIQUE` (`dec_id`),
  KEY `fk_dec_pr_idx` (`pr_id`),
  KEY `fk_dec_ca_idx` (`ca_id`),
  KEY `fk_dec_co_idx` (`co_id`),
  KEY `fk_dec_cl_idx` (`cl_id`),
  KEY `fk_dec_ve_idx` (`ve_id`),
  CONSTRAINT `fk_dec_ca` FOREIGN KEY (`ca_id`) REFERENCES `categoria` (`ca_id`),
  CONSTRAINT `fk_dec_cl` FOREIGN KEY (`cl_id`) REFERENCES `cliente` (`cl_id`),
  CONSTRAINT `fk_dec_co` FOREIGN KEY (`co_id`) REFERENCES `comprobante` (`co_id`),
  CONSTRAINT `fk_dec_pr` FOREIGN KEY (`pr_id`) REFERENCES `producto` (`pr_id`),
  CONSTRAINT `fk_dec_ve` FOREIGN KEY (`ve_id`) REFERENCES `vendedor` (`ve_id`)
);




