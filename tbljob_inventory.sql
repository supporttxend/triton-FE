-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2023 at 02:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flask`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbljob_inventory`
--

CREATE TABLE `tbljob_inventory` (
  `Job_ID` int(30) NOT NULL,
  `Line_ID` char(30) DEFAULT NULL,
  `Asset_ID` int(30) NOT NULL,
  `Ansible_Hostname` varchar(30) DEFAULT NULL,
  `inventory_hostname` varchar(30) DEFAULT NULL,
  `distribution` varchar(30) DEFAULT NULL,
  `distribution_version` varchar(30) DEFAULT NULL,
  `os_family` varchar(30) DEFAULT NULL,
  `processor_type` varchar(30) DEFAULT NULL,
  `processor_model` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbljob_inventory`
--

INSERT INTO `tbljob_inventory` (`Job_ID`, `Line_ID`, `Asset_ID`, `Ansible_Hostname`, `inventory_hostname`, `distribution`, `distribution_version`, `os_family`, `processor_type`, `processor_model`) VALUES
(5, NULL, 1, 'haproxy01', NULL, 'Ubuntu', '20.04', 'Debian', 'GenuineIntel', 'Common KVM processor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbljob_inventory`
--
ALTER TABLE `tbljob_inventory`
  ADD PRIMARY KEY (`Job_ID`),
  ADD KEY `Asset_ID` (`Asset_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbljob_inventory`
--
ALTER TABLE `tbljob_inventory`
  MODIFY `Job_ID` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbljob_inventory`
--
ALTER TABLE `tbljob_inventory`
  ADD CONSTRAINT `Asset_ID` FOREIGN KEY (`Asset_ID`) REFERENCES `tblassets` (`Asset_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
