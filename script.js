let mode = "normal";

const display = document.getElementById("display");
const amount = document.getElementById("amount");
const gst = document.getElementById("gst");
const finalAmt = document.getElementById("final");

function press(v){
    if(display.value==="0")
        display.value=v;
    else
        display.value+=v;
}

function clearAll(){
    display.value="0";
    updateResult(0);
}

function backspace(){
    display.value=display.value.slice(0,-1);
    if(display.value=="") display.value="0";
}

function setMode(m){
    mode=m;

    document.querySelectorAll(".modeButtons button")
    .forEach(btn=>btn.classList.remove("active"));

    event.target.classList.add("active");

    calculate();
}

function calculate(){

    let value=0;

    try{
        value=eval(display.value);
    }catch(e){
        return;
    }

    let base=value;
    let gstValue=0;
    let total=value;

    if(mode==="gstadd"){
        gstValue=base*0.18;
        total=base+gstValue;
    }

    if(mode==="gstremove"){
        total=base;
        base=total/1.18;
        gstValue=total-base;
    }

    if(mode==="discount"){
        total=base*0.82;
        gstValue=base-total;
    }

    updateResult(base,gstValue,total);

    display.value=Number(total.toFixed(2));
}

function updateResult(b=0,g=0,t=0){

    amount.innerHTML="₹"+b.toFixed(2);

    gst.innerHTML="₹"+g.toFixed(2);

    finalAmt.innerHTML="₹"+t.toFixed(2);

}

function shareWhatsApp(){

let text=
"Games Planet Calculator\n\n"+
"Amount : "+amount.innerText+
"\nGST : "+gst.innerText+
"\nFinal : "+finalAmt.innerText;

window.open(
"https://wa.me/?text="+encodeURIComponent(text)
);

}

function shareResult(){

let text=
"Amount : "+amount.innerText+
"\nGST : "+gst.innerText+
"\nFinal : "+finalAmt.innerText;

if(navigator.share){

navigator.share({

title:"GST Calculator",

text:text

});

}else{

navigator.clipboard.writeText(text);

alert("Copied");

}

}

function takeScreenshot(){

alert("Screenshot feature APK version में html2canvas के साथ जोड़ा जाएगा.");

}

function saveHistory(){

let history=
JSON.parse(localStorage.getItem("history")||"[]");

history.unshift({

date:new Date().toLocaleString(),

item:document.getElementById("itemName").value,

amount:amount.innerText,

gst:gst.innerText,

final:finalAmt.innerText

});

localStorage.setItem(
"history",
JSON.stringify(history)
);

alert("History Saved");

}

updateResult();
