//Retail Finance TAB Hide/UNHIDE 
function retailfinancefield(executioncontext)// on change of Retail Finance field  Yes  //tab hide on opportunity 
{
	var formContext = executioncontext.getFormContext();

	if (formContext.getAttribute("cnhisea_retailfinancerequried") != null) {
		var deptValue = formContext.getAttribute("cnhisea_retailfinancerequried").getValue();

		if (deptValue == 1) {
			//Retail Finance TAB Hide/UNHIDE 
			function retailfinancefield(executioncontext)// on change of Retail Finance field  Yes  //tab hide on opportunity 
			{
				var formContext = executioncontext.getFormContext();

				if (formContext.getAttribute("cnhisea_retailfinancerequried") != null) {
					var deptValue = formContext.getAttribute("cnhisea_retailfinancerequried").getValue();

					if (deptValue == 1) {
						formContext.ui.tabs.get("Retail Finance").setVisible(true);
						//formContext.ui.tabs.get ("Retail Finance").sections.get("Retail Finance_section_2").setVisible(true);

					}
					if (deptValue == 0) {
						formContext.ui.tabs.get("Retail Finance").setVisible(false);
						// formContext.ui.tabs.get ("Retail Finance").sections.get("Retail Finance_section_2").setVisible(false);
					}
				}
			}


			//EMI Calculation
			function EMIcalculation(executioncontext) {
				var formContext = executioncontext.getFormContext();


				//Retrieveing Values from Form 
				var Tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
				var Implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();

				var DPpercent = formContext.getAttribute("cnhisea_downpayment").getValue();
				var Totalprice = Tractorprice + Implementprice;
				formContext.getAttribute("cnhisea_totalprice").setValue(Totalprice);



				var interestrate = formContext.getAttribute("cnhisea_finalinterestrate").getValue();


				var tenor = formContext.getAttribute("cnhisea_tenor");//financing years
				if (tenor != null) {
					var FinancingYears = tenor.getText();
				} else if (tenor == null) {
					FinancingYears = tenor.setText(1);
				}



				var Retailfinancefield = formContext.getAttribute("cnhisea_retailfinancerequried").getValue();
				var Downpayment;

				if (Retailfinancefield != null && Retailfinancefield == 1) {

					//EMI calculation for tractor/ implement

					var FiancingMonths = FinancingYears * 12;

					formContext.getAttribute("cnhisea_financingmonths").setValue(FiancingMonths);

					var Totalprice = Tractorprice + Implementprice;
					formContext.getAttribute("cnhisea_totalprice").setValue(Totalprice);

					//Downpayment calculation based on dp%
					if (DPpercent == 791850000) {

						Downpayment = 0;
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

					} else if (DPpercent == 791850001) {
						Downpayment = Totalprice * (10 / 100);
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
					} else if (DPpercent == 791850002) {
						Downpayment = Totalprice * (20 / 100);
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
					} else if (DPpercent == 791850006) {
						Downpayment = Totalprice * (25 / 100);
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
					} else if (DPpercent == 791850003) {
						Downpayment = Totalprice * (30 / 100);
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
					} else if (DPpercent == 791850004) {
						Downpayment = Totalprice * (40 / 100);
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
					} else if (DPpercent == 791850005) {
						Downpayment = Totalprice * (50 / 100);
						formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

					}




					var finaldownpaymentz = formContext.getAttribute("cnhisea_finaldownpaymentz").getValue();

					var finaldownpaymentzpercent = (finaldownpaymentz / Totalprice) * 100;
					formContext.getAttribute("cnhisea_finaldownpaymentpercentage").setValue(finaldownpaymentzpercent);


					var TractorFinanceAmount = Totalprice - finaldownpaymentz;
					formContext.getAttribute("cnhisea_tractorfinanceamount").setValue(TractorFinanceAmount);

					var TractorInterestAmount = TractorFinanceAmount * FinancingYears * (interestrate / 100);
					formContext.getAttribute("cnhisea_tractorinterestamount").setValue(TractorInterestAmount);

					var TractotContractAmount = TractorFinanceAmount + TractorInterestAmount;
					formContext.getAttribute("cnhisea_tractorcontractamount").setValue(TractotContractAmount);


					//fee calculations

					var fee = TractorFinanceAmount * (2 / 100);
					formContext.getAttribute("cnhisea_fees").setValue(fee);

					var FeeInterestAmount = (fee) * (interestrate / 100) * FinancingYears;
					formContext.getAttribute("cnhisea_feeinterestamounts").setValue(FeeInterestAmount);

					var FeeContractAmount = fee + FeeInterestAmount;
					formContext.getAttribute("cnhisea_feecontractamount").setValue(FeeContractAmount);

					var TotalLeaseAmount = TractotContractAmount + FeeContractAmount;
					formContext.getAttribute("cnhisea_totalleaseamount").setValue(TotalLeaseAmount);


					//Calculation of Installments



					var Subinstallmentofeachmonth = (TractotContractAmount / FiancingMonths) * (20 / 100);
					formContext.getAttribute("cnhisea_subinstallmentofeachmonth").setValue(Subinstallmentofeachmonth);

					var MonthlyInstallment = (TractotContractAmount + FeeContractAmount) / FiancingMonths;
					formContext.getAttribute("cnhisea_monthlyinstallment").setValue(MonthlyInstallment);

					var QuarterlyInstallment = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 8)) / 4) + ((FeeContractAmount / FinancingYears) / 4);
					formContext.getAttribute("cnhisea_quarterlyinstallment").setValue(QuarterlyInstallment);

					var installment4months = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 9)) / 3) + ((FeeContractAmount / FinancingYears) / 3);
					formContext.getAttribute("cnhisea_4monthsinstallment").setValue(installment4months);

					var installmenthalfyearly = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 10)) / 2) + ((FeeContractAmount / FinancingYears) / 2);
					formContext.getAttribute("cnhisea_halfyearlyinstallment").setValue(installmenthalfyearly);

					var installmentyearly = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 11)) / 1) + ((FeeContractAmount / FinancingYears) / 1);
					formContext.getAttribute("cnhisea_maininstallmentyearlypayment").setValue(installmentyearly);
				}
				else if (Retailfinancefield == 0) {
					return;
				}

			}

			function calculateInterestRates(executioncontext) {

				var formContext = executioncontext.getFormContext();
				var DPpercentage = formContext.getAttribute("cnhisea_downpayment");
				var Term = formContext.getAttribute("cnhisea_term");
				if (DPpercentage != null && Term != null) {
					Xrm.WebApi.retrieveMultipleRecords("cnhisea_interestrates", "?$select=cnhisea_interestrate&$filter=cnhisea_term eq " + Term.getValue() + "and cnhisea_downpayment eq " + DPpercentage.getValue() + "&$top=1").then(
						function success(result) {
							for (var i = 0; i < result.entities.length; i++) {
								var interestRates = formContext.getAttribute("cnhisea_finalinterestrate").setValue(result.entities[0]["cnhisea_interestrate"]);
							}
						},
						function (error) {
							console.log(error.message);
							// handle error conditions
						}
					);
				}
				//Downpayment calculation based on dp%
				var Tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
				var Implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();

				var DPpercent = formContext.getAttribute("cnhisea_downpayment").getValue();
				var Totalprice = Tractorprice + Implementprice;
				formContext.getAttribute("cnhisea_totalprice").setValue(Totalprice);
				if (DPpercent == 791850000) {

					Downpayment = 0;
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

				} else if (DPpercent == 791850001) {
					Downpayment = Totalprice * (10 / 100);
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
				} else if (DPpercent == 791850002) {
					Downpayment = Totalprice * (20 / 100);
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
				} else if (DPpercent == 791850006) {
					Downpayment = Totalprice * (25 / 100);
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
				}else if (DPpercent == 791850003) {
					Downpayment = Totalprice * (30 / 100);
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
				} else if (DPpercent == 791850004) {
					Downpayment = Totalprice * (40 / 100);
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
				} else if (DPpercent == 791850005) {
					Downpayment = Totalprice * (50 / 100);
					formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

				}

			}
			//on change of Emicalculation of implement show emi calculation section
			function Emicalculationsectionhide(executioncontext) {

				var formContext = executioncontext.getFormContext();
				var emisection = formContext.getAttribute("cnhisea_showtractorimplementemicalculationssectio").getValue();
				if (emisection == 1) {
					formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_3").setVisible(true);
				}
				if (emisection == 0) {
					formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_3").setVisible(false);
				}


			}

			function BalerEmiCalculation(executioncontext) {

				var formContext = executioncontext.getFormContext();
				var balerprice = formContext.getAttribute("cnhisea_balerprice").getValue();
				var balerDPpercent = formContext.getAttribute("cnhisea_balercampaign").getValue();
				//Down Payment Calculations of Baler
				var balerdownpayment;
				if (balerDPpercent == 791850000) {
					balerdownpayment = balerprice * (40 / 100);
					formContext.getAttribute("cnhisea_balerdownpayment").setValue(balerdownpayment);

				} else if (balerDPpercent == 791850001) {
					balerdownpayment = balerprice * (50 / 100);
					formContext.getAttribute("cnhisea_balerdownpayment").setValue(balerdownpayment);
				}



				var btenor = formContext.getAttribute("cnhisea_balertenor");//financing years
				if (btenor != null) {
					var balertenor = btenor.getText();
				} else if (btenor == null) {
					balertenor = btenor.setText(1);
				}

				var balertenorinmonths = balertenor * 12;
				formContext.getAttribute("cnhisea_balertenorinmonths").setValue(balertenorinmonths);

				var balerinterestrate = formContext.getAttribute("cnhisea_baler").getValue();

				var balerfinaldownpayment = formContext.getAttribute("cnhisea_balerfinaldownpayment").getValue();

				var balerfinaldownpaymentpercent = (balerfinaldownpayment / balerprice) * 100;
				formContext.getAttribute("cnhisea_balerfinaldownpaymentpercent").setValue(balerfinaldownpaymentpercent);


				var balerfinanceamount = balerprice - balerfinaldownpayment;
				formContext.getAttribute("cnhisea_balerfinanceamount").setValue(balerfinanceamount);

				var balerinterestamount = balerfinanceamount * balertenor * (balerinterestrate / 100);
				formContext.getAttribute("cnhisea_balerinterestamount").setValue(balerinterestamount);

				var balercontractamount = balerfinanceamount + balerinterestamount;
				formContext.getAttribute("cnhisea_balercontractamount").setValue(balercontractamount);

				//fee for baler
				var balerfee = balerfinanceamount * (2 / 100);
				formContext.getAttribute("cnhisea_balerfee").setValue(balerfee);

				var balerfeeinterestamount = balerfee * balertenor * (balerinterestrate / 100);
				formContext.getAttribute("cnhisea_balerfeeinterestamount").setValue(balerfeeinterestamount);

				var balerfeecontractamount = balerfee + balerfeeinterestamount;
				formContext.getAttribute("cnhisea_balerfeecontractamount").setValue(balerfeecontractamount);

				//Baler Installments calculations
				var balerpaymentfrequency = formContext.getAttribute("cnhisea_balerpaymentfrequency").getValue();
				if (balerpaymentfrequency != 791850000) {
					var balersubinstallmenteachmonth = (balercontractamount / balertenorinmonths) * (20 / 100);
					formContext.getAttribute("cnhisea_balersubinstallmentofeachmonth").setValue(balersubinstallmenteachmonth);
				} else if (balerpaymentfrequency == 791850000) {
					formContext.getAttribute("cnhisea_balersubinstallmentofeachmonth").setValue(0);
				}

				var balermonthlypayemnt = (balercontractamount + balerfeecontractamount) / balertenorinmonths;
				formContext.getAttribute("cnhisea_balermonthlypaymentfrequencu").setValue(balermonthlypayemnt);

				var balerquaterlypf = (((balercontractamount / balertenor) - (balersubinstallmenteachmonth * 8)) / 4) + ((balerfeecontractamount / balertenor) / 4);
				formContext.getAttribute("cnhisea_balerquarterlypf").setValue(balerquaterlypf);

				var baler4monthspf = (((balercontractamount / balertenor) - (balersubinstallmenteachmonth * 9)) / 3) + ((balerfeecontractamount / balertenor) / 3);
				formContext.getAttribute("cnhisea_baler4monthspf").setValue(baler4monthspf);

				var baler6monthspf = (((balercontractamount / balertenor) - (balersubinstallmenteachmonth * 10)) / 2) + ((balerfeecontractamount / balertenor) / 2);
				formContext.getAttribute("cnhisea_baler6monthsfrequency").setValue(baler6monthspf);


				var totalleaseamountforbaler = balercontractamount + balerfeecontractamount;
				formContext.getAttribute("cnhisea_totalleaseamountofbaler").setValue(totalleaseamountforbaler);

			}

			function Balercalculationsectionhide(executioncontext)// on change of baleremicalulationsection  Yes  //tab hide on opportunity 
			{
				var formContext = executioncontext.getFormContext();
				var balersection = formContext.getAttribute("cnhisea_baleremicalculationsection").getValue();
				if (balersection == 1) {
					formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_5").setVisible(true);
				}
				if (balersection == 0) {
					formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_5").setVisible(false);
					formContext.getAttribute("cnhisea_balerfinaldownpayment").setValue(0);
				}

			}


			function defaultpricelistthailand(executioncontext)// on load of opportunity setting defaul pricelist
			{
				var formContext = executioncontext.getFormContext();
				var lookupvalue = new Array();
				lookupvalue[0] = new Object();
				lookupvalue[0].name = "Thailand Price List";
				lookupvalue[0].id = "{74b95064-b8c3-ed11-83fe-6045bd57c808}";
				lookupvalue[0].entityType = "pricelevel";
				formContext.getAttribute("pricelevelid").setValue(lookupvalue);

			}

			function calculatingalltotals(executioncontext)// On change of hide and show tabs of tractor,implement,baler calculate all totals
			{
				var formContext = executioncontext.getFormContext();
				var tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
				var implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();
				var balerprice = formContext.getAttribute("cnhisea_balerprice").getValue();

				var Totalpriceofallproducts = tractorprice + implementprice + balerprice;
				formContext.getAttribute("cnhisea_totalpriceofallproducts").setValue(Totalpriceofallproducts);


				var finaldownpaymentoftractorandimplement = formContext.getAttribute("cnhisea_finaldownpaymentz").getValue();
				var balerfinaldownpayment = formContext.getAttribute("cnhisea_balerfinaldownpayment").getValue();

				var Totalfinaldownpayments = finaldownpaymentoftractorandimplement + balerfinaldownpayment;
				formContext.getAttribute("cnhisea_totalfinaldownpayment").setValue(Totalfinaldownpayments);


				var leaseamountoftractorandimplement = formContext.getAttribute("cnhisea_totalleaseamount").getValue();

				var balercontractamount = formContext.getAttribute("cnhisea_balercontractamount").getValue();
				var balerfeecontractamount = formContext.getAttribute("cnhisea_balerfeecontractamount").getValue();
				var balerleaseamount = balercontractamount + balerfeecontractamount;

				var totaltpipbp = leaseamountoftractorandimplement + balerleaseamount;
				formContext.getAttribute("cnhisea_totalcontractamount").setValue(totaltpipbp);


			}

			function defaultcurrency(executioncontext) {
				var formContext = executioncontext.getFormContext();
				var lookupvalue = new Array();
				lookupvalue[0] = new Object();
				lookupvalue[0].name = "บาท";
				lookupvalue[0].id = "{4338ff51-1602-eb11-a813-000d3a8540c7}";
				lookupvalue[0].entityType = "transactioncurrency";
				formContext.getAttribute("transactioncurrencyid").setValue(lookupvalue);

			}
			function onchangeofcampaignpercntage(executioncontext) {
				var formContext = executioncontext.getFormContext();
				formContext.getAttribute("cnhisea_finaldownpaymentz").setValue(0);

			}
			function onchangeofbalercampaign(executioncontext) {
				var formContext = executioncontext.getFormContext();
				formContext.getAttribute("cnhisea_balerfinaldownpayment").setValue(0);

			}

			function onchangeofdealershipname(executionContext) {
				var formContext = executionContext.getFormContext();
				if (formContext.getAttribute("cnhisea_dealershipname") != null && formContext.getAttribute("cnhisea_dealershipname").getValue() != null) {
					var dealershipid = formContext.getAttribute("cnhisea_dealershipname").getValue()[0].id;
					Xrm.WebApi.online.retrieveRecord("cnhisea_dealership", dealershipid, "?$select=_cnhisea_dealershipprovince_value").then(
						function success(result) {
							var lookupVal = new Array();
							lookupVal[0] = new Object();
							lookupVal[0].id = result["_cnhisea_dealershipprovince_value"];
							lookupVal[0].name = result["_cnhisea_dealershipprovince_value@OData.Community.Display.V1.FormattedValue"];;
							lookupVal[0].entityType = result["_cnhisea_dealershipprovince_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
							formContext.getAttribute("cnhisea_dealerprovince").setValue(lookupVal);
						},
						function (error) {
							Xrm.Utility.alertDialog(error.message);
						}
					);
				}

			}



			formContext.ui.tabs.get("Retail Finance").setVisible(true);
			//formContext.ui.tabs.get ("Retail Finance").sections.get("Retail Finance_section_2").setVisible(true);

		}
		if (deptValue == 0) {
			formContext.ui.tabs.get("Retail Finance").setVisible(false);
			// formContext.ui.tabs.get ("Retail Finance").sections.get("Retail Finance_section_2").setVisible(false);
		}
	}
}


