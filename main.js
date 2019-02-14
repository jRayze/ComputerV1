    function parseCalculator() {
        var sequence = document.getElementById('func').value
        console.log(sequence)
        stringoutofspace = sequence.replace(/\s/g,'')
        console.log(stringoutofspace);
        return stringoutofspace.split("");
    }

    function indexation(tabChar) {
        tabChar.forEach(elem => {
            if (elem != 'X' || !elem.isInteger )
                console.log("error");
        });
    }

    function execCalculator() {
        var tabChar = parseCalculator();
        tabChar.forEach(Element => {
            console.log(Element + ' // ');
        });
        indexation(tabChar);


    }