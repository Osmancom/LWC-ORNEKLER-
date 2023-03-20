import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccountsWithContacts from '@salesforce/apex/AccountContactsController.getAccountsWithContacts';

const ACCOUNT_COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text' },
    { label: 'Account Address', fieldName: 'Address', type: 'text' },
    { type: 'action', typeAttributes: { rowActions: [] } }
];

const CONTACT_COLUMNS = [
    { label: 'Contact Name', fieldName: 'Name', type: 'text' },
    { label: 'Contact Address', fieldName: 'Address', type: 'text' },
    { type: 'action', typeAttributes: { rowActions: [] } }
];

export default class AccountContacts extends NavigationMixin(LightningElement) {
    @api recordId;
    accounts = [];
    contacts = [];
    accountColumns = ACCOUNT_COLUMNS;
    contactColumns = CONTACT_COLUMNS;

    @wire(getAccountsWithContacts, {accountId: '$recordId'})
    wiredAccounts({error, data}) {
        if (data) {
            this.accounts = data.accounts.map(account => ({
                Id: account.Id,
                Name: account.Name,
                Address: `${account.BillingStreet}, ${account.BillingCity}, ${account.BillingState}, ${account.BillingCountry}, ${account.BillingPostalCode}`
            }));
            this.contacts = data.contacts.map(contact => ({
                Id: contact.Id,
                Name: contact.Name,
                Address: `${contact.MailingStreet}, ${contact.MailingCity}, ${contact.MailingState}, ${contact.MailingCountry}, ${contact.MailingPostalCode}`
            }));
        } else if (error) {
            console.log(error);
        }
    }

    handleRowAction(event) {
        const recordId = event.detail.row.Id;
        const pageName = 'record';
        const navigationParams = {
            recordId: recordId,
            actionName: 'view'
        };
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                pageName: pageName
            },
            state: navigationParams
        });
    }
}

