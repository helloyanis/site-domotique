<?php
//Permet de changer l'état (allumé, éteint ou cassé)
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
    //Quand l'ID est introuvable (déjà supprimé sur un autre onglet)
    echo(json_encode(array('error'=>"ID de l'appareil introuvable (erreur interne)")));
    http_response_code(403);
    exit;
}
if($module["todo"]=="on"){

    $sql = "UPDATE modules SET allumé='1' WHERE id=".$module["id"].";";
    $sql .= "UPDATE modules SET lastuse=NOW() WHERE id=".$module["id"];
}elseif($module["todo"]=="off"){
    $sql = "UPDATE modules SET allumé='0' WHERE id=".$module["id"];
}elseif($module["todo"]=="break"){
    $sql = "UPDATE modules SET broken='1' WHERE id=".$module["id"]." ;";
    $sql.="UPDATE modules SET allumé='0' WHERE id=".$module["id"];
}elseif($module["todo"]=="repair"){
    $sql = "UPDATE modules SET broken='0' WHERE id=".$module["id"].";";
    $sql.="UPDATE modules SET allumé='0' WHERE id=".$module["id"];
}else{
    echo(json_encode(array('error'=>`Impossible de définir l'action à effectuer. C'est sûrement une erreur dans le code.`)));
    http_response_code(400);
    exit;
}


if ($conn->multi_query($sql) === TRUE) {
  //It passed!
  http_response_code(200);
} else {
  echo(json_encode(array('error'=>'Erreur SQL! ' . $sql . ' - ' . $conn->error )));
  http_response_code(500);
}

$conn->close();

?> 