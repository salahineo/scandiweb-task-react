-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2024 at 04:25 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sw_task`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `size_mb` int(11) DEFAULT NULL,
  `weight_kg` decimal(10,2) DEFAULT NULL,
  `height_cm` decimal(10,2) DEFAULT NULL,
  `width_cm` decimal(10,2) DEFAULT NULL,
  `length_cm` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `sku`, `type`, `size_mb`, `weight_kg`, `height_cm`, `width_cm`, `length_cm`) VALUES
(37, 'Book 1', '15.99', 'JVC2001', 'Book', 0, '1.20', '0.00', '0.00', '0.00'),
(38, 'Book2', '4.86', 'JVC2002', 'Book', 0, '2.50', '0.00', '0.00', '0.00'),
(39, 'Disk 1', '18.20', 'DCK2001', 'DVD', 140, '0.00', '0.00', '0.00', '0.00'),
(40, 'Disk 2', '150.00', 'DCK2002', 'DVD', 280, '0.00', '0.00', '0.00', '0.00'),
(41, 'Furniture 1', '15.00', 'FUR2001', 'Furniture', 0, '0.00', '15.60', '1.80', '4.25'),
(42, 'Furniture 2', '180.99', 'FUR2002', 'Furniture', 0, '0.00', '12.00', '15.00', '10.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
