<?php
/**
 * ==========================================================
 *  INFORMACJE DOTYCZĄCE METODY ZAPYTANIA, NAGŁÓWKÓW I DIAGNOSTYKI cURL
 * ==========================================================
 *
 * 1) AUTOMATYCZNE USTAWIANIE METODY ZAPYTANIA (HTTP METHOD)
 * ----------------------------------------------------------
 * W PHP cURL metoda zapytania HTTP jest w wielu przypadkach
 * ustawiana AUTOMATYCZNIE na podstawie obecności opcji:
 *
 *   - CURLOPT_POSTFIELDS
 *
 * Jeśli CURLOPT_POSTFIELDS jest ustawione:
 *   - cURL domyślnie użyje metody POST
 *   - nawet jeśli jawnie nie ustawiono CURLOPT_POST
 *
 * Wymuszenie konkretnej metody zapytania odbywa się poprzez:
 *
 *   - CURLOPT_POST (bool)
 *     * true  -> wymusza POST
 *     * false -> nie wymusza POST (ale może zostać nadpisane przez POSTFIELDS)
 *
 *   - CURLOPT_CUSTOMREQUEST (string)
 *     * pozwala wymusić dowolną metodę HTTP (np. "GET", "POST", "PUT", "DELETE")
 *     * MA NAJWYŻSZY PRIORYTET
 *     * może nadpisać zarówno CURLOPT_POST, jak i CURLOPT_HTTPGET
 *
 *   - CURLOPT_HTTPGET (bool)
 *     * true -> wymusza metodę GET
 *     * używane głównie do cofnięcia POST przy wcześniejszych ustawieniach
 *
 * UWAGA:
 * - CURLOPT_CUSTOMREQUEST jest nadrzędne względem pozostałych opcji
 * - obecność CURLOPT_POSTFIELDS często skutkuje POST,
 *   nawet jeśli intencją był GET
 *
 *
 * 2) NAGŁÓWEK "Accept: application/json"
 * --------------------------------------
 * Nagłówek:
 *
 *   Accept: application/json
 *
 * informuje serwer, że klient OCZEKUJE odpowiedzi w formacie JSON.
 *
 * WAŻNE:
 * - jest to jedynie sugestia (request header)
 * - serwer NIE MA obowiązku jej respektować
 * - wiele API ignoruje ten nagłówek i zwraca:
 *     * HTML
 *     * text/plain
 *     * inny format niż JSON
 *
 * Dlatego zawsze należy:
 * - sprawdzić faktyczny Content-Type odpowiedzi
 * - NIE zakładać, że odpowiedź będzie JSON tylko dlatego,
 *   że ustawiono nagłówek Accept
 *
 *
 * 3) INFORMACJE ZWRACANE PRZEZ curl_getinfo()
 * ------------------------------------------
 * Po wykonaniu zapytania (curl_exec) można pobrać szczegółowe
 * informacje diagnostyczne za pomocą:
 *
 *   curl_getinfo($ch)
 *
 * Zwracana jest tablica zawierająca m.in.:
 *
 * [Informacje o żądaniu]
 * - url
 * - content_type
 * - http_code
 * - request_size
 * - header_size
 *
 * [Informacje o czasie]
 * - total_time
 * - namelookup_time
 * - connect_time
 * - pretransfer_time
 * - starttransfer_time
 *
 * [Informacje o transferze]
 * - size_upload
 * - size_download
 * - speed_upload
 * - speed_download
 *
 * [Informacje o połączeniu]
 * - primary_ip
 * - primary_port
 * - local_ip
 * - local_port
 *
 * NAJWAŻNIEJSZE ELEMENTY DO SPRAWDZENIA PO curl_exec():
 * ---------------------------------------------------
 * - http_code
 *     * kod odpowiedzi HTTP (np. 200, 404, 500)
 *
 * - content_type
 *     * faktyczny typ danych zwróconych przez serwer
 *     * np. application/json, text/html
 *
 *
 * 4) OBSŁUGA BŁĘDÓW cURL
 * ---------------------
 * Informacje o błędach cURL NIE znajdują się w curl_getinfo().
 *
 * Do obsługi błędów służą:
 *
 *   - curl_errno($ch)
 *     * zwraca numer błędu (0 = brak błędu)
 *
 *   - curl_error($ch)
 *     * zwraca opis błędu w postaci stringa
 *
 * Poprawna sekwencja diagnostyki:
 *   1) curl_exec()
 *   2) curl_errno() / curl_error()
 *   3) curl_getinfo()
 *
 * ==========================================================
 */

