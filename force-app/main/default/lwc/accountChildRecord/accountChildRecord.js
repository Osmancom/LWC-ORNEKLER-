import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import CHILD_ACCOUNTS from '@salesforce/apex/AccountChildController.getChildAccounts';
import CHILD_CONTACTS from '@salesforce/apex/AccountChildController.getChildContacts';

export default class AccountDetails extends NavigationMixin(LightningElement) {
    @api recordId;
    accounts = [];
    contacts = [];

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD, ACCOUNT_NUMBER_FIELD] })
    account;

    @wire(CHILD_ACCOUNTS, { accountId: '$recordId' })
    getAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            console.error(error);
        }
    }

    @wire(CHILD_CONTACTS, { accountId: '$recordId' })
    getContacts({ error, data }) {
        if (data) {
            this.contacts = data;
        } else if (error) {
            console.error(error);
        }
    }

    get accountName() {
        return getFieldValue(this.account.data, ACCOUNT_NAME_FIELD);
    }

    get accountNumber() {
        return getFieldValue(this.account.data, ACCOUNT_NUMBER_FIELD);
    }

    navigateToRecord(event) {
        const recordId = event.currentTarget.dataset.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId, 
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}
