    function isAlpha(index, ch){
        let res = 0
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
        }
        return res
    }  

    function notHaveEqual(text){
        if (text.search(/=/gi) == -1)
            return 1
        return 0
    }

    function checkCombinaison(text) {
        var index;
        var point = -1
        if ((point = text.search(/\./gi)) != -1) {
            if ((text[point - 1] && isNaN(parseInt(text[point - 1]))) || (text[point + 1] && isNaN(parseInt(text[point + 1]))))
                return 1
        }
        if ((point = text.search(/\^[0-9]+\./gi)) != -1){
            return 1
        }
        if ((point = text.search(/\^[0-9]+\.?[0-9]*\*/gi))!= -1 || (point = text.search(/\^[0-9]+\.?[0-9]*x/gi))!= -1){
            return 1
        }
        if ((point = text.search(/[0-9]+\*x[0-9]/gi)) != -1) {
            return 1
        }
        for (index = 0; text[index]; index++) {
            if (text[index] == 'x' || text[index] == 'X') {
                if (text[index + 1] && text[index + 1] != "-" && text[index + 1] != "+" && text[index + 1] != "=" && text[index + 1] != "^" && isNaN(parseInt(text[index + 1]))) {
                    if (text[index + 1] == "*" && !text[index - 1] && text[index + 2] && !isNaN(parseInt(text[index + 2]))) {
                        continue;
                    }
                    return 1
                }
            }
            else if (text[index] == '*') {
                if (text[index + 1] && text[index + 1] != "x" && text[index + 1] != "X" && text[index + 1] != "-" && isNaN(parseInt(text[index + 1]))) {
                    return 1
                }
            }
            else if (text[index] == "+") {
                if (text[index + 1] && text[index + 1] != "x" && text[index + 1] != "X" && text[index + 1] != "-" && isNaN(parseInt(text[index + 1]))) {
                    return 1
                }
            }
            else if (text[index] == "-") {
                if (text[index + 1] && text[index + 1] != "x" && text[index + 1] != "X" && isNaN(parseInt(text[index + 1]))) {
                    return 1
                }
            }
            else if (text[index] == "=") {
                if ((text[index + 1] && isNaN(parseInt(text[index + 1]))) && text[index + 1] != "-" && text[index + 1] != "x" && text[index + 1] != "X") {
                    return 1
                }
                if (!text[index + 1]) {
                    return 1
                }
            }
            else if (text[index] == "^") {
                if (text[index + 1] && isNaN(parseInt(text[index + 1]))) {
                    return 1
                }
            }
        }
        return 0
    }

    function parseCalculator(text) {
        if (isAlpha(0, text) == 1 || notHaveEqual(text) == 1) {
            var reponse = "Veuillez entrer une equation valide !"
            console.log(reponse)
            $('.message_input').val(reponse)
            $('.send_message').click()
            return 
        }
        var stringparce = text.replace(/\*?\s*x\^0\s/gi,'')
        stringparce = stringparce.replace(/\*?\s*x\^1\s/gi,'x')
        stringparce = stringparce.replace(/\s/g,'')
        if ( checkCombinaison(stringparce) == 1) {
            var reponse = "Veuillez entrer une equation valide !"
            console.log(reponse)
            $('.message_input').val(reponse)
            $('.send_message').click()
            return 
        }
        if (debug == true) {
            console.log("String parse: "+stringparce)
        }
        return stringparce.split("=")
    }

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
                if (tab[i][cpt] && tab[i][cpt + 1]) {
                    cpt++
                    var newstr = tab[i].substr(cpt)
                    tab[i] = newstr + tab[i].substr(0, cpt)
                }
            }
            tab[i] = tab[i].replace(/\*/g,'');
            var index = tab[i].search(/x\d/)
            if (index != -1) {
                tab[i] = tab[i].substr(index + 1) + 'x'
            }
            if (debug == true) {
                console.log("tab["+i+"] = "+tab[i])
            }
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
                        if (index == -1) {
                            tabPui.push({puissance: pui, valeur : (isneg == 0) ? value : value * -1 })
                        }
                        else {
                            tabPui[index].valeur += (isneg == 0) ? value : value * -1
                        }
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
            }
            else if (posx != -1) {
                var index = checkIfPuiExist(tabPui, 1)
                if (tab[i][posx -1]) {
                    var tdv = tab[i].substr(0)
                    var value = parseFloat(tdv)
                    if (!isNaN(value)) {
                        if (index == -1) {
                            tabPui.push({puissance: 1, valeur : (isneg == 0) ? value : value * -1 })
                        }
                        else {
                            tabPui[index].valeur += (isneg == 0) ? value : value * -1
                        }
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
        var tabGauche = new Array()
        var tabDroite = new Array()
        var tabResult = [];

        tabGauche = splitBySymbol(tabChar[0])
        tabDroite = splitBySymbol(tabChar[1])
        if (debug == true) {
            console.log("Tableau partie gauche : "+tabGauche);
            console.log("Tableau partie droite : "+tabDroite)
        }
        tabResult = fillTabPuissance(tabGauche, tabResult, 0)
        tabResult = fillTabPuissance(tabDroite, tabResult, 1)
        tabResult.sort(function(a, b) {
            return b.puissance - a.puissance;
        });
        selectSolution(tabResult);
    }


    function indexation(tabChar) {
        if (!tabChar)
            return 
        if ((tabChar[0] && tabChar[0] == "") || (tabChar[1] && tabChar[1] == "")) {
            $('.message_input').val("Veuillez entrer une equation valide !")
            $('.send_message').click()
            return 
        }
        getTabPuissance(tabChar)
    }