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
        if (c == 0 && parseInt(tabEquation[pos + 1]) != 0)
        {
            c = parseInt(tabEquation[pos + 1]) * -1
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