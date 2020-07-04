-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2020 at 07:27 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

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
CREATE DATABASE IF NOT EXISTS `exel_upload` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `exel_upload`;

-- --------------------------------------------------------

--
-- Table structure for table `cat_1_level_1`
--

CREATE TABLE `cat_1_level_1` (
  `org_id` int(11) NOT NULL,
  `org_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cat_1_level_1`
--

INSERT INTO `cat_1_level_1` (`org_id`, `org_name`) VALUES
(1, 'Organization-A'),
(6, 'Organization-B'),
(7, 'Organization-C'),
(8, 'Organization-D'),
(9, 'Organization-E'),
(17, 'Organization-F');

-- --------------------------------------------------------

--
-- Table structure for table `cat_1_level_2`
--

CREATE TABLE `cat_1_level_2` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cat_1_level_2`
--

INSERT INTO `cat_1_level_2` (`state_id`, `state_name`) VALUES
(6, 'Andhra Pradesh'),
(15, 'Arunachal Pradesh'),
(16, 'Assam'),
(17, 'Bihar'),
(18, 'Chhattisgarh'),
(19, 'Goa'),
(20, 'Gujarat'),
(21, 'Haryana'),
(22, 'Himachal Pradesh'),
(23, 'Jharkhand'),
(24, 'Karnataka'),
(25, 'Kerala'),
(26, 'Madhya Pradesh'),
(27, 'Maharashtra'),
(28, 'Manipur'),
(29, 'Meghalaya'),
(30, 'Mizoram'),
(31, 'Nagaland'),
(32, 'Odisha'),
(33, 'Punjab'),
(34, 'Rajasthan'),
(35, 'Sikkim'),
(36, 'Tamil Nadu'),
(37, 'Telangana'),
(38, 'Tripura'),
(39, 'Uttar Pradesh'),
(40, 'Uttarakhand'),
(41, 'West Bengal');

-- --------------------------------------------------------

--
-- Table structure for table `gmail_info`
--

CREATE TABLE `gmail_info` (
  `id` int(11) NOT NULL,
  `gmail_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gmail_info`
--

INSERT INTO `gmail_info` (`id`, `gmail_id`, `password`) VALUES
(3, 'nhnitinhegde24@gmail.com', '60fbc79a4dd443f83bb121024572e060');

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
  `organization_name` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `ustatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `t_portal_users`
--

INSERT INTO `t_portal_users` (`id`, `role_id`, `name`, `mobile`, `email`, `password`, `organization_name`, `token`, `status`, `ustatus`) VALUES
(1, 1, 'abhilash', '1224566', 'abhilashmusti2@gamail.com', '5178c16fd45485dcf9908e2a43f96f61', 'Organization-1', 'xyz', 'Active', 'D'),
(2, 3, 'admin', '9739888651', 'admin', '7111b04f6952e7dadc9719c3f87c2aa1', 'admin', '630746156017509600', 'Active', 'A'),
(3, 1, 'Org1', '7872387333', 'org1@email.org', '', 'Organization-A', '1387992163040513000', 'Active', 'A'),
(4, 1, 'org2', '2342342342', 'org2@email.org', '', 'Organization-B', '256440770174997280', 'Active', 'A'),
(5, 1, 'org3', '2352332423', 'org3@email.org', '', 'Organization-C', '1361490674214827500', 'Active', 'A'),
(21, 1, 'org4', '9248927492', 'org4@email.org', '', 'Organization-D', '1394379784790858200', 'Active', 'A'),
(24, 1, 'Vatsa', '8274827482', 'shreevatsak@gmail.com', '', 'AppBee', '537205144003866800', 'Active', 'A'),
(32, 1, 'nitin', '9988998899', 'nitinhegde57@gmail.com', '7111b04f6952e7dadc9719c3f87c2aa1', 'Organization-E', '', 'Active', 'A');

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
(1, 'user', 'C'),
(3, 'admin', 'c');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cat_1_level_1`
--
ALTER TABLE `cat_1_level_1`
  ADD PRIMARY KEY (`org_id`);

--
-- Indexes for table `cat_1_level_2`
--
ALTER TABLE `cat_1_level_2`
  ADD PRIMARY KEY (`state_id`);

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
  MODIFY `org_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `cat_1_level_2`
--
ALTER TABLE `cat_1_level_2`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `gmail_info`
--
ALTER TABLE `gmail_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `t_portal_users`
--
ALTER TABLE `t_portal_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `t_roles`
--
ALTER TABLE `t_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
