
importScripts("./regexes.js");


function toStr(e){
    return e ? e : "-";
}
onmessage = function (e) {
    let all_texts = e.data.split("\n");
    let numof_lines = all_texts.length;
    let res, current_line;
    for (let i = 0; i < numof_lines; i++) {
        full_regex.lastIndex = 0;
        current_line = all_texts[i];
        res = full_regex.exec(current_line);
        //console.log(res);
        if(res){
            let gr = res.groups;
            let ekstra = "";
            if(gr.extra){
                if(gr.ekstra2){
                    ekstra = gr.extra + gr.ekstra2
                } else {
                    ekstra = gr.extra;
                }
            } else if(gr.ekstra2){
                ekstra = gr.ekstra2;
            }
            postMessage([
                toStr(gr.mahalle), 
                toStr(gr.cadde), 
                toStr(gr.sokak), 
                toStr(gr.no), 
                toStr(gr.il), 
                toStr(gr.ilce), 
                toStr(ekstra),
                current_line
            ]);
        } else {
            postMessage([
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                current_line
            ])
        }
    }
    postMessage("bitti");
}