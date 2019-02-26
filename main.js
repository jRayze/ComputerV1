    function parseCalculator(text) {
        var stringparce = text.replace(/x\^0\s/gi,'')
		stringparce = stringparce.replace(/x\^1\s/gi,'x')
        stringparce = stringparce.replace(/\*/g,'')
		stringparce = stringparce.replace(/\s/g,'')
        console.log(stringparce)
        return stringparce.split("=")
    }
// il faut gerer le cas x * 5 c'est egal a 5x - il faut gere les equations du premier degré, on cherche si il y a des x^2 si il y en a pas c'est une equation du premier degré - il faut afficher les etapes intermediaires - 
/*
** a = 5 - 1 = 4 
** b = 4
** c = -9,3
** delta = 
*/
	function checkIfPuiExist(tableau, puissance) {
		var index = 0
		for (var i in tableau) {
			let line = tableau[i]
			if (line.puissance == puissance) {
				console.log("lol"+puissance)
				return index
			}
			index++
		}
		return -1
	} 

	function mergeRightToLeft(tabChar) {
		//fonction qui additionne les valeurs x apres le égal avec celle avant le egal --- penser a inverser la valeur "1x = -1x"
		var tabGauche = new Array()
		var tabDroite = new Array()
		var tabResult = new Array()
        var a = 0.00
        var b = 0.00
        var c = 0.00
		var tabPui = [];

        tabGauche = splitBySymbol(tabChar[0])
        console.log(tabGauche);
		tabDroite = splitBySymbol(tabChar[1])
        console.log(tabDroite)
        for (var i = 0; tabDroite[i]; i++) {
            var index = tabDroite[i].search(/x\d/)
            if (index != -1) {
                tabDroite[i] = tabDroite[i].substr(1) + 'x'
            }  
            console.log("tabDroite[i] = "+tabDroite[i])
            //var posxcarre = tabDroite[i].search(/x\^2/gi)
            var posx = tabDroite[i].search(/x/gi)
            var posnum = tabDroite[i].search(/\d/gi)
            var posxpui = tabDroite[i].search(/x\^[0-9]/gi)
			if (posxpui != -1) {
				var pui = parseFloat(tabDroite[i].substr(posxpui + 2))
				var index = checkIfPuiExist(tabPui, pui)
				if (tabDroite[i][posxpui -1]) {
					var tdv = tabDroite[i].substr(0, posxpui);
					var value = parseFloat(tdv)
					if (!isNaN(value)) {
						console.log(value)
						if (index == -1) {
							tabPui.push({puissance: pui, valeur : value})
						}
						else {
							tabPui[index].valeur -= value
						}
						console.log("tabpui = "+tabPui);
					}
				}
				else {
					if (index == -1) {
						tabPui.push({puissance: pui, valeur : -1.00})
					}
					else {
						tabPui[index].valeur -= 1.00
					}
					//console.log("tabpui = "+tabPui);
				}
				console.log('pui = '+pui)
			}
            else if (posx != -1) {
				var index = checkIfPuiExist(tabPui, 1)
                if (tabDroite[i][posx -1]) {
                    var tdv = tabDroite[i].substr(0)
                    var value = parseFloat(tdv)
                    if (!isNaN(value)) {
						console.log(value)
						if (index == -1) {
							tabPui.push({puissance: 1, valeur : value})
						}
						else {
							tabPui[index].valeur -= value
						}
						console.log("tabpui = "+tabPui);
					}
                }
                else {
					if (index == -1) {
						tabPui.push({puissance: 1, valeur : -1.00})
					}
					else {
						tabPui[index].valeur -= 1.00
					}
				}
            }
            else if (posnum != -1) {
                var index = checkIfPuiExist(tabPui, 0)
				var value = parseFloat(tabDroite[i]);
				if (index == -1) {
					tabPui.push({puissance: 0, valeur : value})
				}
				else {
					tabPui[index].valeur -= value
				}
            }
        }
        for (var i = 0; tabGauche[i]; i++) {
            var index = tabGauche[i].search(/x\d/)
            if (index != -1) {
                tabGauche[i] = tabGauche[i].substr(1) + 'x'
            }  
            console.log("tabGauche[i] = "+tabGauche[i])
            //var posxcarre = tabGauche[i].search(/x\^2/gi)
            var posx = tabGauche[i].search(/x/gi)
            var posnum = tabGauche[i].search(/\d/gi)
            var posxpui = tabGauche[i].search(/x\^[0-9]/gi)
			if (posxpui != -1) {
				var pui = parseFloat(tabGauche[i].substr(posxpui + 2))
				var index = checkIfPuiExist(tabPui, pui)
				if (tabGauche[i][posxpui -1]) {
					var tdv = tabGauche[i].substr(0, posxpui);
					var value = parseFloat(tdv)
					if (!isNaN(value)) {
						console.log(value)
						console.log("puissance : "+pui);
						console.log("index : "+index);
						if (index == -1) {
							tabPui.push({puissance: pui, valeur : value})
						}
						else {
							tabPui[index].valeur += value
						}
						console.log("tabPui->puissance = "+tabPui[1].puissance);
						console.log("tabpui = "+tabPui);
					}
				}
				else {
					if (index == -1) {
						tabPui.push({puissance: pui, valeur : 1.00})
					}
					else {
						tabPui[index].valeur += 1.00
					}
					//console.log("tabpui = "+tabPui);
				}
				console.log('pui = '+pui)
			}
            else if (posx != -1) {
				var index = checkIfPuiExist(tabPui, 1)
                if (tabGauche[i][posx -1]) {
                    var tdv = tabGauche[i].substr(0)
                    var value = parseFloat(tdv)
                    if (!isNaN(value)) {
						console.log(value)
						if (index == -1) {
							tabPui.push({puissance: 1, valeur : value})
						}
						else {
							tabPui[index].valeur += value
						}
						console.log("tabpui = "+tabPui);
					}
                }
                else {
					if (index == -1) {
						tabPui.push({puissance: 1, valeur : 1.00})
					}
					else {
						tabPui[index].valeur += 1.00
					}
				}
            }
            else if (posnum != -1) {
                var index = checkIfPuiExist(tabPui, 0)
				var value = parseFloat(tabGauche[i]);
				if (index == -1) {
					tabPui.push({puissance: 0, valeur : value})
				}
				else {
					tabPui[index].valeur += value
				}
            }
        }
		selectSolution(tabPui);
	}
	
	function selectSolution(tabPui) {
		var degreZero = false;
		var degreUn = false;
		var degreDeux = false;
		var degreEleve = false;
		var a = 0.00;
		var b = 0.00;
		var c = 0.00;
		for (let i in tabPui) {
			let elem = tabPui[i]
			console.log(elem);
			console.log("Puissance = "+elem.puissance+" and value = "+elem.valeur);
			if (elem.puissance >= 3) {
				degreEleve = true
			}
			else if (elem.puissance == 2) {
				a = elem.valeur
				degreDeux = true
			}
			else if (elem.puissance == 1) {
				b = elem.valeur
				degreUn = true
			}
			else if (elem.puissance == 0) {
				c = elem.valeur
				degreZero = true;
			}
		}
		if (degreEleve == true) {
			console.log("il faut reduire l'equation");
		}
		else if (degreDeux == true && a != 0) {
			solution(a,b,c);
		}
		else if (degreUn && b != 0) {
			solutionEquationDegreUn(b, c);
		}
		else if (degreZero && c != 0) {
			solutionEquationDegreZero(c);
		}
		else {
			console.log("L'equation n'est pas resoluble, tout les nombres sont admis !");
		}
	}
	
	function solutionEquationDegreUn(b, c) {
		console.log("reponse = "+ (c/b));
		$('.message_input').val(c /b)
        $('.send_message').click()
	}
	
	function splitBySymbol(tabChar) {
		//verifier si on split par - et + si ca fonctionne (idee = si - et precede d'un plus on annule le + et on ajoute le moins a la valeur qui suit)
		var cpyTabChar = tabChar.replace(/-/gi, "+-");
		var tabSplitSymbol = cpyTabChar.split("+")
		if (tabSplitSymbol[0] == ""){
			tabSplitSymbol.splice(0,1);
		}
		return tabSplitSymbol;
	}
	
    function indexation(tabChar) {
		mergeRightToLeft(tabChar)
    }
    
    function solution(a, b, c) {
        console.log("a = " + parseFloat(a))
        console.log("b = " + parseFloat(b))
        console.log("c = " + parseFloat(c))
        var delta = calculDelta(a,b,c)
        if (delta == 0) {
            var reponse = "Discriminant equal 0, one solution:<br>"
            reponse = reponse + "The solution : " + calculSolution0(a, b).toFixed(6)+"<br>"
        }
        else if (delta > 0) {
            var reponse = "Discriminant is strictly positive, the two solutions are:<br>"
           // reponse = reponse + "a = "+a+" b = "+b+" delta = "+delta+"<br>"
            reponse = reponse + "The solution 1 : " + calculSolution1(a,b,delta).toFixed(6)+"<br>"
            reponse = reponse + "The solution 2 : " + calculSolution2(a,b,delta).toFixed(6)+"<br>"
        }
        else {
            var reponse = "Discriminant is negative, no solution."
        }
        $('.message_input').val(reponse)
        $('.send_message').click()
        
    }
	
	function calculDelta(a, b, c) {

      var res = (b * b) - ((4 * a) * c)
      return res;
    }
    function calculSolution0(a, b) {
      return (b * -1) / (2 * a)
    }
    function calculSolution1(a, b, delta) {
        var racineDelta = racineCarre(delta, 1.0, 0.0, 0.0)
        console.log("racine delta = "+racineDelta);
        if (racineDelta == 0) {
            return 0
        }
        var res = ((b * - 1) - racineDelta) / (2 * a)
        console.log ("b * -1 = "+(b * -1)+" racineDelta = "+racineDelta+" 2 * a = "+(2 * a))
        console.log(res)
        return res
    }
	
    function calculSolution2(a, b, delta) {
        var racineDelta = racineCarre(delta, 1.0, 0.0, 0.0)
        if (racineDelta == 0) {
            return 0
        }
        var res = ((b * - 1) + racineDelta) / (2 * a)
        console.log ("b * -1 = "+(b * -1)+" racineDelta = "+racineDelta+" 2 * a = "+(2 * a))
        console.log(res)
        return res
    }
    function racineCarre(val, add, start, end) {
        var i = parseFloat(0.0 + start)
        var res = 0

        if (val <= 0)
            return 0
        if (val == add)
            return (val)
        while (i <= (val / 2)) {
            if ((i * i) == val) {
                return i;
            }
            else if ((i * i) < val && ((i + add) * (i + add)) > val) {
                if (end == 7) {
                    if (i > (add * 5)) {
                        return start + (add * 10)
                    }
                    else
                        return start
                }
                return (racineCarre(val, (add / 10), i, end + 1))
            }
            i += add;
        }
        return 0.00
    }

   function execCalculator(text) {
        var tabChar = parseCalculator(text)
        tabChar.forEach(Element => {
            console.log(Element + ' // ')
        });
        indexation(tabChar)
    }

    (function () {
        var Message;
        Message = function (arg) {
            this.text = arg.text, this.message_side = arg.message_side;
            this.draw = function (_this) {
                return function () {
                    var $message;
                    $message = $($('.message_template').clone().html());
                    $message.addClass(_this.message_side).find('.text').html(_this.text);
                    $('.messages').append($message);
                    return setTimeout(function () {
                        return $message.addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };
        $(function () {
            var getMessageText, message_side, sendMessage;
            message_side = 'right';
            getMessageText = function () {
                var $message_input;
                $message_input = $('.message_input');
                return $message_input.val();
            };
            sendMessage = function (text) {
                var retour
                var $messages, message;
                if (text.trim() === '') {
                    return;
                }
                $('.message_input').val('');
                $messages = $('.messages');
                message_side = message_side === 'left' ? 'right' : 'left';
                message = new Message({
                    text: text,
                    message_side: message_side
                });
                message.draw();
                if (message_side === 'right')
                    retour = execCalculator(text);
                return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
            };
            $('.send_message').click(function (e) {
                return sendMessage(getMessageText());
            });
            $('.message_input').keyup(function (e) {
                if (e.which === 13) {
                    return sendMessage(getMessageText());
                }
            });
            sendMessage('Veuilez entrer une equation');
            setTimeout(function () {
                return sendMessage('');
            }, 1000);
        });
    }.call(this));