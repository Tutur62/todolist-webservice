<?php
$arrExtraParam="";
$pdo = new PDO('mysql:host=localhost;dbname=todo','root',$arrExtraParam);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);