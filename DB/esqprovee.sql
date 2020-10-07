-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-10-2020 a las 20:17:18
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `esquemac_esqprovee`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cheques`
--

CREATE TABLE `cheques` (
  `idcheq` int(11) NOT NULL,
  `nrocheq` int(11) NOT NULL,
  `banco` text NOT NULL,
  `moneda` int(11) NOT NULL,
  `fechemi` date NOT NULL,
  `fechpag` date NOT NULL,
  `fechcob` date NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `idcot` int(11) NOT NULL,
  `fechcot` date NOT NULL,
  `moneda` int(11) NOT NULL,
  `impcot` int(11) NOT NULL,
  `deldia` tinyint(4) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `Idtipdoc` int(11) NOT NULL,
  `tipodoc` text NOT NULL,
  `moneda` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas`
--

CREATE TABLE `monedas` (
  `idmon` int(11) NOT NULL,
  `moneda` text NOT NULL,
  `divide` int(11) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `monedas`
--

INSERT INTO `monedas` (`idmon`, `moneda`, `divide`, `activo`) VALUES
(1, 'Pesos', 1, 1),
(2, 'Dolares', 1, 1),
(15, 'Australes', 1, 0),
(14, 'Reales', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `idmov` int(11) NOT NULL,
  `proveedor` int(11) NOT NULL,
  `tipdoc` int(11) NOT NULL,
  `nrofac` int(11) NOT NULL,
  `fechemi` date NOT NULL,
  `fechpag` date NOT NULL,
  `moneda` int(11) NOT NULL,
  `fechcheq` date NOT NULL,
  `nrocheq` int(11) NOT NULL,
  `debe` int(11) NOT NULL,
  `haber` int(11) NOT NULL,
  `saldo` int(11) NOT NULL,
  `saldtot` int(11) NOT NULL,
  `nrorec` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `idper` int(11) NOT NULL,
  `rutced` text NOT NULL,
  `razon` text NOT NULL,
  `nomfantasia` text NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `fechingr` date NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `moneda` int(11) NOT NULL,
  `seguridad` int(11) NOT NULL,
  `saldoinicial` int(11) NOT NULL,
  `saldototal` int(11) NOT NULL,
  `retorno` int(11) NOT NULL,
  `fechret` date NOT NULL,
  `retactivo` tinyint(1) NOT NULL,
  `observaciones` text NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idper`, `rutced`, `razon`, `nomfantasia`, `nombre`, `apellido`, `fechingr`, `telefono`, `direccion`, `moneda`, `seguridad`, `saldoinicial`, `saldototal`, `retorno`, `fechret`, `retactivo`, `observaciones`, `activo`) VALUES
(1, '${usuario.razon}', '${usuario.apellido}', '', 'Administrador de EsQProvee', 'Esquema Servicios', '2020-09-01', '${usuario.telefono}', '${usuario.direccion}', 1, 0, 0, 0, 1, '2021-12-31', 1, '${usuario.observaciones}', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguridad`
--

CREATE TABLE `seguridad` (
  `idseg` int(11) NOT NULL,
  `categoria` text NOT NULL,
  `descripcion` text NOT NULL,
  `activo` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `seguridad`
--

INSERT INTO `seguridad` (`idseg`, `categoria`, `descripcion`, `activo`) VALUES
(0, '0', 'Administrador', '1'),
(1, '1', 'Administrativo', '1'),
(2, '2', 'Consultante', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusu` int(11) NOT NULL,
  `email` text NOT NULL,
  `pass` text NOT NULL,
  `apellidos` text NOT NULL,
  `nombres` text NOT NULL,
  `telefono` text NOT NULL,
  `direccion` text NOT NULL,
  `ciudad` text NOT NULL,
  `fechnac` date NOT NULL,
  `feching` date NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cheques`
--
ALTER TABLE `cheques`
  ADD PRIMARY KEY (`idcheq`);

--
-- Indices de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`idcot`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`Idtipdoc`);

--
-- Indices de la tabla `monedas`
--
ALTER TABLE `monedas`
  ADD PRIMARY KEY (`idmon`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`idmov`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`idper`);

--
-- Indices de la tabla `seguridad`
--
ALTER TABLE `seguridad`
  ADD PRIMARY KEY (`idseg`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cheques`
--
ALTER TABLE `cheques`
  MODIFY `idcheq` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  MODIFY `idcot` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `Idtipdoc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `monedas`
--
ALTER TABLE `monedas`
  MODIFY `idmon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `idmov` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `idper` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seguridad`
--
ALTER TABLE `seguridad`
  MODIFY `idseg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusu` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
