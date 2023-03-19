import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AccountCreationRecordForm extends LightningElement {

    handleAccountSuccess(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Account Created Successfully',
            variant: 'success'
        }));
    }
    

}