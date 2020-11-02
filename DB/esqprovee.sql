-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-11-2020 a las 15:21:23
-- Versión del servidor: 8.0.21
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `esqprovee`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bancos`
--

DROP TABLE IF EXISTS `bancos`;
CREATE TABLE IF NOT EXISTS `bancos` (
  `idbanco` int NOT NULL AUTO_INCREMENT,
  `banco` text CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `moneda` int NOT NULL,
  `cuenta` text CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `sucursal` text CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idbanco`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bancos`
--

INSERT INTO `bancos` (`idbanco`, `banco`, `moneda`, `cuenta`, `sucursal`, `activo`) VALUES
(1, 'BROU $', 0, '123456789101112', '001 - Centro', 1),
(2, 'Santander USD', 1, '987654321123', '001 - Centro', 1),
(3, 'BROU USD', 1, '5454455454', '1', 1),
(4, 'Santander $', 0, '4454545', '22', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cheques`
--

DROP TABLE IF EXISTS `cheques`;
CREATE TABLE IF NOT EXISTS `cheques` (
  `idcheq` int NOT NULL AUTO_INCREMENT,
  `nrocheq` int NOT NULL,
  `importe` int NOT NULL,
  `banco` int NOT NULL,
  `moneda` int NOT NULL,
  `fechemi` varchar(10) NOT NULL,
  `fechpag` varchar(10) NOT NULL,
  `fechcob` varchar(10) NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idcheq`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cheques`
--

INSERT INTO `cheques` (`idcheq`, `nrocheq`, `importe`, `banco`, `moneda`, `fechemi`, `fechpag`, `fechcob`, `activo`) VALUES
(9, 1, 1, 1, 0, '2001-01-01', '', '', 1),
(10, 2, 2, 2, 1, '2002-01-02', '', '', 1),
(11, 3, 33, 3, 1, '2000-01-01', '', '', 1),
(12, 1, 1, 1, 0, '1000-01-01', '', '', 1),
(13, 4, 4, 2, 1, '2000-01-01', '3000-02-01', '10000-02-0', 1),
(14, 4, 4, 4, 0, '2024-04-04', '2020-04-04', '2020-05-04', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

DROP TABLE IF EXISTS `cotizacion`;
CREATE TABLE IF NOT EXISTS `cotizacion` (
  `idcot` int NOT NULL AUTO_INCREMENT,
  `fechcot` varchar(10) NOT NULL,
  `moneda` int NOT NULL,
  `cotizacion` double NOT NULL,
  `deldia` tinyint NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idcot`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cotizacion`
--

INSERT INTO `cotizacion` (`idcot`, `fechcot`, `moneda`, `cotizacion`, `deldia`, `activo`) VALUES
(1, '2020-10-30', 1, 45, 0, 1),
(2, '2020-10-30', 3, 0.005, 1, 1),
(3, '2020-10-30', 3, 1, 1, 1),
(4, '2020-10-30', 3, 0.019, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

DROP TABLE IF EXISTS `documentos`;
CREATE TABLE IF NOT EXISTS `documentos` (
  `idtipdoc` int NOT NULL AUTO_INCREMENT,
  `tipodoc` text CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `moneda` int NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idtipdoc`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`idtipdoc`, `tipodoc`, `moneda`, `activo`) VALUES
(1, 'Factura Contado', 0, 1),
(2, 'Nota Credito', 0, 1),
(3, 'Factura Credito', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas`
--

DROP TABLE IF EXISTS `monedas`;
CREATE TABLE IF NOT EXISTS `monedas` (
  `idmon` int NOT NULL AUTO_INCREMENT,
  `moneda` text NOT NULL,
  `divide` int NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idmon`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `monedas`
--

INSERT INTO `monedas` (`idmon`, `moneda`, `divide`, `activo`) VALUES
(0, 'Pesos', 0, 1),
(1, 'Dolares', 1, 1),
(2, 'Reales', 1, 1),
(3, 'Peso Argentino', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
CREATE TABLE IF NOT EXISTS `movimientos` (
  `idmov` int NOT NULL AUTO_INCREMENT,
  `proveedor` int NOT NULL,
  `tipdoc` int NOT NULL,
  `nrofac` int NOT NULL,
  `fechemi` varchar(10) NOT NULL,
  `fechpag` varchar(10) NOT NULL,
  `moneda` int NOT NULL,
  `nrocheq` int NOT NULL,
  `fechcheq` varchar(10) NOT NULL,
  `debe` int NOT NULL,
  `haber` int NOT NULL,
  `saldo` int NOT NULL,
  `saldtot` int NOT NULL,
  `nrorec` int NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idmov`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE IF NOT EXISTS `proveedores` (
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

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idpro`, `rutced`, `razon`, `fantasia`, `email`, `nombre`, `apellido`, `feching`, `telefono`, `direccion`, `ciudad`, `moneda`, `saldoinicial`, `saldototal`, `retorno`, `fechret`, `retactivo`, `observaciones`, `activo`) VALUES
(5, '123456789', 'Correa Hnos', 'Supermercado 18', 'mail@mail.com', 'Sergio ', 'Correa', '1985-01-01', '2413075', 'Sarandi y 18 de Julio', 'Rosario', 0, 0, 1500, 5, '2020-12-31', 0, '', 1),
(6, '2313212332132165465', 'FNC', 'FNC', 'unmail@mail', 'Fabrica Nacional decErvezas', 'FNC', '2020-01-01', '321231321', '2313213', 'Montevideo', 0, 0, 0, 10, '2020-01-01', 0, '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguridad`
--

DROP TABLE IF EXISTS `seguridad`;
CREATE TABLE IF NOT EXISTS `seguridad` (
  `idseg` int NOT NULL AUTO_INCREMENT,
  `categoria` int DEFAULT NULL,
  `descripcion` text NOT NULL,
  `activo` text NOT NULL,
  PRIMARY KEY (`idseg`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `seguridad`
--

INSERT INTO `seguridad` (`idseg`, `categoria`, `descripcion`, `activo`) VALUES
(0, 0, 'Administrador', '1'),
(1, 1, 'Administrativo', '1'),
(2, 2, 'Consultante', '1'),
(50, 5, 'Categoria 5', '1'),
(49, 6, 'Categoria 6', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusu` int NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `pass` text NOT NULL,
  `apellidos` text NOT NULL,
  `nombres` text NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `ciudad` text NOT NULL,
  `seguridad` int NOT NULL,
  `fechnac` varchar(10) NOT NULL,
  `feching` varchar(10) NOT NULL,
  `observaciones` text NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idusu`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusu`, `email`, `pass`, `apellidos`, `nombres`, `telefono`, `direccion`, `ciudad`, `seguridad`, `fechnac`, `feching`, `observaciones`, `activo`) VALUES
(1, 'admin@mail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Collazo', 'Carlos Diego', '099550624', 'Salto1262', 'Montevideo', 0, '2000-01-01', '2000-01-01', '', 1),
(2, 'admini@mail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Collazo', 'Diego', '099550624', 'Salto1262', 'Montevideo', 0, '2000-02-02', '2000-01-02', '', 1),
(9, 'administrativo@mail.com', '5e543256c480ac577d30f76f9120eb74', 'De Turno', 'Administrativo', '45522093', 'Sarandi y Treinta y tres', 'Rosario', 1, '1975-02-18', '2020-10-01', 'Usuario para probar seguridad de administrativo', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
