-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-10-2020 a las 13:05:27
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
-- Estructura de tabla para la tabla `documentos`
--

DROP TABLE IF EXISTS `documentos`;
CREATE TABLE IF NOT EXISTS `documentos` (
  `Idtipdoc` int(11) NOT NULL AUTO_INCREMENT,
  `tipodoc` text NOT NULL,
  `moneda` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`Idtipdoc`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas`
--

DROP TABLE IF EXISTS `monedas`;
CREATE TABLE IF NOT EXISTS `monedas` (
  `idmon` int(11) NOT NULL AUTO_INCREMENT,
  `moneda` text NOT NULL,
  `divide` tinyint(1) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idmon`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
CREATE TABLE IF NOT EXISTS `movimientos` (
  `idmov` int(11) NOT NULL AUTO_INCREMENT,
  `proveedor` int(11) NOT NULL,
  `tipdoc` int(11) NOT NULL,
  `facturanro` int(11) NOT NULL,
  `fechaemision` date NOT NULL,
  `fehapago` date NOT NULL,
  `fechacheque` int(11) NOT NULL,
  `debe` int(11) NOT NULL,
  `haber` int(11) NOT NULL,
  `saldo` int(11) NOT NULL,
  `nrorecibo` int(11) NOT NULL,
  PRIMARY KEY (`idmov`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

DROP TABLE IF EXISTS `personas`;
CREATE TABLE IF NOT EXISTS `personas` (
  `idper` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `pass` text NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `razon` text NOT NULL,
  `rutced` text NOT NULL,
  `fechaingreso` date NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `proveedor` tinyint(1) NOT NULL,
  `moneda` int(11) NOT NULL,
  `seguridad` int(11) NOT NULL,
  `saldoinicial` int(11) NOT NULL,
  `retorno` date NOT NULL,
  `retactivo` tinyint(1) NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idper`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idper`, `email`, `pass`, `nombre`, `apellido`, `razon`, `rutced`, `fechaingreso`, `telefono`, `direccion`, `proveedor`, `moneda`, `seguridad`, `saldoinicial`, `retorno`, `retactivo`, `observaciones`, `activo`) VALUES
(1, 'admin@mail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Administrador de EsQProvee', 'Esquema Servicios', '${usuario.apellido}', '${usuario.razon}', '2020-09-01', '${usuario.telefono}', '${usuario.direccion}', 1, 1, 0, 0, '2100-01-01', 1, '${usuario.observaciones}', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguridad`
--

DROP TABLE IF EXISTS `seguridad`;
CREATE TABLE IF NOT EXISTS `seguridad` (
  `idseg` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idseg`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `seguridad`
--

INSERT INTO `seguridad` (`idseg`, `categoria`, `descripcion`, `activo`) VALUES
(0, 0, 'Administrador', 1),
(1, 1, 'Administrativo', 1),
(4, 2, 'Consultante', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
