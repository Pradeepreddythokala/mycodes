function onload()
{
        alert("this message is from onload of the form");
    }
    function onsave()
    {
        alert("this is message is from on save");
    }

    function onchange()
    {
        alert("this alert is from on change");
    }
function onchangeofemail()
{
    
    var email = Xrm.Page.getAttribute("pr_email").getValue();
    Xrm.Page.getAttribute("pr_employeedescription").setValue(email);
    

}
function onchangeofisfresher(executioncontext) // applying is fresher business rule in java script
{
    var formContext = executioncontext.getFormContext();
    var isfresher = formContext.getAttribute("pr_isfresher").getValue();
  if(isfresher == false)
  {
      formContext.getControl("pr_experience").setVisible(true);
      formContext.getAttribute("pr_experience").setRequiredLevel("required");
      formContext.getControl("pr_hra").setDisabled(false);
  }
  else
  {
      formContext.getControl("pr_experience").setVisible(false);
      formContext.getAttribute("pr_experience").setRequiredLevel("none");
      formContext.getControl("pr_hra").setDisabled(true);
      formContext.getAttribute("pr_hra").setValue(0);


}
}
function onchangeofdate(executioncontext) //getting the date alert on top of the form
{
var formContext = executioncontext.getFormContext();
var date = formContext.getAttribute("pr_dob").getValue();
alert(date); 

}

function preventautosave(executioncontext)//function for preventing the auto save of a form
{
    var saveEvent = executioncontext.getEventArgs();
   // alert(saveEvent.getSaveMode());

    if(saveEvent.getSaveMode() == 70)// when auto save function triggered the value will return 70 or else 1
    {
        saveEvent.preventDefault();
    }

}
//This functionw will execute on change of email and it will
//set valuse for all different data type fields
function onChangeEmail(executioncontext)
{
    debugger;
var formContext = executioncontext.getFormContext();
//formContext.getAttribute("rty_city").setValue("Hyderabad"); //singleline text or multiline
formContext.getAttribute("pr_isfresher").setValue(true);   //two optionset value
formContext.getAttribute("pr_dob").setValue(new Date("01-25-2022"));//datetime
formContext.getAttribute ("pr_ttlsalary").setValue (20000);//currency
formContext.getAttribute("pr_age").setValue(45); //wholenumber
formContext.getAttribute("pr_rating").setValue(8.5);//decimal number

formContext.data.entity.save();
formContext.getAttribute("pr_languagesknown").setValue([315760000 , 315760001]);//optionset
}


//function for date validation

//accepting the date of birth only above 18 years old 
function onchangedob(executioncontext)
{
    var formContext = executioncontext.getFormContext();
    var birthdate = formContext.getAttribute("pr_birthdate").getValue();
    var today = new Date();
    var vmindate = new Date(today.getFullYear()-18,today.getMonth(),today.getDate(),today.getHours(),today.getMinutes());
    var birthDateFieldControl = formContext.getControl("pr_birthdate");
    var age = today.getFullYear()-birthdate.getFullYear();//age calculating
    formContext.getAttribute("pr_age").setValue(age);
    if(birthdate > vmindate)
    {
        birthDateFieldControl.setNotification("minimum age must be 18 years,Choose correct birthdate ","birthdate");

    }
    else
    {
        birthDateFieldControl.clearNotification("birthdate");

        
    }
}
// function to get the lookup field value
function onchangecompany(executioncontext)
{
    var  formContext = executioncontext.getFormContext();
    //checking the condition weather the look up field is empty or filled with soe data
    if(formContext.getAttribute("pr_company")!=null && formContext.getAttribute("pr_company").getValue()!=null)
    {
       var companyName = formContext.getAttribute("pr_company").getValue()[0].name;
       var companyId = formContext.getAttribute("pr_company").getValue()[0].id;
       var companyEntityName = formContext.getAttribute("pr_company").getValue()[0].entityType;
      /* alert(companyName);
       alert(companyId);
       alert(companyEntityName);*/
       
    }

}
//function to set the default value for lookup field value
function setcompanyvalue(executioncontext)
{
    var  formContext = executioncontext.getFormContext();
    var lookupvalue= new Array();
    lookupvalue[0] = new Object();
    lookupvalue[0].name = "TCS";
    lookupvalue[0].id = "{320C8CCF-F28B-EC11-93B0-000D3AF0593A}";
    lookupvalue[0].entityType = "pr_company";
    formContext.getAttribute("pr_company").setValue(lookupvalue);
}

