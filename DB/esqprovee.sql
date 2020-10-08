-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-10-2020 a las 11:03:38
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
-- Estructura de tabla para la tabla `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
CREATE TABLE IF NOT EXISTS `proveedores` (
  `idpro` int NOT NULL AUTO_INCREMENT,
  `rutced` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `razon` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nomfantasia` text NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `fechingr` date NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `moneda` int NOT NULL,
  `seguridad` int NOT NULL,
  `saldoinicial` int NOT NULL,
  `saldototal` int NOT NULL,
  `retorno` int NOT NULL,
  `fechret` date NOT NULL,
  `retactivo` int NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`idpro`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idpro`, `rutced`, `razon`, `nomfantasia`, `nombre`, `apellido`, `fechingr`, `telefono`, `direccion`, `moneda`, `seguridad`, `saldoinicial`, `saldototal`, `retorno`, `fechret`, `retactivo`, `observaciones`, `activo`) VALUES
(1, '${usuario.razon}', '${usuario.apellido}', '', 'Administrador de EsQProvee', 'Esquema Servicios', '2020-09-01', '${usuario.telefono}', '${usuario.direccion}', 1, 0, 0, 0, 1, '2021-12-31', 1, '${usuario.observaciones}', 1),
(3, '${proveedor.rutced}', '${proveedor.razon}', '${proveedor.nomfantasia}', '${proveedor.nombre}', '${proveedor.apellido}', '2020-09-01', '${proveedor.telefono}', '${proveedor.direccion}', 0, 0, 0, 0, 0, '2020-09-01', 0, '${proveedor.observaciones}', 0),
(4, '${usuario.razon}', '${usuario.apellido}', '', 'Administrador de EsQProvee', 'Esquema Servicios', '0000-00-00', '${usuario.telefono}', '${usuario.direccion}', 1, 0, 0, 1000, 1, '2021-12-31', 1, '${usuario.observaciones}', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
