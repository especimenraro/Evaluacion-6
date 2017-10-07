<?php

function obtieneData($nombre_campo) {
/*
Función que obtiene todos los  valores del nombre del campo solicitado de un archivo JSON
pero sin repetirse

*/
$file = fopen("./data-1.json", "r");
$listado =json_decode(fread($file, filesize("./data-1.json")),true);
fclose($file);

// INICIALIZA EL ARREGLO DESTINO DONDE SE ESCRIBIRÁN LOS DATOS OBTENIDOS

$data = json_decode("",true);
$pos_data = 0; // INICIALIZA EL INDICE DEL ARREGLO DESTINO

foreach ($listado as $campo=>$valor){	
		if(!count($data)) {
			$data[$pos_data][$nombre_campo] = $valor[$nombre_campo];	
			$pos_data++;
			
		}			//FIN IF
		else {
			if(!verificaContenido($nombre_campo,$valor[$nombre_campo],$data)) {
				
				$data[$pos_data][$nombre_campo] = $valor[$nombre_campo];	
				$pos_data++;
				
			} //FIN IF
		} // FIN ELSE
}//FIN FOREACH

return $data;
}

function verificaContenido($campo,$valor,$data) {
	/*
	
		Función que verifica si el valor de un campo especificado se encuentra en el arreglo $data
		devuelve true si existe, false si no lo encuentra	
	
	*/
	if(count($data)) { 	
		foreach ($data as $pos =>$valor_data){
			
			if($valor_data[$campo]==$valor) {
				return true;
				}  // FIN IF
			}//FIN FOREACH
			return false;
	} // FIN IF
	else { return false;}
} //FIN VERIFICA CONTENIDO
?>