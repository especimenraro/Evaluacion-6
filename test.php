<?php
include "lib.php";
define("FLAGTIPO", true);
 define("FLAGCIUDAD", true);
$file = fopen("./data-1.json", "r");
$data =json_decode(fread($file, filesize("./data-1.json")),true);
fclose($file);

$respuesta =  filtrarRango("Precio","200","80000",filtrar("Tipo",$Tipo, filtrar("Ciudad",$Ciudad,$data, FLAGCIUDAD ),FLAGTIPO));

//$respuesta =  filtrarRango("Precio",$precioMin,$precioMax,$data);
echo json_encode($respuesta);
//echo $flagCiudad.$flagTipo;
?>