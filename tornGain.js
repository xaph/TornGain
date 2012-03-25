// ==UserScript==
// @name       TornGain
// @namespace  http://xaph.info/
// @version    0.0.1
// @description  Torn City is a text based crime RPG. TornGain is an userscript that gives your total gain from the stocks. If you don't know what is Torn you're welcome: http://www.torn.com/1579896
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match      http://*.torn.com/stockexchange.php?step=portfolio
// @copyright  2012+, xaph
// ==/UserScript==

$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}
$(document).ready(function() {
    portfolioTable = $("table:last");
    tableRows = portfolioTable.children().children();
    i = 0;
    while (i<tableRows.size()) {
        
        gain = tableRows.eq(2+i).children().eq(3).text().replace("$", "");
        quantity = tableRows.eq(3+i).children().eq(1).text().replace("Shares: ", "");
        quantity = quantity.replace(/,/g, "");
 
        totalGain = quantity*gain;
        if(totalGain>0) {
            tableRows.eq(3+i).children().eq(0).append("<br>$<span class='gain' style='color: green'>("+totalGain.toFixed(2)+")</span>");
        } else {
            tableRows.eq(3+i).children().eq(0).append("<br>$<span class='gain' style='color: red'>("+totalGain.toFixed(2)+")</span>");
        }
        i = i+7;
    }
    $(".gain").digits();
});
