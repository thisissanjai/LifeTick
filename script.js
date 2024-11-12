setInterval(function() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if (hour >= 6 && hour < 23) {
        document.querySelector(".timer").innerHTML = `${22 - hour}:${60 - min}:${60 - sec}`;
    } else {
        document.querySelector(".timer").innerHTML = `Sleep Time`;
    }

},1000); 
