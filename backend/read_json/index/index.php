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
		header('X-Academic-Project: MANS - Faculty of Management and Technical Sciences' );
		header('X-Autor: Dariusz Bodzeta, Michal Pudzianowski' );
		header('X-Contact: darek334@gazeta.pl' );
		header('X-Application-Name: HTTP Proxy Gateway' );
		header('X-Application-Description: Internetowa usluga do odczytu danych' );
		
		
		//odczytujemy dane ze zminnej POST od użytkownika
		if(isset($_POST['Data' ] ) ){
			
			//dekodujemy te dane
			$_POST['Data' ] = json_decode($_POST['Data' ], true );
			
			//importujemy naszą klasę
			require __DIR__ .'/../class/CurlInterface.php';
			
			//tworzymy obiekt
			$wrapper = new CurlInterface($_POST['Data' ]['Url' ] );
			
			//przetwarzamy dane za pomocą naszego obiektu
			if(isset($_POST['Data' ]['Body' ] ) ){
			
				if(isset($_POST['Data' ]['Body' ]['GET' ] ) ){
					
					foreach($_POST['Data' ]['Body' ]['GET' ] as $name => $get_data ){
					
						$wrapper->setGET($name, $get_data['Value' ] );
					}
				}
				if(isset($_POST['Data' ]['Body' ]['CURL_O' ] ) ){
					
					foreach($_POST['Data' ]['Body' ]['CURL_O' ] as $name => $get_data ){
					
						$wrapper->setCURLOption($name, $get_data['Value' ] );
					}
				}
				if(isset($_POST['Data' ]['Body' ]['HEADER' ] ) ){
					
					foreach($_POST['Data' ]['Body' ]['HEADER' ] as $name => $get_data ){
					
						$wrapper->setHttpHeader($name, $get_data['Value' ] );
					}
				}
				if(isset($_POST['Data' ]['Body' ]['POST_B' ] ) ){
					
					foreach($_POST['Data' ]['POST_B' ] as $name => $get_data ){
					
						$wrapper->setPostBody($name, $get_data['Value' ] );
					}
				}
				if(isset($_POST['Data' ]['Body' ]['COOKIE' ] ) ){
					
					foreach($_POST['Data' ]['Body' ]['COOKIE' ] as $name => $data ){
					
						$wrapper->setCOOKIE($name, $data );
					}
				}
			}
			
			//uruchamiamy główną funkcję naszego obiektu, który już wykonuje żądanie HTTP
			$wrapper->runQuery();
			
			//usatawiamy nagłówek w przypadku powoidzenia
			http_response_code(200 );
			
			//nastęnie formatujemy otrzymane dane w nasze trzy sekcje
			echo json_encode([
				
				'Gateway_request_settings'  => $wrapper->prepareRequest(),
				'Gateway_request_info'  => $wrapper->getInfo(),
				'Gateway_request_result' => json_decode($wrapper->getResult(), true )
			] );

		}
		else{
			
			http_response_code(400 );
			throw new Exception('No data for the request' );
		}
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
