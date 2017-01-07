var Items = [];

function add(){
    Items.push(document.getElementById("newitem").value);
    localStorage.Items = JSON.stringify(Items);
    document.getElementById("newitem").value = "";
    refresh();
}
function refresh(){
    Items = JSON.parse(localStorage.Items);
    relist();
}

function relist(){
    document.getElementById("content-frame").innerHTML =  "";
    for(x = 0; x < Items.length; x++){
        var dus = '"' + Items[x] + '"';
        document.getElementById("content-frame").innerHTML +="<div  class='frameitem' id="+dus+">" +Items[x] + "<i class='fa fa-check pull-right' onclick='flag("+dus+")'></i><i class='fa fa-times pull-right' onclick='pop("+dus+")'></i></div>";
    }
}
function clean(){
    delete localStorage.Items;
    Items = [];
    document.getElementById("content-frame").innerHTML =  "";

}

refresh();

function flag(line){
 if (document.getElementById(line).style.color == "red")
        document.getElementById(line).style.color  = "lightgreen";
else if (document.getElementById(line).style.color == "lightgreen")
        document.getElementById(line).style.color  = "white";
else 
        document.getElementById(line).style.color  = "red";

}
function pop(line){
    removeByValue(line);
    refresh();
}
function removeByValue(val) {
	for(var i=0; i<Items.length; i++) {
		if(Items[i] == val) {
			Items.splice(i, 1);
            localStorage.Items = JSON.stringify(Items);
			break;
		}
	}
}