final class CurlInterface
{
	const CURL_OPTIONS_MAP = [
	
		// === Połączenie ===
		//'CURLOPT_URL'            => CURLOPT_URL,
		
		// === Podstawowe ===
		//'CURLOPT_RETURNTRANSFER' => CURLOPT_RETURNTRANSFER,
		//'CURLOPT_TIMEOUT'        => CURLOPT_TIMEOUT,
		//'CURLOPT_CONNECTTIMEOUT' => CURLOPT_CONNECTTIMEOUT,
		//'CURLOPT_FOLLOWLOCATION' => CURLOPT_FOLLOWLOCATION,
		//'CURLOPT_MAXREDIRS'      => CURLOPT_MAXREDIRS, // maksymalna liczba przekierowań (3xx), które cURL MOŻE wykonać działa gdy CURLOPT_FOLLOWLOCATION = true
		
		// === Identyfikacja ===
		'CURLOPT_USERAGENT'      => CURLOPT_USERAGENT,
		
		// === Metody / request ===
		'CURLOPT_POST'           => CURLOPT_POST, // nie ma sensu tego ustawiać bo cURL sam to robi w zależności od CURLOPT_POSTFIELDS
		'CURLOPT_CUSTOMREQUEST'  => CURLOPT_CUSTOMREQUEST, // wymuś metodę HTTP PUT PATCH DELETE OPTIONS
		'CURLOPT_HTTPGET'        => CURLOPT_HTTPGET, // WYMUSZA metodę HTTP GET, ignoruje wcześniejsze POSTFIELDS
		
		// === Dane ===
		'CURLOPT_POSTFIELDS'     => CURLOPT_POSTFIELDS,

		// === Nagłówki / cookies ===
		'CURLOPT_HTTPHEADER'     => CURLOPT_HTTPHEADER,
		'CURLOPT_COOKIE'         => CURLOPT_COOKIE,

		// === Autoryzacja ===
		'CURLOPT_USERPWD'        => CURLOPT_USERPWD, // ustawia Basic Authentication CURLOPT_USERPWD => 'user:password'
		'CURLOPT_HTTPAUTH'       => CURLOPT_HTTPAUTH, // wybór mechanizmu auth, CURLAUTH_BASIC, CURLAUTH_BEARER

		// === SSL (ostrożnie) ===
		'CURLOPT_SSL_VERIFYPEER' => CURLOPT_SSL_VERIFYPEER,
		'CURLOPT_SSL_VERIFYHOST' => CURLOPT_SSL_VERIFYHOST,

		// === Debug / info ===
		'CURLOPT_HEADER'         => CURLOPT_HEADER,
		//'CURLOPT_VERBOSE'        => CURLOPT_VERBOSE, // tylko do testów, nie do normalnego API., może: zepsuć output pomieszać JSON
	];
	
	// wewnętrzne opcje cURL nie do użytku na zewnątrz, gdyż klucze nie są stringami, czyli takimi jakie są przekaazywane z zapytania JS, nie podlegają też filtracji poprzez dozwolone ustawienia przez klienta w CURL_OPTIONS_MAP
	const INTERNAL_CURL_OPTION = [
			
		CURLOPT_RETURNTRANSFER => true, // zwracaj do zmiennej zamiast wyświetlać
		CURLOPT_HEADER         => false, // nie doklejej do otrzymanych danych danych o nagłówkach - tylko czyte dane np HTML, JSOn itp
		CURLOPT_TIMEOUT        => 10,   // maksymalny czas CAŁEGO zapytania (w sekundach)
		CURLOPT_CONNECTTIMEOUT => 5,    // maksymalny czas na samo połączenie
		CURLOPT_FOLLOWLOCATION => false // obsługa redirectów
		//CURLOPT_SSL_VERIFYHOST => 2,    // Sprawdza, czy certyfikat SSL jest prawidłowy dla danego hosta. sprawdza, czy pasuje do domeny (poprawne)
		//CURLOPT_SSL_VERIFYPEER => true	// Weryfikuje certyfikat SSL serwera, Gdy false — akceptuje NIEZWERYFIKOWANY certyfikat (bardzo niebezpieczne).
	];
	
