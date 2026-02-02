<?php
$main_www =
'<!DOCTYPE html>
<html lang="pl">
	<head>
	
		<meta charset="utf-8">
		<title>HTTP Proxy Gateway</title>
		<meta name="subject" content="MANS - Wstęp do Programowania Obiektowego">
		<meta name="author" content="Dariusz Bodzęta, Michał Pudzianowski, darek334@gazeta.pl">
		<meta name="purpose" content="academic student project">
		<meta name="description" content="HTTP Proxy Gateway - Internetowa usługa do odczytu danych">
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link rel="icon" href="favicon.ico" type="image/x-icon">
		<link rel="icon" type="image/png" href="image/mans_logo.png" >
		
		<link rel="stylesheet" href="css/css.css">
		
		<script src="js/DOM.js" ></script>
		<script src="js/konstelacja_background.js" ></script>
	</head>
	<body>
		<canvas id="stars"></canvas>
		<script>
			runBackground();
		</script>
		<table class="main" >
			<tr>
				<th >
					<div class="HeadDiv" >
						<div class="HeadMansLogoDiv">
							<a href="https://mans.org.pl" target="_blank"><img class="mans-logo" src="image/mans_logo.png"></a>
						</div>
						<div class="HeadTitleDiv" >
							HTTP Proxy Gateway - Portal do Odczytu Danych
						</div>
					</div>
				</th>
			</tr>
			<tr>
				<td id="SettingsBoxId" >
				</td>
				<script type="text/javascript" >
					DOM.htmlSettingInputs(\'SettingsBoxId\', DOM.Data );
				</script>
			</tr>
			<tr>
				<td id="InputsBoxId" >
				</td>
				<script type="text/javascript" >
					DOM.htmlUrlInput(\'InputsBoxId\', DOM.Data );
					const RowId = DOM.makeRandomString();
					DOM.setOptionType(RowId, \'GET\' );
					DOM.htmlAddRow(\'InputsBoxId\', RowId, \'GET\' );
				</script>
			</tr>
			<tr>
				<td id="CheckButtonsTdId" >
					<div >
						<span>Akcje: </span><button type="button" title="Dodaj kolejny wiersz" onclick = "const RowId = DOM.makeRandomString();
					DOM.setOptionType(RowId, \'GET\' );DOM.htmlAddRow(\'InputsBoxId\', RowId, \'GET\' )">Dodaj Wiersz</button>
					
						<button type="button" title="Pokaż niesformatowane dane" onclick = "DOM.htmlJSONWindow(\'html/DOM_data_view_window.html\', DOM.Data, \'Obecna Struktura Danych DOM\' )">Pokaż Dane</button>
						
						<button type="button" title="Otwórz nowe okno z gotowymi danymi do wykonania zadania" onclick = "DOM.Data.DataType === \'JSON\'?DOM.htmlJSONWindow(\'html/json_request_window.html\', DOM.prepareDOMData(), \'Wyślij żądanie JSON\' ):alert(\'Odczyt MySQL jest niedostępny\nPrzestaw Typ Danych na: JSON\')">Przygotuj</button>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="TextDiv">
						<details class="TextDetails">
							<summary class="TitleSummary">
								Opis działania i konfiguracji strony
							</summary>
							<div class="TextDiv">
								Strona umożliwia skonfigurowanie żądania HTTP. Minimalnym wymogiem do wykonania żądania, jest wprowadzenie adresu URL w polu „Adres URL”. Użytkownik może ustawić wiele parametrów. W polu „Typ” można wybrać pięć głównych typów konfiguracji żądania HTTP:
								<ul>
									<li>
										parametry GET,
									</li>
									<li>
										parametry nagłówków HTTP Headers,
									</li>
									<li>
										parametry danych POST (POST Body),
									</li>
									<li>
										ciasteczka (cookies),
									</li>
									<li>
										oraz ustawienia modułu cURL wykonywane po stronie serwera.
									</li>
								</ul>
							</div>
						</details>
						<details class="TextDetails">
							<summary class="TitleSummary">
								Moduł cURL – rola i możliwości
							</summary>
							<div class="TextDiv">
								Moduł cURL (Client URL Library) jest biblioteką umożliwiającą wykonywanie żądań HTTP oraz HTTPS po stronie serwera, niezależnie od przeglądarki użytkownika. W kontekście tej aplikacji cURL pełni rolę pośrednika komunikacji pomiędzy użytkownikiem a zdalnym serwisem. Za pomocą cURL możliwe jest m.in.:
								<ul>
									<li>
										wykonywanie żądań HTTP metodami GET, POST, PUT, DELETE i innymi,
									</li>
									<li>
										wysyłanie niestandardowych nagłówków HTTP (np. Authorization, Accept, Content-Type),
									</li>
									<li>
										przesyłanie danych w formatach takich jak application/json, application/x-www-form-urlencoded, czy multipart/form-data,
									</li>
									<li>
										obsługa plików cookies - wysyłanych do zdalnego adresu URL, oraz ich odbieranie,
									</li>
									<li>
										kontrola zachowania połączenia (timeout, redirecty, SSL, user-agent),
									</li>
									<li>
										odbieranie pełnej odpowiedzi serwera (nagłówki + body).
									</li>
								</ul>
								cURL nie jest przeglądarką internetową – nie interpretuje HTML, nie wykonuje JavaScriptu, nie renderuje CSS i nie utrzymuje interaktywnej sesji użytkownika w sposób charakterystyczny dla przeglądarek. Jednak zadalny serwer otrzymujący żądanie HTTP, musi odpowiedzieć tak jakby była to standardowa komunikacja użytkownika za pomocą przeglądarki internetowej. Na chwilę obecną dane umieszczane są w formacie JSON. Dane niezgodne z prośbą negocjacyjną bramy Accept: application/json, mogą zostać nieudostępnione przez zdalny serwer HTTP.
							</div>
						</details>
						<details class="TextDetails">
							<summary class="TitleSummary">
								CORS a żądania HTTP przez bramę
							</summary>
							<div class="TextDiv">
								Zasady CORS (Cross-Origin Resource Sharing) obowiązują wyłącznie po stronie przeglądarki. Żądania wykonywane przez cURL nie podlegają ograniczeniom CORS, ponieważ są realizowane po stronie serwera. Oznacza to, że:
								<ul>
									<li>
										brama wykonuje żądania HTTP do dowolnych domen,
									</li>
									<li>
										brama może przeslać w kierunku domeny dowolne wpisane ciasteczko,
									</li>
									<li>
										odpowiedzi nie są blokowane przez politykę same-origin,
									</li>
									<li>
										nagłówki takie jak Access-Control-Allow-Origin nie mają znaczenia dla samego cURL.
									</li>
								</ul>
								Należy jednak zaznaczyć, że obejście CORS nie oznacza obejścia zabezpieczeń aplikacji docelowej. Serwisy mogą stosować dodatkowe mechanizmy ochronne, takie jak tokeny, podpisy żądań HTTP, limity IP czy weryfikację nagłówków.
							</div>
						</details>
						<details class="TextDetails">
							<summary class="TitleSummary">
								Obsługa ciasteczek (cookies)
							</summary>
							<div class="TextDiv">
								Moduł cURL umożliwia:
								<ul>
									<li>
										wysyłanie ciasteczek do zdalnego serwera,
									</li>
									<li>
										odbieranie ciasteczek w odpowiedzi HTTP,
									</li>
									<li>
										zapisywanie ich w pliku lub przekazywanie w ramach jednego zapytania.
									</li>
								</ul>
								W kontekście tej bramy należy jednak podkreślić istotne ograniczenia:
								<ul>
									<li>
										użytkownik nie przesyła bezpośrednio swojego ciasteczka sesyjnego do zdalnego serwisu,
									</li>
									<li>
										ciasteczko wysyłane jest przez serwer bramy, a nie przez oryginalną przeglądarkę użytkownika,
									</li>
									<li>
										serwer docelowy widzi zapytanie jako pochodzące od bramy, a nie od użytkownika końcowego.
									</li>
								</ul>
								Możliwe jest jednorazowe przesłanie ciasteczka i odebranie odpowiedzi (np. w celu testowym), jednak:
								<ul>
									<li>
										ciągła komunikacja sesyjna nie jest możliwa w taki sam sposób jak w przeglądarce,
									</li>
									<li>
										nie występuje bezpośrednie powiązanie sesji użytkownika z sesją serwera docelowego,
									</li>
									<li>
										uzyskana odpowiedź może być jedynie „lustrzanym odbiciem” strony dostępnej po uwierzytelnieniu.
									</li>
								</ul>
								Należy jednak zaznaczyć, że mimo możliwości przesłania ciasteczka za pośrednictwem bramy, taka komunikacja ma charakter jednorazowy i nie jest utrzymywana w sposób ciągły. Użytkownik, który otrzymuje dane będące wynikiem użycia przekazanego ciasteczka, nie ma możliwości dalszego kontynuowania tej komunikacji bezpośrednio w swojej przeglądarce. Wynika to z faktu, że ciasteczko nie jest zapisywane w przeglądarce użytkownika, co jest konsekwencją obowiązujących mechanizmów bezpieczeństwa, w szczególności zasad CORS.
							</div>
						</details>
						<details class="TextDetails">
							<summary class="TitleSummary">
								Autoryzacja i wymagania serwisów zewnętrznych
							</summary>
							<div class="TextDiv">
								Wiele serwisów udostępniających dane (np. w formacie JSON) wymaga dodatkowych mechanizmów autoryzacji, takich jak:
								<ul>
									<li>
										nagłówki Authorization (np. Bearer Token),
									</li>
									<li>
										klucze API przekazywane w nagłówkach lub parametrach HTTP,
									</li>
									<li>
										podpisy kryptograficzne żądań HTTP,
									</li>
									<li>
										określony User-Agent,
									</li>
									<li>
										ograniczenia adresów IP (whitelisty),
									</li>
									<li>
										limity liczby żądań (rate limiting).
									</li>
								</ul>
								Brama umożliwia ręczną konfigurację nagłówków i tych wszystkich parametrów, jednak:
								<ul>
									<li>
										nie gwarantuje poprawnej komunikacji z każdym serwisem,
									</li>
									<li>
										nie zastępuje pełnej integracji API,
									</li>
									<li>
										nie omija zabezpieczeń logicznych ani mechanizmów antybotowych.
									</li>
								</ul>
							</div>
						</details>
						<details class="TextDetails">
							<summary class="TitleSummary">
								Ograniczenia i potencjalne problemy
							</summary>
							<div class="TextDiv">
								Podczas wykonywania żądań HTTP przez bramę mogą wystąpić m.in.:
								<ul>
									<li>
										odrzucenie żądania przez serwer docelowy,
									</li>
									<li>
										brak wymaganych nagłówków lub tokenów,
									</li>
									<li>
										problemy z certyfikatami SSL,
									</li>
									<li>
										timeouty połączenia,
									</li>
									<li>
										różnice w zachowaniu w porównaniu do przeglądarki.
									</li>
								</ul>
								Dlatego, możliwe jest przeanalizowania wyniku żądania HTTP, gdyż brama udostępnia wszystkie informacje dotyczące komunikacji HTTP. Dane JSON są podzielona na trzy sekcje:
								<ul>
									<li>
										Gateway_request_settings - parametry żądania HTTP uzstawione przez użytkownika,
									</li>
									<li>
										Gateway_request_info - informacje powstałe w wyniku komunikacji HTTP. Pochodzą one z metod cURL curl_getinfo(), curl_errno(), oraz curl_error(),
									</li>
									<li>
										Gateway_request_result - wynik żądania HTTP
									</li>
								</ul>
								Brama ma charakter narzędzia testowego i edukacyjnego, umożliwiającego analizę zapytań HTTP oraz ich parametrów, a nie pełnoprawnego zastępstwa przeglądarki użytkownika.
							</div>
						</details>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="TitleDiv" >
						Odpowiedzialność i przeznaczenie narzędzia.
					</div>
					<div class="TextDiv" >
						Niniejsza brama żądań HTTP ma charakter edukacyjny i badawczy, oraz została stworzona wyłącznie w celach dydaktycznych. Autorzy nie ponoszą odpowiedzialności za sposób wykorzystania narzędzia przez użytkowników, ani za skutki działań podejmowanych z jego użyciem. Pełna odpowiedzialność za konfigurację żądań HTTP, oraz ich rezultaty spoczywa na użytkowniku. Portal nie posiada predefiniowanych ustawień, nie narzuca sposobu działania bramy, które mogłyby zostać uznane za szkodliwe, nie gromadzi danych użytkowników, ani nie kontroluje ustawień. Wszystkie parametry żądań HTTP są konfigurowane samodzielnie przez użytkownika. Autorzy nie zachęcają do jakiegokolwiek nielegalnego, lub nieetycznego wykorzystania narzędzia. Wszelkie uwagi należy zgłaszać pod dane kontaktowe umieszczone w nagłówkach HTTP.
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="StopkaDiv">
						© 2026 Dariusz Bodzęta, Michał Pudzianowski — strona wykonana na zaliczenie przedmiotu <span class="PrzedmiotSpan">Wstęp do Programowania Obiektowego</span>. Prowadzący: mgr Artur Karwatka.
					</div>
				</td>
			</tr>
		</table>
	</body>
</html>';
?>
