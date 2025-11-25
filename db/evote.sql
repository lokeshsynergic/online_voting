-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: synwebmysql-1.c98wsim6cvnq.ap-south-2.rds.amazonaws.com
-- Generation Time: Nov 25, 2025 at 08:31 AM
-- Server version: 8.0.40
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evote`
--

-- --------------------------------------------------------

--
-- Table structure for table `md_block`
--

CREATE TABLE `md_block` (
  `block_id` bigint NOT NULL,
  `dist_id` int NOT NULL,
  `block_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `md_block`
--

INSERT INTO `md_block` (`block_id`, `dist_id`, `block_name`) VALUES
(1, 1, 'ALIPURDUAR - I'),
(2, 1, 'ALIPURDUAR - II'),
(3, 1, 'FALAKATA'),
(4, 1, 'KALCHINI'),
(5, 1, 'KUMARGRAM'),
(6, 1, 'MADARIHAT'),
(7, 2, 'BANKURA - I'),
(8, 2, 'BANKURA - II'),
(9, 2, 'BARJORA'),
(10, 2, 'CHHATNA'),
(11, 2, 'GANGAJALGHATI'),
(12, 2, 'HIRBANDH'),
(13, 2, 'INDPUR'),
(14, 2, 'INDUS'),
(15, 2, 'JAYPUR'),
(16, 2, 'KHATRA'),
(17, 2, 'KOTULPUR'),
(18, 2, 'MEJHIA'),
(19, 2, 'ONDA'),
(20, 2, 'PATRASAYER'),
(21, 2, 'RAIPUR'),
(22, 2, 'RANIBUNDH'),
(23, 2, 'SALTORA'),
(24, 2, 'SARENGA'),
(25, 2, 'SIMLAPAL'),
(26, 2, 'SONAMUKHI'),
(27, 2, 'TALDANGRA'),
(28, 2, 'VISHNUPUR'),
(29, 3, 'BOLPUR SRINIKETAN'),
(30, 3, 'DUBRAJPUR'),
(31, 3, 'ILLAMBAZAR'),
(32, 3, 'KHOYRASOL'),
(33, 3, 'LABPUR'),
(34, 3, 'MAYURESWAR - I'),
(35, 3, 'MAYURESWAR - II'),
(36, 3, 'MOHAMMAD BAZAR'),
(37, 3, 'MURARAI - I'),
(38, 3, 'MURARAI - II'),
(39, 3, 'NALHATI - I'),
(40, 3, 'NALHATI - II'),
(41, 3, 'NANOOR'),
(42, 3, 'RAJNAGAR'),
(43, 3, 'RAMPURHAT - I'),
(44, 3, 'RAMPURHAT - II'),
(45, 3, 'SAINTHIA'),
(46, 3, 'SURI - I'),
(47, 3, 'SURI - II'),
(48, 4, 'COOCH BEHAR - II'),
(49, 4, 'COOCHBEHAR I'),
(50, 4, 'DINHATA - I'),
(51, 4, 'DINHATA - II'),
(52, 4, 'HALDIBARI'),
(53, 4, 'MATHABHANGA - I'),
(54, 4, 'MATHABHANGA II'),
(55, 4, 'MEKLIGANJ'),
(56, 4, 'SITAI'),
(57, 4, 'SITALKUCHI'),
(58, 4, 'TUFANGANJ - I'),
(59, 4, 'TUFANGANJ - II'),
(60, 5, 'BALURGHAT'),
(61, 5, 'BANSIHARI'),
(62, 5, 'GANGARAMPUR'),
(63, 5, 'HARIRAMPUR'),
(64, 5, 'HILLI'),
(65, 5, 'KUMARGANJ'),
(66, 5, 'KUSHMUNDI'),
(67, 5, 'TAPAN'),
(68, 6, 'DARJEELING PULBAZAR'),
(69, 6, 'JOREBUNGLOW SUKIAPOKHRI'),
(70, 6, 'KHARIBARI'),
(71, 6, 'KURSEONG'),
(72, 6, 'MATIGARA'),
(73, 6, 'MIRIK'),
(74, 6, 'NAXALBARI'),
(75, 6, 'PHANSIDEWA'),
(76, 6, 'RANGLI RANGLIOT'),
(77, 7, 'ARAMBAG'),
(78, 7, 'BALAGARH'),
(79, 7, 'CHANDITALA - I'),
(80, 7, 'CHANDITALA - II'),
(81, 7, 'CHINSURAH - MAGRA'),
(82, 7, 'DHANIAKHALI'),
(83, 7, 'GOGHAT - I'),
(84, 7, 'GOGHAT - II'),
(85, 7, 'HARIPAL'),
(86, 7, 'JANGIPARA'),
(87, 7, 'KHANAKUL - I'),
(88, 7, 'KHANAKUL - II'),
(89, 7, 'PANDUA'),
(90, 7, 'POLBA - DADPUR'),
(91, 7, 'PURSURA'),
(92, 7, 'SERAMPUR UTTARPARA'),
(93, 7, 'SINGUR'),
(94, 7, 'TARAKESWAR'),
(95, 8, 'AMTA - I'),
(96, 8, 'AMTA - II'),
(97, 8, 'BAGNAN - I'),
(98, 8, 'BAGNAN - II'),
(99, 8, 'BALLY JAGACHHA'),
(100, 8, 'DOMJUR'),
(101, 8, 'JAGATBALLAVPUR'),
(102, 8, 'PANCHLA'),
(103, 8, 'SANKRAIL'),
(104, 8, 'SHYAMPUR - I'),
(105, 8, 'SHYAMPUR - II'),
(106, 8, 'UDAYNARAYANPUR'),
(107, 8, 'ULUBERIA - I'),
(108, 8, 'ULUBERIA - II'),
(109, 9, 'BANARHAT'),
(110, 9, 'DHUPGURI'),
(111, 9, 'JALPAIGURI'),
(112, 9, 'KRANTI'),
(113, 9, 'MAL'),
(114, 9, 'MATIALI'),
(115, 9, 'MAYNAGURI'),
(116, 9, 'NAGRAKATA'),
(117, 9, 'RAJGANJ'),
(118, 10, 'BINPUR - I'),
(119, 10, 'BINPUR - II'),
(120, 10, 'GOPIBALLAVPUR - I'),
(121, 10, 'GOPIBALLAVPUR - II'),
(122, 10, 'JAMBONI'),
(123, 10, 'JHARGRAM'),
(124, 10, 'NAYAGRAM'),
(125, 10, 'SANKRAIL'),
(126, 11, 'GORUBATHAN'),
(127, 11, 'KALIMPONG -I'),
(128, 11, 'LAVA'),
(129, 11, 'PEDONG'),
(130, 12, 'BAMANGOLA'),
(131, 12, 'CHANCHAL - I'),
(132, 12, 'CHANCHAL - II'),
(133, 12, 'ENGLISH BAZAR'),
(134, 12, 'GAZOLE'),
(135, 12, 'HABIBPUR'),
(136, 12, 'HARISCHANDRAPUR - I'),
(137, 12, 'HARISCHANDRAPUR - II'),
(138, 12, 'KALIACHAK - I'),
(139, 12, 'KALIACHAK - II'),
(140, 12, 'KALIACHAK - III'),
(141, 12, 'MALDAH (OLD)'),
(142, 12, 'MANIKCHAK'),
(143, 12, 'RATUA - I'),
(144, 12, 'RATUA - II'),
(145, 13, 'BELDANGA - I'),
(146, 13, 'BELDANGA - II'),
(147, 13, 'BERHAMPORE'),
(148, 13, 'BHAGAWANGOLA - I'),
(149, 13, 'BHAGAWANGOLA - II'),
(150, 13, 'BHARATPUR - I'),
(151, 13, 'BHARATPUR - II'),
(152, 13, 'BURWAN'),
(153, 13, 'DOMKAL'),
(154, 13, 'FARAKKA'),
(155, 13, 'HARIHARPARA'),
(156, 13, 'JALANGI'),
(157, 13, 'KANDI'),
(158, 13, 'KHARGRAM'),
(159, 13, 'LALGOLA'),
(160, 13, 'MURSHIDABAD JIAGANJ'),
(161, 13, 'NABAGRAM'),
(162, 13, 'NAWDA'),
(163, 13, 'RAGHUNATHGANJ - I'),
(164, 13, 'RAGHUNATHGANJ - II'),
(165, 13, 'RANINAGAR - I'),
(166, 13, 'RANINAGAR - II'),
(167, 13, 'SAGARDIGHI'),
(168, 13, 'SAMSERGANJ'),
(169, 13, 'SUTI - I'),
(170, 13, 'SUTI - II'),
(171, 14, 'CHAKDAH'),
(172, 14, 'CHAPRA'),
(173, 14, 'HANSKHALI'),
(174, 14, 'HARINGHATA'),
(175, 14, 'KALIGANJ'),
(176, 14, 'KALYANI'),
(177, 14, 'KARIMPUR - I'),
(178, 14, 'KARIMPUR - II'),
(179, 14, 'KRISHNAGANJ'),
(180, 14, 'KRISHNAGAR - I'),
(181, 14, 'KRISHNAGAR - II'),
(182, 14, 'NABADWIP'),
(183, 14, 'NAKASHIPARA'),
(184, 14, 'RANAGHAT - I'),
(185, 14, 'RANAGHAT - II'),
(186, 14, 'SANTIPUR'),
(187, 14, 'TEHATTA - I'),
(188, 14, 'TEHATTA - II'),
(189, 15, 'AMDANGA'),
(190, 15, 'BADURIA'),
(191, 15, 'BAGDA'),
(192, 15, 'BARASAT - I'),
(193, 15, 'BARASAT - II'),
(194, 15, 'BARRACKPUR - I'),
(195, 15, 'BARRACKPUR - II'),
(196, 15, 'BASIRHAT - I'),
(197, 15, 'BASIRHAT - II'),
(198, 15, 'BONGAON'),
(199, 15, 'DEGANGA'),
(200, 15, 'GAIGHATA'),
(201, 15, 'HABRA - I'),
(202, 15, 'HABRA - II'),
(203, 15, 'HAROA'),
(204, 15, 'HASNABAD'),
(205, 15, 'HINGALGANJ'),
(206, 15, 'MINAKHAN'),
(207, 15, 'RAJARHAT'),
(208, 15, 'SANDESHKHALI - I'),
(209, 15, 'SANDESHKHALI - II'),
(210, 15, 'SWARUPNAGAR'),
(211, 16, 'BARABANI'),
(212, 16, 'FARIDPUR DURGAPUR'),
(213, 16, 'JAMURIA'),
(214, 16, 'KANKSA'),
(215, 16, 'ONDAL'),
(216, 16, 'PANDABESWAR'),
(217, 16, 'RANIGANJ'),
(218, 16, 'SALANPUR'),
(219, 17, 'CHANDRAKONA - I'),
(220, 17, 'CHANDRAKONA - II'),
(221, 17, 'DANTAN - I'),
(222, 17, 'DANTAN - II'),
(223, 17, 'DASPUR - I'),
(224, 17, 'DASPUR - II'),
(225, 17, 'DEBRA'),
(226, 17, 'GARBETA - I'),
(227, 17, 'GARBETA - II'),
(228, 17, 'GARBETA - III'),
(229, 17, 'GHATAL'),
(230, 17, 'KESHIARY'),
(231, 17, 'KESHPUR'),
(232, 17, 'KHARAGPUR - I'),
(233, 17, 'KHARAGPUR - II'),
(234, 17, 'MIDNAPORE'),
(235, 17, 'MOHANPUR'),
(236, 17, 'NARAYANGARH'),
(237, 17, 'PINGLA'),
(238, 17, 'SABANG'),
(239, 17, 'SALBANI'),
(240, 18, 'AUSGRAM - I'),
(241, 18, 'AUSGRAM - II'),
(242, 18, 'BHATAR'),
(243, 18, 'BURDWAN - I'),
(244, 18, 'BURDWAN - II'),
(245, 18, 'GALSI - I'),
(246, 18, 'GALSI - II'),
(247, 18, 'JAMALPUR'),
(248, 18, 'KALNA - I'),
(249, 18, 'KALNA - II'),
(250, 18, 'KATWA - I'),
(251, 18, 'KATWA - II'),
(252, 18, 'KETUGRAM - I'),
(253, 18, 'KETUGRAM - II'),
(254, 18, 'KHANDAGHOSH'),
(255, 18, 'MANGOLKOTE'),
(256, 18, 'MANTESWAR'),
(257, 18, 'MEMARI - I'),
(258, 18, 'MEMARI - II'),
(259, 18, 'PURBASTHALI - I'),
(260, 18, 'PURBASTHALI - II'),
(261, 18, 'RAINA - I'),
(262, 18, 'RAINA - II'),
(263, 19, 'BHAGAWANPUR - I'),
(264, 19, 'BHAGAWANPUR - II'),
(265, 19, 'CHANDIPUR'),
(266, 19, 'CONTAI - I'),
(267, 19, 'CONTAI - III'),
(268, 19, 'DESHOPRAN'),
(269, 19, 'EGRA - I'),
(270, 19, 'EGRA - II'),
(271, 19, 'HALDIA'),
(272, 19, 'KHEJURI - I'),
(273, 19, 'KHEJURI - II'),
(274, 19, 'KOLAGHAT'),
(275, 19, 'MAHISADAL'),
(276, 19, 'MOYNA'),
(277, 19, 'NANDA KUMAR'),
(278, 19, 'NANDIGRAM - I'),
(279, 19, 'NANDIGRAM - II'),
(280, 19, 'PANSKURA'),
(281, 19, 'POTASHPUR - I'),
(282, 19, 'POTASHPUR - II'),
(283, 19, 'RAMNAGAR - I'),
(284, 19, 'RAMNAGAR - II'),
(285, 19, 'SAHID MATANGINI'),
(286, 19, 'SUTAHATA'),
(287, 19, 'TAMLUK'),
(288, 20, 'ARSHA'),
(289, 20, 'BAGMUNDI'),
(290, 20, 'BALARAMPUR'),
(291, 20, 'BARABAZAR'),
(292, 20, 'BUNDWAN'),
(293, 20, 'HURA'),
(294, 20, 'JAIPUR'),
(295, 20, 'JHALDA - I'),
(296, 20, 'JHALDA - II'),
(297, 20, 'KASHIPUR'),
(298, 20, 'MANBAZAR - I'),
(299, 20, 'MANBAZAR - II'),
(300, 20, 'NETURIA'),
(301, 20, 'PARA'),
(302, 20, 'PUNCHA'),
(303, 20, 'PURULIA - I'),
(304, 20, 'PURULIA - II'),
(305, 20, 'RAGHUNATHPUR - I'),
(306, 20, 'RAGHUNATHPUR - II'),
(307, 20, 'SANTURI'),
(308, 21, 'BARUIPUR'),
(309, 21, 'BASANTI'),
(310, 21, 'BHANGAR - I'),
(311, 21, 'BHANGAR - II'),
(312, 21, 'BISHNUPUR - I'),
(313, 21, 'BISHNUPUR - II'),
(314, 21, 'BUDGE BUDGE - I'),
(315, 21, 'BUDGE BUDGE - II'),
(316, 21, 'CANNING - I'),
(317, 21, 'CANNING - II'),
(318, 21, 'DIAMOND HARBOUR - I'),
(319, 21, 'DIAMOND HARBOUR - II'),
(320, 21, 'FALTA'),
(321, 21, 'GOSABA'),
(322, 21, 'JAYNAGAR - I'),
(323, 21, 'JAYNAGAR - II'),
(324, 21, 'KAKDWIP'),
(325, 21, 'KULPI'),
(326, 21, 'KULTALI'),
(327, 21, 'MAGRAHAT - I'),
(328, 21, 'MAGRAHAT - II'),
(329, 21, 'MANDIRBAZAR'),
(330, 21, 'MATHURAPUR - I'),
(331, 21, 'MATHURAPUR - II'),
(332, 21, 'NAMKHANA'),
(333, 21, 'PATHARPRATIMA'),
(334, 21, 'SAGAR'),
(335, 21, 'SONAR PUR'),
(336, 21, 'THAKURPUKUR MAHESTOLA'),
(337, 22, 'CHOPRA'),
(338, 22, 'GOALPOKHAR - I'),
(339, 22, 'GOALPOKHAR - II'),
(340, 22, 'HEMTABAD'),
(341, 22, 'ISLAMPUR'),
(342, 22, 'ITAHAR'),
(343, 22, 'KALIAGANJ'),
(344, 22, 'KARANDIGHI'),
(345, 22, 'RAIGANJ'),
(346, 23, 'NA'),
(514, 32, 'KHARIBARI'),
(515, 32, 'MATIGARA'),
(516, 32, 'NAXALBARI'),
(517, 32, 'PHANSIDEWA');

