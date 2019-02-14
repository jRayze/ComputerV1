    function parseCalculator() {
        var sequence = document.getElementById('func').value
        console.log(sequence)
        stringoutofspace = sequence.replace(/\s/g,'')
        console.log(stringoutofspace);
        return stringoutofspace.split("");
    }

    function indexation(tabChar) {
        var cpt;
        var tabCalcul = new Array()
        tabChar.forEach(elem => {
        if (elem != 'X' && !parseInt(elem) ) {
            console.log("error")
        }
        });
        console.log('tutu');
        while (tabChar[cpt]) {
            var str = new Array()
            var number = 0;
            while(tabChar[cpt] != '*' && tabChar[cpt] != '^' && tabChar[cpt] != '-' && tabChar[cpt] != '+' && tabChar[cpt] != '\'' && tabChar[cpt] != '=' && tabChar[cpt]) {
                str = str + tabChar[cpt]
                cpt++;
            }
            console.log('tutu2');
            number = parseInt(str)
            console.log(number);
            cpt++;            
        }
    }

    function execCalculator() {
        var tabChar = parseCalculator()
        tabChar.forEach(Element => {
            console.log(Element + ' // ')
        });
        indexation(tabChar)


    }