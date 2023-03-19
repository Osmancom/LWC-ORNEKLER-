import { LightningElement, wire } from 'lwc';
//Import methods from salesforce
import getCaseCaseRecordsById from '@salesforce/apex/CaseManager.getCaseRecordsById';
import getAllCases from '@salesforce/apex/CaseManager.getAllCases';
export default class CaseManager extends LightningElement {

    cases;
    inputCaseNumber;
    errorDetails;

    @wire(getAllCases)
    checkCaseDetails({data,error}){
        if(data){
            this.cases = data;            
        }
        else if(error){
            this.errorDetails = error;
            console.log(this.errorDetails);
        }
    }

    searchForCase(event){
        this.inputCaseNumber = event.target.value;
        console.log(this.inputCaseNumber);

        //Calling apex method imperatively
        //make sure parameter is enclosed in curly braces and name of parameter
        //in js file is the same as the one in class file
        getCaseCaseRecordsById({caseId:this.inputCaseNumber})
        .then(result =>{
            this.cases = result;
        }  
        )
        .catch(error=>{
            console.log(error);
        });
    }
    /*
    cases = [
        {
            Id:1,
            Subject:'Test Case 1',
            Priority:'High',
            Status:'New'
        },
        {
            Id:2,
            Subject:'Test Case 2',
            Priority:'Medium',
            Status:'Working'
        },
        {
            Id:3,
            Subject:'Test Case 3',
            Priority:'Low',
            Status:'Closed'
        },
    ]
    */
}