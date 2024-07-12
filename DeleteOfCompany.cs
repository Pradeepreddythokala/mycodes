using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace MyProject123.CRM.Plugins
{
    public class DeleteOfCompany : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService traceService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            try
            {
                QueryExpression qe = new QueryExpression("rty_employee");
                ConditionExpression ce = new ConditionExpression("rty_company", ConditionOperator.Equal, context.PrimaryEntityId);
                qe.Criteria.AddCondition(ce);
                EntityCollection employees = service.RetrieveMultiple(qe);

                // throw new InvalidPluginExecutionException("emp count is "+employees.Entities.Count);

                foreach (var emp in employees.Entities)
                {
                    Entity _emp = new Entity(emp.LogicalName, emp.Id);
                    _emp["rty_company"] = new EntityReference(context.PrimaryEntityName, new Guid("4a44f029-ae8b-ec11-93b0-000d3aca10cc"));
                    service.Update(_emp);
                }
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }
    }
}