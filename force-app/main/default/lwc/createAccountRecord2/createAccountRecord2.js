import { LightningElement, api, wire } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class AccountRecordUpdateComp extends LightningElement {
    @api availableActions = [];
    @api accountRecordId;
    objectApiName = 'Account';
    fields = ['Name', 'Type', 'Industry', 'Phone', 'AnnualRevenue'];

    // Property to store picklist values for the Type field
    typePicklistValues = [];

    // Fetch the object info for the Account object to get the picklist values for the Type field
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // When the object info is available, get the picklist values for the Type field
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfoCallback({ data, error }) {
        if (data) {
            const fieldInfo = data.fields.Type;
            this.typePicklistValues = fieldInfo.picklistValues.map(value => value.value);
        } else if (error) {
            console.error(error);
        }
    }

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Record Update",
            message: "Account record is updated Successfully",
            variant: "success"
        });
        this.dispatchEvent(evt);    
        this.handleGoNext();        
    }

    handleGoNext() {
        // check if NEXT is allowed on this screen
        if (this.availableActions.find(action => action === 'NEXT')) {
            // navigate to the next screen
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
}