//EMI Calculation
function EMIcalculation(executioncontext) {
	var formContext = executioncontext.getFormContext();


	//Retrieveing Values from Form 
	var Tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
	var Implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();

	var DPpercent = formContext.getAttribute("cnhisea_downpayment").getValue();
	var Totalprice = Tractorprice + Implementprice;
	formContext.getAttribute("cnhisea_totalprice").setValue(Totalprice);



	var interestrate = formContext.getAttribute("cnhisea_finalinterestrate").getValue();


	var tenor = formContext.getAttribute("cnhisea_tenor");//financing years
	if (tenor != null) {
		var FinancingYears = tenor.getText();
	} else if (tenor == null) {
		FinancingYears = tenor.setText(1);
	}



	var Retailfinancefield = formContext.getAttribute("cnhisea_retailfinancerequried").getValue();
	var Downpayment;

	if (Retailfinancefield != null && Retailfinancefield == 1) {

		//EMI calculation Begin

		var FiancingMonths = FinancingYears * 12;

		formContext.getAttribute("cnhisea_financingmonths").setValue(FiancingMonths);

		var Totalprice = Tractorprice + Implementprice;
		formContext.getAttribute("cnhisea_totalprice").setValue(Totalprice);

		//Downpayment calculation based on dp%
		if (DPpercent == 791850000) {

			Downpayment = 0;
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

		} else if (DPpercent == 791850001) {
			Downpayment = Totalprice * (10 / 100);
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
		} else if (DPpercent == 791850002) {
			Downpayment = Totalprice * (20 / 100);
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
		} else if (DPpercent == 791850006) {
			Downpayment = Totalprice * (25 / 100);
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
		} else if (DPpercent == 791850003) {
			Downpayment = Totalprice * (30 / 100);
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
		} else if (DPpercent == 791850004) {
			Downpayment = Totalprice * (40 / 100);
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
		} else if (DPpercent == 791850005) {
			Downpayment = Totalprice * (50 / 100);
			formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

		}




		var finaldownpaymentz = formContext.getAttribute("cnhisea_finaldownpaymentz").getValue();

		var finaldownpaymentzpercent = (finaldownpaymentz / Totalprice) * 100;
		formContext.getAttribute("cnhisea_finaldownpaymentpercentage").setValue(finaldownpaymentzpercent);


		var TractorFinanceAmount = Totalprice - finaldownpaymentz;
		formContext.getAttribute("cnhisea_tractorfinanceamount").setValue(TractorFinanceAmount);

		var TractorInterestAmount = TractorFinanceAmount * FinancingYears * (interestrate / 100);
		formContext.getAttribute("cnhisea_tractorinterestamount").setValue(TractorInterestAmount);

		var TractotContractAmount = TractorFinanceAmount + TractorInterestAmount;
		formContext.getAttribute("cnhisea_tractorcontractamount").setValue(TractotContractAmount);


		//fee calculations

		var fee = TractorFinanceAmount * (2 / 100);
		formContext.getAttribute("cnhisea_fees").setValue(fee);

		var FeeInterestAmount = (fee) * (interestrate / 100) * FinancingYears;
		formContext.getAttribute("cnhisea_feeinterestamounts").setValue(FeeInterestAmount);

		var FeeContractAmount = fee + FeeInterestAmount;
		formContext.getAttribute("cnhisea_feecontractamount").setValue(FeeContractAmount);

		var TotalLeaseAmount = TractotContractAmount + FeeContractAmount;
		formContext.getAttribute("cnhisea_totalleaseamount").setValue(TotalLeaseAmount);


		//Calculation of Installments


		var Subinstallmentofeachmonth;
		//calculation of subinstallment
		var HP = formContext.getAttribute("cnhisea_hpoftheselectedmodel").getValue();
		if (HP >= 0 && HP <= 50) {
			Subinstallmentofeachmonth = 2000;
		} else if (HP >= 51 && HP <= 90) {
			Subinstallmentofeachmonth = 3000;

		} else if (HP >= 91 && HP <= 110) {
			Subinstallmentofeachmonth = 4000;

		}  else if (HP > 110) {
			Subinstallmentofeachmonth = 5000;

		}
		//alert(Subinstallmentofeachmonth);

		formContext.getAttribute("cnhisea_subinstallmentofeachmonth").setValue(Subinstallmentofeachmonth); 

		var MonthlyInstallment = (TractotContractAmount + FeeContractAmount) / FiancingMonths;
		formContext.getAttribute("cnhisea_monthlyinstallment").setValue(MonthlyInstallment);

		var QuarterlyInstallment = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 8)) / 4) + ((FeeContractAmount / FinancingYears) / 4);
		formContext.getAttribute("cnhisea_quarterlyinstallment").setValue(QuarterlyInstallment);

		var installment4months = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 9)) / 3) + ((FeeContractAmount / FinancingYears) / 3);
		formContext.getAttribute("cnhisea_4monthsinstallment").setValue(installment4months);

		var installmenthalfyearly = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 10)) / 2) + ((FeeContractAmount / FinancingYears) / 2);
		formContext.getAttribute("cnhisea_halfyearlyinstallment").setValue(installmenthalfyearly);

		var installmentyearly = (((TractotContractAmount / FinancingYears) - (Subinstallmentofeachmonth * 11)) / 1) + ((FeeContractAmount / FinancingYears) / 1);
		formContext.getAttribute("cnhisea_maininstallmentyearlypayment").setValue(installmentyearly);
	}

}

