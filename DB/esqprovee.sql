-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 22-10-2020 a las 18:58:45
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
  `fechemi` varchar(10) NOT NULL,
  `fechpag` varchar(10) NOT NULL,
  `fechcob` varchar(10) NOT NULL,
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
  `fechcot` varchar(10) NOT NULL,
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
  `divide` int NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idmon`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `monedas`
--

INSERT INTO `monedas` (`idmon`, `moneda`, `divide`, `activo`) VALUES
(1, 'Pesos', 1, 1),
(2, 'Peso Argentino', 1, 1),
(3, 'definido', 1, 0),
(4, 'Reales', 1, 1),
(5, 'Euros', 1, 1),
(35, 'Realiños ', 1, 1),
(34, 'Australes', 1, 1),
(33, 'undefined', 0, 0),
(32, 'Libras esterlinas', 1, 1),
(31, 'Patacones', 1, 1);

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
  `fechcheq` varchar(10) NOT NULL,
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
  `fechingr` varchar(10) NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `ciudad` text NOT NULL,
  `moneda` int NOT NULL,
  `seguridad` int NOT NULL,
  `saldoinicial` int NOT NULL,
  `saldototal` int NOT NULL,
  `retorno` int NOT NULL,
  `fechret` varchar(10) NOT NULL,
  `retactivo` int NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idpro`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idpro`, `rutced`, `razon`, `fantasia`, `email`, `nombre`, `apellido`, `fechingr`, `telefono`, `direccion`, `ciudad`, `moneda`, `seguridad`, `saldoinicial`, `saldototal`, `retorno`, `fechret`, `retactivo`, `observaciones`, `activo`) VALUES
(1, '${usuario.razon}', '${usuario.apellido}', '', '', 'Administrador de EsQProvee', 'Esquema Servicios', '2020-09-01', '${usuario.telefono}', '${usuario.direccion}', '', 1, 0, 0, 0, 1, '2021-12-31', 1, '${usuario.observaciones}', 1),
(3, '${proveedor.rutced}', '${proveedor.razon}', '${proveedor.nomfantasia}', '', '${proveedor.nombre}', '${proveedor.apellido}', '2020-09-01', '${proveedor.telefono}', '${proveedor.direccion}', '', 0, 0, 0, 0, 0, '2020-09-01', 0, '${proveedor.observaciones}', 0),
(4, '${usuario.razon}', '${usuario.apellido}', '', '', 'Administrador de EsQProvee', 'Esquema Servicios', '0000-00-00', '${usuario.telefono}', '${usuario.direccion}', '', 1, 0, 0, 1000, 1, '2021-12-31', 1, '${usuario.observaciones}', 1);

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
