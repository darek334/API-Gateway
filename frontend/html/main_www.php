<?php
$main_www =
'<!DOCTYPE html>
<html lang="pl">
	<head>
		<title>Brama do odczytu danych</title>
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="subject" content="MANS - Wstęp do Programowania Obiektowego">
		<meta name="author" content="Dariusz Bodzęta, Michał Pudzianowski, darek334@gazeta.pl">
		<meta name="category" content="studia, study">
		<meta name="description" content="HTTP API Gateway - Brama do odczytu danych">

		<link rel="icon" type="image/png" href="image/mans_logo.png" >
		
		<link rel="stylesheet" href="css/css.css">
		
		<script src="js/DOM.js" ></script>
	</head>
	<body>
		<table class="main" >
			<tr>
				<th >
					<div class="HeadDiv" >
						<div class="HeadMansLogoDiv">
							<a href="https://mans.org.pl" target="_blank"><img class="mans-logo" src="image/mans_logo.png"></a>
						</div>
						<div class="HeadTitleDiv" >
							HTTP API Gateway - Portal do odczytu danych
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
					<div class="StopkaDiv" >
						<span>Akcje: </span><button type="button" title="Dodaj kolejny wiersz" onclick = "const RowId = DOM.makeRandomString();
					DOM.setOptionType(RowId, \'GET\' );DOM.htmlAddRow(\'InputsBoxId\', RowId, \'GET\' )">Dodaj Wiersz</button>
					
						<button type="button" title="Pokaż niesformatowane dane" onclick = "DOM.htmlJSONWindow(\'html/DOM_data_view_window.html\', DOM.Data, \'Obecna Struktura Danych DOM\' )">Pokaż Dane</button>
						
						<button type="button" title="Otwórz nowe okno z gotowymi danymi do wykonania zadania" onclick = "DOM.htmlJSONWindow(\'html/json_request_window.html\', DOM.prepareDOMData(), \'Wyślij zapytanie JSON\' )">Przygotuj</button>
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="StopkaDiv" >
						<details class="CenterTextDetails">
							<summary class="TitleSummary">
								Opis działania i konfiguracji strony
							</summary>
							<div class="TextDiv">
								Strona umożliwia wykonanie skonfigurowanego zdalnego zapytania HTTP za pośrednictwem bramy pośredniczącej. Minimalnym wymogiem do wykonania zapytania jest podanie adresu URL w polu „Adres URL”. Użytkownik ma możliwość skonfigurowania wielu aspektów zapytania HTTP, w tym parametrów wejściowych oraz ustawień technicznych po stronie serwera. W polu „Typ” można określić pięć głównych kategorii parametrów występujących w zapytaniu HTTP:
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
								Moduł cURL (Client URL Library) jest biblioteką umożliwiającą wykonywanie zapytań HTTP oraz HTTPS po stronie serwera, niezależnie od przeglądarki użytkownika. W kontekście tej aplikacji cURL pełni rolę pośrednika komunikacji pomiędzy użytkownikiem a zdalnym serwisem. Za pomocą cURL możliwe jest m.in.:
								<ul>
									<li>
										wykonywanie zapytań HTTP metodami GET, POST, PUT, DELETE i innymi,
									</li>
									<li>
										wysyłanie niestandardowych nagłówków HTTP (np. Authorization, Accept, Content-Type),
									</li>
									<li>
										przesyłanie danych w formatach takich jak application/json, application/x-www-form-urlencoded czy multipart/form-data,
									</li>
									<li>
										obsługa plików cookies (wysyłanie i odbieranie),
									</li>
									<li>
										kontrola zachowania połączenia (timeout, redirecty, SSL, user-agent),
									</li>
									<li>
										odbieranie pełnej odpowiedzi serwera (nagłówki + body).
									</li>
								</ul>
								cURL nie jest przeglądarką internetową – nie interpretuje HTML, nie wykonuje JavaScriptu, nie renderuje CSS i nie utrzymuje interaktywnej sesji użytkownika w sposób charakterystyczny dla przeglądarek.
							</div>
						</details>
						<details class="TextDetails">
							<summary class="TitleSummary">
								CORS a zapytania przez bramę
							</summary>
							<div class="TextDiv">
								Zasady CORS (Cross-Origin Resource Sharing) obowiązują wyłącznie po stronie przeglądarki. Zapytania wykonywane przez cURL nie podlegają ograniczeniom CORS, ponieważ są realizowane po stronie serwera. Oznacza to, że:
								<ul>
									<li>
										brama może wysyłać zapytania do dowolnych domen,
									</li>
									<li>
										odpowiedzi nie są blokowane przez politykę same-origin,
									</li>
									<li>
										nagłówki takie jak Access-Control-Allow-Origin nie mają znaczenia dla samego cURL.
									</li>
								</ul>
								Należy jednak zaznaczyć, że obejście CORS nie oznacza obejścia zabezpieczeń aplikacji docelowej. Serwisy mogą stosować dodatkowe mechanizmy ochronne, takie jak tokeny, podpisy żądań, limity IP czy weryfikację nagłówków.
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
								Ze względu na pośrednictwo bramy, pełne odwzorowanie zachowania przeglądarki w kontekście sesji jest procesem złożonym i w praktyce ograniczonym.
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
										klucze API przekazywane w nagłówkach lub parametrach zapytania,
									</li>
									<li>
										podpisy kryptograficzne zapytań,
									</li>
									<li>
										określony User-Agent,
									</li>
									<li>
										ograniczenia adresów IP (whitelisty),
									</li>
									<li>
										limity liczby zapytań (rate limiting).
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
								Podczas wykonywania zapytań przez bramę mogą wystąpić m.in.:
								<ul>
									<li>
										odrzucenie zapytania przez serwer docelowy,
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
								Dlatego, możliwe jest przeanalizowania zapytania HTTP, gdyż odpowiedź JSON podzielona jest na trzy sekcje, które zawierają:
								<ul>
									<li>
										Gateway_request_settings - parametry zapytania,
									</li>
									<li>
										Gateway_request_info - dane na teamt odpowidzi otrzymane z metody cURL curl_getinfo(), curl_errno(), oraz curl_error(),
									</li>
									<li>
										Gateway_request_result - dane otrzymane w rezultacie zapytania HTTP
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
						Niniejsza brama zapytań HTTP ma charakter edukacyjny i badawczy, oraz została stworzona wyłącznie w celach dydaktycznych. Autorzy nie ponoszą odpowiedzialności za sposób wykorzystania narzędzia przez użytkowników ani za skutki działań podejmowanych z jego użyciem. Pełna odpowiedzialność za konfigurację zapytań oraz ich rezultaty spoczywa na użytkowniku. Portal nie posiada predefiniowanych ustawień, nie narzuca sposobu działania bramy, które mogłyby zostać uznane za szkodliwe, nie gromadzi danych użytkowników, ani nie kontroluje ustawień. Wszystkie parametry zapytań są konfigurowane samodzielnie przez użytkownika. Autorzy nie zachęcają do jakiegokolwiek nielegalnego lub nieetycznego wykorzystania narzędzia. Wszelkie uwagi należy zgłaszać pod dane kontaktowe umieszczone w nagłówkach HTTP.
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="StopkaDiv" >
						© 2026 Dariusz Bodzęta, Michał Pudzianowski — strona wykonana na zaliczenie przedmiotu <span class="PrzedmiotSpan">Wstęp do Programowania Obiektowego</span>. Prowadzący: mgr Artur Karwatka.
					</div>
				</td>
			</tr>
		</table>
	</body>
</html>';
?>