	const CURL_OPTION_USERAGENT = [
			
		'CURLOPT_USERAGENT'       => 'Http Api Gateway/1.0 ( Topic: MANS - Faculty of Management and Technical Sciences - Wstep do Programowania Obiektowego; Authors: Dariusz Bodzeta, Michal Pudzianowski; Contact: darek334@gazeta.pl)'
	];
	
	const HTTP_HEADER_ACCEPT_JSON = [
		
		'Accept' => 'application/json' //chcielibyśmy dostać json
		//'Content-Type' => 'application/json', //zapytania wysyłamy w formie json
		//'Authorization' => 'Bearer $token', // autoryzacja zapytania coś jak SID sesji
		//'Cache-Control' => 'no-cache' //nie odczytuj z cache tylko ściągaj nowe, jakas bzdura
	];

	const HTTP_HEADER_ACCEPT_XML = [
	
		'Accept' => 'application/xml, text/xml'
	];
	
	const HTTP_HEADER_ACCEPT_HTML = [
	
		'Accept' => 'text/html'
	];
	
	const HTTP_HEADER_ACCEPT_TEXT = [
	
		'Accept' => 'text/plain'
	];

	const HTTP_HEADER_ACCEPT_ANY = [

		'Accept' => '*/*'
	];

	private array $GET = []; //tablica array
	private array $CURL_OPTION = []; //tablica array
	private array $HTTP_HEADER = []; //tablica array
	private array $POST_BODY = []; //tablica array
	private array $COOKIES = []; //tablica array

	private string|false|null $QUERY_RESULT = NULL;
	private array $QUERY_INFO = [];
	
	/**/
	public function __construct(string $URL ){
		
		if($URL ){
			
			$this->setCURLOption('CURLOPT_URL', $URL );
		}
		else{
			
			throw new Exception('Adres URL nie może być pustym stringiem !' );
		}
	}
	
	/**/
	public function getUrl(): string{
		
		return $this->CURL_OPTION['CURLOPT_URL' ];
	}
	
	/**/
	public function prepareUrl(): string{
			
		return $this->CURL_OPTION['CURLOPT_URL' ].($this->GET?'?'.http_build_query($this->GET, "", "&", PHP_QUERY_RFC3986 ): '' );
	}
	
	/**/
	public function setGET(string|array $DATA_KEY, ?string $VALUE = null ): void{
		
		if(is_array($DATA_KEY ) ){

			$this->GET = $DATA_KEY;
		}
		else{
			
			$this->GET[$DATA_KEY ] = $VALUE;
		}
	}
	
	/**/
	public function mergeGET(array $DATA ): void{
		
		$this->GET = $DATA + $this->GET;
	}

	/**/
	public function getGET(): array{
		
		return $this->GET;
	}

	/*key to int. Może nadpisać HTTP_HEADER_PARAMS*/
	public function setCURLOption(string|array $DATA_KEY, mixed $VALUE = null ): void{

		if(is_array($DATA_KEY ) ){

			$this->CURL_OPTION = $DATA_KEY;
		}
		elseif($DATA_KEY ){
			
			$this->CURL_OPTION[$DATA_KEY ] = $VALUE;
		}
		else{
			
			throw new Exception('Nazwa opcji cURL nie może być pustym stringiem !' );
		}
	}

	/**/
	public function mergeCURLOption(array $DATA_KEY ): void{
		
		$this->CURL_OPTION = $DATA_KEY + $this->CURL_OPTION;
	}
	
	/**/
	public function getCURLOption(): array{
			
		return $this->CURL_OPTION;
	}
	
	/**/
	public function prepareCURLOption(): array{
		
		$CurlOption = [];
		
		foreach($this->CURL_OPTION as $CurlOptionName => $CurlOptionValue ){
			
			if(isset(self::CURL_OPTIONS_MAP[$CurlOptionName ] ) ){
				
				$CurlOptionValue = $this->validateCURLOption($CurlOptionValue );
				
				if($CurlOptionValue !== null ){
				
					$CurlOption[self::CURL_OPTIONS_MAP[$CurlOptionName ] ] = $CurlOptionValue;
				}
			}
		}
			
		return self::INTERNAL_CURL_OPTION + $CurlOption;
	}
	
	public function validateCURLOption(string $CURLOption ): bool|int|null{
		
		$CURLOption = strtolower(trim($CURLOption ) );

		if($CURLOption === 'true'){
			
			return true;
		}
		else if($CURLOption === 'false'){
			
			return false;
		}
		else if(preg_match('/^\d+$/', $CURLOption ) ){
			
			return (int)$CURLOption;
		}

		return null;
	}

