// ==UserScript==
// @name       TornGain
// @namespace  http://xaph.info/
// @version    0.1.0
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
    tableBody = portfolioTable.children();
    tableRows = tableBody.children();
    totalPositive = 0;
    totalNegative = 0;
    i = 0;
    while (i<tableRows.size()) {
        gain = tableRows.eq(2+i).children().eq(3).text().replace("$", "");
        quantity = tableRows.eq(3+i).children().eq(1).text().replace("Shares: ", "");
        quantity = quantity.replace(/,/g, "");
 
        totalGain = quantity*gain;
        if(totalGain>0) {
            totalPositive += totalGain;
            tableRows.eq(3+i).children().eq(0).append("<br>$<span class='gain' style='color: green'>("+totalGain.toFixed(2)+")</span>");
        } else {
            totalNegative += totalGain;
            tableRows.eq(3+i).children().eq(0).append("<br>$<span class='gain' style='color: red'>("+totalGain.toFixed(2)+")</span>");
        }
        i = i+7;
    }
    nvcolor = totalPositive >= totalNegative ? 'green' : 'red';
    tableBody.prepend("<tr><td>Net Value:</td><td>$<span class='gain' style='color: "+nvcolor+"'>"+(totalPositive+totalNegative).toFixed(2)+
                      "</span></td><td>Earned:</td><td>$<span class='gain' style='color: green'>"+totalPositive.toFixed(2)+
                      "</span></td><td>Lost:</td><td>$<span class='gain' style='color: red'>"+totalNegative.toFixed(2)+"</span></td></tr>");
    $(".gain").digits();
});
