<?php
	try{
		
		error_reporting(E_ALL );
		
		ini_set('display_errors', '0' );
		
		/*konfiguracja preflight zapytania wstępnego CORS. Origin - pochodzenie, źródło*/
		header('Access-Control-Allow-Origin: https://simplefilter.eu' );
		//zezwolenie na ciasteczka
		header('Access-Control-Allow-Credentials: true' );
		//zezwolenie na typy zapytań
		header('Access-Control-Allow-Methods: GET, POST, OPTIONS' );
		//zezwolenie na body JSON
		header('Access-Control-Allow-Headers: Content-Type' );
		
		// zwróć status w przypadku preflight
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' ){
			
			http_response_code(200);
			
			exit(
				json_encode(
					[
						'preflight' => 'ok'
					],
					JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
				)
			);
		}

		http_response_code(500 );
		
		header('Content-type: application/json; charset=utf-8' );
		header('X-Autor: Dariusz Bodzeta, Michał Pudzianowski' );
		header('X-Contact: darek334@gazeta.pl' );
		header('X-Nazwa: HTTP API Gateway' );

		if(){
            
        }
        else{
            
            http_response_code(400 );
            throw new Exception('No data for the request !' );
        }
	catch(Throwable $error ){

		exit(
			json_encode(
				[
					'error' => [
						'client_data' => $_POST,
						'type' => get_class($error),
						'code' => $error->getCode(),
						'message' => $error->getMessage(),
						'query_result' => isset($wrapper )?$wrapper->getResult():'',
						'query_info' => isset($wrapper )?$wrapper->getInfo():''
					]
				],
				JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
			)
		);
	}
?>
