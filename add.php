<?php
//Permet d'ajouter de nouveaux appareils dans la bdd
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo(`{"error":"Erreur serveur, méthode POST autorisée uniquement"}`);
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "webreathe";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  echo(json_encode(array('error'=>`Connection à la base de données impossible pour la raison suivante : `. $conn->connect_error)));
  http_response_code(500);
  exit;
}
$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$module = json_decode($inputJSON, TRUE);

if($module["name"]==""){
    //Refuser l'ajout avec un nom vide
    echo(json_encode(array('error'=>"Impossible d'ajouter un appareil sans nom")));
    http_response_code(403);
    exit;
}
$sql = "INSERT INTO modules (nom)
VALUES ('".$module['name']."')";

if ($conn->query($sql) === TRUE) {
  //It passed!
  http_response_code(201);
} else {
  echo(json_encode(array('error'=>'Erreur SQL! ' . $sql . ' - ' . $conn->error )));
  http_response_code(500);
}

$conn->close();

?> 