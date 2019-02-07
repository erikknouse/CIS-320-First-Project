// Main Javascript File

function updateTable() {
    var url = "api/name_list_get";

    $.getJSON(url, null, function(result) {

        for (var i = 0; i < result.length; i++) {
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