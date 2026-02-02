# HTTP Proxy Gateway

Brama API typu HTTP Proxy Gateway, pośrednicząca w komunikacji HTTP ze zdalnym adresem URL. Komunikacja z bramą może odbywać się pomiędzy serwerami, serwer - serwer, albo przeglądarka - serwer. Brama pośredniczy w ustawieniach żądania HTTP i oferuje wszystkie typy powszechnie znanych ustawień. Udostępnia odczyt danych w formacie JSON w uporządkowanej formie, wraz z informacjami na temat całego procesu żądania, podzielonego na trzy sekcje:
* rzeczywiste dane konfiguracyjne żądania HTTP, otrzymane od klienta - sparsowane i sformatowane przez skrypty PHP na serwerze bramy
* informacje zwrotne dotyczące reakcji zdalnego serwera na żądanie HTTP
* rzeczywiste dane udzielone przez zdalny serwer będące wynikiem żądania HTTP

## Charakterystyka - Możliwości: 

1. Wstępna negocjacja z przeglądarką użytkownika tzw Preflight po stromnie bramy za pomocą żądań HTTP:

    //Zezwolenie na komunikację tylko wtedy jeśli przeglądarka używa odnośnika pochodzącego z simplefilter.eu
    //Jeśli, zapytanie będzie pochodziło z innego źródła strony. Przeglądarka zgodnie z zasadami CORS zablokuje komunikację
	header('Access-Control-Allow-Origin: https://simplefilter.eu' );
  
	//podstrona zezwala na przesyłania ciasteczek
	header('Access-Control-Allow-Credentials: true' );
  
	//zezwolenie na typy zapytań. Moga to być GET,, POST oraz preflight - OPTIONS
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS' );
  
	//zezwolenie przesłanie danych w nagłówku typu JSON
	header('Access-Control-Allow-Headers: Content-Type' );

2. Konfiguracja podstrony za pomocą żądań HTTP po stronie bramy
3. Konfiguracja typu danych oczekiwanych przez użytkownika ze zdalnego adresu URL za pomocą żądania HTTP
4. Ustawienie metody żądania HTTP:
    * GET
    * POST
5. Konfiguracja modułu cURL np:
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
6. Konfiguracja nagłówków HTTP
    * Wszystkie możliwe nagłówki
7. Konfiguracja POST BODY w przypadku żądania typu POST - ale nie jest to ograniczenie
8. Konfiguracja ciasteczek - cookies
9. Konfiguracja argumentów GET
10. Konfiguracja danych odpowiedzi przez bramę podzielona na 3 sekcje:

   1. Rzeczywista konfiguracja zapytania po obróbce przez Bramę
   2. Informacja zwrotna o przebiegu komunikacji HTTP ze zdalnym URL
   3. Dane otrzymane z serwera ewentualnie informacja o błędzie
