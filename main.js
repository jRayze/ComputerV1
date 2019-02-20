    function parseCalculator() {
        var sequence = document.getElementById('func').value
        console.log(sequence)
        stringoutofspace = sequence.replace(/\s/g,'')
        console.log(stringoutofspace);
        return stringoutofspace.split("=")
    }

	function mergeRightToLeft(tabChar) {
		//fonction qui addition les valeurs x apres le égal avec celle avant le egal --- penser a inverser la valeur "1x = -1x"
		var tabGauche = new Array()
		var tabDroite = new Array()
		var tabResult = new Array()
		
		tabGauche = splitBySymbol(tabChar[0])
		tabDroite = splitBySymbol(tabChar[1])
	
	}
	
	function splitBySymbol(tabChar) {
		//verifier si on split par - et + si ca fonctionne (idee = si - et precede d'un plus on annule le + et on ajoute le moin a la valeur qui suit)
		var cpyTabChar = tabChar.replace(/-/gi, "+-");
		//console.log(cpyTabChar);
		var tabSplitSymbol = cpyTabChar.split("+")
		if (tabSplitSymbol[0] == ""){
			tabSplitSymbol.splice(0,1);
		}
		console.log(tabSplitSymbol);
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
        return FALSE
      var res = ((b * - 1) - racineDelta) / (2 * a)
      return res
    }
	
    function calculSolution2(a, b, delta) {
      var racineDelta = racineCarre(delta)
      if (racineDelta == 0)
        return FALSE
      var res = ((b * - 1) + racineDelta) / (2 * a)
      return res
    }
    function racineCarre(val) {
      var i = 0;
      var res = 0;
      var isneg = 0;

      if (val == 0)
        return 0
      if (val < 0) {
        isneg = 1;
        val *= -1
      }
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