var list = document.getElementById("timer");
var formDate = document.getElementById("form-date");

var datesArray = [];
if(localStorage.getItem('dates'))
    datesArray = JSON.parse(localStorage.getItem('dates'));

function getDiff(futureDate){
    var countDownDate = new Date(futureDate).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    minutes = ("0"+minutes).slice(-2);
    seconds = ("0"+seconds).slice(-2);

    return days + ((days != 1)?" Days":" Day") + " and " + hours + ":" + minutes + ":" + seconds + " left..";
}

function addDate(){
    if(formDate.value){
        datesArray.push(formDate.value);
        updateStorage();
        formDate.value = "";
    }
}

function updateStorage(){
    localStorage.setItem('dates', JSON.stringify(datesArray));
}

function printList(){
    list.innerHTML = "";
    for(d of datesArray){
        var li = "<li>";
        li += "<div class='date-label'>"+d+"</div>";
        li += getDiff(d);
        li += "</li>";

        list.innerHTML += li;
    }
}
printList();
setInterval(printList, 1000);


