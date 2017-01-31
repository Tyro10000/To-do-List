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
        localStorage.Items = JSON.stringify(Items);
        Items[Items.length - 1].color = "black";
        document.getElementById("newitem").value = "";
        refresh();
    }
}

function topic() {
    Items.push(lead);
    Items[Items.length - 1].name = document.getElementById("newitem").value;
    Items[Items.length - 1].color = "#85F2E4";
    localStorage.Items = JSON.stringify(Items);
    document.getElementById("newitem").value = "";
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
            document.getElementById("content-frame").innerHTML += "<div  class='frameitem' id=" + dus + ">" + Items[x].name + "<i class='fa fa-check pull-right' onclick='flag(" + dus + ")'></i><i class='fa fa-times pull-right' onclick='pop(" + dus + ")'></i></div>";
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