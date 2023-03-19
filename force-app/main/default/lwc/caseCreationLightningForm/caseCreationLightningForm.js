import { LightningElement } from 'lwc';

//import object
import CASE_OBJECT from '@salesforce/schema/Case';

//import fields that you want
//make sure you match API Name of Object and its field
import CASENUMBER_FIELD from '@salesforce/schema/Case.CaseNumber';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CaseCreationLightningForm extends LightningElement {

    caseObject = CASE_OBJECT;
    caseFields = [CASENUMBER_FIELD,PRIORITY_FIELD,STATUS_FIELD,SUBJECT_FIELD];
    title = 'Success'

    handleCaseSuccess(event){

        this.dispatchEvent(new ShowToastEvent({
                title: this.title,
                message: 'Record Created Successfully...!!!',
                variant: 'success'
        }));

    }

}