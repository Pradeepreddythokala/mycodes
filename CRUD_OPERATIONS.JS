function createemployee(excecutioncontext)
{
var formContext = excecutioncontext.getFormContext();
var empname = formContext.getAttribute("pr_createemployee").getValue();
var guidofcompanyrecord = formContext.data.entity.getId();
guidofcompanyrecord = guidofcompanyrecord.replace("{"," ").replace("}"," ");
var entity = {};
entity.pr_name = empname;
entity["pr_company@odata.bind"] = "/pr_companies("+guidofcompanyrecord+")";
entity.pr_dob = new Date("02/05/2022").toISOString();
entity.pr_isfresher = true;
entity.pr_country = 315760001;
entity.pr_basicsalary = Number(parseFloat(35555).toFixed(4));
entity.pr_hra = Number(parseFloat(0).toFixed(4));
entity.pr_rating = 8;

Xrm.WebApi.online.createRecord("pr_employee", entity).then(
    function success(result) {
        var newEntityId = result.id;
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
}
function updateemployee(excecutioncontext)
{
    var formContext = excecutioncontext.getFormContext();
    var guidOfEmployeeRecord = formContext.data.entity.getId();
    guidOfEmployeeRecord = guidOfEmployeeRecord.replace("{", "").replace("}", "");
    
    if(formContext.getAttribute("pr_reset") != null && formContext.getAttribute("pr_reset").getValue()== true)
    {
        var entity = {};
entity["pr_company@odata.bind"] = "/pr_companies(64d7d7a2-f78b-ec11-93b0-000d3af0593a)";
entity.pr_dob = new Date("02/09/2022").toISOString();
entity.pr_isfresher = true;
entity.pr_country = 315760002;
entity.pr_rating = 8;
entity.pr_employeedescription = "this is about employee details";
alert(guidOfEmployeeRecord);
Xrm.WebApi.online.updateRecord("pr_employee",guidOfEmployeeRecord, entity).then(
    function success(result) {
        var updatedEntityId = result.id;
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
    }

}

function retrivecompany(executioncontext) {
    var formContext = executioncontext.getFormContext();
    if (formContext.getAttribute("pr_company") != null && formContext.getAttribute("pr_company").getValue() != null) {
        var companyid = formContext.getAttribute("pr_company").getValue()[0].id;
        Xrm.WebApi.online.retrieveRecord("pr_company", companyid, "?$select=pr_country,pr_website").then(
            function success(result) {
                var pr_country = result["pr_country"];
                var pr_country_formatted = result["pr_country@OData.Community.Display.V1.FormattedValue"];
                var pr_website = result["pr_website"];
                formContext.getAttribute("pr_country").setValue(pr_country);
                //alert(pr_website); checking for error detection
                formContext.getAttribute("pr_wesiteurl").setValue(pr_website);
                
                alert("data retrieved from company and set country and url field");
            },
            function(error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}
function deleteemployee(executioncontext) {
    var formContext = executioncontext.getFormContext();
    Xrm.WebApi.online.deleteRecord("pr_employee", "cf90fee2-5391-ec11-8d20-6045bdaaf675").then(
    function success(result) {
        //Success - No Return Data - Do Something
        alert("Employee Deleted");
    },
    function (error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
}