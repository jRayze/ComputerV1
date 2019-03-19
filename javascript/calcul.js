    function selectReponse(degreMax, tabPui, a, b, c) {
        if (degreMax > 2) {
            var reponse = reduction(tabPui)
            console.log(reponse);
            console.log("L'equation est de degre "+degreMax+" ComputorV1 ne peux resoudre cette equation !");
            reponse = reponse + "<br>L'equation est de degre "+degreMax+" ComputorV1 ne peux resoudre cette equation !"
            $('.message_input').val(reponse)
            $('.send_message').click()
        }
        else if (degreMax == 2 && a != 0) {
            var reponse = reduction(tabPui)
            solutionDegreDeux(a,b,c, reponse);
        }
        else if (degreMax == 1 && b != 0) {
            var reponse = reduction(tabPui)
            solutionEquationDegreUn(b, c, reponse);
        }
        else if (degreMax == 0 && c != 0) {
            var reponse = reduction(tabPui)
            solutionEquationDegreZero(reponse);
        }
        else {
            var reponse = "Reduction : 0 = 0";
            console.log(reponse);
            console.log("Tous les nombres reels sont solution de l'equation !");
            reponse = reponse + "<br>Tous les nombres reels sont solution de l'equation !";
            $('.message_input').val(reponse)
            $('.send_message').click()
        }
    }

    function selectSolution(tabPui) {
        var degreZero = false;
        var degreUn = false;
        var degreDeux = false;
        var degreEleve = false;
        var degreMax = 0;
        var a = 0.00;
        var b = 0.00;
        var c = 0.00;
        for (let i in tabPui) {
            let elem = tabPui[i]
            if (debug) {
                console.log(elem);
            }
            if (elem.puissance == 2) {
                a = elem.valeur
            }
            else if (elem.puissance == 1) {
                b = elem.valeur
            }
            else if (elem.puissance == 0) {
                c = elem.valeur
            }
            degreMax = (elem.puissance > degreMax && elem.valeur != 0) ? elem.puissance : degreMax;
        }       
        selectReponse(degreMax, tabPui, a, b, c);
    }

    function solutionDegreDeux(a, b, c, reponse) {
        var delta = calculDelta(a,b,c)
        if (debug) {
            console.log("a = " + parseFloat(a))
            console.log("b = " + parseFloat(b))
            console.log("c = " + parseFloat(c))
            console.log("delta =" +delta)
        }
        console.log(reponse)
        if (delta == 0) {
            reponse = reponse + "<br>Equation du second degre"
            console.log("Equation du second degre")
            reponse = reponse + "<br>Le discriminant est 0, la solution est :<br>"
            console.log("Le discriminant est 0, la solution est :")
            reponse = reponse + "Solution : " + calculSolution0(a, b).toFixed(6)+"<br>"
            console.log("Solution :" + calculSolution0(a, b).toFixed(6))
        }
        else if (delta > 0) {
            reponse = reponse + "<br>Equation du second degre<br>Le discriminant est positif, les deux solutions sont :<br>"
            console.log("Equation du second degre")
            console.log("Le discriminant est positif, les deux solutions sont :")
            reponse = reponse + "Solution 1 : " + calculSolution1(a,b,delta).toFixed(6)+"<br>"
            console.log("Solution 1 :"+calculSolution1(a,b,delta).toFixed(6))
            reponse = reponse + "Solution 2 : " + calculSolution2(a,b,delta).toFixed(6)+"<br>"
            console.log("Solution 2 :"+calculSolution2(a,b,delta).toFixed(6))
        }
        else {
            reponse =  reponse + "<br>Le discriminant est negatif, il n'y a aucune solution pour les nombres reels."
            console.log("Le discriminant est negatif, il n'y a aucune solution pour les nombres reels.")
            reponse =  reponse + calculSolutionComplexe(a, b, delta)
            console.log(calculSolutionComplexe(a, b, delta))
        }
       // console.log(reponse.replace(/<br>/g, ""));
        $('.message_input').val(reponse)
        $('.send_message').click()
    }

    function reduction(tabPui) {
        var reduct = "Reduction : ";
        for (var i in tabPui) {
        let elem = tabPui[i];
            if (elem.valeur != 0) {

                if (i > 0) {
                    reduct = reduct + " + ";
                }
                reduct = reduct + elem.valeur + "X^"+elem.puissance; 
            }
        }
        reduct = reduct + " = 0"
        return reduct
    }

    function solutionEquationDegreUn(b, c, reponse) {
        console.log(reponse)
        console.log("Equation du premier degre, la solution est : "+((c * -1)/b))
        reponse = reponse +"<br>Equation du premier degre, la solution est : <br>" +((c * -1)/b)
        $('.message_input').val(reponse)
        $('.send_message').click()
    }

    function solutionEquationDegreZero(reponse) {
        console.log(reponse)
        console.log("Il n'y a pas de solution pour les nombres reels !")
        reponse = reponse+"<br> Il n'y a pas de solution pour les nombres reels !"
        $('.message_input').val(reponse)
        $('.send_message').click()
    }

    function splitBySymbol(tabChar) {
        var cpyTabChar = tabChar.replace(/-/gi, "+-");
        var tabSplitSymbol = cpyTabChar.split("+")
        if (tabSplitSymbol[0] == ""){
            tabSplitSymbol.splice(0,1);
        }
        return tabSplitSymbol;
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
        if (debug == true) {
            console.log("racine delta = "+racineDelta);
        }
        if (racineDelta == 0) {
            return 0
        }
        var res = ((b * - 1) - racineDelta) / (2 * a)
        if (debug == true) {
            console.log ("b * -1 = "+(b * -1)+" racineDelta = "+racineDelta+" 2 * a = "+(2 * a))
            console.log(res)
        }
        return res
    }
    
    function calculSolution2(a, b, delta) {
        var racineDelta = racineCarre(delta, 1.0, 0.0, 0.0)
        if (racineDelta == 0) {
            return 0
        }
        var res = ((b * - 1) + racineDelta) / (2 * a)
        if (debug == true) {
            console.log ("b * -1 = "+(b * -1)+" racineDelta = "+racineDelta+" 2 * a = "+(2 * a))
            console.log(res)
        }
        return res
    }
    
    function calculSolutionComplexe(a, b, delta) {
        var racineDelta = racineCarre((delta * - 1), 1.0, 0.0, 0.0)
        if (racineDelta == 0) {
            return 0
        }
        var res = "<br>Solution complexe :<br>";
        console.log("Solution Complexe :")
        var diviseur = 2 * a;
        var bi = (racineDelta / diviseur)
        var symb = (bi < 0) ? "+" : "-";
        var reel = ((-b / diviseur) == 0) ? "" : (-b / diviseur)+" "

        bi = (bi < 0) ? bi * - 1 : bi
        res = res + "Solution 1 : " + reel + " + " + " " + "i * " + bi+"<br>"
        console.log("Solution 1 : " + reel + " + " + " " + "i * " + bi)
        res = res + "Solution 2 : " + reel + " - " + " " + "i * " + bi
        console.log("Solution 2 : " + reel + " - " + " " + "i * " + bi)
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