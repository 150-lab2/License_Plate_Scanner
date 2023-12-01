function verify(){
    console.log(document.getElementById("plate_number").value);
    if(document.getElementById("plate_number").value == "1234567" || document.getElementById("plate_number").value == "123456"){
          document.getElementById("yes").hidden = false;
          document.getElementById("no").hidden = true;
    }
    else{
            document.getElementById("yes").hidden = true;
            document.getElementById("no").hidden = false;
    }
}