	/**/
	public function setHttpHeader(string|array $DATA_KEY, string $VALUE ): void{
		
		if(is_array($DATA_KEY ) ){

			$this->HTTP_HEADER = $DATA_KEY;
		}
		elseif($DATA_KEY ){
			
			$this->HTTP_HEADER[$DATA_KEY ] = $VALUE;
		}
		else{
			
			throw new Exception('Nazwa Nagłówka HTTP nie może być pustym stringiem !' );
		}
	}

	/**/
	public function mergeHttpHeader(array $DATA_KEY ): void{
		
		$this->HTTP_HEADER = $DATA_KEY + $this->HTTP_HEADER;
	}
	
	/**/
	public function getHttpHeader(): array{
		
		return $this->HTTP_HEADER;
	}
	
	/**/
	public function prepareHttpHeader(): ?array{
		
		$http_header = [];
		
		foreach($this->HTTP_HEADER as $key => $value ){
			
			$http_header[] = "$key: $value";
		}
		
		return $http_header?$http_header:null;
	}
	
	/**/
	public function setPostBody(string|array $DATA_KEY, string $VALUE ): void{
		
		if(is_array($DATA_KEY ) ){

			$this->POST_BODY = $DATA_KEY;
		}
		elseif($DATA_KEY ){
			
			$this->POST_BODY[$DATA_KEY ] = $VALUE;
		}
		else{
			
			throw new Exception('Nazwa pozycji Body nie może być pustym stringiem !' );
		}
	}

	/**/
	public function mergePostBody(array $DATA_KEY ): void{
		
		$this->POST_BODY = $POST_BODY + $this->POST_BODY;
	}
	
	/**/
	public function getPostBody(): array{
		
		return $this->POST_BODY;
	}
	
	/**/
	public function preparePostBody(): ?string{
		
		return $this->POST_BODY?json_encode($this->POST_BODY ):null;
	}
	
	/**/
	public function setCOOKIE(string|array $DATA_KEY, array $VALUE ): void{
		
		if(is_array($DATA_KEY ) ){

			$this->COOKIES = $DATA_KEY;
		}
		elseif($DATA_KEY ){
			
			$this->COOKIES[$DATA_KEY ] = $VALUE;
		}
		else{
			
			throw new Exception('Nazwa ciasteczka nie może być pustym stringiem !' );
		}
	}

	/**/
	public function mergeCOOKIE(array $DATA_KEY ): void{
		
		$this->COOKIES = $DATA_KEY + $this->COOKIES;
	}
	
	/**/
	public function getCOOKIE(): array{
		
		return $this->COOKIES;
	}
	
	/**/
	public function prepareCookie(): ?string{
		
		$cookies = [];
		
		foreach($this->COOKIES as $name => $cookie ){
			
			$cookies[] = $name . '=' . $cookie['Value'];
		}
		
		return $cookies?implode('; ', $cookies):null;
	}
	
	/**/
	public function prepareRequest(): ?array{
		
		$CurlOption = self::prepareCURLOption();
		
		$CurlOption[CURLOPT_URL ] = self::prepareUrl();
		
		$request_setting = self::prepareHttpHeader();
		
		if($request_setting ){
			
			$CurlOption[CURLOPT_HTTPHEADER ] = $request_setting;
		}
		
		$request_setting = self::preparePostBody();
		
		if($request_setting ){
			
			$CurlOption[CURLOPT_POSTFIELDS ] = $request_setting;
		}
		
		$request_setting = self::prepareCookie();
		
		if($request_setting ){
			
			$CurlOption[CURLOPT_COOKIE ] = $request_setting;
		}
		
		return $CurlOption;
	}

	/**/
	public function getResult(): mixed{
		
		return $this->QUERY_RESULT;
	}
	
	/**/
	public function getInfo(): array{
		
		return $this->QUERY_INFO;
	}

	
	/**/
	public function runQuery(){

		$query = curl_init();

		curl_setopt_array($query, $this->prepareRequest() );

		$this->QUERY_RESULT = curl_exec($query );
		
		$this->QUERY_INFO = curl_getinfo($query );
		
		$this->QUERY_INFO['curl_errno' ] = curl_errno($query );
		
		$this->QUERY_INFO['curl_error' ] = curl_error($query );
		
		curl_close($query );

		return is_string($this->QUERY_RESULT );
	}
}
?>
