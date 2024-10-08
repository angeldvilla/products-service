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
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla products_db.products: ~24 rows (aproximadamente)
INSERT IGNORE INTO `products` (`id`, `name`, `description`, `price`, `stock`, `imageUrl`, `category_id`) VALUES
	('0ff6b6f2-2a91-487e-bd95-f2f606cf18a1', 'Lubricante Anal', 'Lubricante especializado para uso anal', 5945.00, 20, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('12550cc7-f264-4e2b-8a6d-30d69e606da6', 'Plumero Erótico', 'Plumero para caricias y estimulación sensorial', 143459.00, 25, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('34f85e4d-abe9-4324-9c97-49a89bc50891', 'Gel Estimulante para Parejas', 'Gel con efecto calor para intensificar sensaciones', 69659.00, 15, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('3fa8d95f-0713-4c9d-b49f-663db7cb9337', 'Bolas Chinas', 'Bolas de silicona para ejercicios Kegel', 65559.00, 12, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('426b5f04-70ad-4f4e-8e18-c79822a7c1de', 'Polvo Corporal Brillante', 'Polvo con brillo para el cuerpo con aroma floral', 53659.00, 15, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('5c54a78f-18b7-421f-bd53-1c703f853f46', 'Lubricante de Silicona', 'Lubricante duradero a base de silicona', 73359.00, 25, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('5df3a6ec-95a2-4260-a4f7-4e036c1a5a4c', 'Lubricante con Sabor', 'Lubricante comestible con sabor a frutas', 45059.00, 40, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('5f6c6112-2df1-4b17-935e-54b8cc4cbfeb', 'Vela de Masaje', 'Vela que se convierte en aceite de masaje cálido', 7995.00, 12, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('61c5415c-85c0-46f0-8e71-3de5b27e9ed8', 'Bata de Satén', 'Bata de satén con detalles de encaje', 163959.00, 5, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('64b7e227-2f98-4746-8141-519199a314f2', 'Babydoll de Satén', 'Babydoll de satén con lazo frontal', 143459.00, 6, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('697e0472-d53f-4bde-a743-150034fa021b', 'Espuma de Baño Sensual', 'Espuma con fragancia afrodisíaca', 61459.00, 10, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('773fa2db-3c45-44f0-98f2-9fbf1cb64e97', 'Esposas de Metal', 'Esposas metálicas con llaves incluidas', 102959.00, 18, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('7f9c8ac2-f5ea-42b3-b5c2-1d2c92db149e', 'Plug Anal', 'Plug de silicona para principiantes', 53659.00, 20, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('a01d5f60-5a0e-4c9b-b3ae-7430912c7a82', 'Anillo Vibrador', 'Anillo para pareja con función vibratoria', 81959.00, 10, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('a43bba9e-cd91-489b-b569-02dcae732a6f', 'Conjunto de Lencería Sexy', 'Conjunto de encaje con liguero', 188559.00, 7, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('ae5a08a3-1588-4d44-b54d-2cf85e3271b2', 'Aceite de Masaje comestible', 'Aceite corporal comestible con fragancia de vainilla', 40959.00, 22, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('b20ec707-4f7e-4df8-8fe0-4314b7a9e070', 'Dados Eróticos', 'Juego de dados con posiciones y lugares', 32759.00, 50, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('b74e07a4-0107-4f8c-b9ad-276c71d3bb3d', 'Medias de Red', 'Medias de red con costura trasera', 40959.00, 25, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('d29d84d3-d482-4850-b731-5b6ea2356f3d', 'Kit de Cuerda y Venda', 'Kit de bondage con cuerda y venda para ojos', 102959.00, 20, NULL, 'bb1ff4a2-4e88-4c34-b589-6e2e8f49e92e'),
	('d8b1a845-bb67-4903-936a-1686c1194c79', 'Lubricante a base de Agua', 'Lubricante íntimo suave y no pegajoso', 5125.00, 30, NULL, '4e3ac15f-6373-4c6b-8a16-7f9fbb8c77e4'),
	('e91e9c44-c33b-4bfb-b65b-56f0d21b0011', 'Vibrador Clásico', 'Vibrador de silicona con 10 modos de vibración', 106559.00, 15, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
	('ee9b7d27-1441-48e9-8304-02c97b0c7046', 'Gel Besable', 'Gel comestible con efecto frío para masajes íntimos', 36859.00, 30, NULL, '67e29a88-f99d-4cb2-9e22-235fbb8c71d2'),
	('f5a5873c-7f53-4024-afe9-3f468f3de7d5', 'Body de Encaje Transparente', 'Body ajustado con transparencias', 122959.00, 10, NULL, 'a5d14c1b-72b8-4e02-9298-8e59b2c3d479'),
	('fbbd5e62-bb84-41c8-9913-c6a365a85a91', 'Consolador Realista', 'Consolador de gelatina con textura realista', 12505.00, 8, NULL, 'f47ac10b-58cc-4372-a567-0e02b2c3d479');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
