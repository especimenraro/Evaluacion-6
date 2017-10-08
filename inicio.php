<?php
include "lib.php";

if($_POST["campo"]=="Ciudad") {
echo json_encode(obtieneData("Ciudad"));}

if($_POST["campo"]=="Tipo") {
echo json_encode(obtieneData("Tipo"));}


?>