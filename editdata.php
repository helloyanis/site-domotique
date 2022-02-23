<?php
//Permet de changer l'historique
if ($_SERVER['REQUEST_METHOD'] !== 'PATCH') {
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
    //Quand l'ID est pas dans la bdd
    echo(json_encode(array('error'=>"ID de l'appareil introuvable (erreur interne)")));
    http_response_code(403);
    exit;
}
$sql="SELECT data FROM modules WHERE id=".$module["id"];//Récupération des données
$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
    $data=json_decode($row['data'],true);//Ajouter chaque ligne (=chaque module) à la réponse à envoyer
  }
  array_unshift($data,array(time() => $module['data']));
//$data=array_push($data,$module['data']);
//echo(json_encode($data));
$sql="UPDATE modules SET data='".json_encode($data)."' WHERE id=".$module["id"]." ;";

if ($conn->multi_query($sql) === TRUE) {
  //It passed!
  http_response_code(200);
} else {
  echo(json_encode(array('error'=>'Erreur SQL! ' . $sql . ' - ' . $conn->error )));
  http_response_code(500);
}

$conn->close();

?> 