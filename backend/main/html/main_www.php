<?php
$main_www =
'<!DOCTYPE html>
<html lang="pl">
	<head>
		<title>Usługa do odczytu danych - HTTP API Gateway</title>
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="subject" content="MANS - Semestr 1 - Wstęp do Programowania Obiektowego">
		<meta name="topic" content="Projekt 1">
		<meta name="author" content="Dariusz Bodzęta, Michał Pudzianowski, darek334@gazeta.pl">
		<meta name="category" content="studia, study">
		<meta name="description" content="Strona dzięki której można odczytać dane poprzez API za pomocą przeglądarki internetowej">

		<link rel="icon" type="image/png" href="image/mans_logo.png" >
		
		<link rel="stylesheet" href="css/css.css">
		
		<script src="js/DOM.js" ></script>
	</head>
	<body>
		<table class="main" >
			<tr>
				<th >
					<div class="HeadDiv" >
						<a href="https://mans.org.pl" target="_blank"><img class="mans-logo" src="image/mans_logo.png"></a>
						<div>
							Wstęp do Programowania Obiektowego
							<br>
							<br>
							Dariusz Bodzęta, Michał Pudzianowski
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
					DOM.setOptionType(RowId, DOM.Data );
					DOM.htmlAddRow(\'InputsBoxId\', RowId, DOM.Data );
				</script>
			</tr>
			<tr>
				<td id="CheckButtonsTdId" >
					<div class="div1" >
						<span>Akcje: </span><button type="button" title="Dodaj kolejny wiersz" onclick = "const RowId = DOM.makeRandomString();
					DOM.setOptionType(RowId, DOM.Data );DOM.htmlAddRow(\'InputsBoxId\', RowId, DOM.Data )">Dodaj Wiersz</button>
						<button type="button" title="Pokaż dane" onclick = "DOM.htmlJSONWindow(\'html/data_window.html\', DOM.Data, \'Dane\' )">Pokaż Dane</button>
						<button type="button" title="Otwórz nowe okno z danymi gotowymi do wykonania zadania" onclick = "DOM.htmlJSONWindow(\'html/request_window.html\', DOM.prepareDOMData(DOM.Data ), \'Dane Sformatowane\' )">Przygotuj Dane</button>
					</div>
				</td>
			</tr>
		</table>
	</body>
</html>';
?>
