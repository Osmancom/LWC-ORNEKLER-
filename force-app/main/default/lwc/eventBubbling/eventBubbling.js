import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController1.getContactList';

export default class EventBubbling extends LightningElement {
    selectedContact;

    @wire(getContactList) contacts;

    handleContactSelect(event) {
        this.selectedContact = event.target.contact;
    }
}
