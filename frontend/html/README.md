# Kody HTML podstron
Kody HTML oraz JavaScript podstron, działające po stronie klienta i odpowiadające ze graficzną interakcję z użytkownikiem

Są trzy pliki HTML odpowiadające trzem wizualizacjom zadań w przeglądarce klienta.
Są one ściągane przez skrypt JS w celu pokazania podstrony, lub tak jak jest to w przypadku głównej strony, otwierają się bezpośrenio poprzez żądanie otwarcia adresu URL przez przeglądarkę.
Uprzednio strony te przechodzą przez kod PHP pośredniczący w komunikacji i zarządzający prawami dostępu i danymi wysyłanymi do użytkownika

* main_www.php - plik z kodem HTML strony głównej w zmiennej PHP
* DOM_data_view_window.html - kod podstrony ściągany przez JS do przeglądarki klienta
* json_request_window.html - kod podstrony ściągany przez JS do przeglądarki klienta
