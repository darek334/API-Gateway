class DOM{
	
	static UrlBase = {
		
		JSON: 'https://simplefilter.eu/mans/semestr_3/karwatka/projekt_1/read_json_fetch/',
		MySQL: 'https://simplefilter.eu/mans/semestr_3/karwatka/projekt_1/read_mysql/'
	};

	//Główny obiekt zawierający dane wprowadzone przez użytkownika
	static Data = {
		
		Url: undefined,
		DataType: undefined,
		DataMethod: undefined,
		Body: {}
	};
	
	static ReadTypes = {
		
		Default : 'JSON',
		List : ['JSON', 'MySQL' ]
	};
	
	static ReadMethods = {
		
		Default : 'GET',
		List : ['GET', 'POST' ]
	};
	
	static OptionTypes = {
		
		Default : 'GET',
		List : ['GET', 'CURL_OPTION', 'CURLOPT_HTTPHEADER', 'CURLOPT_POSTFIELDS', 'CURLOPT_COOKIE' ],
			
		GET : {
			
			List : ['GET', 'Name', 'Value' ],
			HtmlElementList : ['GET', 'Name', 'Value' ],
			GET : {
				
				Element : 'select',
				Name : 'GET',
				Label : 'Typ:',
				Classes : 'OptionTypeName',
				Title : 'Wybierz typ opcji',
				DefaultDOM : 'GET',
				DefaultSite : 'GET',
				ValueType : 'string',
				Options : {
					
					List : ['GET', 'CURL_OPTION', 'CURLOPT_HTTPHEADER', 'CURLOPT_POSTFIELDS', 'CURLOPT_COOKIE' ],
					Default : 'GET',
					GET : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'GET',
						Value : 'GET',
						ValueType : 'string',
						TextContent : 'GET'
					},
					CURL_OPTION : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURL_OPTION',
						Value : 'CURL_OPTION',
						ValueType : 'string',
						TextContent : 'CURL_OPTION'
					},
					CURLOPT_HTTPHEADER : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_HTTPHEADER',
						Value : 'CURLOPT_HTTPHEADER',
						ValueType : 'string',
						TextContent : 'CURLOPT_HTTPHEADER'
					},
					CURLOPT_POSTFIELDS : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_POSTFIELDS',
						Value : 'CURLOPT_POSTFIELDS',
						ValueType : 'string',
						TextContent : 'CURLOPT_POSTFIELDS'
					},
					CURLOPT_COOKIE : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_COOKIE',
						Value : 'CURLOPT_COOKIE',
						ValueType : 'string',
						TextContent : 'CURLOPT_COOKIE'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(Data.Body[RowId ].isExceptionalEmpty(['OptionType', Data.Body[RowId ].OptionType ] ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else{
							
							//przywraca starą wartość
							Element.value = Data.Body[RowId ].OptionType;
						}
					}
				}
			},
			Name : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Name',
				Label : 'Nazwa:',
				Size : 20,
				Required : true,
				Classes : 'NameOption',
				Title : 'Nazwa zmiennej GET',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setName(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Value : {
				
				Element : 'textarea',
				Rows : '1',
				Name : 'Value',
				Label : 'Wartość:',
				Required : true,
				Classes : 'ValueOption',
				Title : 'Wartość zmiennej GET',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setValue(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			}
		},
		
		CURL_OPTION : {
			
			List : ['CURL_OPTION', 'Name', 'Value' ],
			HtmlElementList : ['CURL_OPTION', 'Name', 'Value' ],
			CURL_OPTION : {
				
				Element : 'select',
				Name : 'CURL_OPTION',
				Label : 'Typ:',
				Classes : 'OptionTypeName',
				Title : 'Wybierz typ opcji',
				DefaultDOM : 'CURL_OPTION',
				DefaultSite : 'CURL_OPTION',
				ValueType : 'string',
				Options : {
					
					List : ['GET', 'CURL_OPTION', 'CURLOPT_HTTPHEADER', 'CURLOPT_POSTFIELDS', 'CURLOPT_COOKIE' ],
					Default : 'CURL_OPTION',
					GET : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'GET',
						Value : 'GET',
						ValueType : 'string',
						TextContent : 'GET'
					},
					CURL_OPTION : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURL_OPTION',
						Value : 'CURL_OPTION',
						ValueType : 'string',
						TextContent : 'CURL_OPTION'
					},
					CURLOPT_HTTPHEADER : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_HTTPHEADER',
						Value : 'CURLOPT_HTTPHEADER',
						ValueType : 'string',
						TextContent : 'CURLOPT_HTTPHEADER'
					},
					CURLOPT_POSTFIELDS : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_POSTFIELDS',
						Value : 'CURLOPT_POSTFIELDS',
						ValueType : 'string',
						TextContent : 'CURLOPT_POSTFIELDS'
					},
					CURLOPT_COOKIE : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_COOKIE',
						Value : 'CURLOPT_COOKIE',
						ValueType : 'string',
						TextContent : 'CURLOPT_COOKIE'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(Data.Body[RowId ].isExceptionalEmpty(['OptionType', Data.Body[RowId ].OptionType ] ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else{
							
							//przywraca starą wartość
							Element.value = Data.Body[RowId ].OptionType;
						}
					}
				}
			},
			Name : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Name',
				Label : 'Nazwa:',
				Size : 20,
				Required : true,
				Classes : 'NameOption',
				Title : 'Nazwa opcji cURL',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){
						
						if(DOM.RegExpForbiddenCURLNames.test(Element.value ) ){
							
							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
							DOM.asyncAlert('Nazwa nie może być:\n'+DOM.OptionTypes.CURL_OPTION.Name.ForbiddenNames.List.join('\n') );
						}
						else if(DOM.setName(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{
					
							Element.value = '';
						}
					}
				},
				ForbiddenNames : {
					
					List : [
						
						'CURLOPT_URL',
						'CURLOPT_POST',
						'CURLOPT_HTTPHEADER',
						'CURLOPT_POSTFIELDS',
						'CURLOPT_COOKIE'
					]
				}
			},
			Value : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Value',
				Label : 'Wartość:',
				Size : 20,
				Required : true,
				Classes : 'ValueOption',
				Title : 'Wartość opcji cURL',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setValue(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			}
		},
	
		CURLOPT_HTTPHEADER : {
			
			List : ['CURLOPT_HTTPHEADER', 'Name', 'Value' ],
			HtmlElementList : ['CURLOPT_HTTPHEADER', 'Name', 'Value' ],
			CURLOPT_HTTPHEADER : {
				
				Element : 'select',
				Name : 'CURLOPT_HTTPHEADER',
				Label : 'Typ:',
				Classes : 'OptionTypeName',
				Title : 'Wybierz typ opcji',
				DefaultDOM : 'CURLOPT_HTTPHEADER',
				DefaultSite : 'CURLOPT_HTTPHEADER',
				ValueType : 'string',
				Options : {
					
					List : ['GET', 'CURL_OPTION', 'CURLOPT_HTTPHEADER', 'CURLOPT_POSTFIELDS', 'CURLOPT_COOKIE' ],
					Default : 'CURLOPT_HTTPHEADER',
					GET : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'GET',
						Value : 'GET',
						ValueType : 'string',
						TextContent : 'GET'
					},
					CURL_OPTION : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURL_OPTION',
						Value : 'CURL_OPTION',
						ValueType : 'string',
						TextContent : 'CURL_OPTION'
					},
					CURLOPT_HTTPHEADER : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_HTTPHEADER',
						Value : 'CURLOPT_HTTPHEADER',
						ValueType : 'string',
						TextContent : 'CURLOPT_HTTPHEADER'
					},
					CURLOPT_POSTFIELDS : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_POSTFIELDS',
						Value : 'CURLOPT_POSTFIELDS',
						ValueType : 'string',
						TextContent : 'CURLOPT_POSTFIELDS'
					},
					CURLOPT_COOKIE : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_COOKIE',
						Value : 'CURLOPT_COOKIE',
						ValueType : 'string',
						TextContent : 'CURLOPT_COOKIE'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(Data.Body[RowId ].isExceptionalEmpty(['OptionType', Data.Body[RowId ].OptionType ] ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else{
							
							//przywraca starą wartość
							Element.value = Data.Body[RowId ].OptionType;
						}
					}
				}
			},
			Name : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Name',
				Label : 'Nazwa:',
				Size : 20,
				Required : true,
				Classes : 'NameOption',
				Title : 'Nazwa klucza w tablicy opcji cURL - CURLOPT_HTTPHEADER',
				DefaultDOM : undefined,
				DefaultSite : '',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setName(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Value : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Value',
				Label : 'Wartość:',
				Size : 20,
				Required : true,
				Classes : 'ValueOption',
				Title : 'Wartość klucza w tablicy opcji cURL - CURLOPT_HTTPHEADER',
				DefaultDOM : undefined,
				DefaultSite : '',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setValue(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			}
		},
		
		CURLOPT_POSTFIELDS : {
			
			List : ['CURLOPT_POSTFIELDS', 'Name', 'Value' ],
			HtmlElementList : ['CURLOPT_POSTFIELDS', 'Name', 'Value' ],
			CURLOPT_POSTFIELDS : {
				
				Element : 'select',
				Name : 'CURLOPT_POSTFIELDS',
				Label : 'Typ:',
				Classes : 'OptionTypeName',
				Title : 'Wybierz typ opcji',
				DefaultDOM : 'CURLOPT_POSTFIELDS',
				DefaultSite : 'CURLOPT_POSTFIELDS',
				ValueType : 'string',
				Options : {
					
					List : ['GET', 'CURL_OPTION', 'CURLOPT_HTTPHEADER', 'CURLOPT_POSTFIELDS', 'CURLOPT_COOKIE' ],
					Default : 'CURLOPT_POSTFIELDS',
					GET : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'GET',
						Value : 'GET',
						ValueType : 'string',
						TextContent : 'GET'
					},
					CURL_OPTION : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURL_OPTION',
						Value : 'CURL_OPTION',
						ValueType : 'string',
						TextContent : 'CURL_OPTION'
					},
					CURLOPT_HTTPHEADER : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_HTTPHEADER',
						Value : 'CURLOPT_HTTPHEADER',
						ValueType : 'string',
						TextContent : 'CURLOPT_HTTPHEADER'
					},
					CURLOPT_POSTFIELDS : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_POSTFIELDS',
						Value : 'CURLOPT_POSTFIELDS',
						ValueType : 'string',
						TextContent : 'CURLOPT_POSTFIELDS'
					},
					CURLOPT_COOKIE : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_COOKIE',
						Value : 'CURLOPT_COOKIE',
						ValueType : 'string',
						TextContent : 'CURLOPT_COOKIE'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(Data.Body[RowId ].isExceptionalEmpty(['OptionType', Data.Body[RowId ].OptionType ] ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else{
							
							//przywraca starą wartość
							Element.value = Data.Body[RowId ].OptionType;
						}
					}
				}
			},
			Name : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Name',
				Label : 'Nazwa:',
				Size : 20,
				Required : true,
				Classes : 'NameOption',
				Title : 'Nazwa klucza w tablicy BODY - CURLOPT_POSTFIELDS. Format wysłania BODY zależy od wartości klucza Content-Type w CURLOPT_HTTPHEADER',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setName(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Value : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Value',
				Label : 'Wartość:',
				Size : 20,
				Required : true,
				Classes : 'ValueOption',
				Title : 'Wartość klucza w tablicy BODY - CURLOPT_POSTFIELDS',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setValue(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			}
		},
		
		CURLOPT_COOKIE : {
			
			List : ['CURLOPT_COOKIE', 'Name', 'Value', 'Path', 'Expires', 'Domain', 'Secure', 'Httponly', 'Samesite' ],
			HtmlElementList : ['CURLOPT_COOKIE', 'Name', 'Value', 'Br', 'Path', 'Expires', 'Domain', 'Br', 'Secure', 'Httponly', 'Samesite' ],
			CURLOPT_COOKIE : {
				
				Element : 'select',
				Name : 'CURLOPT_COOKIE',
				Label : 'Typ:',
				Classes : 'OptionTypeName',
				Title : 'Wybierz typ opcji',
				DefaultDOM : 'CURLOPT_COOKIE',
				DefaultSite : 'CURLOPT_COOKIE',
				ValueType : 'string',
				Options : {
					
					List : ['GET', 'CURL_OPTION', 'CURLOPT_HTTPHEADER', 'CURLOPT_POSTFIELDS', 'CURLOPT_COOKIE' ],
					Default : 'CURLOPT_COOKIE',
					GET : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'GET',
						Value : 'GET',
						ValueType : 'string',
						TextContent : 'GET'
					},
					CURL_OPTION : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURL_OPTION',
						Value : 'CURL_OPTION',
						ValueType : 'string',
						TextContent : 'CURL_OPTION'
					},
					CURLOPT_HTTPHEADER : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_HTTPHEADER',
						Value : 'CURLOPT_HTTPHEADER',
						ValueType : 'string',
						TextContent : 'CURLOPT_HTTPHEADER'
					},
					CURLOPT_POSTFIELDS : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_POSTFIELDS',
						Value : 'CURLOPT_POSTFIELDS',
						ValueType : 'string',
						TextContent : 'CURLOPT_POSTFIELDS'
					},
					CURLOPT_COOKIE : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'CURLOPT_COOKIE',
						Value : 'CURLOPT_COOKIE',
						ValueType : 'string',
						TextContent : 'CURLOPT_COOKIE'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(Data.Body[RowId ].isExceptionalEmpty(['OptionType', Data.Body[RowId ].OptionType ] ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
							
							DOM.setOptionType(RowId, Data, Element.value );
							DOM.htmlChangeRow(RowId, Data, Element.value );
						}
						else{
							
							//przywraca starą wartość
							Element.value = Data.Body[RowId ].OptionType;
						}
					}
				}
			},
			Name : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Name',
				Label : 'Nazwa:',
				Size : 20,
				Required : true,
				Classes : 'NameOption',
				Title : 'Unikalna nazwa ciasteczka. Bez spacji i znaków specjalnych.',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setName(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Value : {
				
				Element : 'textarea',
				Rows : '1',
				Name : 'Value',
				Label : 'Wartość:',
				Required : true,
				Classes : 'ValueOption',
				Title : 'Dane przekazywane w ciasteczku',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setValue(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Path : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Path',
				Label : 'Path:',
				Size : 20,
				Required : true,
				Classes : 'PathOption',
				Title : 'Określa zasięg wysyłanego ciasteczka przez klienta do folderów źródła - hosta. / oznacza całą domenę. Brak wartości ustawia ścieżkę tylko dla folderów źródłowych z których nastąpiło ustawienie ciasteczka - opcja została zablokowana w celach lepszej kontroli - jest też niezalecana',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setCookiePath(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Expires : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Expires',
				Label : 'Expires:',
				Size : 20,
				Required : true,
				Classes : 'ExpiresOption',
				Title : 'Data i czas wygaśnięcia ciasteczka podana w sekundach. Zero oznacza ciasteczko sesyjne – usuwane po zamknięciu przeglądarki, minusowa wartość usuwa ciasteczko z przeglądarki',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element){

						if(DOM.setCookieExpires(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Domain : {
				
				Element : 'input',
				Type : 'text',
				Name : 'Domain',
				Label : 'Domain:',
				Size : 20,
				Required : true,
				Classes : 'DomainOption',
				Title : 'Określa domenę, dla której ciasteczko jest dostępne. Brak domeny = tylko aktualny host. example.com udostępnia ciasteczko wszystkim subdomenom. Nie ustawiaj domeny z katalogami - to jest błąd - przeglądarki odrzucają takie ustawienia źródła( hosta )',
				DefaultDOM : undefined,
				DefaultSite : '',
				ValueType : 'string',
				Actions : {
					
					List : ['blur' ],
					blur : function(RowId, Data, Element ){

						if(DOM.setCookieDomain(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = '';
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Secure : {
				
				Element : 'select',
				Name : 'Secure',
				Label : 'Secure:',
				Classes : 'SecureOption',
				Title : 'Gdy włączone, ciasteczko jest wysyłane tylko przez HTTPS. Wymagane dla SameSite=None',
				DefaultDOM : false,
				DefaultSite : 'False',
				ValueType : 'boolean',
				Options : {
					
					List : ['True', 'False' ],
					Default : 'False',
					True : {

						List : ['Name', 'Value', 'TextContent' ],
						Name : 'True',
						Value : 'True',
						ValueType : 'boolean',
						TextContent : 'True'
					},
					False : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'False',
						Value : 'False',
						ValueType : 'boolean',
						TextContent : 'False'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(DOM.setCookieSecure(RowId, Data, Element.value === 'True'?true:false ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = Data.Body[RowId ].Secure;
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Httponly : {
				
				Element : 'select',
				Name : 'Httponly',
				Label : 'Httponly:',
				Classes : 'HttponlyOption',
				Title : 'Gdy włączone, ciasteczko nie jest dostępne w JavaScript. Chroni przed atakami XSS. Zalecane włączenie dla ciasteczek sesyjnych',
				DefaultDOM : true,
				DefaultSite : 'True',
				ValueType : 'boolean',
				Options : {
					
					List : ['True', 'False' ],
					Default : 'True',
					True : {

						List : ['Name', 'Value', 'TextContent' ],
						Name : 'True',
						Value : 'True',
						ValueType : 'boolean',
						TextContent : 'True'
					},
					False : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'False',
						Value : 'False',
						ValueType : 'boolean',
						TextContent : 'False'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(DOM.setCookieHttponly(RowId, Data, Element.value === 'True'?true:false ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = Data.Body[RowId ].Httponly;
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Samesite : {
				
				Element : 'select',
				Name : 'Samesite',
				Label : 'Samesite:',
				Classes : 'SamesiteOption',
				Title : 'Wskazuje przeglądarce (klientowi), czy ciasteczko jest wysyłane w kontekście cross-site. Strict – wysyłane tylko przy nawigacji domena pochodzenia → domena pochodzenia. Lax – wysyłane przy nawigacji obca domena → domena pochodzenia (GET, top-level). None – wysyłane w kontekście obca domena → domena pochodzenia we wszystkich typach zapytań, w tym JavaScript (fetch, XHR, iframe). Wymaga Secure=true czyli wymagany jest protokoł HTTPS',
				DefaultDOM : 'Lax',
				DefaultSite : 'Lax',
				ValueType : 'string',
				Options : {
					
					List : ['None', 'Lax', 'Strict' ],
					Default : 'Lax',
					None : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'None',
						Value : 'None',
						ValueType : 'string',
						TextContent : 'None'
					},
					Lax : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'Lax',
						Value : 'Lax',
						ValueType : 'string',
						TextContent : 'Lax'
					},
					Strict : {
						
						List : ['Name', 'Value', 'TextContent' ],
						Name : 'Strict',
						Value : 'Strict',
						ValueType : 'string',
						TextContent : 'Strict'
					}
				},
				Actions : {
					
					List : ['change' ],
					Default : 'change',
					change : function(RowId, Data, Element ){

						if(DOM.setCookieSamesite(RowId, Data, Element.value ) ){

							Element.style.borderColor = 'rgb(0 255 0 )';
						}
						else{

							Element.value = Data.Body[RowId ].Samesite;
							Element.style.borderColor = 'rgb(255 0 0 )';
						}
					}
				}
			},
			Br : {
				
				Element : 'br',
				Classes : 'BrOption',
				DefaultDOM : undefined,
				DefaultSite : undefined,
				ValueType : undefined
			}
		}
	};

	
	static RegExpUrl = /^https?:\/\/\S+\.\S+$/i;
	static RegExpStartsWithDigit = /^\d/;
	static RegExpCookieExpires = /^\d+$/;
	static RegExpCookiePath = /^\/\w*/;
	static RegExpForbiddenCURLNames = new RegExp('^('+DOM.OptionTypes.CURL_OPTION.Name.ForbiddenNames.List.join('|')+ ')$', 'i' );
	
	static asyncAlert(TEXT, ALERT = true, RETURN = true ){
		
		return new Promise( (resolve, reject) => {
			
			if(TEXT && typeof TEXT == 'string' ){
				resolve(TEXT );
			}
			else{
				reject('Bad parameter' );
			}
		} ).then(valid_text => {
			
			return ALERT?(alert(valid_text ), RETURN ):confirm(valid_text );
			
		} ).catch(error => {
			
			throw error;
		} );
	}
	
	static makeRandomString(Length = 16 ){
		
		let String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		
		let EmptyArray = new Uint32Array(Length );
		
		crypto.getRandomValues(EmptyArray );

		return Array.from(EmptyArray, element => String[element % String.length ] ).join('' );
	}

	static checkReadDataTypeSelected(Data ){
		
		return Data.DataType;
	}
	
	static prepareDOMData(Data ){

		if(Data.Url && Data.DataType && Data.DataMethod ){
			
			const PreparedData = {
		
				Url: Data.Url,
				DataType: Data.DataType,
				DataMethod: Data.DataMethod,
				Body: {}
			};
			
			if(Object.keys(Data.Body ).length > 0 ){

				for( const RowId in Data.Body ){
					
					if(Data.Body[RowId ].isFullyInitialized() ){
						
						for( const RowKey in Data.Body[RowId ] ){
							
							if(Object.hasOwn(PreparedData.Body, Data.Body[RowId ].OptionType  ) ){

								if(Object.hasOwn(PreparedData.Body[Data.Body[RowId ].OptionType ], Data.Body[RowId ].Name ) ){
									
									if(RowKey !== 'Name' && RowKey !== 'OptionType' && RowKey !== Data.Body[RowId ].OptionType ){
										
										PreparedData.Body[Data.Body[RowId ].OptionType ][Data.Body[RowId ].Name ][RowKey ] = Data.Body[RowId ][RowKey ];
									}
								}
								else{
									
									PreparedData.Body[Data.Body[RowId ].OptionType ][Data.Body[RowId ].Name ] = {};
								}
							}
							else{
								
								PreparedData.Body[Data.Body[RowId ].OptionType ] = {};
							}
						}
					}
				}
			}

			if(!Object.keys(PreparedData.Body ).length > 0 ){
				
				delete PreparedData.Body;
			}
			
			return PreparedData;
		}
		else{
			
			alert('Brak niezbędnych danych, aby wykonać aby przygotować zapytanie !\nUrl: '+Data.Url+', DataType: '+Data.DataType+', DataMethod: '+Data.DataMethod );
			throw new Error('Brak niezbędnych danych, aby wykonać aby przygotować zapytanie !\nUrl: '+Data.Url+', DataType: '+Data.DataType+', DataMethod: '+Data.DataMethod );
		}
	}
	
	static prepareRequest(Data ){
		
		return DOM.prepareDOMData(Data );
	}
	
	
	static setReadDataType(Data, Value ){
		
		Data.DataType = Value;
	}
	
	static setReadDataMethod(Data, Value ){
		
		Data.DataMethod = Value;
	}
	
	static setUrl(Data, Url ){
		
		if(typeof Url === 'string' ){
			
			Url = Url.trim();
			
			if(DOM.RegExpUrl.test(Url ) ){
				
				Data.Url = Url;
				return true;
			}
		}
		
		Data.Url = undefined;
		return false;
	}



	static makeRow(RowId, Data, OptionType ){
		
		if(typeof RowId === 'string' && typeof OptionType === 'string' && DOM.OptionTypes.List.includes(OptionType ) ){
			
			delete Data.Body[RowId ];
			
			Data.Body[RowId ] = {};
			
			DOM.OptionTypes[OptionType ].List.forEach((element, index ) => {
				
				Data.Body[RowId ][element ] = DOM.OptionTypes[OptionType ][element ].DefaultDOM;
			} );
			
			Data.Body[RowId ].isFullyInitialized = function(){

				for(const key in this ){
					
					if(Object.hasOwn(this, key ) && typeof this[key ] !== 'function' ){

						if(this[key] === undefined ){

							return false;
						}
					}
				}
				
				return true;
			};
				
			Data.Body[RowId ].isEmpty = function(){

				for(const key in this ){
					
					if(Object.hasOwn(this, key ) && typeof this[key ] !== 'function' ){

						if(this[key] !== undefined ){

							return false;
						}
					}
				}
				
				return true;
			};
			
			Data.Body[RowId ].isExceptionalEmpty = function(Exception ){
				
				if(!Array.isArray(Exception ) ){
					
					Exception = [Exception ];
				}
				
				for(const key in this ){
					
					if(Object.hasOwn(this, key ) && typeof this[key ] !== 'function' ){

						if(this[key] !== undefined ){

							if(!Exception.includes(key ) ){
								
								return false;
							}
						}
					}
				}
				
				return true;
			};
		}
		else{
			
			throw new Error('Niudane utworzenie wiersza ! RowId: '+RowId+', OptionType: '+OptionType+', Includes: '+DOM.OptionTypes.List.includes(OptionType ) );
		}
	}
	
	static removeRow(RowId, Data ){
		
		if(typeof RowId === 'string' ){
			
			delete Data.Body[RowId ];
		}
		else{
			
			throw new Error('Niudane usunięcie wiersza ! RowId: '+RowId );
		}
	}
	
	
	static setOptionType(RowId, Data, OptionType = DOM.OptionTypes.Default ){
		
		DOM.makeRow(RowId, Data, OptionType );
		Data.Body[RowId ].OptionType = OptionType;
	}

	static setName(RowId, Data, Name ){
		
		if(typeof Name === 'string' ){
			
			Name = Name.trim();
				
			if(!Name ){
				
				alert('Nazwa nie może być pusta !' );
			}
			else if(DOM.RegExpStartsWithDigit.test(Name ) ){
				
				alert('Nazwa nie może zaczyanć się od cyfr !' );
			}
			else{
				
				Data.Body[RowId ].Name = Name;
				return true;
			}
		}
		
		Data.Body[RowId ].Name = undefined;
		return false;
	}
	
	static setValue(RowId, Data, Value ){
		
		Data.Body[RowId ].Value = Value;

		return true;
	}
	
	static setHtmlElementValue(ElementId, String ){
		
		const Element = document.getElementById(ElementId );
		
		if(Element ){
			
			if(typeof String === 'string' ){
				
				Element.value = String;
			}
			else{
				
				throw new Error('Nie można ustawić wartości elementu, gdyż zmienna nie jest typu string !' );
			}
		}
		else{
				
			throw new Error('Nie znaleziono elementu od podanym Id !\nWartość Id: '+ElementId );
		}
	}
	
	static setCookiePath(RowId, Data, Path ){
		
		if(typeof Path === 'string' ){
			
			Path = Path.trim();
				
			if(!Path ){
				
				alert('Ścieżka nie może być pusta !' );
			}
			else if(!DOM.RegExpCookiePath.test(Path ) ){
				
				alert('ścieżka musi zaczynać się od / -slash !' );
			}
			else{
				
				Data.Body[RowId ].Path = Path;
				return true;
			}
		}
		
		Data.Body[RowId ].Path = undefined;
		return false;
	}
	
	static setCookieExpires(RowId, Data, Expires ){

		if(typeof Expires === 'string' ){
		
			Expires = Expires.trim();
				
			if(DOM.RegExpCookieExpires.test(Expires ) ){
				
				Data.Body[RowId ].Expires = Expires;
				return true;
			}
			else{
				
				alert('Wartość musi być liczbą >= 0 oznaczającą sekundy !' );
			}
		}
		
		Data.Body[RowId ].Expires = undefined;
		return false;
	}
	
	static setCookieDomain(RowId, Data, Domain ){
		
		if(typeof Domain === 'string' ){
			
			Domain = Domain.trim();

			Data.Body[RowId ].Domain = Domain;
			return true;
		}
		
		Data.Body[RowId ].Domain = undefined;
		return false;
	}
	
	static setCookieSecure(RowId, Data, Secure ){
		
		if(typeof Secure === 'boolean' ){

			Data.Body[RowId ].Secure = Secure;
			return true;
		}
		else{
			
			alert('Wartość musi być typu boolean !' );
		}

		Data.Body[RowId ].Secure = undefined;
		return false;
	}
	
	static setCookieHttponly(RowId, Data, Httponly ){
		
		if(typeof Httponly === 'boolean' ){

			Data.Body[RowId ].Httponly = Httponly;
			return true;
		}
		else{
			
			alert('Wartość musi być typu boolean !' );
		}

		Data.Body[RowId ].Httponly = undefined;
		return false;
	}
	
	static setCookieSamesite(RowId, Data, Samesite ){

		if(typeof Samesite === 'string' ){
			
			Samesite = Samesite.trim();
				
			if(!Samesite ){
				
				alert('Wartość nie może być pusta !' );
			}
			else{
				
				Data.Body[RowId ].Samesite = Samesite;
				return true;
			}
		}
		
		Data.Body[RowId ].Samesite = undefined;
		return false;
	}
	
	
	
	static htmlSettingInputs(SettingsBoxId, Data ){
		
		let SettingsBox = document.getElementById(SettingsBoxId );
		
		if(SettingsBox ){

			let div = document.createElement('div' );
			div.classList.add('div-1' );
			
			let input = document.createElement('label' );
			input.textContent = 'Typ Danych: ';
			input.htmlFor = 'ReadDataTypesInput';
			div.appendChild(input );
			
			input = document.createElement('select' );
			input.id = 'ReadDataTypesInput';
			input.title = 'Typ danych do odczytu';
			
			let option;
			
			DOM.ReadTypes.List.forEach((element, index ) => {
				
				option = document.createElement('option' );
				option.value = element;
				option.textContent = element;
				if(!index ){
					
					option.selected = true;
					Data.DataType = element;
				}
				input.appendChild(option );
			} );
			input.addEventListener('change', function(){

				DOM.setReadDataType(Data, this.value );
			} );
			div.appendChild(input );
			
			input = document.createElement('label' );
			input.textContent = 'Metoda: ';
			input.htmlFor = 'ReadMethodsInput';
			div.appendChild(input );
			
			input = document.createElement('select' );
			input.id = 'ReadMethodsInput';
			input.title = 'Metoda odczytu. Metoda GET będzie zignorowana w przypadku konfiguracji typu opcji CURLOPT_POSTFIELDS';

			DOM.ReadMethods.List.forEach((element, index ) => {
				
				option = document.createElement('option' );
				option.value = element;
				option.textContent = element;
				if(!index ){
					
					option.selected = true;
					Data.DataMethod = element;
				}
				input.appendChild(option );
			} );
			input.addEventListener('change', function(){

				DOM.setReadDataMethod(Data, this.value );
			} );
			div.appendChild(input );

			SettingsBox.appendChild(div );
		}
		else{
			
			DOM.asyncAlert('Nie znaleziono SettingsBoxId !\nWartość: '+SettingsBoxId );
			throw new Error('Nie znaleziono SettingsBoxId !\nWartość: '+SettingsBoxId );
		}
	}
	
	static htmlUrlInput(InputsBoxId, Data ){
		
		let InputsBox = document.getElementById(InputsBoxId );
		
		if(InputsBox ){

			const textarea = document.createElement('textarea' );
			textarea.id = 'Url';
			textarea.name = 'Url';
			textarea.rows = 2;
			textarea.cols = 60;
			textarea.required = true;
			textarea.classList.add('url' );
			textarea.title = 'Wprowadź prawidłowy adres URL, do odczytu danych';
			textarea.addEventListener('blur', function(){

				if(DOM.setUrl(Data, this.value ) ){

					this.style.borderColor = 'rgb(0 255 0 )';
				}
				else{
					
					this.value = '';
					this.style.borderColor = 'rgb(255 0 0 )';
					DOM.asyncAlert('Wpisz prawidłowy adres HTTP, np. https://example.com !' );
				}
			} );
			
			const label = document.createElement('label' );
			label.classList.add('UrlLabel' );
			label.textContent = 'Adres URL: ';
			
			label.append(textarea );
			
			const OptionsDiv = document.createElement('div' );
			OptionsDiv.classList.add('OptionsDiv' );
			OptionsDiv.append(label );
			
			const RowDiv = document.createElement('div' );
			RowDiv.id = 'UrlDivId';
			RowDiv.classList.add('RowDiv' );
			RowDiv.append(OptionsDiv );
			
			InputsBox.appendChild(RowDiv );
		}
		else{
			
			throw new Error('Nie znaleziono InputsBoxId !\nWartość: '+InputsBoxId );
		}
	}
	
	/*tworzy wiersz opcji w dokumencie oraz w drzewie DOM*/
	static htmlAddRow(BoxId, RowId, Data, OptionType = 'GET' ){
		
		OptionType = OptionType??DOM.OptionTypes.Default;
		
		const TdBox = document.getElementById(BoxId );
		
		if(TdBox ){

			const OptionsDiv = document.createElement('div' );
			OptionsDiv.classList.add('OptionsDiv' );

			DOM.OptionTypes[OptionType ].HtmlElementList.forEach((OptionName, index ) => {

				if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'input' ){

					const input = document.createElement('input' );
					input.type = DOM.OptionTypes[OptionType ][OptionName ].Type;
					input.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					input.size = DOM.OptionTypes[OptionType ][OptionName ].Size;
					input.required = DOM.OptionTypes[OptionType ][OptionName ].Required;
					input.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					input.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						input.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					const label = document.createElement('label' );
					label.textContent = DOM.OptionTypes[OptionType ][OptionName ].Label;
					label.classList.add('OptionLabel' );
					label.appendChild(input );
					
					OptionsDiv.appendChild(label );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'select' ){

					const select = document.createElement('select' );
					select.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					select.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					select.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Options.List.forEach((element, index ) => {
				
						const option = document.createElement('option' );
						option.name = DOM.OptionTypes[OptionType ][OptionName ].Options[element ].Name;
						option.value = DOM.OptionTypes[OptionType ][OptionName ].Options[element ].Value;
						option.textContent = DOM.OptionTypes[OptionType ][OptionName ].Options[element ].TextContent;

						select.appendChild(option );
					} );

					select.value = DOM.OptionTypes[OptionType ][OptionName ].Options.Default;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						select.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					const label = document.createElement('label' );
					label.textContent = DOM.OptionTypes[OptionType ][OptionName ].Label;
					label.classList.add('OptionLabel' );
					label.appendChild(select );
					
					OptionsDiv.appendChild(label );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'textarea' ){
					
					const textarea = document.createElement('textarea' );
					textarea.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					textarea.rows = DOM.OptionTypes[OptionType ][OptionName ].Rows;
					textarea.cols = DOM.OptionTypes[OptionType ][OptionName ].Cols;
					textarea.required = DOM.OptionTypes[OptionType ][OptionName ].Required;
					textarea.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					textarea.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						textarea.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					const label = document.createElement('label' );
					label.textContent = DOM.OptionTypes[OptionType ][OptionName ].Label;
					label.classList.add('TextareaOptionLabel' );
					label.appendChild(textarea );
					
					OptionsDiv.appendChild(label );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'button' ){
					
					const button = document.createElement('button' );
					button.type = DOM.OptionTypes[OptionType ][OptionName ].Type;
					button.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					button.textContent = DOM.OptionTypes[OptionType ][OptionName ].TextContent;
					button.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					button.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						button.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					OptionsDiv.appendChild(button );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'div' ){
					
					const div = document.createElement('div' );
					div.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					div.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					div.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					if(Object.hasOwn(DOM.OptionTypes[OptionType ][OptionName ], 'Actions' ) ){
						
						DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
							
							div.addEventListener(ActionName, function(){
								
								DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
							} );
						} );
					}
					
					OptionsDiv.appendChild(div );
				}
				else{
					
					throw new Error('Brak dopasowania !\nWartość: '+DOM.OptionTypes[OptionType ][OptionName ].Element );
				}
			} );

			const button = document.createElement('button' );
			button.type = 'button';
			button.name = 'RemoveRow';
			button.textContent = 'Usuń';
			button.title = 'Usuń cały wiersz';
			button.addEventListener('click', function(){
				
				DOM.removeRow(RowId, Data );
				
				TdBox.removeChild(RowDiv );
			} );

			const RemoveDiv = document.createElement('div' );
			RemoveDiv.classList.add('RemoveDiv' );
			RemoveDiv.appendChild(button );

			const RowDiv = document.createElement('div' );
			RowDiv.id = RowId;
			RowDiv.classList.add('RowDiv' );
			
			RowDiv.append(OptionsDiv, RemoveDiv );

			TdBox.appendChild(RowDiv );
		}
		else{

			throw new Error('Nie znaleziono komórki tabeli o danym Id !\nWartość Id: '+BoxId );
		}
	}
	
	/*zmienia zawartość wiersza opcji oraz w drzewie dokumentu DOM*/
	static htmlChangeRow(RowId, Data, OptionType = 'GET' ){
		
		OptionType = OptionType??DOM.OptionTypes.Default;
		
		const RowDiv = document.getElementById(RowId );
		
		if(RowDiv ){

			const OptionsDiv = document.createElement('div' );
			OptionsDiv.classList.add('OptionsDiv' );

			DOM.OptionTypes[OptionType ].HtmlElementList.forEach((OptionName, index ) => {

				if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'input' ){

					const input = document.createElement('input' );
					input.type = DOM.OptionTypes[OptionType ][OptionName ].Type;
					input.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					input.size = DOM.OptionTypes[OptionType ][OptionName ].Size;
					input.required = DOM.OptionTypes[OptionType ][OptionName ].Required;
					input.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					input.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						input.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					const label = document.createElement('label' );
					label.textContent = DOM.OptionTypes[OptionType ][OptionName ].Label;
					label.classList.add('OptionLabel' );
					label.appendChild(input );
					
					OptionsDiv.appendChild(label );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'select' ){

					const select = document.createElement('select' );
					select.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					select.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					select.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Options.List.forEach((element, index ) => {
				
						const option = document.createElement('option' );
						option.name = DOM.OptionTypes[OptionType ][OptionName ].Options[element ].Name;
						option.value = DOM.OptionTypes[OptionType ][OptionName ].Options[element ].Value;
						option.textContent = DOM.OptionTypes[OptionType ][OptionName ].Options[element ].TextContent;

						select.appendChild(option );
					} );
					
					select.value = DOM.OptionTypes[OptionType ][OptionName ].Options.Default;

					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						select.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					const label = document.createElement('label' );
					label.textContent = DOM.OptionTypes[OptionType ][OptionName ].Label;
					label.classList.add('OptionLabel' );
					label.appendChild(select );
					
					OptionsDiv.appendChild(label );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'textarea' ){
					
					const textarea = document.createElement('textarea' );
					textarea.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					textarea.rows = DOM.OptionTypes[OptionType ][OptionName ].Rows;
					textarea.cols = DOM.OptionTypes[OptionType ][OptionName ].Cols;
					textarea.required = DOM.OptionTypes[OptionType ][OptionName ].Required;
					textarea.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					textarea.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						textarea.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );
					
					const label = document.createElement('label' );
					label.textContent = DOM.OptionTypes[OptionType ][OptionName ].Name + ':';
					label.classList.add('TextareaOptionLabel' );
					label.appendChild(textarea );
					
					OptionsDiv.appendChild(label );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'button' ){
					
					const button = document.createElement('button' );
					button.type = DOM.OptionTypes[OptionType ][OptionName ].Type;
					button.name = DOM.OptionTypes[OptionType ][OptionName ].Name;
					button.textContent = DOM.OptionTypes[OptionType ][OptionName ].TextContent;
					button.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					button.title = DOM.OptionTypes[OptionType ][OptionName ].Title;
					
					DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
						
						button.addEventListener(ActionName, function(){
							
							DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
						} );
					} );

					OptionsDiv.appendChild(button );
				}
				else if(DOM.OptionTypes[OptionType ][OptionName ].Element === 'br' ){
					
					const br = document.createElement('br' );
					br.classList.add(DOM.OptionTypes[OptionType ][OptionName ].Classes );
					
					if(Object.hasOwn(DOM.OptionTypes[OptionType ][OptionName ], 'Actions' ) ){
						
						DOM.OptionTypes[OptionType ][OptionName ].Actions.List.forEach((ActionName, index ) => {
							
							br.addEventListener(ActionName, function(){
								
								DOM.OptionTypes[OptionType ][OptionName ].Actions[ActionName ](RowId, Data, this );
							} );
						} );
					}

					OptionsDiv.appendChild(br );
				}
				else{
					
					throw new Error('Brak dopasowania !\nWartość: '+DOM.OptionTypes[OptionType ][OptionName ].Element );
				}
			} );

			const button = document.createElement('button' );
			button.type = 'button';
			button.name = 'RemoveRow';
			button.textContent = 'Usuń';
			button.title = 'Usuń cały wiersz';
			button.addEventListener('click', function(){
				
				DOM.removeRow(RowId, Data );
				
				RowDiv.remove();
			} );

			const RemoveDiv = document.createElement('div' );
			RemoveDiv.classList.add('RemoveDiv' );
			RemoveDiv.appendChild(button );

			RowDiv.replaceChildren(OptionsDiv, RemoveDiv );
		}
		else{

			throw new Error('Nie znaleziono wiersza DIV o danym Id !\nWartość Id: '+RowId );
		}
	}

	
	
	static htmlShowJSONInWindowByBlob(JSONData, Title = 'Dane w formacie JSON' ){
		
		let ParsedJSONData;

		try{

			ParsedJSONData = JSON.parse(JSONData );
		}
		catch(error ){
			
			ParsedJSONData = {
		
				error:{
					
					message: error.message,
					stack: error.stack,
					detail: JSONData
				}
			};
		};
		
		const blob = new Blob(
		
			[JSON.stringify(ParsedJSONData ) ],
			{ type: "application/json" }
		);
		
		const jsonWindow = window.open(URL.createObjectURL(blob ), '_blank');

		jsonWindow.document.title = Title;
		jsonWindow.document.close();
	}
	
	static htmlJSONWindow(FileURL, Data, Title = '' ){

		fetch(
		
			FileURL
		).then(FileData =>
		
			FileData.text()
		).then(html => {
			
			//jsonWindow.document.write('<textarea>'+JSON.stringify(ParsedJSONData, null, 2 )+'</textarea>' );
			const RequestWindow = window.open('', '_blank');
			RequestWindow.Data = Data;
			RequestWindow.document.open();
			RequestWindow.document.write(html );
			RequestWindow.document.title = Title;
			RequestWindow.document.close();
		} );
	}
	
	static async showFetchRequest(DataType, Data ){

		const PreparedData = DOM.prepareRequest(Data );

		if(DataType === 'JSON' ){
			
			const QueryResultData = await DOM.asyncFetchRequest(DOM.UrlBase[DataType ], PreparedData );
			
			DOM.htmlShowJSONInWindowByBlob(QueryResultData );
		
		}
		else if(DataType === 'MySQL' ){
		}
		else{
			
		}
	}

	static asyncFetchRequest(Url, Data ){
		
		JSON.stringify( Data );

		return fetch(
		
			Url,
			{
				method: 'POST',
				cache: 'reload',
				credentials: 'same-origin',//domyślne ustawinie zezwolenia wysyłania ciasteczek
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify( Data )
			}
		).then(Response => {
				
			return Response.text().then(text =>
			
				text
			).catch(error => {
				
				const NewError = new Error('Błąd parsowania danych do tekstu !' );
				NewError.detail = error.message;
				throw NewError;

			} );
			
		}).catch(error => {
				
			const NewError = new Error('Błąd zapytania sieciowego fetch !' );
			NewError.detail = error.message;
			throw NewError;

		} );
	}
}
