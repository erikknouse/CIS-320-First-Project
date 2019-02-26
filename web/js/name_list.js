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
            '<td>' + result[0].birthday + '</td></tr>');
        for (var i = 1; i < result.length; i++) {
            $('#datatable tbody').append('<tr><td>' + result[i].id+ '</td>' +
                '<td>' + result[i].first + '</td>' +
                '<td>' + result[i].last + '</td>' +
                '<td>' + result[i].email + '</td>' +
                '<td>' + result[i].phone + '</td>' +
                '<td>' + result[i].birthday + '</td></tr>');
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
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    // Show the hidden dialog
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
    jqueryPostJSONButtonAction();
    $('#myModal').modal('hide');
    console.log("Saving Changes")

}
function jqueryPostJSONButtonAction() {

    var url = "api/name_list_edit";
    var firstNameField = $("#firstName").val();
    var lastNameField = $("#lastName").val();
    var emailField = $("#email").val();
    var phoneField = $("#phone").val();
    var birthdayField = $("#birthday").val();
    var dataToServer = {
        first : firstNameField,
        last : lastNameField,
        email : emailField,
        phone : phoneField,
        birthday : birthdayField
    };

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
