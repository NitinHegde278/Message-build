-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2020 at 09:46 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exel_upload`
--

-- --------------------------------------------------------

--
-- Table structure for table `cat_1_level_1`
--

CREATE TABLE `cat_1_level_1` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cat_1_level_1`
--

INSERT INTO `cat_1_level_1` (`cat_id`, `cat_name`) VALUES
(3, 'demo2');

-- --------------------------------------------------------

--
-- Table structure for table `cat_1_level_2`
--

CREATE TABLE `cat_1_level_2` (
  `sub_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `sub_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gmail_info`
--

CREATE TABLE `gmail_info` (
  `id` int(11) NOT NULL,
  `gmail_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `t_portal_users`
--

CREATE TABLE `t_portal_users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `ustatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `t_portal_users`
--

INSERT INTO `t_portal_users` (`id`, `role_id`, `name`, `mobile`, `email`, `password`, `token`, `status`, `ustatus`) VALUES
(1, 1, 'abhilash', '1224566', 'abhilashmusti2@gamail.com', '5178c16fd45485dcf9908e2a43f96f61', 'xyz', 'Active', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `t_roles`
--

CREATE TABLE `t_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `t_roles`
--

INSERT INTO `t_roles` (`id`, `role`, `status`) VALUES
(1, 'admin', 'c'),
(2, 'user', 'C');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cat_1_level_1`
--
ALTER TABLE `cat_1_level_1`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `cat_1_level_2`
--
ALTER TABLE `cat_1_level_2`
  ADD PRIMARY KEY (`sub_id`);

--
-- Indexes for table `gmail_info`
--
ALTER TABLE `gmail_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_portal_users`
--
ALTER TABLE `t_portal_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_roles`
--
ALTER TABLE `t_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cat_1_level_1`
--
ALTER TABLE `cat_1_level_1`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cat_1_level_2`
--
ALTER TABLE `cat_1_level_2`
  MODIFY `sub_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gmail_info`
--
ALTER TABLE `gmail_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_portal_users`
--
ALTER TABLE `t_portal_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `t_roles`
--
ALTER TABLE `t_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
