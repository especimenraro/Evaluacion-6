<?php
include "lib.php";
$file = fopen("./data-1.json", "r");
$data =json_decode(fread($file, filesize("./data-1.json")),true);
fclose($file);
echo verificaContenido("Ciudad","Los Angeles",$data)

//echo json_encode($ciudades);

?>