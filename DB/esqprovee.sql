-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-10-2020 a las 17:38:43
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
-- Estructura de tabla para la tabla `cheques`
--

DROP TABLE IF EXISTS `cheques`;
CREATE TABLE IF NOT EXISTS `cheques` (
  `idcheq` int NOT NULL AUTO_INCREMENT,
  `nrocheq` int NOT NULL,
  `banco` text NOT NULL,
  `moneda` int NOT NULL,
  `fechemi` date NOT NULL,
  `fechpag` date NOT NULL,
  `fechcob` date NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idcheq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

DROP TABLE IF EXISTS `cotizacion`;
CREATE TABLE IF NOT EXISTS `cotizacion` (
  `idcot` int NOT NULL AUTO_INCREMENT,
  `fechcot` date NOT NULL,
  `moneda` int NOT NULL,
  `impcot` int NOT NULL,
  `deldia` tinyint NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idcot`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

DROP TABLE IF EXISTS `documentos`;
CREATE TABLE IF NOT EXISTS `documentos` (
  `Idtipdoc` int NOT NULL AUTO_INCREMENT,
  `tipodoc` text NOT NULL,
  `moneda` int NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`Idtipdoc`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas`
--

DROP TABLE IF EXISTS `monedas`;
CREATE TABLE IF NOT EXISTS `monedas` (
  `idmon` int NOT NULL AUTO_INCREMENT,
  `moneda` text NOT NULL,
  `divide` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idmon`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `monedas`
--

INSERT INTO `monedas` (`idmon`, `moneda`, `divide`, `activo`) VALUES
(1, 'Pesos', 1, 1),
(2, 'Dolares', 1, 1);

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
  `fechemi` date NOT NULL,
  `fechpag` date NOT NULL,
  `moneda` int NOT NULL,
  `fechcheq` date NOT NULL,
  `nrocheq` int NOT NULL,
  `debe` int NOT NULL,
  `haber` int NOT NULL,
  `saldo` int NOT NULL,
  `saldtot` int NOT NULL,
  `nrorec` int NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idmov`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

DROP TABLE IF EXISTS `personas`;
CREATE TABLE IF NOT EXISTS `personas` (
  `idper` int NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `pass` text NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `razon` text NOT NULL,
  `rutced` text NOT NULL,
  `fechingr` date NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `esprov` tinyint(1) NOT NULL,
  `moneda` int NOT NULL,
  `seguridad` int NOT NULL,
  `saldoinicial` int NOT NULL,
  `saldototal` int NOT NULL,
  `retorno` int NOT NULL,
  `fechret` date NOT NULL,
  `retactivo` tinyint(1) NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idper`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idper`, `email`, `pass`, `nombre`, `apellido`, `razon`, `rutced`, `fechingr`, `telefono`, `direccion`, `esprov`, `moneda`, `seguridad`, `saldoinicial`, `saldototal`, `retorno`, `fechret`, `retactivo`, `observaciones`, `activo`) VALUES
(1, 'admin@mail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Administrador de EsQProvee', 'Esquema Servicios', '${usuario.apellido}', '${usuario.razon}', '2020-09-01', '${usuario.telefono}', '${usuario.direccion}', 1, 1, 0, 0, 0, 1, '2021-12-31', 1, '${usuario.observaciones}', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguridad`
--

DROP TABLE IF EXISTS `seguridad`;
CREATE TABLE IF NOT EXISTS `seguridad` (
  `idseg` int NOT NULL AUTO_INCREMENT,
  `categoria` text NOT NULL,
  `descripcion` text NOT NULL,
  `activo` text NOT NULL,
  PRIMARY KEY (`idseg`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `seguridad`
--

INSERT INTO `seguridad` (`idseg`, `categoria`, `descripcion`, `activo`) VALUES
(0, '0', 'Administrador', '1'),
(1, '1', 'Administrativo', '1'),
(2, '2', 'Consultante', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
