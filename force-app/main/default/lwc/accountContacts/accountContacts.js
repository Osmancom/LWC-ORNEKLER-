import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getChildAccounts from '@salesforce/apex/AccountChildRecords.getChildAccounts';
import getChildContacts from '@salesforce/apex/AccountChildRecords.getChildContacts';

export default class ChildAccountsAndContacts extends NavigationMixin(LightningElement) {
    @track childAccounts;
    @track childContacts;
    @track recordId;
    error;

    @wire(getChildAccounts, {accountId: '$recordId'})
    wiredChildAccounts({error, data}) {
        if (data) {
            this.childAccounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.childAccounts = undefined;
        }
    }

    handleAccountClick(event) {
        event.preventDefault();
        let accountId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }

    @wire(getChildContacts, {accountId: '$recordId'})
    wiredChildContacts({error, data}) {
        if (data) {
            this.childContacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.childContacts = undefined;
        }
    }
}


