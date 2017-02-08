
function pars (str) {
    var titleStart = 0, titleEnd = 0; yearStart = 0,  yearEnd = 0,  formatStart = 0, formatEnd = 0, starsEnd =0;

    var newStr = '';
    var result = [];
    var target = "Title"; // цель поиска
    var pos = 0;
    var count = 0;
    while (true) {
        var foundPos = str.indexOf(target, pos);
        if (foundPos == -1) break;
        // нашли на этой позиции
        pos = foundPos + 1; // продолжить поиск со следующей

        result [count] = {};

        titleStart = foundPos;
        titleEnd = str.indexOf("Release Year", pos);
        for (var i = titleStart+6; i < titleEnd; i++) {
            newStr += str.charAt(i);
        }
        result[count]['Title'] = newStr;
        newStr = '';


        yearStart = titleEnd;
        yearEnd = str.indexOf("Format", pos);
        for (var i = yearStart + 13; i < yearEnd; i++) {
            newStr += str.charAt(i);
        }
        result[count]['Year'] = newStr;
        newStr = '';

        formatStart = yearEnd;
        formatEnd = str.indexOf("Stars", pos);
        for (var i = formatStart + 7; i < formatEnd; i++) {
            newStr += str.charAt(i);
        }
        result[count]['Format'] = newStr;
        newStr = '';


        //~str.indexOf("Title") ? starsEnd  = str.length:starsEnd = str.indexOf("Title", pos+1);
        starsEnd = str.indexOf("Title", pos+1)
        for (var i = formatEnd + 6; i < starsEnd; i++) {
            newStr += str.charAt(i);
        }
        result[count]['Stars'] = newStr;
        newStr = '';




        console.log( newStr);
        newStr = '';
        count ++;
        console.log( '========= New item ==============')
    }
    return result;

}

exports.pars  = pars;
