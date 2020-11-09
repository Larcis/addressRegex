

let worker  = new Worker("worker.js");

let inputText = document.getElementById("inputText");
let resultContainer = document.getElementById("resultContainer");
let stats = [0,0,0,0,0,0] //{"Cadde/Sokak":0, "Mahalle":0, "No":0,"İl":0, "İlçe":0}
let stats2 =[0,0,0,0,0,0,0]
let numof_lines;

String.prototype.reCase = function(){
    let a = this.toLocaleLowerCase();
    a = a.split(" ");
    let b =[];
    for(let i = 0; i < a.length; i++){
        if(a[i].length){
            let nc =  a[i][0].toLocaleUpperCase();
            a[i] = a[i].substring(1);
            a[i] = nc + a[i];
        }
    }
    return a.join(" ");
}
function appendNewResult(vals) {
    let keys = ["Mahalle", "Cadde", "Sokak", "No", "İl", "İlçe", "Ekstra"]
    let counter = 0;
    for(let i = 0; i < 6; i++){
        if(vals[i] != "-"){
            counter++;
            stats[i]++;
        }
    }
    stats2[counter]++;

    var tbl = document.createElement('table');
    tbl.style.width = '80%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    let len = keys.length;
    
    if(vals[vals.length -2].replaceAll(" ", "").length == 0) len--;
    
    var tr = document.createElement('tr');
    tr.style["text-align"] = "center";
    tr.style.color = "blue";
    tr.style["font-weight"] = "bold";
    tr.appendChild(document.createTextNode(vals[7].reCase()));
    tbdy.appendChild(tr);

    for (var i = 0; i < len; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        td.appendChild(document.createTextNode(keys[i]))
        td2.appendChild(document.createTextNode(vals[i].reCase()))
        tr.appendChild(td)
        tr.appendChild(td2)
        tbdy.appendChild(tr);
    }
    
    tbl.appendChild(tbdy);
    resultContainer.appendChild(tbl)
}

inputText.onchange = function (e) {
    stats = [0,0,0,0,0,0];
    stats2= [0,0,0,0,0,0,0];
    let all_texts = inputText.value;
    numof_lines = all_texts.split("\n").length;
    resultContainer.innerHTML = "";
    worker.postMessage(all_texts);
}
worker.onmessage = function(e){
    if(e.data == "bitti"){
        console.log(numof_lines, stats, stats2)
    } else {
        appendNewResult(e.data);
    }
}