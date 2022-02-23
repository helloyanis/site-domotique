-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 13 fév. 2022 à 20:56
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `webreathe`
--

-- --------------------------------------------------------

--
-- Structure de la table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `allumé` tinyint(1) NOT NULL DEFAULT 0,
  `lastuse` date NOT NULL DEFAULT current_timestamp(),
  `broken` tinyint(1) NOT NULL DEFAULT 0,
  `data` text NOT NULL DEFAULT '{}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `modules`
--

INSERT INTO `modules` (`id`, `nom`, `allumé`, `lastuse`, `broken`, `data`) VALUES
(36, 'Lampe', 0, '2022-02-13', 0, '[{\"1644775869\":\"9\"},{\"1644775862\":\"13\"},{\"1644775852\":\"15\"},{\"1644775845\":\"10\"}]'),
(37, 'Thermomètre', 0, '2022-02-13', 1, '[{\"1644776164\":\"18\"},{\"1644776158\":\"13\"},{\"1644776149\":\"25\"}]'),
(38, 'Lampe de bureau', 1, '2022-02-13', 0, '{}');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