//function calculateInterestRates(executioncontext) {
//
//	var formContext = executioncontext.getFormContext();
//	var DPpercentage = formContext.getAttribute("cnhisea_downpayment");
//	var Term = formContext.getAttribute("cnhisea_term");
//	if (DPpercentage != null && Term != null) {
//		Xrm.WebApi.retrieveMultipleRecords("cnhisea_interestrates", "?$select=cnhisea_interestrate&$filter=cnhisea_term eq " + //Term.getValue() + "and cnhisea_downpayment eq " + DPpercentage.getValue() + "&$top=1").then(
//			function success(result) {
//				for (var i = 0; i < result.entities.length; i++) {
//					var interestRates = formContext.getAttribute("cnhisea_finalinterestrate").setValue(result.entities[0]//["cnhisea_interestrate"]);
//				}
//			},
//			function (error) {
//				console.log(error.message);
				// handle error conditions
//			}
//		);
//	}
	//Downpayment calculation based on dp%
//	var Tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
//	var Implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();
//
//	var DPpercent = formContext.getAttribute("cnhisea_downpayment").getValue();
//	var Totalprice = Tractorprice + Implementprice;
//	formContext.getAttribute("cnhisea_totalprice").setValue(Totalprice);
//	if (DPpercent == 791850000) {
//
//		Downpayment = 0;
//		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
//
//	} else if (DPpercent == 791850001) {
//		Downpayment = Totalprice * (10 / 100);
//		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
	} else if (DPpercent == 791850002) {
		Downpayment = Totalprice * (20 / 100);
		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
	} else if (DPpercent == 791850006) {
		Downpayment = Totalprice * (25 / 100);
		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
	}else if (DPpercent == 791850003) {
		Downpayment = Totalprice * (30 / 100);
		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
	} else if (DPpercent == 791850004) {
		Downpayment = Totalprice * (40 / 100);
		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);
	} else if (DPpercent == 791850005) {
		Downpayment = Totalprice * (50 / 100);
		formContext.getAttribute("cnhisea_finaldownpayment").setValue(Downpayment);

	}

}
//on change of Emicalculation of implement show emi calculation section
function Emicalculationsectionhide(executioncontext) {

	var formContext = executioncontext.getFormContext();
	var emisection = formContext.getAttribute("cnhisea_showtractorimplementemicalculationssectio").getValue();
	if (emisection == 1) {
		formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_3").setVisible(true);
	}
	if (emisection == 0) {
		formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_3").setVisible(false);
	}


}
//baler downpayment calculation
function balerdownpaymentcalculation(executioncontext) {

	var formContext = executioncontext.getFormContext();
	var balerprice = formContext.getAttribute("cnhisea_balerprice").getValue();
	if (balerprice != 0) {
		var balerDPpercent = formContext.getAttribute("cnhisea_campaignforbaler").getValue();
		//Down Payment Calculations of Baler
		var balerdownpayment;
		if (balerDPpercent == 791850000) {
			balerdownpayment = balerprice * (40 / 100);
			formContext.getAttribute("cnhisea_balerdownpayment").setValue(balerdownpayment);

		} else if (balerDPpercent == 791850001) {
			balerdownpayment = balerprice * (50 / 100);
			formContext.getAttribute("cnhisea_balerdownpayment").setValue(balerdownpayment);
		}
	}
}

