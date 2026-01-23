# API-Gateway

Aplikacja typu API Gateway, wykorzystująca przeglądarki internetowe jako interfejs udostępniająca odczyt danych JSON z udostępnionych publicznie adresów URL, poprzez wysyłanie zapytań HTTP. Wykorzystująca wszystkie możliwe metody: GET, POST, nagłówki HTTP, ciasteczka, oraz zmienne cURL. Dane wysylane są do przeglądarki w formie JSON.

## Charakterystyka : 

Każda podstrona służąca jako brama API będzie wstępnie zabezpieczona ustawieniem Preflight :

    //Zezwolenie na komunikację tylko wtedy jeśli przeglądarka używa odnośnika pochodzącego z simplefilter.eu
    //Jeśli, zapytanie będzie pochodziło z innego źródła strony. Przegląarka zgodnie z zasadmi CORS zablokuje komunikację
	header('Access-Control-Allow-Origin: https://simplefilter.eu' );
  
	//podstrona zezwala na przesyłania ciasteczek
	header('Access-Control-Allow-Credentials: true' );
  
	//zezwolenie na typy zapytań. Moga to być GET,, POST oraz preflight - OPTIONS
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS' );
  
	//zezwolenie przesłanie danych w nagłówku typu JSON
	header('Access-Control-Allow-Headers: Content-Type' );
    
1. Odebranie danych JSON w nagłówku od klienta
2. Konfiguracja zapytania cURL np:

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
5. Wstawienie danych do POST
6. Ustawenie argumentów POST
7. Ustawienie ciasteczek
8. Ustawienie argumentów GET
9. Informacja odpowiedzi podzielona na 3 sekcje - trzy funkcje połączone w jedno:

   9. Rzeczywista konfiguracja zapytania po obróbce przez Bramę
   10. Informację zwrotne nagłówków odpytanego zdresu URL
   11. Dane otrzymane z serwera ewentualnie informacja o błędzie
