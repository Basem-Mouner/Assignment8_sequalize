-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 05:29 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment8_squalize`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `c_id` int(11) NOT NULL,
  `c_content` text NOT NULL,
  `C_created_at` datetime NOT NULL,
  `C_updated_at` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`c_id`, `c_content`, `C_created_at`, `C_updated_at`, `PostId`, `UserId`) VALUES
(7, 'This is the first comment.', '2024-12-03 19:24:48', '2024-12-03 19:24:48', 1, 3),
(8, 'this is update for comment', '2024-12-03 19:24:48', '2024-12-03 21:10:02', 3, 3),
(9, 'This is another comment.', '2024-12-03 19:24:48', '2024-12-03 19:24:48', 4, 3),
(10, 'This is the first comment.', '2024-12-03 20:00:04', '2024-12-03 20:00:04', 1, 1),
(11, 'This is the second comment.', '2024-12-03 20:00:04', '2024-12-03 20:00:04', 3, 1),
(12, 'This is another comment.', '2024-12-03 20:00:04', '2024-12-03 20:00:04', 4, 1),
(13, 'asample content', '2024-12-03 21:43:28', '2024-12-03 21:43:28', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `p_id` int(11) NOT NULL,
  `p_title` varchar(255) NOT NULL,
  `p_content` text NOT NULL,
  `P_created_at` datetime NOT NULL,
  `P_updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`p_id`, `p_title`, `p_content`, `P_created_at`, `P_updated_at`, `deletedAt`, `UserId`) VALUES
(1, 'love', 'hello world love', '2024-12-03 19:09:57', '2024-12-03 19:09:57', NULL, 1),
(2, 'ware', 'hello world ware', '2024-12-03 19:10:30', '2024-12-03 19:10:30', NULL, 2),
(3, 'happy', 'hello world ware', '2024-12-03 19:10:51', '2024-12-03 19:10:51', NULL, 3),
(4, 'sad', 'hello world sad', '2024-12-03 19:11:05', '2024-12-03 19:11:05', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_firstName` varchar(255) NOT NULL,
  `u_lastName` varchar(200) DEFAULT NULL,
  `u_role` enum('user','admin') DEFAULT 'user',
  `u_DOB` datetime DEFAULT NULL,
  `u_email` varchar(200) NOT NULL,
  `u_password` varchar(200) NOT NULL,
  `u_created_at` datetime NOT NULL,
  `u_updated_at` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_firstName`, `u_lastName`, `u_role`, `u_DOB`, `u_email`, `u_password`, `u_created_at`, `u_updated_at`, `deletedAt`) VALUES
(1, 'basem', 'mouner', 'admin', '1990-05-07 21:00:00', 'bmr.audi@yahoo.com', '12345678', '2024-12-03 19:07:48', '2024-12-03 19:07:48', NULL),
(2, 'mina', 'mouner', 'admin', '1990-05-07 21:00:00', 'mina.audi@yahoo.com', '12345678', '2024-12-03 19:08:20', '2024-12-03 19:08:20', NULL),
(3, 'nancy', 'nagi', 'admin', '1990-05-07 21:00:00', 'nana.audi@yahoo.com', '12345678', '2024-12-03 19:08:40', '2024-12-03 19:08:40', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`c_id`),
  ADD KEY `PostId` (`PostId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`),
  ADD UNIQUE KEY `u_email_2` (`u_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
