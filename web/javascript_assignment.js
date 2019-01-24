function printHello(){
    console.log("Hello");
}

var calcButton = $("#button2");
calcButton.on("click", addFields);

function addFields(){
    var field1 = $("#field1").val();
    var field2 = $("#field2").val();
    var field3 = parseInt(field1)+parseInt(field2);
    $("#field3").val(""+field3);
}

var hideButton = $("#button3");
hideButton.on("click", hideParagraph);
function hideParagraph(){
    var paragraph = $("#paragraphToHide")
    paragraph.toggle();
}

var phoneButton = $("#button4");
phoneButton.on("click", checkPhone);

function checkPhone(){
    var number = $("#phoneField").val();
    var reg = /^[1-9]\d{2}-\d{3}-\d{4}$/;
    if(reg.test(number)) {
        console.log("Ok");
    }
    else{
        console.log("Bad");
    }
}

var jsonButton = $("#button5");
jsonButton.on("click", jsonFunction);

function jsonFunction(){
    var formObject = {};
    formObject.firstName = $("#firstName").val();
    formObject.lastName = $("#lastName").val();
    formObject.email = $("#email").val();

    var jsonString = JSON.stringify(formObject);
    console.log(jsonString);

}