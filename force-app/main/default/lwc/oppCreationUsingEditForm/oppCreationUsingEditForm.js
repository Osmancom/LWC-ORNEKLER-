import { LightningElement } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import ACCOUNTNAME_FIELD from '@salesforce/schema/Opportunity.AccountId';
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import DESCRIPTION_FIELD from '@salesforce/schema/Opportunity.Description';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class OppCreationUsingEditForm extends LightningElement {

    oppObject = OPPORTUNITY_OBJECT;
    oppFields = [NAME_FIELD,ACCOUNTNAME_FIELD,CLOSEDATE_FIELD,DESCRIPTION_FIELD,STAGE_FIELD,TYPE_FIELD];
    nameField = NAME_FIELD;
    accNameField = ACCOUNTNAME_FIELD;
    closeDateField = CLOSEDATE_FIELD;
    descriptionField = DESCRIPTION_FIELD;
    stageField = STAGE_FIELD;
    typeField = TYPE_FIELD;

    handleSuccess(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Opportunity Created Successfully..!!',
            variant: 'success'
        }));
    }

    handleReset(event){
        const inputFields = this.template.querySelectorAll('lightning-input-field');

        inputFields.forEach(field => {
            field.reset();
        });
    }


}