-- --------------------------------------------------------

--
-- Table structure for table `md_district`
--

CREATE TABLE `md_district` (
  `dist_code` int NOT NULL,
  `dist_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `md_district`
--

INSERT INTO `md_district` (`dist_code`, `dist_name`) VALUES
(1, 'ALIPURDUAR'),
(2, 'BANKURA'),
(3, 'BIRBHUM'),
(4, 'COOCHBEHAR'),
(5, 'DAKSHIN DINAJPUR'),
(6, 'DARJEELING'),
(7, 'HOOGHLY'),
(8, 'HOWRAH'),
(9, 'JALPAIGURI'),
(10, 'JHARGRAM'),
(11, 'KALIMPONG'),
(12, 'MALDAH'),
(13, 'MURSHIDABAD'),
(14, 'NADIA'),
(15, 'NORTH 24 PARAGANAS'),
(16, 'PASCHIM BARDHAMAN'),
(17, 'PASCHIM MEDINIPUR'),
(18, 'PURBA BARDHAMAN'),
(19, 'PURBA MEDINIPUR'),
(20, 'PURULIA'),
(21, 'SOUTH 24 PARAGANAS'),
(22, 'UTTAR DINAJPUR'),
(23, 'KOLKATA'),
(32, 'SILIGURI MAHAKUMA PARISHAD');

-- --------------------------------------------------------

--
-- Table structure for table `md_document`
--

CREATE TABLE `md_document` (
  `doc_type_id` int NOT NULL,
  `doc_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `upload_auth` enum('S','A') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `md_document`
--

INSERT INTO `md_document` (`doc_type_id`, `doc_type`, `upload_auth`) VALUES
(1, 'Notification', 'S'),
(2, 'Tender', 'S'),
(3, 'Announcement', 'A'),
(4, 'Downloads', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `md_election_details`
--

CREATE TABLE `md_election_details` (
  `id` int NOT NULL,
  `election_name` varchar(255) DEFAULT NULL,
  `election_year` year DEFAULT NULL,
  `status` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `md_election_details`
--

INSERT INTO `md_election_details` (`id`, `election_name`, `election_year`, `status`) VALUES
(1, '2025 Society ', '2025', 0);

-- --------------------------------------------------------

--
-- Table structure for table `md_range`
--

CREATE TABLE `md_range` (
  `range_id` int NOT NULL,
  `dist_id` int NOT NULL,
  `zone_id` int DEFAULT NULL,
  `range_name` varchar(100) DEFAULT NULL,
  `address` text,
  `email_id` varchar(50) DEFAULT NULL,
  `phone_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `md_security_questions`
--

CREATE TABLE `md_security_questions` (
  `id` int NOT NULL,
  `question_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `md_security_questions`
--

INSERT INTO `md_security_questions` (`id`, `question_text`) VALUES
(1, 'What is your mother\'s maiden name ?'),
(2, 'What is your first school name ?'),
(3, 'What is your favourite food ?');

-- --------------------------------------------------------

--
-- Table structure for table `md_ulb`
--

CREATE TABLE `md_ulb` (
  `ulb_id` int NOT NULL,
  `ulb_catg_id` int NOT NULL,
  `dist_code` int NOT NULL,
  `ulb_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `md_user`
--

CREATE TABLE `md_user` (
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id` int NOT NULL,
  `user_name` varchar(155) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `user_type` enum('A','U','M','S') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'S->Superadmin\r\nA->Admin\r\nM->RO\r\nU->General User',
  `password` varchar(150) NOT NULL,
  `user_status` enum('A','I') NOT NULL,
  `session_version_id` varchar(255) DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `security_answered` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_ip` varchar(255) DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_ip` varchar(255) DEFAULT NULL,
  `elec_status` int DEFAULT '1',
  `must_change_password` int DEFAULT '0',
  `must_update_profile` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `md_user`
--

INSERT INTO `md_user` (`user_id`, `id`, `user_name`, `user_email`, `designation`, `user_type`, `password`, `user_status`, `session_version_id`, `profile_pic`, `security_answered`, `created_at`, `created_by`, `created_ip`, `modified_at`, `modified_by`, `modified_ip`, `elec_status`, `must_change_password`, `must_update_profile`) VALUES
('9002139484', 1, 'Ajay Kumar Ram', 'N.A.', 'N.A.', 'A', '$2b$10$E8uygpYB.22FBSVenr1Nm./QBwiIzLNQ.kVIexKMYNJR9tNeX/.6W', 'A', 'NULL', '', 0, '2025-11-17 10:48:35', 'ee', 'ee', '2025-11-21 14:33:04', '9002139484', 'null', 1, 0, 0),
('9433537298', 2, 'Amlan Bhattacharya', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', 'YGNIg-DapyDMnlqr0Q9sEadw6pjgm2yC', NULL, 0, '2025-11-17 10:48:35', '', '', '2025-11-18 14:48:50', '9433537298', '::1', 1, 0, 0),
('9674278401', 3, 'Amrita Brahma', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', 'K9OxJZj0lNFN4_vZa5USQdym_btPxXX5', NULL, 0, '2025-11-17 10:48:35', '', '', '2025-11-18 15:04:49', '9674278401', '::ffff:192.168.1.15', 1, 0, 0),
('8348685664', 4, 'Ananya Chatterjee', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', 'tjlC3Q6WnuSAwFHviaBtjGRIW-3f7cvm', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9051833904', 5, 'Aparna Chatterjee', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', 'NULL', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9836855926', 6, 'Arindam Bhuniya', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433584730', 7, 'Aveek Bhattacharya', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('7908570392', 8, 'Benojir Hossain', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8900624639', 9, 'Bholanath Mondal', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9434220488', 10, 'Bireswar Dasgupta', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9163055935', 11, 'Brajesh Kumar Singh', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9903654589', 12, 'Chinmoy Gupta', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9932274000', 13, 'Debashis Roy', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9614911271', 14, 'Debnath Mahata', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('6295120277', 15, 'Dipa Biswas', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9163030209', 16, 'Ishita Sarkar', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9733867330', 17, 'Manab Banerjee', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9748513071', 18, 'Manasij Mukhopadhyay', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8961001930', 19, 'Md. Ghulam Ghous', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9051074091', 20, 'Monisha Chakraborty', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9735276155', 21, 'Naleshwar Narzari', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9564779262', 22, 'Nilanjan Nath', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9932291662', 23, 'Nilanjan Sarkar', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9093421250', 24, 'Nizamuddin Siddikee', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433906408', 25, 'Paramita Ghosh', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9831644317', 26, 'Partha Basu', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433431926', 27, 'Peali Saha', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9971716472', 28, 'Prasenjit Dey', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9434224073', 29, 'Prasenjit Maity', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('7359288063', 30, 'Rayashi Banik', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8016415195', 31, 'Saikat Bhattacharya', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433504123', 32, 'Sandipan Chakraborty', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8013435477', 33, 'Santanu Chaki', 'N.A.', 'N.A.', 'S', '$2b$10$E8uygpYB.22FBSVenr1Nm./QBwiIzLNQ.kVIexKMYNJR9tNeX/.6W', 'A', 'ZZiugq4bNZrd6W6y2yah2elG1-EkTQpe', '', 0, '2025-11-17 10:48:35', '', '', '2025-11-21 14:22:29', '8013435477', 'null', 1, 0, 0),
('9474388161', 34, 'Shelley Mandal', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9434010293', 35, 'Shohag Biswas', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9932182349', 36, 'Sk. Shane Alam', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9475062946', 37, 'Somnath Sen', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9933536671', 38, 'Sounak Banerjee', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9531605760', 39, 'Subham Mukherjee', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9051515457', 40, 'Subho Ray', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433211107', 41, 'Subhra Thakur', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9434524117', 42, 'Subhradeb Das', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433123476', 43, 'Sujan Sarkar', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8100594193', 44, 'Sushmita Mazumder', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8101697509', 45, 'Sutanuka Chakraborty', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433350543', 46, 'Suvadip Maity', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8918012887', 47, 'Swarnadeep Acharyya', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('9433533833', 48, 'Swarup Bagchi', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0),
('8017071134', 49, 'Tanuj Kumar Sarkar', 'N.A.', 'N.A.', 'A', '$2b$10$v21pWhQvfUhziwuA0y2bpuTV155WHZLwdpwKSi66O2F9kxhXpHQqq', 'A', '', NULL, 0, '2025-11-17 10:48:35', '', '', NULL, NULL, NULL, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `td_notification`
--

CREATE TABLE `td_notification` (
  `id` int NOT NULL,
  `type` enum('S','V','D','G','F','SE') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'S=> SOCIETY ,G => GALLERY\r\nV => VILLAGE,D=>DOCUMENT,F=>FAQ',
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `wrk_releated_id` int NOT NULL,
  `user_type` enum('U','M','A','S') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `view_status` int NOT NULL DEFAULT '1',
  `range_id` int NOT NULL,
  `created_by` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `created_ip` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `td_security_answers`
--

CREATE TABLE `td_security_answers` (
  `id` int NOT NULL,
  `user_id` bigint NOT NULL,
  `answer1_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer2_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answer3_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `answered_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `td_voter_status`
--

CREATE TABLE `td_voter_status` (
  `id` int NOT NULL,
  `election_id` int NOT NULL,
  `voter_id` int NOT NULL,
  `has_voted` tinyint DEFAULT '0',
  `vote_dttime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `td_votes`
--

CREATE TABLE `td_votes` (
  `id` int NOT NULL,
  `election_id` int NOT NULL,
  `voter_id_enc` varchar(100) NOT NULL,
  `candidate_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `created_ip` varchar(50) NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_ip` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `md_block`
--
ALTER TABLE `md_block`
  ADD PRIMARY KEY (`block_id`);

--
-- Indexes for table `md_district`
--
ALTER TABLE `md_district`
  ADD PRIMARY KEY (`dist_code`);

--
-- Indexes for table `md_document`
--
ALTER TABLE `md_document`
  ADD PRIMARY KEY (`doc_type_id`);

--
-- Indexes for table `md_election_details`
--
ALTER TABLE `md_election_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `md_range`
--
ALTER TABLE `md_range`
  ADD PRIMARY KEY (`range_id`);

--
-- Indexes for table `md_security_questions`
--
ALTER TABLE `md_security_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `md_ulb`
--
ALTER TABLE `md_ulb`
  ADD PRIMARY KEY (`ulb_id`);

--
-- Indexes for table `md_user`
--
ALTER TABLE `md_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `td_notification`
--
ALTER TABLE `td_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `td_security_answers`
--
ALTER TABLE `td_security_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `td_voter_status`
--
ALTER TABLE `td_voter_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_voter` (`election_id`,`voter_id`);

--
-- Indexes for table `td_votes`
--
ALTER TABLE `td_votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_vote` (`election_id`,`voter_id_enc`,`candidate_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `md_block`
--
ALTER TABLE `md_block`
  MODIFY `block_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=521;

--
-- AUTO_INCREMENT for table `md_district`
--
ALTER TABLE `md_district`
  MODIFY `dist_code` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `md_document`
--
ALTER TABLE `md_document`
  MODIFY `doc_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `md_election_details`
--
ALTER TABLE `md_election_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `md_range`
--
ALTER TABLE `md_range`
  MODIFY `range_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `md_security_questions`
--
ALTER TABLE `md_security_questions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `md_ulb`
--
ALTER TABLE `md_ulb`
  MODIFY `ulb_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=258;

--
-- AUTO_INCREMENT for table `md_user`
--
ALTER TABLE `md_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `td_notification`
--
ALTER TABLE `td_notification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `td_security_answers`
--
ALTER TABLE `td_security_answers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `td_voter_status`
--
ALTER TABLE `td_voter_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `td_votes`
--
ALTER TABLE `td_votes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
