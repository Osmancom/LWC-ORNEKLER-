import { LightningElement, wire, api } from 'lwc';
import getChildAccount from '@salesforce/apex/GetAccountContact.getChildAccounts';
import {NavigationMixin} from 'lightning/navigation';
export default class ChildAccount extends NavigationMixin(LightningElement) {

    @api recordId;
    childAccounts;

    @wire(getChildAccount, {
        parentAccId:'$recordId'
    }) childAccounts;

    navigateToViewAccountPage(event) {
        
        var recId = event.target.name;
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recId,
                objectApiName: 'Account',
                actionName: 'view'
            },
        });
        }

    
}