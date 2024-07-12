// JavaScript source code
function createemployee(excecutioncontext) {
    var formContext = excecutioncontext.getFormContext();
    var empname = formContext.getAttribute("cr85a_empnametest").getValue();
    var guidofcompanyrecord = formContext.data.entity.getId();
    guidofcompanyrecord = guidofcompanyrecord.replace("{", " ").replace("}", " ");
    for (i = 0; i < 1000; i++) {
    var entity = {};
    
        entity.cr85a_name = empname + i;

        entity.cr85a_isfresher = true;
        entity.cr85a_ratings = 8;


        Xrm.WebApi.online.createRecord("cr85a_employee", entity).then(
            function success(result) {
                var newEntityId = result.id;
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    }
}

