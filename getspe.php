<?php
//Permet d'obtenir un certain élément de la BDD, basé sur son ID
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  echo(`{"error":"Erreur serveur, méthode GET autorisée uniquement"}`);
  header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
  exit;
}
header('Content-Type: application/json; charset=utf-8');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "webreathe";
error_reporting(E_ERROR | E_PARSE);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  echo(json_encode(array('error'=>`Connection à la base de données impossible pour la raison suivante : `. $conn->connect_error)));
  http_response_code(500);
  exit;
}
$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$data = json_decode($inputJSON, TRUE);
$sql = "SELECT * FROM modules WHERE id=".$data['id'];
$result = $conn->query($sql);
//var_dump($result);
$resp=[];//La réponse du serveur
if ($result->num_rows > 0) {
  // output data of each row
   while($row = $result->fetch_assoc()) {
     array_push($resp,$row);//Ajouter chaque ligne (=chaque module) à la réponse à envoyer
   }
   echo(json_encode($resp));//Envoyer la rép
} else {
    echo(json_encode(array('error'=>`Module introuvable... Il a sûrement été supprimé`)));
    http_response_code(404);
    exit;
}
$conn->close();
?> 