<?php
function action($action){
    include("connexion.inc.php");
    switch ($action) {
        case "add":
        $stmt = $pdo->prepare("INSERT INTO task (date,name,id_membre) VALUES (?,?,?)");
        $stmt->execute(array(date("Y-m-d H:i:s"),$_GET["name"],$_GET["member"]));
        break;
        case "remove":
        $supp = $pdo->prepare("DELETE FROM task WHERE id= :id");
        $supp->bindParam(":id", $_GET["id"]);
        $supp->execute();
        break;
        case "update":
        $modif = $pdo->prepare("UPDATE task SET name =:name WHERE id= :id");
        $modif->bindParam(":id", $_GET["id"]);
        $modif->bindParam(":name", $_GET["name"]);
        $modif->execute();
        break;
        case "listemembre":
        include("connexion.inc.php");
        $stmt = $pdo->prepare("SELECT * FROM member");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        echo $json;
    }
}
function reload(){
    include("connexion.inc.php");
    $stmt = $pdo->prepare("SELECT *,(select nom from member where member.id = id_membre ) as nom FROM task");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    echo $json;
}
?>