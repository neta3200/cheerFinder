function timeSidebar(){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    document.getElementById("demo").innerHTML = time ;
    return time;

}