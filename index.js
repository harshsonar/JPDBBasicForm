$("#empConnToken").focus();

function validateAndGetFormData() {
    var empConnTokenVar = $("#empConnToken").val();
    if (empConnTokenVar === "") {
        alert("API Key is a Required Value");
        $("#empConnToken").focus();
        return "";
    }
    var empIdVar = $("#empId").val();
    if (empIdVar === "") {
        alert("Employee ID is a Required Value");
        $("#empConnToken").focus();
        return "";
    }
    var empNameVar = $("#empName").val();
    if (empNameVar === "") {
        alert("Employee Name is a Required Value");
        $("#empName").focus();
        return "";
    }
    var empEmailVar = $("#empEmail").val();
    if (empEmailVar === "") {
        alert("Employee Email is a Required Value");
        $("#empEmail").focus();
        return "";
    }
    var jsonStrObj = {
        empId: empIdVar,
        empName: empNameVar,
        empEmail: empEmailVar,
    };
    // console.log(JSON.stringify(jsonStrObj));
    return JSON.stringify(jsonStrObj);
}

// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
        + "\"token\" : \""
        + connToken
        + "\","
        + "\"dbName\": \""
        + dbName
        + "\",\n" + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \""
        + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return putRequest;
}

function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}

function resetForm() {
    $("#empConnToken").val("")
    $("#empId").val("")
    $("#empName").val("");
    $("#empEmail").val("");
    $("#empId").focus();
}

function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var connToken = $("#empConnToken").val();
    var putReqStr = createPUTRequest(connToken, jsonStr, "SAMPLE", "EMP-REL");
    // alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({ async: true });
    alert(JSON.stringify(resultObj));
    resetForm();
}