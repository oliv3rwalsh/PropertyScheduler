const today = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildcalendar(){
    var day = new Date();
    day.setDate(day.getDate() - today.getDay());
    var currentMonth = ""
    var container = document.querySelector("#calendar");
    var monthcontainer = document.querySelector("#months");
    i = 0;
    while(i < 21){
        var temprow = document.createElement("div");
        temprow.className = "calendarrow";
        j = 0;
        while(j < 7){
            var tempday = document.createElement("div");
            tempday.className = "calendarday";
            tempday.id = months[day.getMonth()] + "-" + day.getDate();
            tempday.innerHTML = day.getDate();
            temprow.appendChild(tempday);
            day.setDate(day.getDate() + 1);
            j++;
        }
        container.appendChild(temprow);
        i++
        var tempMonth = document.createElement("div");
        tempMonth.className = "monthheader";
        if(currentMonth != months[day.getMonth()]){
            currentMonth = months[day.getMonth()];
            tempMonth.innerHTML = currentMonth.toUpperCase() + " " + day.getFullYear();
        } else {
            tempMonth.innerHTML = " ";
        }
        monthcontainer.appendChild(tempMonth);
    }
    buildbanner();
}

function buildbanner(){
    var t = document.querySelector("#today");
    t.innerHTML = days[today.getDay()].toUpperCase() + ", " + months[today.getMonth()].toUpperCase() + " " + today.getFullYear(); 
    var p = document.querySelector('#property');
    p.innerHTML = "6411 SPAULDING";
}

window.addEventListener("load", buildcalendar);