function BalerEmiCalculation(executioncontext) {

	var formContext = executioncontext.getFormContext();
	var balerprice = formContext.getAttribute("cnhisea_balerprice").getValue();

	var btenor = formContext.getAttribute("cnhisea_balertenor");//financing years
	if (btenor != null) {
		var balertenor = btenor.getText();
	} else if (btenor == null) {
		balertenor = btenor.setText(1);
	}

	var balertenorinmonths = balertenor * 12;
	formContext.getAttribute("cnhisea_balertenorinmonths").setValue(balertenorinmonths);

	var balerinterestrate = formContext.getAttribute("cnhisea_baler").getValue();

	var balerfinaldownpayment = formContext.getAttribute("cnhisea_balerfinaldownpayment").getValue();

	if (balerfinaldownpayment != null && balerprice != null) {
		var balerfinaldownpaymentpercent = (balerfinaldownpayment / balerprice) * 100;
		formContext.getAttribute("cnhisea_balerfinaldownpaymentpercent").setValue(balerfinaldownpaymentpercent);
	} else if (balerfinaldownpayment == 0 || balerprice == null) {
		formContext.getAttribute("cnhisea_balerfinaldownpaymentpercent").setValue(0.00);
	}


	var balerfinanceamount = balerprice - balerfinaldownpayment;
	formContext.getAttribute("cnhisea_balerfinanceamount").setValue(balerfinanceamount);

	var balerinterestamount = balerfinanceamount * balertenor * (balerinterestrate / 100);
	formContext.getAttribute("cnhisea_balerinterestamount").setValue(balerinterestamount);

	var balercontractamount = balerfinanceamount + balerinterestamount;
	formContext.getAttribute("cnhisea_balercontractamount").setValue(balercontractamount);

	//fee for baler
	var balerfee = balerfinanceamount * (2 / 100);
	formContext.getAttribute("cnhisea_balerfee").setValue(balerfee);

	var balerfeeinterestamount = balerfee * balertenor * (balerinterestrate / 100);
	formContext.getAttribute("cnhisea_balerfeeinterestamount").setValue(balerfeeinterestamount);

	var balerfeecontractamount = balerfee + balerfeeinterestamount;
	formContext.getAttribute("cnhisea_balerfeecontractamount").setValue(balerfeecontractamount);

	var balersubinstallmenteachmonth = (balercontractamount / balertenorinmonths) * (20 / 100);
	formContext.getAttribute("cnhisea_balersubinstallmentofeachmonth").setValue(balersubinstallmenteachmonth);

	var balermonthlypayemnt = (balercontractamount + balerfeecontractamount) / balertenorinmonths;
	formContext.getAttribute("cnhisea_balermonthlypaymentfrequencu").setValue(balermonthlypayemnt);

	var balerquaterlypf = (((balercontractamount / balertenor) - (balersubinstallmenteachmonth * 8)) / 4) + ((balerfeecontractamount / balertenor) / 4);
	formContext.getAttribute("cnhisea_balerquarterlypf").setValue(balerquaterlypf);

	var baler4monthspf = (((balercontractamount / balertenor) - (balersubinstallmenteachmonth * 9)) / 3) + ((balerfeecontractamount / balertenor) / 3);
	formContext.getAttribute("cnhisea_baler4monthspf").setValue(baler4monthspf);

	var baler6monthspf = (((balercontractamount / balertenor) - (balersubinstallmenteachmonth * 10)) / 2) + ((balerfeecontractamount / balertenor) / 2);
	formContext.getAttribute("cnhisea_baler6monthsfrequency").setValue(baler6monthspf);


	var totalleaseamountforbaler = balercontractamount + balerfeecontractamount;
	formContext.getAttribute("cnhisea_totalleaseamountofbaler").setValue(totalleaseamountforbaler);

}

