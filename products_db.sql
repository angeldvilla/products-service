-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para products_db
CREATE DATABASE IF NOT EXISTS `products_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `products_db`;

-- Volcando estructura para tabla products_db.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla products_db.brands: ~5 rows (aproximadamente)
INSERT IGNORE INTO `brands` (`id`, `name`) VALUES
	('d84b2b12-1f24-4db8-b44f-789d4f3eac68', 'Lovense'),
	('e5b1c8d2-2f9d-4f7c-bf4e-2398f6b0d83c', 'We-Vibe'),
	('f7d9e3b4-3c6f-4b8d-afe4-5a7c8d9e1a7b', 'Lelo'),
	('g8a2e5b6-5c4f-4b8e-bd9e-4f7e5d9c1e3f', 'Satisfyer'),
	('h9e4b7d6-6d7f-4c8d-afe6-2f9e5c0b7d8f', 'Fleshlight');

-- Volcando estructura para tabla products_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla products_db.categories: ~5 rows (aproximadamente)
INSERT IGNORE INTO `categories` (`id`, `name`) VALUES
	('1a92f635-9e3d-4b02-80fc-7bfb8b14dffd', 'Vibradores'),
	('bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e', 'Lencería'),
	('c2e2d635-2b4e-4f92-9cd2-b8e2f8a7dd3f', 'Lubricantes'),
	('d2a8f6f2-0f94-4b53-8b6f-c8f9e3a4c2b1', 'Juegos y accesorios'),
	('f6b1c2e8-4d7a-4e68-8e3f-5d8f6c7e9b2a', 'Juguetes para pareja');

-- Volcando estructura para tabla products_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `discount` int(11) DEFAULT 0,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `brand_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla products_db.products: ~15 rows (aproximadamente)
INSERT IGNORE INTO `products` (`id`, `name`, `description`, `price`, `stock`, `discount`, `category_id`, `brand_id`) VALUES
	('a44ffde1-571c-4e8b-8db1-25a7df2e20f3', 'Vibrador Clásico', 'Vibrador de silicona con 10 modos de vibración', 106559.00, 15, 10, '1a92f635-9e3d-4b02-80fc-7bfb8b14dffd', 'd84b2b12-1f24-4db8-b44f-789d4f3eac68'),
	('b99d1c2f-1234-4f7a-8db1-5e7f2d9a1c4f', 'Vibrador de Punto G', 'Vibrador con diseño especial para estimular el punto G', 128999.00, 20, 15, '1a92f635-9e3d-4b02-80fc-7bfb8b14dffd', 'e5b1c8d2-2f9d-4f7c-bf4e-2398f6b0d83c'),
	('c55e3f9d-6789-4e3a-bfe4-3d7c6e9a8b1f', 'Mini Vibrador Portátil', 'Vibrador pequeño y discreto', 59999.00, 30, 5, '1a92f635-9e3d-4b02-80fc-7bfb8b14dffd', 'f7d9e3b4-3c6f-4b8d-afe4-5a7c8d9e1a7b'),
	('d88f5d7e-2345-4a6b-8fde-4f8b7d1e8c7e', 'Conjunto de Lencería Sexy', 'Conjunto de encaje con liguero', 188559.00, 10, 0, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e', 'g8a2e5b6-5c4f-4b8e-bd9e-4f7e5d9c1e3f'),
	('e45c9b6e-3456-4c7e-b6f7-3a8b7e9f7c9d', 'Body de Encaje Transparente', 'Body ajustado con transparencias', 122959.00, 12, 20, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e', 'h9e4b7d6-6d7f-4c8d-afe6-2f9e5c0b7d8f'),
	('f33e4d8f-4567-4e8c-afd4-5e9a7d2f8b1c', 'Babydoll de Satén', 'Babydoll de satén con lazo frontal', 143459.00, 8, 10, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e', 'd84b2b12-1f24-4db8-b44f-789d4f3eac68'),
	('g22f1a4b-5678-4e9a-8f2d-1b8f9c3e8d6a', 'Lubricante a base de Agua', 'Lubricante íntimo suave y no pegajoso', 5125.00, 25, 0, 'c2e2d635-2b4e-4f92-9cd2-b8e2f8a7dd3f', 'e5b1c8d2-2f9d-4f7c-bf4e-2398f6b0d83c'),
	('h34b7d8f-6789-4f8c-bf7d-4a9b6e8c3d2a', 'Lubricante con Sabor', 'Lubricante comestible con sabor a frutas', 45059.00, 15, 5, 'c2e2d635-2b4e-4f92-9cd2-b8e2f8a7dd3f', 'f7d9e3b4-3c6f-4b8d-afe4-5a7c8d9e1a7b'),
	('i55d8c9a-7890-4d6b-a9e3-5e8b7c4f1d9e', 'Lubricante Anal', 'Lubricante especializado para uso anal', 5945.00, 30, 10, 'c2e2d635-2b4e-4f92-9cd2-b8e2f8a7dd3f', 'g8a2e5b6-5c4f-4b8e-bd9e-4f7e5d9c1e3f'),
	('j66f9a3b-1234-4f6e-bf8d-7c9e4d2f3e1a', 'Dados Eróticos', 'Juego de dados con posiciones y lugares', 32759.00, 40, 0, 'd2a8f6f2-0f94-4b53-8b6f-c8f9e3a4c2b1', 'h9e4b7d6-6d7f-4c8d-afe6-2f9e5c0b7d8f'),
	('k77e3b4c-2345-4d8e-afe4-8c2d3b4f9a6d', 'Cartas para Parejas', 'Cartas con desafíos y preguntas íntimas', 24559.00, 20, 10, 'd2a8f6f2-0f94-4b53-8b6f-c8f9e3a4c2b1', 'd84b2b12-1f24-4db8-b44f-789d4f3eac68'),
	('l88d9c7f-3456-4e8b-afe6-2f3b6a8e9d5c', 'Esposas con Forro de Peluche', 'Esposas ajustables con peluche suave', 5999.00, 15, 5, 'd2a8f6f2-0f94-4b53-8b6f-c8f9e3a4c2b1', 'f7d9e3b4-3c6f-4b8d-afe4-5a7c8d9e1a7b'),
	('m99d8a7b-4567-4e8e-bf9d-4e3c9d2f8b1f', 'Anillo Vibrador', 'Anillo con vibración para el placer de ambos', 70559.00, 15, 10, 'f6b1c2e8-4d7a-4e68-8e3f-5d8f6c7e9b2a', 'e5b1c8d2-2f9d-4f7c-bf4e-2398f6b0d83c'),
	('n10e2f4b-5678-4d9a-bc8e-3d7b4c5a2f1d', 'Arnés para Parejas', 'Arnés ajustable con vibración', 132559.00, 5, 15, 'f6b1c2e8-4d7a-4e68-8e3f-5d8f6c7e9b2a', 'g8a2e5b6-5c4f-4b8e-bd9e-4f7e5d9c1e3f'),
	('o21f3c6d-6789-4d8e-ae6d-4c9f7a2d8b3f', 'Control Remoto para Juguetes', 'Control para sincronizar con juguetes de la marca', 98559.00, 10, 0, 'f6b1c2e8-4d7a-4e68-8e3f-5d8f6c7e9b2a', 'h9e4b7d6-6d7f-4c8d-afe6-2f9e5c0b7d8f');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
