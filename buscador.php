<?php
include "lib.php";
$file = fopen("./data-1.json", "r");
$data =json_decode(fread($file, filesize("./data-1.json")),true);
fclose($file);
$ciudad = filtrar("Ciudad","Orlando",$data,true );
$tipo = filtrar("Tipo","Casa de Campo", filtrar("Ciudad","Houston",$data ));
$rangoPrecio = filtrarRango("Precio","20000","60000",$data);
//echo   substr($data[0]["Precio"],1)>"20000";     

echo json_encode($rangoPrecio);

?>