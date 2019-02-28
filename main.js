    function isAlpha(index, ch){
        console.log(ch)
        console.log(index)
        let res
        index = ch.search(/\D/gi)
        if (index != -1 && ch[index]) {
            switch (ch[index]) {
                case 'x': case 'X': case '*': case '+': case '-': case '=': case '^': case '.': case ' ':
                    res = isAlpha(index + 1, ch.substr(index + 1))
                    break;
                default :
                    res = 1;
                    break;
            }
            /*if (ch[index] != 'x' && ch[index] != 'X' && ch[index] != '*' && ch[index] != '+' && ch[index] != '-' && ch[index] != '=' && ch[index] != '^' && ch[index] != '.' && ch[index] != ' ')
                return 1
            else 
                return isAlpha(index + 1, ch.substr(index + 1))*/
        }
        return res
    }  

    function notHaveEqual(text){
        if (text.search(/=/gi) == -1)
            return 1
        return 0
    }

    function parseDoubleX(text) {
        if (text.search(/xx/gi) != -1 || text.search(/x/gi) != -1 ||text.search(/x\=/gi) != -1 || text.search(/x\-/gi) != -1 || text.search(/x\^/gi) != -1) {
            return 1
        }
        return 0
    }

    function parseCalculator(text) {
        if (isAlpha(0, text) == 1 || notHaveEqual(text) == 1) {
            var reponse = "Veuillez entrer une equation valide"
            console.log(reponse + "toto")
            $('.message_input').val(reponse)
            $('.send_message').click()
            return 
        }
        var stringparce = text.replace(/x\^0\s/gi,'')
        stringparce = stringparce.replace(/x\^1\s/gi,'x')
        stringparce = stringparce.replace(/\s/g,'')
        if ( parseDoubleX(text) == 1) {
            var reponse = "Veuillez entrer une equation valide"
            console.log(reponse)
            $('.message_input').val(reponse)
            $('.send_message').click()
            return 
        }
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
    function multiplyX(nbX, nbMul) {
        var x = parseFloat(nbX)
        var Mul = parseFloat(nbMul)
        return (nbX * nbMul)
    }
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

    function fillTabPuissance(tab, tabPui, isneg) {
        for (var i = 0; tab[i]; i++) {
            var indexmul = tab[i].search(/x\^[0-9]+/gi)
            if (indexmul != -1) {
                var cpt = indexmul + 2
                while (tab[i][cpt] && tab[i][cpt] != '*' ) {
                    cpt++
                }
                var symb = tab[i][cpt]
                console.log("symb= "+symb)
                if (tab[i][cpt] && tab[i][cpt + 1]) {
                    cpt++
                    var newstr = tab[i].substr(cpt)
                    console.log("substr1 = "+newstr)
                    tab[i] = newstr + tab[i].substr(0, cpt)
                }
            }
            tab[i] = tab[i].replace(/\*/g,'');
            var index = tab[i].search(/x\d/)
            if (index != -1) {
                tab[i] = tab[i].substr(index + 1) + 'x'
                console.log("substr = "+tab[i])
            }  
            console.log("tab[i] = "+tab[i])
            var posx = tab[i].search(/x/gi)
            var posnum = tab[i].search(/\d/gi)
            var posxpui = tab[i].search(/x\^[0-9]+/gi)
			if (posxpui != -1) {
				var pui = parseFloat(tab[i].substr(posxpui + 2))
				var index = checkIfPuiExist(tabPui, pui)
				if (tab[i][posxpui -1]) {
					var tdv = tab[i].substr(0, posxpui);
					var value = parseFloat(tdv)
					if (!isNaN(value)) {
						console.log(value)
						if (index == -1) {
							tabPui.push({puissance: pui, valeur : (isneg == 0) ? value : value * -1 })
						}
						else {
							tabPui[index].valeur += (isneg == 0) ? value : value * -1
						}
						console.log("tabpui = "+tabPui);
					}
				}
				else {
					if (index == -1) {
						tabPui.push({puissance: pui, valeur : (isneg == 0) ? 1.00 : -1.00 })
					}
					else {
						tabPui[index].valeur += (isneg == 0) ? 1.00 : -1.00
					}
				}
				console.log('pui = '+pui)
			}
            else if (posx != -1) {
				var index = checkIfPuiExist(tabPui, 1)
                if (tab[i][posx -1]) {
                    var tdv = tab[i].substr(0)
                    var value = parseFloat(tdv)
                    if (!isNaN(value)) {
						console.log(value)
						if (index == -1) {
							tabPui.push({puissance: 1, valeur : (isneg == 0) ? value : value * -1 })
						}
						else {
							tabPui[index].valeur += (isneg == 0) ? value : value * -1
						}
						console.log("tabpui = "+tabPui);
					}
                }
                else {
					if (index == -1) {
						tabPui.push({puissance: 1, valeur : (isneg == 0) ? 1.00 : -1.00})
					}
					else {
						tabPui[index].valeur += (isneg == 0) ? 1.00 : -1.00
					}
				}
            }
            else if (posnum != -1) {
                var index = checkIfPuiExist(tabPui, 0)
				var value = parseFloat(tab[i]);
				if (index == -1) {
					tabPui.push({puissance: 0, valeur : (isneg == 0) ? value : value * -1})
				}
				else {
					tabPui[index].valeur += (isneg == 0 ) ? value : value * -1
				}
            }
        }
        return tabPui
    }

	function getTabPuissance(tabChar) {
		//fonction qui additionne les valeurs x apres le égal avec celle avant le egal --- penser a inverser la valeur "1x = -1x"
		var tabGauche = new Array()
		var tabDroite = new Array()
        var tabEqGauche = [];
        var tabEqDroite = [];
        var tabResult = [];

        tabGauche = splitBySymbol(tabChar[0])
        console.log(tabGauche);
		tabDroite = splitBySymbol(tabChar[1])
        console.log(tabDroite)
        tabResult = fillTabPuissance(tabGauche, tabResult, 0)
        console.log(tabEqGauche)
        tabResult = fillTabPuissance(tabDroite, tabResult, 1)
        for (var i in tabResult) {
            var elem = tabResult[i];
            console.log(i+": Puissance = "+elem.puissance+" | Valeur = "+elem.valeur)
        }
        tabResult.sort(function(a, b) {
            return b.puissance - a.puissance;
        });
		selectSolution(tabResult);
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
            //reduction(tabPui)
			console.log("il faut reduire l'equation");
		}
		else if (degreDeux == true && a != 0) {
            var reponse = reduction(tabPui)
			solutionDegreDeux(a,b,c, reponse);
		}
		else if (degreUn && b != 0) {
            var reponse = reduction(tabPui)
			solutionEquationDegreUn(b, c, reponse);
		}
		else if (degreZero && c != 0) {
            var reponse = reduction(tabPui)
			solutionEquationDegreZero(reponse);
		}
		else {
            var reponse = "Reduction : 0 = 0<br>L'equation n'est pas resoluble, tout les nombres reels sont admis !";
            console.log(reponse)
            $('.message_input').val(reponse)
            $('.send_message').click()
		}
    }
    
    function solutionDegreDeux(a, b, c, reponse) {
        console.log("a = " + parseFloat(a))
        console.log("b = " + parseFloat(b))
        console.log("c = " + parseFloat(c))
        var delta = calculDelta(a,b,c)
        if (delta == 0) {
            reponse = reponse + "<br>Le discriminant est 0, la solution est :<br>"
            reponse = reponse + "Solution : " + calculSolution0(a, b).toFixed(6)+"<br>"
        }
        else if (delta > 0) {
            reponse = reponse + "<br>Le discriminant est positif, les deux solutions sont :<br>"
           // reponse = reponse + "a = "+a+" b = "+b+" delta = "+delta+"<br>"
            reponse = reponse + "Solution 1 : " + calculSolution1(a,b,delta).toFixed(6)+"<br>"
            reponse = reponse + "Solution 2 : " + calculSolution2(a,b,delta).toFixed(6)+"<br>"
        }
        else {
            reponse =  reponse + "<br>Le discriminant est negatif, il n'y a aucune solution pour les nombres reels."
        }
        $('.message_input').val(reponse)
        $('.send_message').click()
    }

    function reduction(tabPui) {
        var reduct = "Reduction : ";
        for (var i in tabPui) {
           let elem = tabPui[i];
            if (i > 0) {
                reduct = reduct + " + ";
            }
            reduct = reduct + elem.valeur + "X^"+elem.puissance; 
        }
        reduct = reduct + " = 0"
        console.log(reduct);
        return reduct
    }

	function solutionEquationDegreUn(b, c, reponse) {
        reponse = reponse +"<br>Equation du premier degre, la solution est : <br>" +((c * -1)/b)
		$('.message_input').val(reponse)
        $('.send_message').click()
    }
    
    function solutionEquationDegreZero(reponse) {
        reponse = reponse+"<br> Il n'y a pas de solution pour les nombres reels !"
        $('.message_input').val(reponse)
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
		getTabPuissance(tabChar)
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

    $(function () {
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

    // code de base pour les tabs Gauche et Droite
            /*for (var i = 0; tabDroite[i]; i++) {
            var indexmul = tabDroite[i].search(/x\^[0-9]+/gi)
            if (indexmul != -1) {
                var cpt = indexmul + 2
                while (tabDroite[i][cpt] && tabDroite[i][cpt] != '*' ) {
                    cpt++
                }
                var symb = tabDroite[i][cpt]
                console.log("symb= "+symb)
                if (tabDroite[i][cpt] && tabDroite[i][cpt + 1]) {
                    cpt++
                    var newstr = tabDroite[i].substr(cpt)
                    console.log("substr1 = "+newstr)
                    tabDroite[i] = newstr + tabDroite[i].substr(0, cpt)
                }
            }*/
            //tabDroite[i] = tabDroite[i].replace(/\*/g,'');
           /* var index = tabDroite[i].search(/x\d/)
            if (index != -1) {
                tabDroite[i] = tabDroite[i].substr(index + 1) + 'x'
                console.log("substr = "+tabDroite[i])
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
							tabPui.push({puissance: pui, valeur : (value * -1)})
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
							tabPui.push({puissance: 1, valeur : (value * -1)})
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
					tabPui.push({puissance: 0, valeur : (value * -1)})
				}
				else {
					tabPui[index].valeur -= value
				}
            }
        }
        for (var i = 0; tabGauche[i]; i++) {
            var indexmul = tabGauche[i].search(/x\^[0-9]+/gi)
            if (indexmul != -1) {
                var cpt = indexmul + 2
                while (tabGauche[i][cpt] && tabGauche[i][cpt] != '*' ) {
                    cpt++
                }
                var symb = tabGauche[i][cpt]
                console.log("symb= "+symb)
                if (tabGauche[i][cpt] && tabGauche[i][cpt + 1]) {
                    cpt++
                    var newstr = tabGauche[i].substr(cpt)
                    console.log("substr1 = "+newstr)
                    tabGauche[i] = newstr + tabGauche[i].substr(0, cpt)
                }
            }*/
            //tabGauche[i] = tabGauche[i].replace(/\*/g,'');
           /* var index = tabGauche[i].search(/x\d/)
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
						console.log("tabPui->puissance = "+tabPui[0].puissance);
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
        }*/