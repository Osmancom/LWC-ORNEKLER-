import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController1.getContactList';

export default class ApexWireMethodToFunction extends LightningElement {
    contacts;
    error;

    @wire(getContactList)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}
