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
    t.innerHTML = days[today.getDay()].toUpperCase() + " " + months[today.getMonth()].toUpperCase() + " " + today.getDate(); 
    var p = document.querySelector('#property');
    p.innerHTML = "6411 SPAULDING";

    read();
}

function importreservations(raw){
    var listings = raw.split("\n");
    i = 0;
    while(i < listings.length){
        temp = listings[i].split(",");
        listings[i] = temp;
        i++;
    }
    i = 0;
    while(i < listings.length - 1){
        n = 0;
        listing = listings[i];
        startsegs = listing[0].split("/")
        var start = new Date(startsegs[2], startsegs[0]-1, startsegs[1])
        endsegs = listing[1].split("/")
        var end = new Date(endsegs[2], endsegs[0]-1, endsegs[1])
        while(start.getDate() != end.getDate() + 1 || start.getMonth() != end.getMonth() || start.getFullYear() != end.getFullYear()){
            index = months[start.getMonth()] + "-" + start.getDate();
            var temp = document.querySelector("#" + index);
            if(n == 0){
                temp.className = temp.className + " active left";
            } else if (start.getDate() == end.getDate() && start.getMonth() == end.getMonth() && start.getFullYear() == end.getFullYear()){
                temp.className = temp.className + " active right";
            } else {
                temp.className = temp.className + " active middle";
            }
            start.setDate(start.getDate() + 1);
            n++;
        }
        i++;

        var c = document.querySelector("#summary");
        var temp = document.createElement("div");
        var templabel = document.createElement("div");
        var tempname = document.createElement("div");
        temp.className = "tab";
        templabel.className = "label";
        tempname.className = "name";
        templabel.innerHTML = (months[startsegs[0]] + " " + startsegs[1] + " " + startsegs[2] + " - " + months[endsegs[0]] + " " + endsegs[1] + " " + endsegs[2]).toUpperCase()
        tempname.innerHTML = listing[2].toUpperCase();
        temp.appendChild(templabel);
        temp.appendChild(tempname);
        c.appendChild(temp);
    }
    updateMenu(listings.length-1);
}

function updateMenu(l){
    var h = document.querySelector('#menuheader');
    h.innerHTML = "SHOWING " + l + " RESERVATIONS";
}

function read(){
    fetch("http://localhost:8000/data.csv")
    .then((res) => res.text())
    .then((text) => {
        importreservations(text);
     })
    .catch((e) => console.error(e));
}

window.addEventListener("load", buildcalendar);