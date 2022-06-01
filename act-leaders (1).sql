-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 01, 2022 at 02:26 PM
-- Server version: 5.7.38-0ubuntu0.18.04.1
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `act-leaders`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category` text NOT NULL,
  `content` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Accounting and finance', 'Effective ', 1, '2022-05-29 21:13:28', '2022-05-29 21:13:28'),
(2, 'dgdf', 'gdfg', 1, '2022-05-30 11:18:08', '2022-05-30 11:18:08');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `category` text NOT NULL,
  `course_type` text NOT NULL,
  `course_name` text NOT NULL,
  `start_date` text NOT NULL,
  `end_date` text NOT NULL,
  `start_time` text NOT NULL,
  `duration` text NOT NULL,
  `lectures` text NOT NULL,
  `levels` text NOT NULL,
  `enrolled` text NOT NULL,
  `video` text NOT NULL,
  `overview` text NOT NULL,
  `course_outline` text NOT NULL,
  `banner` text NOT NULL,
  `language` text NOT NULL,
  `location` text NOT NULL,
  `month` text NOT NULL,
  `year` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `category`, `course_type`, `course_name`, `start_date`, `end_date`, `start_time`, `duration`, `lectures`, `levels`, `enrolled`, `video`, `overview`, `course_outline`, `banner`, `language`, `location`, `month`, `year`, `status`, `created_at`, `updated_at`) VALUES
(1, '1', '2', 'finance', '2022-05-22', '2022-06-11', '21:21', '3h', '10', 'basic', '150', '100', 'accounting', 'finance', 'upload-files\\20220529T155203522Z420702\\img2.jpg', 'English', 'hyderabad', '05', '2022', 1, '2022-05-29 21:21:43', '2022-05-29 21:21:43'),
(2, '1', '2', 'banking', '2022-05-29', '2022-07-20', '21:24', '5h', '100', 'basic', '100', '50', 'banking', 'banking', 'upload-files\\20220529T155455264Z896082\\img2.jpg', 'English', 'london', '05', '2022', 1, '2022-05-29 21:24:55', '2022-05-29 21:24:55'),
(3, '1', '2', 'asdas', '2022-05-26', '2022-05-10', '19:35', 'asd', 'asdas', 'asdas', 'dasd', 'asdas', 'asdas', 'dasdsadasd', 'upload-files/20220530T100603865Z544161/Screenshot from 2022-05-23 17-49-50.png', 'English', 'asdas', '', '', 1, '2022-05-30 15:36:03', '2022-05-30 15:36:03'),
(4, '1', '1', 'cvbcvb', '2022-05-27', '2022-06-04', '19:50', '56', 'cvbcv', 'bcvbcv', 'bcvb', 'bcv', 'cvbcv', 'bcvbcvbcvb', 'upload-files/20220530T102024192Z105987/Screenshot from 2022-05-23 17-49-50.png', 'English', 'cvbcv', '05', '2022', 1, '2022-05-30 15:50:24', '2022-05-30 15:50:24');

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE `participant` (
  `id` int(11) NOT NULL,
  `registered_id` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `designation` text NOT NULL,
  `email` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `participant`
--

INSERT INTO `participant` (`id`, `registered_id`, `first_name`, `last_name`, `designation`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, '9', 'dfgdf', 'dfgdf', 'gdfgdfg', 'gdfg', 1, '2022-06-01 14:24:23', '2022-06-01 14:24:23'),
(2, '9', 'dfgdf', 'dfgdf', 'gdfgdfgdfg', 'gdfg', 1, '2022-06-01 14:24:23', '2022-06-01 14:24:23');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `registration_type` text NOT NULL,
  `class_type` text NOT NULL,
  `category` text NOT NULL,
  `course_name` text NOT NULL,
  `available_dates` text NOT NULL,
  `email` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `designation` text NOT NULL,
  `mobile` text NOT NULL,
  `company` text NOT NULL,
  `address` text NOT NULL,
  `post_box` text NOT NULL,
  `city` text NOT NULL,
  `country` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `registration_type`, `class_type`, `category`, `course_name`, `available_dates`, `email`, `first_name`, `last_name`, `designation`, `mobile`, `company`, `address`, `post_box`, `city`, `country`, `status`, `created_at`, `updated_at`) VALUES
(1, '2', '2', '1', 'finance', '2022-05-22+\'', 'account@gmail.com', 'account', 'finance', 'accounting', '9876543234', 'act leaders', 'hyderabad', '1234', 'hyderabad', 'IN', 1, '2022-05-29 21:26:37', '2022-05-29 21:26:37'),
(2, '1', '1', '1', 'asdas', '1', 'undefined', 'fsdf', 'sdfsd', 'fsdf', 'dsfdsf', 'fdsf', 'sdfds', 'dsf', 'dsfdsf', 'AW', 1, '2022-06-01 13:23:42', '2022-06-01 13:23:42'),
(3, '1', '1', '1', 'asdas', '1', 'undefined', 'fh', 'fghfg', 'hfghfg', 'gfhgfh', 'gfh', 'hgfh', 'fghgfhfg', 'hgfhgf', 'AU', 1, '2022-06-01 14:18:51', '2022-06-01 14:18:51'),
(4, '1', '1', '1', 'asdas', '1', 'undefined', 'fh', 'fghfg', 'hfghfg', 'gfhgfh', 'gfh', 'hgfh', 'fghgfhfg', 'hgfhgf', 'AU', 1, '2022-06-01 14:20:10', '2022-06-01 14:20:10'),
(5, '1', '1', '1', 'asdas', '1', 'undefined', 'gdfgdfgd', 'dfgdfg', 'dfgdf', 'gdfg', 'dfgdfg', 'gfdg', 'gdf', 'dfgdf', 'AU', 1, '2022-06-01 14:20:48', '2022-06-01 14:20:48'),
(6, '1', '1', '1', 'asdas', '1', 'undefined', 'gdfgdfgd', 'dfgdfg', 'dfgdf', 'gdfg', 'dfgdfg', 'gfdg', 'gdf', 'dfgdf', 'AU', 1, '2022-06-01 14:21:37', '2022-06-01 14:21:37'),
(7, '1', '1', '1', 'asdas', '1', 'undefined', 'gdfgdfgd', 'dfgdfg', 'dfgdf', 'gdfg', 'dfgdfg', 'gfdg', 'gdf', 'dfgdf', 'AU', 1, '2022-06-01 14:22:18', '2022-06-01 14:22:18'),
(8, '1', '1', '1', 'asdas', '1', 'undefined', 'gdfgdfgd', 'dfgdfg', 'dfgdf', 'gdfg', 'dfgdfg', 'gfdg', 'gdf', 'dfgdf', 'AU', 1, '2022-06-01 14:23:13', '2022-06-01 14:23:13'),
(9, '1', '1', '1', 'asdas', '1', 'undefined', 'gdfgdfgd', 'dfgdfg', 'dfgdf', 'gdfg', 'dfgdfg', 'gfdg', 'gdf', 'dfgdf', 'AU', 1, '2022-06-01 14:24:23', '2022-06-01 14:24:23');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `password` text NOT NULL,
  `hash` text NOT NULL,
  `otp` varchar(20) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `mobile`, `role`, `password`, `hash`, `otp`, `status`, `created_at`, `updated_at`) VALUES
(1, 'leaders', 'leaders@gmail.com', '9948281950', 1, 'e53cf38a2dadd0dc1d69033e0b3b0024', '6864154510534248', '123456', 1, '2021-01-22 08:08:42', '2021-01-22 08:08:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
