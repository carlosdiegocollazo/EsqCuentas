-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: esqprovee
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idpro` int NOT NULL AUTO_INCREMENT,
  `rutced` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `razon` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fantasia` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` text NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `feching` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `ciudad` text NOT NULL,
  `moneda` int NOT NULL,
  `saldoinicial` int NOT NULL,
  `saldototal` int NOT NULL,
  `retorno` int NOT NULL,
  `fechret` varchar(10) NOT NULL,
  `retactivo` int NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idpro`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (5,'123456789','Correa Hnos','Supermercado 18','mail@mail.com','Sergio ','Correa','1985-01-01','2413075','Sarandi y 18 de Julio','Rosario',0,500,0,5,'2020-12-31',0,'',1),(6,'2313212332132165465','FNC','FNC','unmail@mail','Fabrica Nacional decErvezas','FNC','2020-01-01','321231321','2313213','Montevideo',0,0,0,10,'2020-01-01',0,'',1);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-04 10:23:15
