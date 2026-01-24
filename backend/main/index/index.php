<?php
	try{
		
		http_response_code(500 );
		
		error_reporting(E_ALL );
		
		ini_set('display_errors', '0' );
		
		header('Content-type: text/html; charset=utf-8');
		header('X-Autor: Dariusz Bodzeta' );
		header('X-Contact: darek334@gazeta.pl' );
		header('X-Nazwa: HTTP API Gateway' );

		ini_set('display_errors', '0' );
		
		error_reporting(E_ALL );

		require 'html/main_www.php';
		
		http_response_code(200 );
		
		echo $main_www;
	}
	catch(Throwable $error ){
		
		http_response_code(500 );
		
		header('Content-type: application/json; charset=utf-8' );

		exit(
			json_encode(
				[
					'error' => [
						'type' => get_class($error),
						'code' => $error->getCode(),
						'message' => $error->getMessage()
					]
				],
				JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
			)
		);
	}
?>
