    function parseCalculator() {
        var sequence = document.getElementById('func').value
        console.log(sequence)
        stringoutofspace = sequence.replace(/\s/g,'')
        console.log(stringoutofspace);
        return stringoutofspace.split("")
    }

    function indexation(tabChar) {
        var cpt = 0;
        var tabEquation = new Array();
        while (tabChar[cpt]) {
            var str = new Array()
            while(tabChar[cpt] != '*' && tabChar[cpt] != '^' && tabChar[cpt] != '-' && tabChar[cpt] != '+' && tabChar[cpt] != '\'' && tabChar[cpt] != '=' && tabChar[cpt]) {
                str = str + tabChar[cpt]
                cpt++
            }
            //console.log('tutu2')
            tabEquation.push(str)
            tabEquation.push(tabChar[cpt])
            cpt++;
        }
        for (var i in tabEquation) {
            console.log(tabEquation[i] + " ")
        }
        determineCas(tabEquation)
    }
    
    function determineCas(tabEquation) {
        var pos = 0
        var a = 0;
        var b = 0;
        var c = 0;
        while (tabEquation[pos] != "=") {
            if (tabEquation[pos] == 'x') {
                if (tabEquation[pos + 1] == '^') {
                    pos += 2
                }
                else
                    pos++
                if (a == 0) 
                    a = 1
                else if (b == 0)
                    b = 1
                else if (c == 0)
                    c = 1
            }
            else if (parseInt(tabEquation[pos])) {
                if (a == 0) {
                   a = parseInt(tabEquation[pos])
                }
                else if (b == 0) { 
                    b = parseInt(tabEquation[pos])
                } 
                else if (c == 0) {
                  c = parseInt(tabEquation[pos])
                }
                if (tabEquation[pos + 1] && tabEquation[pos + 1] == "x")
                {
                    while (tabEquation[pos] != "+" && tabEquation[pos] != "-" && tabEquation[pos] != "/" && tabEquation[pos] != "*" && tabEquation[pos] != "="){
                        pos++;
                    }
                }
                
            }
            pos++
        }
        if ((a == 0 || b == 0 || c == 0) && parseInt(tabEquation[pos + 1]) != 0)
        {
            if (a == 0) 
                a = parseInt(tabEquation[pos + 1]) * -1
            else if (b == 0)
                b = parseInt(tabEquation[pos + 1]) * -1
            else if (c == 0)
                c = parseInt(tabEquation[pos + 1]) * -1
        }
        else {
            
        }

        casEquationABC(a, b, c);
    }

    function casEquationABC(a, b, c) {
        console.log("a = " + a);
        console.log("b = " + b);
        console.log("c = " + c);
    }

    function execCalculator() {
        var tabChar = parseCalculator()
        /*tabChar.forEach(Element => {
            console.log(Element + ' // ')
        });*/
        indexation(tabChar)



    }
    /*
  function parseCalculator() {
        var sequence = document.getElementById('func').value
        console.log(sequence)
        stringoutofspace = sequence.replace(/\s/g,'')
        console.log(stringoutofspace);
        return stringoutofspace.split("");
    }

    function indexation(tabChar) {
        var cpt;
        var symb = new Array( '=', 'X',  '/' , '*', '+', '-', '^')
        var number = new Array ('0','1', '2', '3', '4', '5', '6', '7', '8', '9')
        tabChar.forEach(elem => {
          if (symb.indexOf(elem) == -1 && number.indexOf(elem) == -1 ) {
            console.log("Error :"+elem+" in equation, set valid equation !")
          }
        });
        console.log('tutu');
        while (tabChar[cpt]) {
            var str = new Array()
            var number = 0;
            while(symb.indexOf(elem) == -1 && tabChar[cpt]) {
                str = str + tabChar[cpt]
                cpt++;
            }
            if (tabChar[cpt] && sym.indexOf(tabChar[cpt])) {
              switch (tabChar[cpt]) {
                  case "X":
                    break;
                  case "=":
                    break;
                  case "/":
                    break;
                  case "*":
                    break;
                  case "+":
                    break;
                  case "-":
                    break;
                  case "^":
                    break;
                default:

              }
            }
            number = parseInt(str)
            console.log(number);
            cpt++;
        }
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
        var a = 1
        var b = 1
        var c = -2
        var delta = calculDelta(a,b,c)
        console.log("a = "+a+" b = "+b+" delta = "+delta)
        console.log("solution 1 : " + calculSolution1(a,b,delta))
        console.log("solution 2 : " + calculSolution2(a,b,delta))

        indexation(tabChar)


    }*/