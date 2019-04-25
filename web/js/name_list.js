// Main Javascript File

function validateFirstName(){
    var regex = /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/
    if(regex.test($('#firstName').val())){
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    }
}

function validateLastName(){
    var regex = /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/
    if(regex.test($('#lastName').val())){
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    }
}

function validateEmail(){
    var regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if(regex.test($('#email').val())){
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    }
}
function validatePhone(){
    var regex = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
    if(regex.test($('#phone').val())){
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    }
}

function validateBirthday(){
    var regex = /^\d{4}\-\d{2}\-\d{2}$/
    if(regex.test($('#birthday').val())){
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    }
}


function updateTable() {
    var url = "api/name_list_get";

    $.getJSON(url, null, function(result) {
        $('#datatable tbody').html('<tr><td>' + result[0].id+ '</td>' +
            '<td>' + result[0].first + '</td>' +
            '<td>' + result[0].last + '</td>' +
            '<td>' + result[0].email + '</td>' +
            '<td>' + result[0].phone + '</td>' +
            '<td>' + result[0].birthday + '</td>' +
            '<td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\'' + result[0].id + '\'>Delete</button></td>' +
            '<td><button type=\'button\' name=\'edit\' class=\'editButton btn\' value=\'' + result[0].id + '\'>Edit</button></td></tr>');
        for (var i = 1; i < result.length; i++) {
            $('#datatable tbody').append('<tr><td>' + result[i].id+ '</td>' +
                '<td>' + result[i].first + '</td>' +
                '<td>' + result[i].last + '</td>' +
                '<td>' + result[i].email + '</td>' +
                '<td>' + result[i].phone + '</td>' +
                '<td>' + result[i].birthday + '</td>' +
                '<td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\'' + result[i].id + '\'>Delete</button></td>' +
                '<td><button type=\'button\' name=\'edit\' class=\'editButton btn\' value=\'' + result[i].id + '\'>Edit</button></td></tr>');
                console.log(result[i]);
        }

        console.log("Done");
        }
    );
}

// Call your code.
updateTable();

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");

    $('#firstName').val("");
    $('#firstName').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");

    $('#lastName').val("");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");

    $('#email').val("");
    $('#email').removeClass("is-invalid");
    $('#email').removeClass("is-valid");

    $('#phone').val("");
    $('#phone').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");

    $('#birthday').val("");
    $('#birthday').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");

    $('#myModal').modal('show');
}


$(document).on("click", ".deleteButton", deleteItem);

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);
    var url = "api/name_list_delete";
    $.ajax({
        type: 'POST',
        url: url,
        data: e.target.value,
        success: [function(dataFromServer) {
            console.log(dataFromServer);
            updateTable()
        }],
        contentType: "application/json",
        dataType: 'text'
    });
}

$(document).on("click", ".editButton", editItem);

function editItem(e) {
    console.debug("Edit");
    console.debug(e.target.value);

    // Grab the id from the event
    var id = e.target.value;

// This next line is fun.
// "e" is the event of the mouse click
// "e.target" is what the user clicked on. The button in this case.
// "e.target.parentNode" is the node that holds the button. In this case, the table cell.
// "e.target.parentNode.parentNode" is the parent of the table cell. In this case, the table row.
// "e.target.parentNode.parentNode.querySelectorAll("td")" gets an array of all matching table cells in the row
// "e.target.parentNode.parentNode.querySelectorAll("td")[0]" is the first cell. (You can grab cells 0, 1, 2, etc.)
// "e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML" is content of that cell. Like "Sam" for example.
// How did I find this long chain? Just by setting a breakpoint and using the interactive shell in my browser.
    var id = e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML;
    var firstName = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var lastName = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    var email = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var phone = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    var birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#email').val(email);
    $('#phone').val(phone);
    $('#birthday').val(birthday);
    $('#myModal').modal('show');
}



var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", showSaveChanges);

function showSaveChanges(){
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validateBirthday();
    if($('#firstName').hasClass("is-valid") && $('#lastName').hasClass("is-valid") && $('#email').hasClass("is-valid") && $('#phone').hasClass("is-valid") && $('#birthday').hasClass("is-valid")) {
        jqueryPostJSONButtonAction();
        $('#myModal').modal('hide');
        console.log("Saving Changes")
    }


}
function jqueryPostJSONButtonAction() {

    var url = "api/name_list_edit";
    var idField = $("#id").val();
    var firstNameField = $("#firstName").val();
    var lastNameField = $("#lastName").val();
    var emailField = $("#email").val();
    var phoneField = $("#phone").val();
    var birthdayField = $("#birthday").val();
    var dataToServer;
    if(idField) {
        dataToServer = {
            id: idField,
            first: firstNameField,
            last: lastNameField,
            email: emailField,
            phone: phoneField,
            birthday: birthdayField
        };
    }
    else{
        dataToServer = {
            first: firstNameField,
            last: lastNameField,
            email: emailField,
            phone: phoneField,
            birthday: birthdayField
        };
    }

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: [function(dataFromServer) {
            console.log(dataFromServer);
            updateTable()
        }],
        contentType: "application/json",
        dataType: 'text'
    });

}