function Balercalculationsectionhide(executioncontext)// on change of baleremicalulationsection  Yes  //tab hide on opportunity 
{
	var formContext = executioncontext.getFormContext();
	var balersection = formContext.getAttribute("cnhisea_baleremicalculationsection").getValue();
	if (balersection == 1) {
		formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_5").setVisible(true);
	}
	if (balersection == 0) {
		formContext.ui.tabs.get("Retail Finance").sections.get("Retail Finance_section_5").setVisible(false);

	}

}


function defaultpricelistthailand(executioncontext)// on load of opportunity setting defaul pricelist
{
	var formContext = executioncontext.getFormContext();
	var lookupvalue = new Array();
	lookupvalue[0] = new Object();
	lookupvalue[0].name = "Thailand Price List";
	lookupvalue[0].id = "{74b95064-b8c3-ed11-83fe-6045bd57c808}";
	lookupvalue[0].entityType = "pricelevel";
	formContext.getAttribute("pricelevelid").setValue(lookupvalue);

}

function calculatingalltotals(executioncontext)// On change of hide and show tabs of tractor,implement,baler calculate all totals
{
	var formContext = executioncontext.getFormContext();
	var tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
	var implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();
	var balerprice = formContext.getAttribute("cnhisea_balerprice").getValue();

	var Totalpriceofallproducts = tractorprice + implementprice + balerprice;
	formContext.getAttribute("cnhisea_totalpriceofallproducts").setValue(Totalpriceofallproducts);


	var finaldownpaymentoftractorandimplement = formContext.getAttribute("cnhisea_finaldownpaymentz").getValue();
	var balerfinaldownpayment = formContext.getAttribute("cnhisea_balerfinaldownpayment").getValue();

	var Totalfinaldownpayments = finaldownpaymentoftractorandimplement + balerfinaldownpayment;
	formContext.getAttribute("cnhisea_totalfinaldownpayment").setValue(Totalfinaldownpayments);


	var leaseamountoftractorandimplement = formContext.getAttribute("cnhisea_totalleaseamount").getValue();

	var balercontractamount = formContext.getAttribute("cnhisea_balercontractamount").getValue();
	var balerfeecontractamount = formContext.getAttribute("cnhisea_balerfeecontractamount").getValue();
	var balerleaseamount = balercontractamount + balerfeecontractamount;

	var totaltpipbp = leaseamountoftractorandimplement + balerleaseamount;
	formContext.getAttribute("cnhisea_totalcontractamount").setValue(totaltpipbp);


}

