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
-- Table structure for table `cheques`
--

DROP TABLE IF EXISTS `cheques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheques` (
  `idcheq` int NOT NULL AUTO_INCREMENT,
  `nrocheq` int NOT NULL,
  `importe` int NOT NULL,
  `banco` int NOT NULL,
  `moneda` int NOT NULL,
  `fechemi` varchar(10) NOT NULL,
  `fechpagc` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `fechcob` varchar(10) NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idcheq`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheques`
--

LOCK TABLES `cheques` WRITE;
/*!40000 ALTER TABLE `cheques` DISABLE KEYS */;
INSERT INTO `cheques` VALUES (9,1,1,1,0,'2001-01-01','','',1),(10,2,2,2,1,'2002-01-02','','',1),(11,3,33,3,1,'2000-01-01','','',1),(12,1,1,1,0,'1000-01-01','','',1),(13,4,4,2,1,'2000-01-01','3000-02-01','10000-02-0',1),(14,4,4,4,0,'2024-04-04','2020-04-04','2020-05-04',1),(15,2,2,2,1,'2020-11-03','2020-11-05','undefined',1),(16,2,2,2,1,'2020-11-03','2020-11-05','undefined',1),(17,3,3,3,1,'2020-11-03','2020-11-13','undefined',1);
/*!40000 ALTER TABLE `cheques` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-04 10:23:14
