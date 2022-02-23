<?php
//Permet de supprimer un appareil
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
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

if($module["id"]==""){
    //Quand l'ID est introuvable (déjà supprimé sur un autre onglet)
    echo(json_encode(array('error'=>"ID de l'appareil introuvable (erreur interne)")));
    http_response_code(403);
    exit;
}
$sql = "DELETE FROM modules
WHERE id=".$module['id'];

if ($conn->query($sql) === TRUE) {
  //It passed!
  http_response_code(201);
} else {
  echo(json_encode(array('error'=>'Erreur SQL! ' . $sql . ' - ' . $conn->error )));
  http_response_code(500);
}

$conn->close();

?> 