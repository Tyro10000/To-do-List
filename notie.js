var Items = [];

var task = {
    name: "",
    meta: "",
    color: "black",
    head: ""
};
var lead = {
    name: "",
    meta: "",
    color: "#85F2E4",
    head: "x"
};

function add() {
    if (document.getElementById("newitem").value != "") {
        Items.push(task);
        Items[Items.length - 1].name = document.getElementById("newitem").value;
        Items[Items.length - 1].meta = document.getElementById("newdesc").value;
        localStorage.Items = JSON.stringify(Items);
        Items[Items.length - 1].color = "black";
        document.getElementById("newitem").value = "";
        document.getElementById("newdesc").value = "";
        refresh();
    }
}

function topic() {
    Items.push(lead);
    Items[Items.length - 1].name = document.getElementById("newitem").value;
    Items[Items.length - 1].color = "#85F2E4";
    localStorage.Items = JSON.stringify(Items);
    document.getElementById("newitem").value = "";
    document.getElementById("newdesc").value = "";
    refresh();
}

function refresh() {
    Items = JSON.parse(localStorage.Items);
    relist();
}

function relist() {
    document.getElementById("content-frame").innerHTML = "";
    for (x = 0; x < Items.length; x++) {
        var dus = '"' + Items[x].name + '"';
        if (Items[x].head != "x") {
            document.getElementById("content-frame").innerHTML += "<div class='frame' id=" + dus + "><div class='frame-head'>" + Items[x].name + "<i class='fa fa-check pull-right' onclick='flag(" + dus + ")'></i><i class='fa fa-times pull-right' onclick='pop(" + dus + ")'></i><i class='fa fa-plus pull-right' onclick='pop(" + dus + ")'></i></div><div class='frame-content'>" + Items[x].meta + "</div></div>";
            document.getElementById(Items[x].name).style.color = Items[x].color;
        } else {
            document.getElementById("content-frame").innerHTML += "<div  style='text-align:center' class='frameitem' id=" + dus + ">" + Items[x].name + "<i class='fa fa-times pull-right' onclick='poplist(" + dus + ")'></i></div>";
            document.getElementById(Items[x].name).style.background = Items[x].color;
        }

    }
}

function clean() {
    delete localStorage.Items;
    Items = [];
    document.getElementById("content-frame").innerHTML = "";

}

refresh();

function flag(line) {
    var pick;
    var selected;
    for (i = 0; i < Items.length; i++)
        if (Items[i].name == line)
            selected = i;

    pick = Items[selected].color;

    if (pick == "black")
        pick = "red";
    else if (pick == "red")
        pick = "green";
    else if (pick == "green")
        pick = "purple";
    else if (pick == "purple")
        pick = "steelblue";
    else if (pick == "steelblue")
        pick = "gold";
    else if (pick == "gold")
        pick = "plum";
    else if (pick == "plum")
        pick = "orange";
    else if (pick == "orange")
        pick = "pink";
    else if (pick == "pink")
        pick = "aqua";
    else if (pick == "aqua")
        pick = "darkcyan";
    else if (pick == "darkcyan")
        pick = "coral";
    else if (pick == "coral")
        pick = "khaki";
    else if (pick == "khaki")
        pick = "magenta";
    else if (pick == "magenta")
        pick = "peru";
    else if (pick == "peru")
        pick = "royalblue";
    else if (pick == "royalblue")
        pick = "seagreen";
    else
        pick = "black";

    Items[selected].color = pick;

    document.getElementById(line).style.color = Items[selected].color;
}



function pop(val) {
    for (var i = 0; i < Items.length; i++) {
        if (Items[i].name == val) {
            Items.splice(i, 1);
        }
    }
    localStorage.Items = JSON.stringify(Items);
    refresh();
}

function poplist(val) {
    var start;
    var end;
    for (var i = 0; i < Items.length; i++) {
        if (Items[i].name == val) {
            start = i;
        }
    }
    for (var i = start; i < Items.length; i++) {
        if (Items[i].head == "x" && i != 0) {
            end = i - 1;
            break;
        } else
            end = Items.length;
    }
    Items.splice(start, end + 1);
    localStorage.Items = JSON.stringify(Items);
    refresh();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById("content-frame"));
}