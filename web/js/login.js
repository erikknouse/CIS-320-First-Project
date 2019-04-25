// This calls our back-end Java program that sets our session info
function loginButton() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    var loginId = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = { loginId : loginId};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Clear the form
        getLoginButton();
        $("#loginId").val("");
    });
}

// This gets session info from our back-end servlet.
function getLoginButton() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        $('#getLoginResult').html(dataFromServer)
        if(String(dataFromServer).includes("Not currently logged in")){
            $("#logoutHeading").hide();
            $("#logout").hide();
        }
        else{
            $("#logoutHeading").show();
            $("#logout").show();
        }
    });
}

// This method calls the servlet that invalidates our session
function logoutButton() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLoginButton()
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLoginButton);

button = $('#login');
button.on("click", loginButton);

button = $('#logout');
button.on("click", logoutButton);

getLoginButton();