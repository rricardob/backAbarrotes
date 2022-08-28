-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: abarrotes
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `ca_id` int NOT NULL AUTO_INCREMENT,
  `ca_nombre` varchar(100) NOT NULL,
  `ca_f_create` datetime DEFAULT NULL,
  `ca_f_update` datetime DEFAULT NULL,
  `ca_u_create` varchar(100) DEFAULT NULL,
  `ca_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '0' COMMENT '1:inactivo\\n0:activo',
  PRIMARY KEY (`ca_id`),
  UNIQUE KEY `ca_id_UNIQUE` (`ca_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Electrodomesticos','2022-07-10 20:59:35','2022-07-10 20:59:35','undefined','undefined',0),(2,'Limpieza','2022-07-10 21:00:17','2022-07-10 21:00:17','undefined','undefined',0),(3,'Abarrotes','2022-07-29 00:00:00','2022-07-29 00:00:00',NULL,NULL,0),(4,'Aseo','2022-08-28 00:13:44','2022-08-28 00:13:44','undefined','undefined',0),(5,'Estudios','2022-08-28 00:14:14','2022-08-28 00:14:14','undefined','undefined',0);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `eliminado` tinyint DEFAULT '0' COMMENT '1:inactivo\\n0:activo',
  PRIMARY KEY (`cl_id`),
  UNIQUE KEY `cl_id_UNIQUE` (`cl_id`),
  UNIQUE KEY `cl_dni_UNIQUE` (`cl_dni`),
  UNIQUE KEY `cl_direccion_UNIQUE` (`cl_direccion`),
  UNIQUE KEY `cl_email_UNIQUE` (`cl_email`),
  UNIQUE KEY `cl_telefono_UNIQUE` (`cl_telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Piero','Becerra',78855214,'Carmen MZ - O - Lote 5','piero@gmail.com',314251,'2022-05-15 12:45:23','2022-05-15 12:45:23','cpiero','cpiero',1),(2,'Tello','Leon',21144125,'Chicamita 2023 - Lote 2 ','fernando@gmail.com',315241,'2022-05-15 12:59:11','2022-08-27 22:42:54','undefined','undefined',0),(3,'sharon','herrera',11111,'el carmen','sharon@gmail.com',11111,'2022-08-28 00:14:56','2022-08-28 00:14:56','undefined','undefined',0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comprobante`
--

DROP TABLE IF EXISTS `comprobante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comprobante` (
  `co_id` int NOT NULL AUTO_INCREMENT,
  `co_fecha` datetime NOT NULL,
  `co_f_create` datetime DEFAULT NULL,
  `co_f_update` datetime DEFAULT NULL,
  `co_u_create` varchar(100) DEFAULT NULL,
  `co_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '0' COMMENT '1:inactivo\\n0:activo',
  `cl_id` int NOT NULL,
  `ve_id` int NOT NULL,
  `co_total` double NOT NULL,
  PRIMARY KEY (`co_id`),
  UNIQUE KEY `co_id_UNIQUE` (`co_id`),
  KEY `fk_co_cl_idx` (`cl_id`),
  KEY `fk_co_ve_idx` (`ve_id`),
  CONSTRAINT `fk_co_cl` FOREIGN KEY (`cl_id`) REFERENCES `cliente` (`cl_id`),
  CONSTRAINT `fk_co_ve` FOREIGN KEY (`ve_id`) REFERENCES `vendedor` (`ve_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comprobante`
--

LOCK TABLES `comprobante` WRITE;
/*!40000 ALTER TABLE `comprobante` DISABLE KEYS */;
INSERT INTO `comprobante` VALUES (1,'2022-07-10 00:00:00','2022-07-26 00:00:00','2022-07-26 00:00:00','sys','sys',2,2,1,100),(2,'2022-07-01 00:00:00','2022-07-26 00:00:00','2022-07-26 00:00:00','sys','sys',1,1,1,200),(3,'2022-07-08 00:00:00','2022-07-26 00:00:00','2022-07-26 00:00:00','sys','sys',2,1,1,158.2),(4,'2022-07-20 00:00:00','2022-07-26 00:00:00','2022-07-26 00:00:00','sys','sys',2,1,1,85.98),(5,'2022-07-20 00:00:00','2022-07-26 00:00:00','2022-07-26 00:00:00','sys','sys',1,1,1,20.53),(6,'2022-07-26 00:00:00','2022-07-26 00:00:00','2022-07-26 00:00:00','sys','sys',1,1,4,500),(7,'2022-03-22 22:43:09','2022-08-20 19:49:39','2022-08-20 19:49:39','fvargas','fvargas',2,1,1,1000),(8,'2022-03-22 22:43:09','2022-08-20 21:54:42','2022-08-20 21:54:42','fvargas','fvargas',0,1,1,1000),(9,'2022-08-21 00:00:00','2022-08-21 02:08:50','2022-08-21 02:08:50','admin','admin',0,1,4,0),(10,'2022-08-21 00:00:00','2022-08-21 02:13:32','2022-08-21 02:13:32','admin','admin',0,1,4,0),(11,'2022-08-28 00:00:00','2022-08-28 00:19:26','2022-08-28 00:19:26','admin','admin',0,3,5,0);
/*!40000 ALTER TABLE `comprobante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_comprobante`
--

DROP TABLE IF EXISTS `detalle_comprobante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_comprobante` (
  `dec_id` int NOT NULL AUTO_INCREMENT,
  `dec_cantidad` int NOT NULL,
  `dec_f_create` datetime DEFAULT NULL,
  `dec_f_update` datetime DEFAULT NULL,
  `dec_u_create` varchar(100) DEFAULT NULL,
  `dec_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '0' COMMENT '1:inactivo\\n0:activo',
  `pr_id` int NOT NULL,
  `co_id` int NOT NULL,
  PRIMARY KEY (`dec_id`),
  UNIQUE KEY `dec_id_UNIQUE` (`dec_id`),
  KEY `fk_dec_pr_idx` (`pr_id`),
  KEY `fk_dec_co_idx` (`co_id`),
  CONSTRAINT `fk_dec_co` FOREIGN KEY (`co_id`) REFERENCES `comprobante` (`co_id`),
  CONSTRAINT `fk_dec_pr` FOREIGN KEY (`pr_id`) REFERENCES `producto` (`pr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_comprobante`
--

LOCK TABLES `detalle_comprobante` WRITE;
/*!40000 ALTER TABLE `detalle_comprobante` DISABLE KEYS */;
INSERT INTO `detalle_comprobante` VALUES (1,0,NULL,NULL,NULL,NULL,0,1,1),(2,0,NULL,NULL,NULL,NULL,0,2,1),(3,40,NULL,NULL,NULL,NULL,0,2,2),(4,1,'2022-03-22 22:43:09','2022-03-22 22:43:09','rbueno','rbueno',0,1,1),(5,0,'2022-08-21 00:00:00','2022-08-21 00:00:00','admin','admin',0,1,10),(6,0,'2022-08-21 00:00:00','2022-08-21 00:00:00','admin','admin',0,2,10),(7,0,'2022-08-28 00:00:00','2022-08-28 00:00:00','admin','admin',0,3,11);
/*!40000 ALTER TABLE `detalle_comprobante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `pr_id` int NOT NULL AUTO_INCREMENT,
  `pr_nombre` varchar(100) NOT NULL,
  `pr_precio` decimal(10,0) NOT NULL,
  `pr_stock` int NOT NULL,
  `pr_f_create` datetime DEFAULT NULL,
  `pr_f_update` datetime DEFAULT NULL,
  `pr_u_create` varchar(100) DEFAULT NULL,
  `pr_u_update` varchar(100) DEFAULT NULL,
  `eliminado` tinyint DEFAULT '0' COMMENT '1:inactivo\\n0:activo',
  `ca_id` int NOT NULL,
  PRIMARY KEY (`pr_id`),
  UNIQUE KEY `pr_id_UNIQUE` (`pr_id`),
  KEY `fk_pr_ca_idx` (`ca_id`),
  CONSTRAINT `fk_pr_ca` FOREIGN KEY (`ca_id`) REFERENCES `categoria` (`ca_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Laptop',1500,5,'2022-07-10 21:01:02','2022-07-10 21:01:02','undefined','undefined',0,1),(2,'Harina',9,45,'2022-07-29 00:00:00','2022-07-29 00:00:00',NULL,NULL,0,3),(3,'cuaderno',8,500,'2022-08-28 00:14:34','2022-08-28 00:18:44','undefined','undefined',0,5);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `eliminado` tinyint DEFAULT '0' COMMENT '1:inactivo\\n0:activo',
  PRIMARY KEY (`ve_id`),
  UNIQUE KEY `ve_id_UNIQUE` (`ve_id`),
  UNIQUE KEY `ve_dni_UNIQUE` (`ve_dni`),
  UNIQUE KEY `ve_direccion_UNIQUE` (`ve_direccion`),
  UNIQUE KEY `ve_email_UNIQUE` (`ve_email`),
  UNIQUE KEY `ve_telefono_UNIQUE` (`ve_telefono`),
  UNIQUE KEY `ve_usuario_UNIQUE` (`ve_usuario`),
  UNIQUE KEY `ve_clave_UNIQUE` (`ve_clave`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor`
--

LOCK TABLES `vendedor` WRITE;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` VALUES (1,'Piero Rafael','Becerra Chang',76600934,'Urb . Bellamar - Lote 16 ','piero@gmail.com',314251,'pbecerra','12345','2022-05-15 12:45:23','2022-05-15 12:45:23','cpiero','cpiero',1),(4,'Jerson','Julcamoro',11111111,'Las Brisas - Lote 15 ','jerson@gmail.com',111111,'whiston','eder','2022-05-16 21:18:10','2022-05-16 21:20:12','undefined','undefined',1),(5,'sharon','herrera',1111,'el carmen','sharon@gmail.com',1111,'sharon','222','2022-08-27 22:43:40','2022-08-28 00:15:07','undefined','undefined',0);
/*!40000 ALTER TABLE `vendedor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-28  0:33:42
