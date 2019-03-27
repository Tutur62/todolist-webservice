<?php
include("connexion.inc.php");
include("fonction.php");
if(isset($_GET['action'])&&isset($_GET['callback'])=="test"){
$action = $_GET['action'];
action($action);
}else{
    reload();
}
?>