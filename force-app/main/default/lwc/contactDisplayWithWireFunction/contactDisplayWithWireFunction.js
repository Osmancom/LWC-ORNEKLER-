import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/FetchAccount.getAccounts';

export default class AccountDisplayWithWireFunction extends LightningElement {
    accounts;
    errorDetails;

    @wire(getAccounts)
    retrieveAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.errorDetails = error;
        }
    }
}
