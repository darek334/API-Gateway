# HTTP Proxy Gateway

Portal umożliwia skonfigurowanie żądania HTTP. Minimalnym wymogiem do wykonania żądania, jest wprowadzenie adresu URL. Użytkownik może ustawić wiele parametrów podzielonych na pięć głównych typów:
* parametry GET,
* parametry nagłówków HTTP Headers,
* parametry danych POST (POST Body),
* ciasteczka (cookies),
* oraz ustawienia cURL wykonywane po stronie serwera.

## Charakterystyka : 

Każda podstrona służąca jako brama będzie wstępnie zabezpieczona ustawieniem Preflight :

    //Zezwolenie na komunikację tylko wtedy jeśli przeglądarka używa odnośnika pochodzącego z simplefilter.eu
    //Jeśli, zapytanie będzie pochodziło z innego źródła strony. Przegląarka zgodnie z zasadmi CORS zablokuje komunikację
	header('Access-Control-Allow-Origin: https://simplefilter.eu' );
  
	//podstrona zezwala na przesyłania ciasteczek
	header('Access-Control-Allow-Credentials: true' );
  
	//zezwolenie na typy zapytań. Moga to być GET,, POST oraz preflight - OPTIONS
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS' );
  
	//zezwolenie przesłanie danych w nagłówku typu JSON
	header('Access-Control-Allow-Headers: Content-Type' );

Działanie portalu można opisać w następujących punktach:

1. Odebranie danych żądania przesłanych z przeglądarki klienta
2. Konfiguracja zmiennych żądania HTTP w cURL:

   * // === Identyfikacja ===
   * 'CURLOPT_USERAGENT'      => CURLOPT_USERAGENT,
   * // === Metody / request ===
   * 'CURLOPT_POST'           => CURLOPT_POST, // nie ma sensu tego ustawiać bo cURL sam to robi w zależności od CURLOPT_POSTFIELDS
   * 'CURLOPT_CUSTOMREQUEST'  => CURLOPT_CUSTOMREQUEST, // wymuś metodę HTTP PUT PATCH DELETE OPTIONS
   * 'CURLOPT_HTTPGET'        => CURLOPT_HTTPGET, // WYMUSZA metodę HTTP GET, ignoruje wcześniejsze POSTFIELDS
   * // === Dane ===
   * 'CURLOPT_POSTFIELDS'     => CURLOPT_POSTFIELDS,
   * // === Nagłówki / cookies ===
   * 'CURLOPT_HTTPHEADER'     => CURLOPT_HTTPHEADER,
   * 'CURLOPT_COOKIE'         => CURLOPT_COOKIE,
   * // === Autoryzacja ===
   * 'CURLOPT_USERPWD'        => CURLOPT_USERPWD, // ustawia Basic Authentication CURLOPT_USERPWD => 'user:password'
   * 'CURLOPT_HTTPAUTH'       => CURLOPT_HTTPAUTH, // wybór mechanizmu auth, CURLAUTH_BASIC, CURLAUTH_BEARER
   * // === SSL (ostrożnie) ===
   * 'CURLOPT_SSL_VERIFYPEER' => CURLOPT_SSL_VERIFYPEER,
   * 'CURLOPT_SSL_VERIFYHOST' => CURLOPT_SSL_VERIFYHOST,
   * // === Debug / info ===
   * 'CURLOPT_HEADER'         => CURLOPT_HEADER,
   * //'CURLOPT_VERBOSE'        => CURLOPT_VERBOSE, // tylko do testów, nie do normalnego API., może: zepsuć output pomieszać JSON
  
3. Konfiguracja nagłówków HTTP
    * Wszystkie możliwe nagłówki
4. Konfiguracja POST
5. Konfiguracja ciasteczek
6. Konfiguracja argumentów GET
7. Informacja zwrotna wyniku żądania podzielona na trzy sekcje:

   1. Rzeczywista konfiguracja żądania, będąca wynikiem walidacji ustawień po stronie serwera, zanim nastąpi żądanie HTTP
   2. Informacje zwrotne umieszczone w nagłówku odpowiedzi po wykonaniu żądania HTTP - w celu analizy
   3. Rzeczywisty wynik żądania - dane przesłane ze zdalengo serwera JSON itp.