function defaultcurrency(executioncontext)//setting default currency to thailand on CNHI_sea qa1
{
	var formContext = executioncontext.getFormContext();
	var lookupvalue = new Array();
	lookupvalue[0] = new Object();
	lookupvalue[0].name = "บาท";
	lookupvalue[0].id = "{4338ff51-1602-eb11-a813-000d3a8540c7}";
	lookupvalue[0].entityType = "transactioncurrency";
	formContext.getAttribute("transactioncurrencyid").setValue(lookupvalue);

}
function onchangeofcampaignpercntage(executioncontext) {
	var formContext = executioncontext.getFormContext();
	formContext.getAttribute("cnhisea_finaldownpaymentz").setValue(0);

}
function onchangeofbalercampaign(executioncontext) {
	var formContext = executioncontext.getFormContext();
	formContext.getAttribute("cnhisea_balerfinaldownpayment").setValue(0);

}

function onchangeofdealershipname(executionContext) {
	var formContext = executionContext.getFormContext();
	formContext.getAttribute("cnhisea_dealerprovince").setValue(null);
	if (formContext.getAttribute("cnhisea_dealershipname") != null && formContext.getAttribute("cnhisea_dealershipname").getValue() != null) {
		var dealershipid = formContext.getAttribute("cnhisea_dealershipname").getValue()[0].id;
		Xrm.WebApi.online.retrieveRecord("cnhisea_dealership", dealershipid, "?$select=_cnhisea_dealershipprovince_value").then(
			function success(result) {
				if (result["_cnhisea_dealershipprovince_value"] != null) {
					var lookupVal = new Array();
					lookupVal[0] = new Object();
					lookupVal[0].id = result["_cnhisea_dealershipprovince_value"];
					lookupVal[0].name = result["_cnhisea_dealershipprovince_value@OData.Community.Display.V1.FormattedValue"];;
					lookupVal[0].entityType = result["_cnhisea_dealershipprovince_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
					formContext.getAttribute("cnhisea_dealerprovince").setValue(lookupVal);
				}

			},
			function (error) {
				Xrm.Utility.alertDialog(error.message);
			}
		);
	}

}

function tmdownpaymentfieldlevelnotify(executionContext) {
	var formContext = executionContext.getFormContext();
	var tmminimumdp = formContext.getAttribute("cnhisea_finaldownpayment").getValue();
	var tmfinaldownpayment = formContext.getAttribute("cnhisea_finaldownpaymentz").getValue();

	if (tmminimumdp > tmfinaldownpayment) {

		formContext.getControl("cnhisea_finaldownpaymentz").setNotification('Final Downpayment is less than Minimum Downpayment');
	} else if (tmminimumdp <= tmfinaldownpayment) {
		formContext.getControl("cnhisea_finaldownpaymentz").clearNotification();

	}


}
function balerdpfieldleveldotify(executionContext) {
	var formContext = executionContext.getFormContext();
	var balerminimumdp = formContext.getAttribute("cnhisea_balerdownpayment").getValue();
	var balerfinaldownpayment = formContext.getAttribute("cnhisea_balerfinaldownpayment").getValue();

	if (balerminimumdp > balerfinaldownpayment) {
		formContext.getControl("cnhisea_balerfinaldownpayment").setNotification('Final Downpayment is less than Minimum Downpayment');
	}
	else if (balerminimumdp <= balerfinaldownpayment) {
		formContext.getControl("cnhisea_balerfinaldownpayment").clearNotification();
	}
}

function closeAsWonCustomEnable(primaryControl) {
	try {
		debugger;
		var formContext = primaryControl;
		var isShowCloseAsWon = false; // Show/Hide Variable for "Close as won " Button

		//Get active process details
		var activeProcess = formContext.data.process.getActiveProcess();
		var getActiveProcessName = activeProcess.getName();

		//Get active Stage details
		var activeStage = formContext.data.process.getActiveStage();
		var getactivestagename = activeStage.getName();

		var state = formContext.getAttribute("statecode").getValue();

		//If Opportunity is already Won then return false
		if (state !== 0) // 0 = Open
		{
			return isShowCloseAsWon;
		}

		//Check the BPF stage name
		if (activeProcess != null && getActiveProcessName == "Opportunity Sales Process" || getActiveProcessName == "Lead to Opportunity Sales Process") {
			//alert(getActiveProcessName)
			if (getactivestagename === "Close") {
				isShowCloseAsWon = true;
			}

		}
		return isShowCloseAsWon;
	} catch (e) {
		alert("An error has occurred : " + e.message)

	}

}




// opportunity close as WOn on update a delivery confirmation field

function openDialog(executionContext) {
	var formContext = executionContext.getFormContext();
	var oppclose = formContext.getAttribute("cnhisea_opportunityclose").getValue();

	if (oppclose == 791850909) {
		Mscrm.OpportunityCommandActions.opportunityClose(1);
	}
	else if (oppclose == 791850910) {
		Mscrm.OpportunityCommandActions.opportunityClose(0);
	}
}

function onchangeoffinancepartner(executionContext) {
	var formContext = executionContext.getFormContext();
	if (formContext.getAttribute("cnhisea_financepartner") != null && formContext.getAttribute("cnhisea_financepartner").getValue() != null) {
		var financepartnerid = formContext.getAttribute("cnhisea_financepartner").getValue()[0].id;
		Xrm.WebApi.online.retrieveRecord("cnhisea_financepartner", financepartnerid, "?$select=cnhisea_fee").then(
			function success(result) {
				var feepercentagefp = result["cnhisea_fee"];

				formContext.getAttribute("cnhisea_feepercentagefp").setValue(feepercentagefp);
			},
			function (error) {
				Xrm.Utility.alertDialog(error.message);
			}
		);
	}

}

function onloadminimiumdownpaymentpercentageonopp(executionContext) {

	var formContext = executionContext.getFormContext();

	var lookupvalue = new Array();
	lookupvalue[0] = new Object();
	lookupvalue[0].name = "DownPayment";
	lookupvalue[0].id = "{e7cdb696-be26-ee11-9965-002248ecf7dc}";
	lookupvalue[0].entityType = "cnhisea_businessadminfieldlevelmaintainance";
	formContext.getAttribute("cnhisea_businessadmindatamaintainence").setValue(lookupvalue);

	if (formContext.getAttribute("cnhisea_businessadmindatamaintainence") != null && formContext.getAttribute("cnhisea_businessadmindatamaintainence").getValue() != null) {
		var downpaymentpercentid = formContext.getAttribute("cnhisea_businessadmindatamaintainence").getValue()[0].id;
		Xrm.WebApi.online.retrieveRecord("cnhisea_businessadminfieldlevelmaintainance", downpaymentpercentid, "?$select=cnhisea_downpaymentpercentage").then(
			function success(result) {
				var minimumdppercent = result["cnhisea_downpaymentpercentage"];

				formContext.getAttribute("cnhisea_minimumdownpaymentpercentage").setValue(minimumdppercent);
			},
			function (error) {
				Xrm.Utility.alertDialog(error.message);
			}
		);
	}

	
}
function onchangepaymentfrequencyminimumdpcal(executionContext) {

	var formContext = executionContext.getFormContext();
	var Tractorprice = formContext.getAttribute("cnhisea_tractorprice").getValue();
	var Implementprice = formContext.getAttribute("cnhisea_implementprice").getValue();
	
	var Totalprice = Tractorprice + Implementprice;
	
	var minimumdppercent = formContext.getAttribute("cnhisea_minimumdownpaymentpercentage").getValue();
	var minimumdownpayment = Totalprice * (minimumdppercent / 100);
	formContext.getAttribute("cnhisea_finaldownpayment").setValue(minimumdownpayment);

}