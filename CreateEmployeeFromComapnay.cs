using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace MyProject123.CRM.Plugins
{
    public class CreateEmployeeFromComapnay:IPlugin
    {
        public void Execute(IServiceProvider serviceProvider) {
            ITracingService traceService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            try {
                traceService.Trace("Plugin execution started");
                Entity company = (Entity)context.InputParameters["Target"];


                if (company.Attributes.Contains("rty_createemployee"))
                {
                    traceService.Trace("Having creat emp field data");
                    string empName = company.GetAttributeValue<string>("rty_createemployee");

                    traceService.Trace("Creating emp");
                    Entity emp = new Entity("rty_employee");
                    emp["rty_name"] = empName; //Singleline text
                    emp["rty_age"] = 27;       //Whole Number
                    emp["rty_country"] = new OptionSetValue(957410000); //Optionset
                    emp["rty_company"] = new EntityReference(context.PrimaryEntityName, context.PrimaryEntityId); //lookup
                    emp["rty_rating"] = 9.0m; //Decimal
                    emp["rty_aboutemployee"] = "This employee record created form plugin";
                    emp["rty_salary"] = new Money(Convert.ToDecimal(30000));  //Money
                    emp["rty_isfresher"] = true;
                    emp["rty_dateofjoin"] = new DateTime(2022, 03, 16);    //Date time

                    OptionSetValueCollection lk = new OptionSetValueCollection();
                    lk.Add(new OptionSetValue(957410000));
                    lk.Add(new OptionSetValue(957410002));

                    emp["rty_languagesknown"] = lk;

                    traceService.Trace("Before Create emp");
                    service.Create(emp);


                    ////Retrive employee record 
                    //Entity employee = service.Retrieve("rty_emplyee", new Guid("xxxxxx-zzz"), new ColumnSet(true));
                    ////Singleline text
                    //string _empName = employee.GetAttributeValue<string>("rty_name");
                    ////Whole Number
                    //int age = employee.GetAttributeValue<int>("rty_age");
                    ////Optionset
                    //int countryValue = employee.GetAttributeValue<OptionSetValue>("rty_country").Value;
                    //string countryLabel = employee.FormattedValues["rty_country"];
                    ////lookup
                    //string companyName = employee.GetAttributeValue<EntityReference>("rty_company").Name;
                    //string companyLogicalName = employee.GetAttributeValue<EntityReference>("rty_company").LogicalName;
                    //Guid companyID = employee.GetAttributeValue<EntityReference>("rty_company").Id;
                    ////Decimal
                    //decimal rating = employee.GetAttributeValue<decimal>("rty_rating");
                    ////Money
                    //decimal money = employee.GetAttributeValue<Money>("rty_salary").Value;
                    ////Two Optionset
                    //bool isfresher = employee.GetAttributeValue<bool>("rty_isfresher");
                    ////Date time
                    //DateTime doj = employee.GetAttributeValue<DateTime>("rty_dateofjoin");

                }
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }
    }
}
