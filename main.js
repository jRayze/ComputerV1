    function parseCalculator() {
        var sequence = document.getElementById('func').value
        console.log(sequence)
        sequence = sequence.replace('/*/g','')
        stringoutofspace = sequence.replace(/\s/g,'')
        console.log(stringoutofspace);
        return stringoutofspace.split("=")
    }

	function mergeRightToLeft(tabChar) {
		//fonction qui addition les valeurs x apres le égal avec celle avant le egal --- penser a inverser la valeur "1x = -1x"
		var tabGauche = new Array()
		var tabDroite = new Array()
		var tabResult = new Array()
        var a = 0.00
        var b = 0.00
        var c = 0.00

        tabGauche = splitBySymbol(tabChar[0])
        console.log(tabGauche);
		tabDroite = splitBySymbol(tabChar[1])
        console.log(tabDroite)
        for (var i = 0; tabDroite[i]; i++) {
            var posxcarre = tabDroite[i].search(/x\^2/gi)
            var posx = tabDroite[i].search(/x/gi)
            var posnum = tabDroite[i].search(/\d/gi)
            if(posxcarre != -1) {
                if (tabDroite[posxcarre - 1]) {
                    var value = parseInt(tabDroite[posxcarre - 1])
                    if (!isNaN(value)) {
                        a -= value  
                    }
                    else
                        a -= 1;
                }
                else
                    a -= 1;
            }
            if (posx != -1) {
                if (tabDroite[posx -1]) {
                    var value = parseInt(tabDroite[posx -1])
                    if (!isNaN(value)) {
                        b -= value
                    }
                    else
                        b -= 1;
                }
                else
                    b -= 1;
            }
            if (posnum != -1) {
                if ((tabDroite[posnum - 1] && tabDroite[posnum -1] == '^') 
                    || (tabDroite[posnum + 1] && tabDroite[posnum + 1] == 'x')) {
                        c -= 0;
                }
                else {
                    if (tabDroite[posnum] != '0' && !isNaN(parseInt(tabDroite[posnum]))) {
                        c -= parseInt(tabDroite[posnum]);
                        console.log("c droite = "+c);
                        console.log("--")
                    }
                }
                    
            }
            //console.log("match x^2 a la position "+posxcarre);
        }
        for (var i = 0; tabGauche[i]; i++) {
            var posxcarre = tabGauche[i].search(/x\^2/gi)
            var posx = tabGauche[i].search(/x/gi)
            var posnum = tabGauche[i].search(/[0-9]/gi)
            if(posxcarre != -1) {
                if (tabGauche[posxcarre - 1]) {
                    var value = parseInt(tabGauche[posxcarre - 1])
                    if (!isNaN(value)) {
                        a += value  
                    }
                    else
                        a += 1;
                }
                else
                    a += 1;
            }
            if (posx != -1) {
                if (tabGauche[posx -1]) {
                    var value = parseInt(tabGauche[posx -1])
                    if (!isNaN(value)) {
                        b += value
                    }
                    else
                        b += 1;
                }
                else
                    b += 1;
            }
            if (posnum != -1) {
                if (!((tabGauche[posnum - 1] && tabGauche[posnum -1] == '^') 
                    || (tabGauche[posnum + 1] && tabGauche[posnum + 1] == 'x'))) {
                        if (tabGauche[posnum] != '0' && !isNaN(parseInt(tabGauche[posnum]))) {
                            c += parseInt(tabGauche[posnum]);
                            console.log("c gauche = "+c);
                        }
                }
            }
        }
        solution(a, b, c)
	}
	
	function splitBySymbol(tabChar) {
		//verifier si on split par - et + si ca fonctionne (idee = si - et precede d'un plus on annule le + et on ajoute le moin a la valeur qui suit)
		var cpyTabChar = tabChar.replace(/-/gi, "+-");
		//console.log(cpyTabChar);
		var tabSplitSymbol = cpyTabChar.split("+")
		if (tabSplitSymbol[0] == ""){
			tabSplitSymbol.splice(0,1);
		}
        //console.log(tabSplitSymbol);
        //mergeRightToLeft(tabSplitSymbol);
		/*switch(tabSplitSymbol) {
			case :
			break;
			case :
			break;
			case :
			break;
			case :
			break;
			
		}*/
		return tabSplitSymbol;
	}
	
    function indexation(tabChar) {
		mergeRightToLeft(tabChar)
		/*getABC(tabChar)
        solution(a, b, c)*/
        //solution(1, 2, 0);
    }
    
    function getABC(tabEquation) {
		var a = 0; //x^2
		var b = 0; //x
		var c = 0; //nb
		//recupere et addition les valeurs des differents x (x^2 ; x ; nb)
    }

	//5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0
	
    function solution(a, b, c) {
        console.log("a = " + a)
        console.log("b = " + b)
        console.log("c = " + c)
        var delta = calculDelta(a,b,c)
        document.getElementById("result").innerHTML= "<div>Discriminant is strictly positive, the two solutions are:</div><div>"+ "a = "+a+"</div><div> b = "+b+"</div><div> delta = "+delta+"</div><div>The solution 1 : " + calculSolution1(a,b,delta)+"</div><div>The solution 2 : "+calculSolution2(a,b,delta)+"<div>";
		console.log("Discriminant is strictly positive, the two solutions are:")
        console.log("a = "+a+" b = "+b+" delta = "+delta)
        console.log("The solution 1 : " + calculSolution1(a,b,delta))
        console.log("The solution 2 : " + calculSolution2(a,b,delta))
    }
	
	function calculDelta(a, b, c) {
      var res = (b * b) - ((4 * a) * c)
      return res;
    }
    function calculSolution0(a, b) {
      return (b * -1) / (2 * a)
    }
    function calculSolution1(a, b, delta) {
      var racineDelta = racineCarre(delta)
      if (racineDelta == 0)
        return 0
      var res = ((b * - 1) - racineDelta) / (2 * a)
      return res
    }
	
    function calculSolution2(a, b, delta) {
      var racineDelta = racineCarre(delta)
      if (racineDelta == 0)
        return 0
      var res = ((b * - 1) + racineDelta) / (2 * a)
      return res
    }
    function racineCarre(val) {
      var i = 0
      var res = 0
      var isneg = 0

      if (val <= 0)
        return 0
      while (i <= (val / 2)) {
        if ((i * i) == val) {
          return (isneg == 1) ? i * -1 : i;
        }
        i++;
      }
      return 0
    }

   function execCalculator() {
        var tabChar = parseCalculator()
        tabChar.forEach(Element => {
            console.log(Element + ' // ')
        });
        indexation(tabChar)
    }

    function parseInt(x) {
        return Number.parseFloat(x).toFixed(10)
    }