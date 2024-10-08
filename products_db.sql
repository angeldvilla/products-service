-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla products_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla products_db.categories: ~5 rows (aproximadamente)
INSERT IGNORE INTO `categories` (`id`, `name`) VALUES
	('4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4', 'Lubricantes'),
	('67e29a88-f99d-4cb2-9e22-235fbb8c71d2', 'Aceites y Cosméticos'),
	('a5d14c1b-72b8-4e02-9298-8e59b2c3d479', 'Lencería'),
	('bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e', 'Juegos y Accesorios'),
	('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Juguetes');

-- Volcando estructura para tabla products_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_products_categories` (`category_id`),
  CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla products_db.products: ~25 rows (aproximadamente)
INSERT IGNORE INTO `products` (`id`, `name`, `description`, `price`, `stock`, `imageUrl`, `category_id`) VALUES
	('1', 'Vibrador Clásico', 'Vibrador de silicona con 10 modos de vibración', 106559.00, 15, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('10', 'Babydoll de Satén', 'Babydoll de satén con lazo frontal', 143459.00, 6, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('11', 'Lubricante a base de Agua', 'Lubricante íntimo suave y no pegajoso', 5125.00, 30, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('12', 'Lubricante con Sabor', 'Lubricante comestible con sabor a frutas', 45059.00, 40, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('13', 'Lubricante Anal', 'Lubricante especializado para uso anal', 5945.00, 20, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('14', 'Gel Estimulante para Parejas', 'Gel con efecto calor para intensificar sensaciones', 69659.00, 15, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('15', 'Lubricante de Silicona', 'Lubricante duradero a base de silicona', 73359.00, 25, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('16', 'Aceite de Masaje comestible', 'Aceite corporal comestible con fragancia de vainilla', 40959.00, 22, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('17', 'Polvo Corporal Brillante', 'Polvo con brillo para el cuerpo con aroma floral', 53659.00, 15, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('18', 'Gel Besable', 'Gel comestible con efecto frío para masajes íntimos', 36859.00, 30, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('19', 'Espuma de Baño Sensual', 'Espuma con fragancia afrodisíaca', 61459.00, 10, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('2', 'Anillo Vibrador', 'Anillo para pareja con función vibratoria', 81959.00, 10, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('20', 'Vela de Masaje', 'Vela que se convierte en aceite de masaje cálido', 7995.00, 12, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('21', 'Dados Eróticos', 'Juego de dados con posiciones y lugares', 32759.00, 50, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('22', 'Cartas para Parejas', 'Cartas con desafíos y preguntas íntimas', 24559.00, 40, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('23', 'Esposas con Forro de Peluche', 'Esposas ajustables con forro suave', 65559.00, 30, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('24', 'Ruleta de Placer', 'Ruleta con diversas actividades sensuales', 40959.00, 25, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('25', 'Pluma para Cosquillas', 'Pluma suave para estimular zonas erógenas', 28659.00, 35, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('3', 'Consolador Realista', 'Consolador de gelatina con textura realista', 12505.00, 8, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('4', 'Plug Anal', 'Plug de silicona para principiantes', 53659.00, 20, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('5', 'Bolas Chinas', 'Bolas de silicona para ejercicios Kegel', 65559.00, 12, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('6', 'Conjunto de Lencería Sexy', 'Conjunto de encaje con liguero', 188559.00, 7, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('7', 'Bata de Satén', 'Bata de satén con detalles de encaje', 163959.00, 5, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('8', 'Body de Encaje Transparente', 'Body ajustado con transparencias', 122959.00, 10, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('9', 'Medias de Red', 'Medias de red con costura trasera', 40959.00, 25, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
