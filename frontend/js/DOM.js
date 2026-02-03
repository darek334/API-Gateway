class DOM{
	
	static UrlBase = {
		
		JSON: 'https://simplefilter.eu/mans/semestr_3/karwatka/projekt_1/read_json/',
		MySQL: 'https://simplefilter.eu/mans/semestr_3/karwatka/projekt_1/read_mysql/'
	};
	
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
		
		List : ['GET', 'HEADER', 'POST_B', 'COOKIE', 'CURL_O' ],
		
		GET : {
			
			RowPropertyList : ['OptionType', 'Name', 'Value' ],
			OptionType : {
				
				DefaultDOM : 'GET'
			},
			Name : {
				
				DefaultDOM : undefined
			},
			Value : {
				
				DefaultDOM : undefined
			},
			Html : {
				
				Type : 'start',
				ChildList : ['Div1' ],
				
				Div1 : {
					
					Type : 'container',
					TagName : 'div',
					ChildList : ['Div1', 'Div2' ],
					PropertyList : ['classList' ],
					classList : ['OptionsDiv' ],
					
					Div1 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Label1', 'Label2', 'Label3' ],
						PropertyList : ['classList' ],
						classList : ['OptionsDiv' ],
						
						Label1 : {
							
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'GET' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
								
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Typ:',
								classList : ['SpanLabel' ]
							},
							GET : {
									
								Type : 'container',
								TagName : 'select',
								ChildList : ['GET', 'HEADER', 'POST_B', 'COOKIE', 'CURL_O' ],
								PropertyList : ['name', 'value', 'title', 'classList' ],
								name : 'GET',
								value : 'GET',
								title : 'Wybierz typ opcji',
								classList : ['OptionTypeName' ],

								GET : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'GET',
									value : 'GET',
									textContent : 'GET'
								},
								CURL_O : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'CURL_O',
									value : 'CURL_O',
									textContent : 'CURL_O'
								},
								HEADER : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'HEADER',
									value : 'HEADER',
									textContent : 'HEADER'
								},
								POST_B : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'POST_B',
									value : 'POST_B',
									textContent : 'POST_B'
								},
								COOKIE : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'COOKIE',
									value : 'COOKIE',
									textContent : 'COOKIE'
								},
								Action : {
									
									List : ['change' ],
									Default : 'default',
									default : function(RowId, HTMLObject ){

										if(DOM.setOptionType(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{
											
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									},
									change : function(RowId, HTMLObject ){

										if(DOM.Data.Body[RowId ].isExceptionalEmpty(['OptionType', DOM.Data.Body[RowId ].OptionType ] ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else{
											
											//przywraca starą wartość
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
										}
										
										return false;
									}
								}
							}
						},
						Label2 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Name' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Nazwa:',
								classList : ['SpanLabel' ]
							},
							Name : {
								
								Type : 'element',
								TagName : 'input',
								PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
								name : 'Name',
								value : '',
								size : 20,
								required : true,
								classList : ['NameOption' ],
								title : 'Nazwa zmiennej GET',
								Action : {
									
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setName(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						},
						Label3 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Value' ],
							PropertyList : ['classList' ],
							classList : ['TextareaOptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Wartość:',
								classList : ['SpanLabel' ]
							},
							Value : {
								
								Type : 'element',
								TagName : 'textarea',
								PropertyList : ['name', 'value', 'rows', 'required', 'classList', 'title' ],
								name : 'Value',
								value : '',
								rows : '1',
								required : true,
								classList : ['ValueOption' ],
								title : 'Wartość zmiennej GET',
								Action : {
				
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setValue(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}

										return false;
									}
								}
							}
						}
					},
						
					Div2 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Button' ],
						PropertyList : ['classList' ],
						classList : ['RemoveDiv' ],
						
						Button : {
							
							Type : 'element',
							TagName : 'button',
							PropertyList : ['type', 'name', 'title', 'textContent', 'classList' ],
							type : 'button',
							name : 'RemoveRow',
							title : 'Usuń cały wiersz',
							textContent : 'Usuń',
							classList : ['RemoveButton' ],
							Action : {
										
								List : ['click' ],
								click : function(RowId, HTMLObject ){
									
									DOM.deleteDOMRow(RowId );
									const RowDiv = document.getElementById(RowId );
									RowDiv.remove();
									
									return true;
								}
							}
						},
					}
				}
			}
		},
		CURL_O : {
			
			RowPropertyList : ['OptionType', 'Name', 'Value' ],
			OptionType : {
				
				DefaultDOM : 'CURL_O'
			},
			Name : {
				
				DefaultDOM : undefined,
				ForbiddenNames : {
					
					List : [
						
						'CURLOPT_URL',
						'CURLOPT_POST',
						'HEADER',
						'POST_B',
						'COOKIE'
					]
				}
			},
			Value : {
				
				DefaultDOM : undefined
			},
			Html : {
				
				Type : 'start',
				ChildList : ['Div1' ],
				
				Div1 : {
					
					Type : 'container',
					TagName : 'div',
					ChildList : ['Div1', 'Div2' ],
					PropertyList : ['classList' ],
					classList : ['OptionsDiv' ],
					
					Div1 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Label1', 'Label2', 'Label3' ],
						PropertyList : ['classList' ],
						classList : ['OptionsDiv' ],
						
						Label1 : {
							
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'CURL_O' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Typ:',
								classList : ['SpanLabel' ]
							},
							CURL_O : {
									
								Type : 'container',
								TagName : 'select',
								ChildList : ['GET', 'HEADER', 'POST_B', 'COOKIE', 'CURL_O' ],
								PropertyList : ['name', 'value', 'title', 'classList' ],
								name : 'CURL_O',
								value : 'CURL_O',
								title : 'Wybierz typ opcji',
								classList : ['OptionTypeName' ],

								GET : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'GET',
									value : 'GET',
									textContent : 'GET'
								},
								CURL_O : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'CURL_O',
									value : 'CURL_O',
									textContent : 'CURL_O'
								},
								HEADER : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'HEADER',
									value : 'HEADER',
									textContent : 'HEADER'
								},
								POST_B : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'POST_B',
									value : 'POST_B',
									textContent : 'POST_B'
								},
								COOKIE : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'COOKIE',
									value : 'COOKIE',
									textContent : 'COOKIE'
								},
								Action : {
									
									List : ['change' ],
									Default : 'default',
									default : function(RowId, HTMLObject ){

										if(DOM.setOptionType(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{
											
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									},
									change : function(RowId, HTMLObject ){

										if(DOM.Data.Body[RowId ].isExceptionalEmpty(['OptionType', DOM.Data.Body[RowId ].OptionType ] ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else{
											
											//przywraca starą wartość
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
										}

										return false;
									}
								}
							}
						},
						Label2 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Name' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Nazwa:',
								classList : ['SpanLabel' ]
							},
							Name : {
								
								Type : 'element',
								TagName : 'input',
								PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
								name : 'Name',
								value : '',
								size : 20,
								required : true,
								classList : ['NameOption' ],
								title : 'Nazwa opcji cURL',
								Action : {
									
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setName(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						},
						Label3 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Value' ],
							PropertyList : ['classList' ],
							classList : ['TextareaOptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Wartość:',
								classList : ['SpanLabel' ]
							},
							Value : {
								
								Type : 'element',
								TagName : 'textarea',
								PropertyList : ['name', 'value', 'rows', 'required', 'classList', 'title' ],
								name : 'Value',
								value : '',
								rows : '1',
								required : true,
								classList : ['ValueOption' ],
								title : 'Wartość opcji cURL',
								Action : {
				
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setValue(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						}
					},
						
					Div2 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Button' ],
						PropertyList : ['classList' ],
						classList : ['RemoveDiv' ],
						
						Button : {
							
							Type : 'element',
							TagName : 'button',
							PropertyList : ['type', 'name', 'title', 'textContent', 'classList' ],
							type : 'button',
							name : 'RemoveRow',
							title : 'Usuń cały wiersz',
							textContent : 'Usuń',
							classList : ['RemoveButton' ],
							Action : {
											
								List : ['click' ],
								click : function(RowId, HTMLObject ){
									
									DOM.deleteDOMRow(RowId );
									const RowDiv = document.getElementById(RowId );
									RowDiv.remove();
									return true;
								}
							}
						}
					}
				}
			}
		},
		HEADER : {
			
			RowPropertyList : ['OptionType', 'Name', 'Value' ],
			OptionType : {
				
				DefaultDOM : 'HEADER'
			},
			Name : {
				
				DefaultDOM : undefined
			},
			Value : {
				
				DefaultDOM : undefined
			},
			Html : {
				
				Type : 'start',
				ChildList : ['Div1' ],
				
				Div1 : {
					
					Type : 'container',
					TagName : 'div',
					ChildList : ['Div1', 'Div2' ],
					PropertyList : ['classList' ],
					classList : ['OptionsDiv' ],
					
					Div1 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Label1', 'Label2', 'Label3' ],
						PropertyList : ['classList' ],
						classList : ['OptionsDiv' ],
						
						Label1 : {
							
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'HEADER' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Typ:',
								classList : ['SpanLabel' ]
							},
							HEADER : {
									
								Type : 'container',
								TagName : 'select',
								ChildList : ['GET', 'HEADER', 'POST_B', 'COOKIE', 'CURL_O' ],
								PropertyList : ['name', 'value', 'title', 'classList' ],
								name : 'HEADER',
								value : 'HEADER',
								title : 'Wybierz typ opcji',
								classList : ['OptionTypeName' ],

								GET : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'GET',
									value : 'GET',
									textContent : 'GET'
								},
								CURL_O : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'CURL_O',
									value : 'CURL_O',
									textContent : 'CURL_O'
								},
								HEADER : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'HEADER',
									value : 'HEADER',
									textContent : 'HEADER'
								},
								POST_B : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'POST_B',
									value : 'POST_B',
									textContent : 'POST_B'
								},
								COOKIE : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'COOKIE',
									value : 'COOKIE',
									textContent : 'COOKIE'
								},
								Action : {
									
									List : ['change' ],
									Default : 'default',
									default : function(RowId, HTMLObject ){

										if(DOM.setOptionType(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{
											
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									},
									change : function(RowId, HTMLObject ){

										if(DOM.Data.Body[RowId ].isExceptionalEmpty(['OptionType', DOM.Data.Body[RowId ].OptionType ] ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else{
											
											//przywraca starą wartość
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
										}

										return false;
									}
								}
							}
						},
						Label2 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Name' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Nazwa:',
								classList : ['SpanLabel' ]
							},
							Name : {
								
								Type : 'element',
								TagName : 'input',
								PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
								name : 'Name',
								value : '',
								size : 20,
								required : true,
								classList : ['NameOption' ],
								title : 'Nazwa klucza w tablicy opcji cURL - HEADER',
								Action : {
									
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setName(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						},
						Label3 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Value' ],
							PropertyList : ['classList' ],
							classList : ['TextareaOptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Wartość:',
								classList : ['SpanLabel' ]
							},
							Value : {
								
								Type : 'element',
								TagName : 'textarea',
								PropertyList : ['name', 'value', 'rows', 'required', 'classList', 'title' ],
								name : 'Value',
								value : '',
								rows : '1',
								required : true,
								classList : ['ValueOption' ],
								title : 'Wartość klucza w tablicy opcji cURL - HEADER',
								Action : {
				
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setValue(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						}
					},
						
					Div2 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Button' ],
						PropertyList : ['classList' ],
						classList : ['RemoveDiv' ],
						
						Button : {
							
							Type : 'element',
							TagName : 'button',
							PropertyList : ['type', 'name', 'title', 'textContent', 'classList' ],
							type : 'button',
							name : 'RemoveRow',
							title : 'Usuń cały wiersz',
							textContent : 'Usuń',
							classList : ['RemoveButton' ],
							Action : {
											
								List : ['click' ],
								click : function(RowId, HTMLObject ){
									
									DOM.deleteDOMRow(RowId );
									const RowDiv = document.getElementById(RowId );
									RowDiv.remove();
									return true;
								}
							}
						}
					}
				}
			}
		},
		POST_B : {
			
			RowPropertyList : ['OptionType', 'Name', 'Value' ],
			OptionType : {
				
				DefaultDOM : 'POST_B'
			},
			Name : {
				
				DefaultDOM : undefined
			},
			Value : {
				
				DefaultDOM : undefined
			},
			Html : {
				
				Type : 'start',
				ChildList : ['Div1' ],
				
				Div1 : {
					
					Type : 'container',
					TagName : 'div',
					ChildList : ['Div1', 'Div2' ],
					PropertyList : ['classList' ],
					classList : ['OptionsDiv' ],
					
					Div1 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Label1', 'Label2', 'Label3' ],
						PropertyList : ['classList' ],
						classList : ['OptionsDiv' ],
						
						Label1 : {
							
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'POST_B' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Typ:',
								classList : ['SpanLabel' ]
							},
							POST_B : {
									
								Type : 'container',
								TagName : 'select',
								ChildList : ['GET', 'HEADER', 'POST_B', 'COOKIE', 'CURL_O' ],
								PropertyList : ['name', 'value', 'title', 'classList' ],
								name : 'POST_B',
								value : 'POST_B',
								title : 'Wybierz typ opcji',
								classList : ['OptionTypeName' ],

								GET : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'GET',
									value : 'GET',
									textContent : 'GET'
								},
								CURL_O : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'CURL_O',
									value : 'CURL_O',
									textContent : 'CURL_O'
								},
								HEADER : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'HEADER',
									value : 'HEADER',
									textContent : 'HEADER'
								},
								POST_B : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'POST_B',
									value : 'POST_B',
									textContent : 'POST_B'
								},
								COOKIE : {
									
									Type : 'element',
									TagName : 'option',
									PropertyList : ['name', 'value', 'textContent' ],
									name : 'COOKIE',
									value : 'COOKIE',
									textContent : 'COOKIE'
								},
								Action : {
									
									List : ['change' ],
									Default : 'default',
									default : function(RowId, HTMLObject ){

										if(DOM.setOptionType(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{
											
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									},
									change : function(RowId, HTMLObject ){

										if(DOM.Data.Body[RowId ].isExceptionalEmpty(['OptionType', DOM.Data.Body[RowId ].OptionType ] ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
											
											if(DOM.setOptionType(RowId, HTMLObject.value ) ){
												
												DOM.htmlChangeRow(RowId, HTMLObject.value );
												return true;
											}
										}
										else{
											
											//przywraca starą wartość
											HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
										}

										return false;
									}
								}
							}
						},
						Label2 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Name' ],
							PropertyList : ['classList' ],
							classList : ['OptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Nazwa:',
								classList : ['SpanLabel' ]
							},
							Name : {
								
								Type : 'element',
								TagName : 'input',
								PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
								name : 'Name',
								value : '',
								size : 20,
								required : true,
								classList : ['NameOption' ],
								title : 'Nazwa klucza w tablicy BODY - POST_B. Format wysłania BODY zależy od wartości klucza Content-Type w HEADER',
								Action : {
									
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setName(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						},
						Label3 : {
						
							Type : 'container',
							TagName : 'label',
							ChildList : ['Span', 'Value' ],
							PropertyList : ['classList' ],
							classList : ['TextareaOptionLabel' ],
							
							Span : {
	
								Type : 'element',
								TagName : 'span',
								PropertyList : ['textContent', 'classList' ],
								textContent : 'Wartość:',
								classList : ['SpanLabel' ]
							},
							Value : {
								
								Type : 'element',
								TagName : 'textarea',
								PropertyList : ['name', 'value', 'rows', 'required', 'classList', 'title' ],
								name : 'Value',
								value : '',
								rows : '1',
								required : true,
								classList : ['ValueOption' ],
								title : 'Wartość klucza w tablicy BODY - POST_B',
								Action : {
				
									List : ['blur' ],
									blur : function(RowId, HTMLObject ){

										if(DOM.setValue(RowId, HTMLObject.value ) ){

											HTMLObject.style.borderColor = 'rgb(0 255 0 )';
											return true;
										}
										else{

											HTMLObject.value = '';
											HTMLObject.style.borderColor = 'rgb(255 0 0 )';
										}
										
										return false;
									}
								}
							}
						}
					},
						
					Div2 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Button' ],
						PropertyList : ['classList' ],
						classList : ['RemoveDiv' ],
						
						Button : {
							
							Type : 'element',
							TagName : 'button',
							PropertyList : ['type', 'name', 'title', 'textContent', 'classList' ],
							type : 'button',
							name : 'RemoveRow',
							title : 'Usuń cały wiersz',
							textContent : 'Usuń',
							classList : ['RemoveButton' ],
							Action : {
											
								List : ['click' ],
								click : function(RowId, HTMLObject ){
									
									DOM.deleteDOMRow(RowId );
									const RowDiv = document.getElementById(RowId );
									RowDiv.remove();
									return true;
								}
							}
						}
					}
				}
			}
		},		
		COOKIE : {
			
			RowPropertyList : ['OptionType', 'Name', 'Value', 'Path', 'Expires', 'Domain', 'Secure', 'HttpOnly', 'SameSite' ],
			OptionType : {
				
				DefaultDOM : 'COOKIE'
			},
			Name : {
				
				DefaultDOM : undefined
			},
			Value : {
				
				DefaultDOM : undefined
			},
			Path : {
				
				DefaultDOM : undefined
			},
			Expires : {
				
				DefaultDOM : undefined
			},
			Domain : {
				
				DefaultDOM : undefined
			},
			Secure : {
				
				DefaultDOM : 'False'
			},
			HttpOnly : {
				
				DefaultDOM : 'True'
			},
			SameSite : {
				
				DefaultDOM : 'Lax'
			},
			Html : {
				
				Type : 'start',
				ChildList : ['Div1' ],
				
				Div1 : {
					
					Type : 'container',
					TagName : 'div',
					ChildList : ['Div1', 'Div2' ],
					PropertyList : ['classList' ],
					classList : ['MainOptionDiv' ],
					
					Div1 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Div1', 'Div2', 'Div3' ],
						PropertyList : ['classList' ],
						classList : ['OptionRowsDiv' ],
						
						Div1 : {
							
							Type : 'container',
							TagName : 'div',
							ChildList : ['Label1', 'Label2', 'Label3' ],
							PropertyList : ['classList' ],
							classList : ['OptionsDiv' ],
							
							Label1 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'COOKIE' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Typ:',
									classList : ['SpanLabel' ]
								},
								COOKIE : {
									
									Type : 'container',
									TagName : 'select',
									ChildList : ['GET', 'HEADER', 'POST_B', 'COOKIE', 'CURL_O' ],
									PropertyList : ['name', 'value', 'title', 'classList' ],
									name : 'COOKIE',
									value : 'COOKIE',
									title : 'Wybierz typ opcji',
									classList : ['OptionTypeName' ],

									GET : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'GET',
										value : 'GET',
										textContent : 'GET'
									},
									CURL_O : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'CURL_O',
										value : 'CURL_O',
										textContent : 'CURL_O'
									},
									HEADER : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'HEADER',
										value : 'HEADER',
										textContent : 'HEADER'
									},
									POST_B : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'POST_B',
										value : 'POST_B',
										textContent : 'POST_B'
									},
									COOKIE : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'COOKIE',
										value : 'COOKIE',
										textContent : 'COOKIE'
									},
									Action : {
										
										List : ['change' ],
										Default : 'default',
										default : function(RowId, HTMLObject ){

											if(DOM.setOptionType(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{
												
												HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										},
										change : function(RowId, HTMLObject ){

											if(DOM.Data.Body[RowId ].isExceptionalEmpty(['OptionType', DOM.Data.Body[RowId ].OptionType, 'Secure', 'HttpOnly', 'SameSite' ] ) ){
											
												if(DOM.setOptionType(RowId, HTMLObject.value ) ){
													
													DOM.htmlChangeRow(RowId, HTMLObject.value );
													return true;
												}
											}
											else if(confirm('Wszystkie pola zostaną wyczyszczone\n\nKontynuować ?!' ) ){
												
												if(DOM.setOptionType(RowId, HTMLObject.value ) ){
													
													DOM.htmlChangeRow(RowId, HTMLObject.value );
													return true;
												}
											}
											else{
												
												//przywraca starą wartość
												HTMLObject.value = DOM.Data.Body[RowId ].OptionType;
											}

											return false;
										}
									}
								}
							},
							Label2 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'Name' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Nazwa:',
									classList : ['SpanLabel' ]
								},
								Name : {
									
									Type : 'element',
									TagName : 'input',
									PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
									name : 'Name',
									value : '',
									size : 20,
									required : true,
									classList : ['NameOption' ],
									title : 'Unikalna nazwa ciasteczka. Bez spacji i znaków specjalnych.',
									Action : {
										
										List : ['blur' ],
										blur : function(RowId, HTMLObject ){

											if(DOM.setName(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = '';
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return true;
										}
									}
								}
							},
							Label3 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'Value' ],
								PropertyList : ['classList' ],
								classList : ['TextareaOptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Wartość:',
									classList : ['SpanLabel' ]
								},
								Value : {
									
									Type : 'element',
									TagName : 'textarea',
									PropertyList : ['name', 'value', 'rows', 'required', 'classList', 'title' ],
									name : 'Value',
									value : '',
									rows : '1',
									required : true,
									classList : ['ValueOption' ],
									title : 'Wartość ciasteczka',
									Action : {
					
										List : ['blur' ],
										blur : function(RowId, HTMLObject ){

											if(DOM.setValue(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = '';
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							}
						},
						
						Div2 : {
							
							Type : 'container',
							TagName : 'div',
							ChildList : ['Label1', 'Label2', 'Label3' ],
							PropertyList : ['classList' ],
							classList : ['OptionsDiv' ],
							
							Label1 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'Path' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Path:',
									classList : ['SpanLabel' ]
								},
								Path : {
									
									Type : 'element',
									TagName : 'input',
									PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
									name : 'Path',
									value : '',
									size : 20,
									required : true,
									classList : ['PathOption' ],
									title : 'Określa zasięg wysyłanego ciasteczka przez klienta do folderów źródła - hosta. / oznacza całą domenę. Brak wartości ustawia ścieżkę tylko dla folderów źródłowych z których nastąpiło ustawienie ciasteczka - opcja została zablokowana w celach lepszej kontroli - jest też niezalecana',
									Action : {
					
										List : ['blur' ],
										blur : function(RowId, HTMLObject ){

											if(DOM.setCookiePath(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = '';
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							},
							Label2 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'Expires' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Czas:',
									classList : ['SpanLabel' ]
								},
								Expires : {
									
									Type : 'element',
									TagName : 'input',
									PropertyList : ['name', 'value', 'size', 'required', 'classList', 'title' ],
									name : 'Expires',
									value : '',
									size : 20,
									required : true,
									classList : ['ExpiresOption' ],
									title : 'Data i czas wygaśnięcia ciasteczka podana w sekundach. Zero oznacza ciasteczko sesyjne – usuwane po zamknięciu przeglądarki, minusowa wartość usuwa ciasteczko z przeglądarki',
									Action : {
		
										List : ['blur' ],
										blur : function(RowId, HTMLObject){

											if(DOM.setCookieExpires(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = '';
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							},
							Label3 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'Domain' ],
								PropertyList : ['classList' ],
								classList : ['TextareaOptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Domena:',
									classList : ['SpanLabel' ]
								},
								Domain : {
									
									Type : 'element',
									TagName : 'textarea',
									PropertyList : ['name', 'value', 'rows', 'required', 'classList', 'title' ],
									name : 'Domain',
									value : '',
									rows : '1',
									required : true,
									classList : ['DomainOption' ],
									title : 'Określa domenę, dla której ciasteczko jest dostępne. Brak domeny = tylko aktualny host. example.com udostępnia ciasteczko wszystkim subdomenom. Nie ustawiaj domeny z katalogami - to jest błąd - przeglądarki odrzucają takie ustawienia źródła( hosta )',
									Action : {
		
										List : ['blur' ],
										blur : function(RowId, HTMLObject ){

											if(DOM.setCookieDomain(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = '';
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							}
						},
						
						Div3 : {
							
							Type : 'container',
							TagName : 'div',
							ChildList : ['Label1', 'Label2', 'Label3' ],
							PropertyList : ['classList' ],
							classList : ['OptionsDiv' ],
							
							Label1 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'Secure' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'Secure:',
									classList : ['SpanLabel' ]
								},
								Secure : {
									
									Type : 'container',
									TagName : 'select',
									PropertyList : ['name', 'value', 'title', 'classList' ],
									ChildList : ['True', 'False' ],
									name : 'Secure',
									value : 'False',
									title : 'Gdy włączone, ciasteczko jest wysyłane tylko przez HTTPS. Wymagane dla SameSite=None',
									classList : ['SecureOption' ],
	
									True : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'True',
										value : 'True',
										textContent : 'True'
									},
									False : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'False',
										value : 'False',
										textContent : 'False'
									},
									Action : {
					
										List : ['change' ],
										Default : 'default',
										default : function(RowId, HTMLObject ){

											if(DOM.setCookieSecure(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{
												
												HTMLObject.value = DOM.Data.Body[RowId ].Secure;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										},
										change : function(RowId, HTMLObject ){

											if(DOM.setCookieSecure(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = DOM.Data.Body[RowId ].Secure;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							},
							Label2 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'HttpOnly' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'HttpOnly:',
									classList : ['SpanLabel' ]
								},
								HttpOnly : {
									
									Type : 'container',
									TagName : 'select',
									PropertyList : ['name', 'value', 'title', 'classList' ],
									ChildList : ['True', 'False' ],
									name : 'HttpOnly',
									value : 'True',
									title : 'Gdy włączone, ciasteczko nie jest dostępne w JavaScript. Chroni przed atakami XSS. Zalecane włączenie dla ciasteczek sesyjnych',
									classList : ['HttpOnlyOption' ],
									
									True : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'True',
										value : 'True',
										textContent : 'True'
									},
									False : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'False',
										value : 'False',
										textContent : 'False'
									},
									Action : {
					
										List : ['change' ],
										Default : 'default',
										default : function(RowId, HTMLObject ){

											if(DOM.setCookieHttponly(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{
												
												HTMLObject.value = DOM.Data.Body[RowId ].HttpOnly;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										},
										change : function(RowId, HTMLObject ){

											if(DOM.setCookieHttponly(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = DOM.Data.Body[RowId ].HttpOnly;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							},
							Label3 : {
						
								Type : 'container',
								TagName : 'label',
								ChildList : ['Span', 'SameSite' ],
								PropertyList : ['classList' ],
								classList : ['OptionLabel' ],
								
								Span : {
	
									Type : 'element',
									TagName : 'span',
									PropertyList : ['textContent', 'classList' ],
									textContent : 'SameSite:',
									classList : ['SpanLabel' ]
								},
								SameSite : {
									
									Type : 'container',
									TagName : 'select',
									PropertyList : ['name', 'value', 'title', 'classList' ],
									ChildList : ['None', 'Lax', 'Strict' ],
									name : 'SameSite',
									value : 'Lax',
									title : 'Wskazuje przeglądarce (klientowi), czy ciasteczko jest wysyłane w kontekście cross-site. Strict – wysyłane tylko przy nawigacji domena pochodzenia → domena pochodzenia. Lax – wysyłane przy nawigacji obca domena → domena pochodzenia (GET, top-level). None – wysyłane w kontekście obca domena → domena pochodzenia we wszystkich typach zapytań, w tym JavaScript (fetch, XHR, iframe). Wymaga Secure=true czyli wymagany jest protokoł HTTPS',
									classList : ['SamesiteOption' ],
									
									None : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'None',
										value : 'None',
										textContent : 'None'
									},
									Lax : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'Lax',
										value : 'Lax',
										textContent : 'Lax'
									},
									Strict : {
										
										Type : 'element',
										TagName : 'option',
										PropertyList : ['name', 'value', 'textContent' ],
										name : 'Strict',
										value : 'Strict',
										textContent : 'Strict'
									},
									Action : {
										
										List : ['change' ],
										Default : 'default',
										default : function(RowId, HTMLObject ){

											if(DOM.setCookieSamesite(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{
												
												HTMLObject.value = DOM.Data.Body[RowId ].SameSite;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										},
										change : function(RowId, HTMLObject ){

											if(DOM.setCookieSamesite(RowId, HTMLObject.value ) ){

												HTMLObject.style.borderColor = 'rgb(0 255 0 )';
												return true;
											}
											else{

												HTMLObject.value = DOM.Data.Body[RowId ].SameSite;
												HTMLObject.style.borderColor = 'rgb(255 0 0 )';
											}
											
											return false;
										}
									}
								}
							}
						}
					},
					
					Div2 : {
						
						Type : 'container',
						TagName : 'div',
						ChildList : ['Button' ],
						PropertyList : ['classList' ],
						classList : ['RemoveDiv' ],
						
						Button : {
							
							Type : 'element',
							TagName : 'button',
							PropertyList : ['type', 'name', 'title', 'textContent', 'classList' ],
							type : 'button',
							name : 'RemoveRow',
							title : 'Usuń cały wiersz',
							textContent : 'Usuń',
							classList : ['RemoveButton' ],
							Action : {
										
								List : ['click' ],
								click : function(RowId, HTMLObject ){
									
									DOM.deleteDOMRow(RowId );
									const RowDiv = document.getElementById(RowId );
									RowDiv.remove();
									return true;
								}
							}
						}
					}
				}
			}
		},
		
		htmlCreateElement : function(RowId, DOMObject ){

			if(typeof RowId === 'string' && typeof DOMObject === 'object' && Object.hasOwn(DOMObject, 'Type' ) ){
				
				if(DOMObject.Type === 'element' ){
					
					const HtmlElement = document.createElement(DOMObject.TagName );
					
					DOMObject.PropertyList.forEach((PropertyName, index ) => {
						
						if(PropertyName === 'classList' ){
							
							HtmlElement[PropertyName ].add(...DOMObject[PropertyName ] );
						}
						else{
							
							HtmlElement[PropertyName ] = DOMObject[PropertyName ];
						}
					} );
					
					if(Object.hasOwn(DOMObject, 'Action' ) ){
						
						DOMObject.Action.List.forEach((ActionName, index ) => {
							
							HtmlElement.addEventListener(ActionName, function(){
							
								DOMObject.Action[ActionName ](RowId, this );
							} );
						} );
						
						if(Object.hasOwn(DOMObject.Action, 'Default' ) ){
							
							DOMObject.Action[DOMObject.Action['Default' ] ](RowId, HtmlContainer );
						}
					}

					return HtmlElement;
				}
				else if(DOMObject.Type === 'container' ){
					
					const HtmlContainer = document.createElement(DOMObject.TagName );
					
					DOMObject.ChildList.forEach((Child, index ) => {
						
						HtmlContainer.appendChild(DOM.OptionTypes.htmlCreateElement(RowId, DOMObject[Child ] ) );
					} );
					
					DOMObject.PropertyList.forEach((PropertyName, index ) => {
						
						if(PropertyName === 'classList' ){
							
							HtmlContainer[PropertyName ].add(...DOMObject[PropertyName ] );
						}
						else{
							
							HtmlContainer[PropertyName ] = DOMObject[PropertyName ];
						}
					} );
					
					if(Object.hasOwn(DOMObject, 'Action' ) ){
						
						DOMObject.Action.List.forEach((ActionName, index ) => {
							
							HtmlContainer.addEventListener(ActionName, function(){
							
								DOMObject.Action[ActionName ](RowId, this );
							} );
						} );
						
						if(Object.hasOwn(DOMObject.Action, 'Default' ) ){
							
							DOMObject.Action[DOMObject.Action['Default' ] ](RowId, HtmlContainer );
						}
					}
					
					return HtmlContainer;
				}
				else{
					
					throw new Error('Brak dopasowania Object.Type = '+DOMObject.Type );
				}
			}
			else{

				throw new Error('Nieprawidłowe argumenty ! RowId: '+RowId+', DOMObject: '+DOMObject );
			}
		}
	};

	
	static RegExpUrl = /^https?:\/\/\S+\.\S+$/i;
	static RegExpStartsWithDigit = /^\d/;
	static RegExpCookieExpires = /^\d+$/;
	static RegExpCookiePath = /^\/\w*/;
	static RegExpForbiddenCURLNames = new RegExp('^('+DOM.OptionTypes.CURL_O.Name.ForbiddenNames.List.join('|')+ ')$', 'i' );
	
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

	static checkReadDataTypeSelected(){
		
		return DOM.Data.DataType;
	}
	
	//Nie ruszać !! Nawet jak zdziwmimy się warunkami w pętli, bo tak musi być !!
	static prepareDOMData(){

		if(DOM.Data.Url && DOM.Data.DataType && DOM.Data.DataMethod ){
			
			const PreparedData = {
		
				Url: DOM.Data.Url,
				DataType: DOM.Data.DataType,
				DataMethod: DOM.Data.DataMethod,
				Body: {}
			};
			
			if(Object.keys(DOM.Data.Body ).length > 0 ){

				for( const RowId in DOM.Data.Body ){
					
					if(DOM.Data.Body[RowId ].isFullyInitialized() ){
						
						//Musi to wszystko być w tej pętli, bo są warunki, które zakończyłyby przetwarzanie całego wiersza. A wiersz musi być CAŁY przetworzony
						for( const RowKey in DOM.Data.Body[RowId ] ){
							
							//sprawdzam czy jest już obiekt o nazwie OptionType=wartość
							const OptionTypeName = DOM.Data.Body[RowId ].OptionType;
							
							if(Object.hasOwn(PreparedData.Body, OptionTypeName  ) ){
								
								//sprawdzam czy jest już obiekt o Nazwie danej wartości lub ciągu wartości jak w przypadku ciasteczka
								const Name = DOM.Data.Body[RowId ].Name;
								
								if(Object.hasOwn(PreparedData.Body[OptionTypeName ], Name ) ){
									
									//Musi byc ominięte, gdy w przeciwnym wypadku pojawią się te pola jeszcze raz zdublowane niżej
									if(RowKey !== 'Name' && RowKey !== 'OptionType' ){
										
										PreparedData.Body[OptionTypeName ][Name ][RowKey ] = DOM.Data.Body[RowId ][RowKey ];
									}
								}
								else{
									
									PreparedData.Body[OptionTypeName ][Name ] = {};
								}
							}
							else{
								
								PreparedData.Body[OptionTypeName ] = {};
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
			
			alert('Brak danych !\nUrl: '+DOM.Data.Url+', DataType: '+DOM.Data.DataType+', DataMethod: '+DOM.Data.DataMethod );
			throw new Error('Brak danych !\nUrl: '+DOM.Data.Url+', DataType: '+DOM.Data.DataType+', DataMethod: '+DOM.Data.DataMethod );
		}
	}
	
	static prepareRequest(){
	}
	
	
	static setReadDataType(Value ){
		
		DOM.Data.DataType = Value;
	}
	
	static setReadDataMethod(Value ){
		
		DOM.Data.DataMethod = Value;
	}
	
	static setUrl(Url ){
		
		if(typeof Url === 'string' ){
			
			Url = Url.trim();
			
			if(DOM.RegExpUrl.test(Url ) ){
				
				DOM.Data.Url = Url;
				return true;
			}
		}
		
		DOM.Data.Url = undefined;
		return false;
	}



	static makeDOMRow(RowId, OptionType ){
		
		if(typeof RowId === 'string' && typeof OptionType === 'string' && DOM.OptionTypes.List.includes(OptionType ) ){
			
			delete DOM.Data.Body[RowId ];
			
			DOM.Data.Body[RowId ] = {};
			
			DOM.OptionTypes[OptionType ].RowPropertyList.forEach((element, index ) => {
				
				DOM.Data.Body[RowId ][element ] = DOM.OptionTypes[OptionType ][element ].DefaultDOM;
			} );
			
			DOM.Data.Body[RowId ].isFullyInitialized = function(){

				for(const key in this ){
					
					if(Object.hasOwn(this, key ) && typeof this[key ] !== 'function' ){

						if(this[key] === undefined ){

							return false;
						}
					}
				}
				
				return true;
			};
				
			DOM.Data.Body[RowId ].isEmpty = function(){

				for(const key in this ){
					
					if(Object.hasOwn(this, key ) && typeof this[key ] !== 'function' ){

						if(this[key] !== undefined ){

							return false;
						}
					}
				}
				
				return true;
			};
			
			DOM.Data.Body[RowId ].isExceptionalEmpty = function(Exception ){
				
				if(Array.isArray(Exception ) ){

					for(const key in this ){
						
						if(Object.hasOwn(this, key ) && typeof this[key ] !== 'function' ){

							if(this[key] !== undefined ){

								if(!Exception.includes(key ) ){
									
									return false;
								}
							}
						}
					}
				}
				else if(typeof Exception === 'string' || !Exception ){
					
					return this.isExceptionalEmpty([Exception ] );
				}
				else{
					
					throw new Error('Złe argumenty ! Exception: '+Exception );
				}
				
				return true;
			};
		}
		else{
			
			throw new Error('Złe argumenty ! RowId: '+RowId+', OptionType: '+OptionType+', Includes: '+DOM.OptionTypes.List.includes(OptionType ) );
		}
	}
	
	static deleteDOMRow(RowId ){
		
		if(typeof RowId === 'string' ){
			
			delete DOM.Data.Body[RowId ];
		}
		else{
			
			throw new Error('Niudane usunięcie wiersza ! RowId: '+RowId );
		}
	}
	
	
	static setOptionType(RowId, OptionType ){
		
		if(typeof RowId === 'string' && typeof OptionType === 'string' && DOM.OptionTypes.List.includes(OptionType ) ){
			
			DOM.makeDOMRow(RowId, OptionType );
			return true;
		}
		else{
			
			alert('Złe argumenty ! RowId: '+RowId+', OptionType: '+OptionType+', Includes: '+DOM.OptionTypes.List.includes(OptionType ) );
		}
		return false;
	}

	static setName(RowId, Name ){
		
		if(typeof Name === 'string' ){
			
			Name = Name.trim();
				
			if(!Name ){
				
				alert('Nazwa nie może być pusta !' );
			}
			else if(DOM.RegExpStartsWithDigit.test(Name ) ){
				
				alert('Nazwa nie może zaczyanć się od cyfr !' );
			}
			else{
				
				DOM.Data.Body[RowId ].Name = Name;
				return true;
			}
		}

		return false;
	}
	
	static setValue(RowId, Value ){
		
		DOM.Data.Body[RowId ].Value = Value;
		return true;
	}
	
	/*??*/
	static setHtmlElementValue(ElementId, String ){
		
		if(typeof ElementId === 'string' && typeof String === 'string' ){
		
			const Element = document.getElementById(ElementId );
		
			if(Element ){

				Element.value = String;
				return true;
			}
			else{
				
				throw new Error('Nie znaleziono elementu ! ElementId : '+ElementId );
			}
		}
		else{
				
			throw new Error('Złe argumenty ! ElementId: '+ElementId+', String: '+String );
		}
		
		return false;
	}
	
	static setCookiePath(RowId, Path ){
		
		if(typeof Path === 'string' ){
			
			Path = Path.trim();
				
			if(!Path ){
				
				alert('Ścieżka nie może być pusta !' );
			}
			else if(!DOM.RegExpCookiePath.test(Path ) ){
				
				alert('ścieżka musi zaczynać się od / -slash !' );
			}
			else{
				
				DOM.Data.Body[RowId ].Path = Path;
				return true;
			}
		}

		return false;
	}
	
	static setCookieExpires(RowId, Expires ){

		if(typeof Expires === 'string' ){
		
			Expires = Expires.trim();
				
			if(DOM.RegExpCookieExpires.test(Expires ) ){
				
				DOM.Data.Body[RowId ].Expires = Expires;
				return true;
			}
			else{
				
				alert('Wartość musi być liczbą >= 0 oznaczającą sekundy !' );
			}
		}

		return false;
	}
	
	static setCookieDomain(RowId, Domain ){
		
		if(typeof Domain === 'string' ){
			
			Domain = Domain.trim();

			DOM.Data.Body[RowId ].Domain = Domain;
			return true;
		}

		return false;
	}
	
	static setCookieSecure(RowId, Secure ){
		
		if(typeof Secure === 'string' && Secure.trim() ){

			DOM.Data.Body[RowId ].Secure = Secure.trim();
			return true;
		}
		else{
			
			alert('Zła wartość !' );
		}

		return false;
	}
	
	static setCookieHttponly(RowId, HttpOnly ){
		
		if(typeof HttpOnly === 'string' ){

			DOM.Data.Body[RowId ].HttpOnly = HttpOnly;
			return true;
		}
		else{
			
			alert('Nieprawidłowa wartość !' );
		}

		return false;
	}
	
	static setCookieSamesite(RowId, SameSite ){

		if(typeof SameSite === 'string' ){
			
			SameSite = SameSite.trim();
				
			if(!SameSite ){
				
				alert('Wartość nie może być pusta !' );
			}
			else{
				
				DOM.Data.Body[RowId ].SameSite = SameSite;
				return true;
			}
		}

		return false;
	}
	
	
	
	static htmlSettingInputs(SettingsBoxId ){
		
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
					DOM.Data.DataType = element;
				}
				input.appendChild(option );
			} );
			input.addEventListener('change', function(){

				DOM.setReadDataType(this.value );
			} );
			div.appendChild(input );
			
			input = document.createElement('label' );
			input.textContent = 'Metoda: ';
			input.htmlFor = 'ReadMethodsInput';
			div.appendChild(input );
			
			input = document.createElement('select' );
			input.id = 'ReadMethodsInput';
			input.title = 'Metoda odczytu. Metoda GET będzie zignorowana w przypadku konfiguracji typu opcji POST_B';

			DOM.ReadMethods.List.forEach((element, index ) => {
				
				option = document.createElement('option' );
				option.value = element;
				option.textContent = element;
				if(!index ){
					
					option.selected = true;
					DOM.Data.DataMethod = element;
				}
				input.appendChild(option );
			} );
			input.addEventListener('change', function(){

				DOM.setReadDataMethod(this.value );
			} );
			div.appendChild(input );

			SettingsBox.appendChild(div );
		}
		else{
			
			DOM.asyncAlert('Nie znaleziono SettingsBoxId !\nWartość: '+SettingsBoxId );
			throw new Error('Nie znaleziono SettingsBoxId !\nWartość: '+SettingsBoxId );
		}
	}
	
	static htmlUrlInput(InputsBoxId ){
		
		let InputsBox = document.getElementById(InputsBoxId );
		
		if(InputsBox ){

			const textarea = document.createElement('textarea' );
			textarea.id = 'Url';
			textarea.name = 'Url';
			textarea.rows = 2;
			textarea.cols = 60;
			textarea.required = true;
			textarea.classList.add('Url' );
			textarea.title = 'Wprowadź prawidłowy adres URL, do odczytu danych';
			textarea.addEventListener('blur', function(){

				if(DOM.setUrl(this.value ) ){

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
	static htmlAddRow(BoxId, RowId, OptionType ){

		if(typeof BoxId === 'string' && typeof RowId === 'string' && typeof OptionType === 'string' && Object.hasOwn(DOM.Data.Body, RowId ) && DOM.OptionTypes.List.includes(OptionType ) ){
		
			const TdBox = document.getElementById(BoxId );
		
			if(TdBox ){

				if(DOM.OptionTypes[OptionType ].Html.Type === 'start' ){
					
					const RowDiv = document.createElement('div' );
					RowDiv.id = RowId;
					RowDiv.name = 'PropertyRow';
					RowDiv.classList.add('RowDiv' );
					
					DOM.OptionTypes[OptionType ].Html.ChildList.forEach((Child, index ) => {

						RowDiv.appendChild(DOM.OptionTypes.htmlCreateElement(RowId, DOM.OptionTypes[OptionType ].Html[Child ] ) );
					} );
					
					TdBox.appendChild(RowDiv );
				}
				else{

					throw new Error('Nieprawidłowy obiekt !\nId: '+DOM.OptionTypes[OptionType ].Html.Type );
				}
			}
			else{

				throw new Error('Nie znaleziono elementu !\nId: '+BoxId );
			}
		}
		else{
			
			throw new Error('Złe argumenty ! BoxId: '+BoxId+', RowId: '+RowId+', OptionType: '+OptionType+', Object.hasOwn(DOM.Data.Body, RowId ): '+Object.hasOwn(DOM.Data.Body, RowId )+', Includes: '+DOM.OptionTypes.List.includes(OptionType ) );
		}
	}
	
	/*zmienia zawartość wiersza opcji oraz w drzewie dokumentu DOM*/
	static htmlChangeRow(RowId, OptionType ){
		
		if(typeof RowId === 'string' && typeof OptionType === 'string' && Object.hasOwn(DOM.Data.Body, RowId ) && DOM.OptionTypes.List.includes(OptionType ) ){
		
			const RowDiv = document.getElementById(RowId );
		
			if(RowDiv ){
				
				if(DOM.OptionTypes[OptionType ].Html.Type === 'start' ){
					
					RowDiv.replaceChildren();

					DOM.OptionTypes[OptionType ].Html.ChildList.forEach((Child, index ) => {
						
						RowDiv.appendChild(DOM.OptionTypes.htmlCreateElement(RowId, DOM.OptionTypes[OptionType ].Html[Child ] ) );
					} );
				}
				else{

					throw new Error('Nieprawidłowy obiekt !\nId: '+DOM.OptionTypes[OptionType ].Html.Type );
				}
			}
			else{

				throw new Error('Nie znaleziono elementu !\nId: '+RowId );
			}
		}
		else{
			
			throw new Error('Złe argumenty ! RowId: '+RowId+', OptionType: '+OptionType+', Object.hasOwn(DOM.Data.Body, RowId ): '+Object.hasOwn(DOM.Data.Body, RowId )+', Includes: '+DOM.OptionTypes.List.includes(OptionType ) );
		}
	}

	/*wycofane wymagające dopasowania do filozofi*/
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
	
	/*niejasne argumenty*/
	static async showFetchRequest(DataType ){

		const PreparedData = DOM.prepareRequest();

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
		
		if(typeof Url === 'string' && typeof Data === 'object' ){
			
			return fetch(
			
				Url,
				{
					method: 'POST',
					cache: 'reload',
					credentials: 'same-origin',//domyślne ustawinie zezwolenia wysyłania ciasteczek
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(Data )
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
		else{

			throw new Error('Złe argumenty ! Url: '+Url+', Data: '+Data );
		}
	}
}