function setformnotification(executioncontext)// customised message on form  
{
    var formContext = executioncontext.getFormContext();
    if (formContext.getAttribute("pr_city") !=null && formContext.getAttribute("pr_city").getValue()!= null)
    {
        formContext.ui.clearFormNotification("citynote");

    }
    else
    {
        formContext.ui.setFormNotification("Please fill the data for city", "ERROR","citynote");
    }
}
function getrecordid(executioncontext)// to particulr record details
{
    var formContext = executioncontext.getFormContext();
    var guidofRecord = formContext.data.entity.getId();
    var logicalNameOfEntity=formContext.data.entity.getEntityName();
alert (guidofRecord);
alert (logicalNameOfEntity);

}
function ondepartmentchange(executioncontext)// on change od department field to IT particular tab will hide
{
    var formContext = executioncontext.getFormContext();

  if (formContext.getAttribute("pr_department") != null)
  {
var deptValue = formContext. getAttribute("pr_department") .getValue();
  }
if (deptValue == 315760000)
{
formContext.ui.tabs.get("tab_2").setVisible(true);
}
else{
formContext.ui.tabs.get("tab_2").setVisible(false);
}
if (deptValue == 315760001) 
{
    formContext.ui.tabs.get ("general").sections.get("section_1").setVisible(true);
   
    }
    else
     {
    formContext.ui.tabs.get("general").sections.get("section_1").setVisible(false);
    }
}

// work bench jscripts
// Ribbon bench (function for setting for default value to a field from button)
function setcountry(excecutioncontext) //function for set country buton on employee entity form
{
    var formContext = excecutioncontext;
    formContext.getAttribute("pr_country").setValue(315760001);
    formContext.data.entity.save();
}
function homebutton(recordids)//function for home sample button on employee entity form
{
debugger;
for (var i = 0; i < recordids.length; i++)//for selected records chaing the country field to india and assigning it to a button
{
    alert(recordids[i]);
    var recordid = recordids[i];
    var entity = {};
entity.pr_country = 315760000;

Xrm.WebApi.online.updateRecord("pr_employee", recordid, entity).then(
    function success(result) {
        var updatedEntityId = result.id;
        alert("updated eployee country");
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);
}
 //alert("home button action");

}
//function for subgrid saple button on subgrid (will be available on company entity)

function subgridbutton() 
{
    alert("subgrid button action");

}


// split button function  working
function splitmain()
{
    alert("this message is comming from split main");
}
function split1()
{
    alert("this message is comming from split 1");
}
function split2()
{
    alert("this message is comming from split 2");
}
// flyout button functions
function flyoutmain()
{
    alert("fly out main");
}
function flyout1()
{
    alert("fly out 1");
}
function flyout2()
{
    alert("fly out 2");
}
function flyoutsplitmain()//split button is not working inside flyoutmenu
{
    alert("msg from flyoutsplitmain");
}
function flysplit1()//split button is not working inside flyoutmenu
{
    alert("msg from flysplit1");
}
function flysplit2()//split button is not working inside flyoutmenu
{
    alert("msg from flysplit2");
}







function flower() {
    // Assuming you have an image file named "flower.png" in your web resources
    var imageUrl = "/webresources/Myproject1/cr85a_flower.img";

    // Create an image element
    var flowerImage = document.createElement("img");
    flowerImage.src = imageUrl;
    flowerImage.alt = "Flower";

    // Position the image in the center of the form
    flowerImage.style.position = "absolute";
    flowerImage.style.left = "50%";
    flowerImage.style.top = "50%";
    flowerImage.style.transform = "translate(-50%, -50%)"; // Center the image

    // Append the image to the form
    document.body.appendChild(flowerImage);

}

