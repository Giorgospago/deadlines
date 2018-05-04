var list = document.getElementById("timer");
var formDate = document.getElementById("form-date");
var formTitle = document.getElementById("form-title");

var datesArray = [];
if(localStorage.getItem('dates'))
    datesArray = JSON.parse(localStorage.getItem('dates'));

function getDiff(futureDate){
    var countDownDate = new Date(futureDate).getTime();
    var now = new Date().getTime();
    if(countDownDate < now)
        return false;
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    minutes = ("0"+minutes).slice(-2);
    seconds = ("0"+seconds).slice(-2);
    hours = Math.abs(hours);

    return days + ((days != 1)?" Days":" Day") + " and " + hours + ":" + minutes + ":" + seconds + " left..";
}

function addDate(){
    if(formDate.value){
        datesArray.push({
            title: formTitle.value,
            date: formDate.value
        });
        updateStorage();
        printList();
        formTitle.value = "";
        formDate.value = "";
    }
}

function updateStorage(){
    localStorage.setItem('dates', JSON.stringify(datesArray));
}

function printList(){
    list.innerHTML = "";
    for(var key in datesArray){
        var d = datesArray[key];
        var txtDiff = getDiff(d.date+" 12:00:00");
        if(!txtDiff){
            removeOne(key);
            continue;
        }

        var li = "<li>";
        li += "<div class='date-label'>"+d.date;
        if(d.title) li += " - <span class='dead-title'>"+d.title+"</span>";
        li += "<button class='remove-one' onclick='removeOne("+key+")'>x</span></button></div>";
        li += txtDiff;
        li += "</li>";

        list.innerHTML += li;
    }
}
printList();
setInterval(printList, 1000);

function clearDeadLines(){
    if(confirm('Είσαι σίγουρος ?')){
        datesArray = [];
        updateStorage();
        printList();
    }
}

function removeOne(key){
    datesArray.splice(key,1);
    updateStorage();
    printList();
}