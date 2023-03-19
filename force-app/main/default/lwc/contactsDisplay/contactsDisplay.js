import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import getContacts from '@salesforce/apex/FetchContact.getContacts';
export default class ContactsDisplay extends NavigationMixin(LightningElement) {

    @wire(getContacts)
    contacts;
    contactId;

    navigateToContactDetail(event){
        this.contactId = event.target.value;
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:this.contactId,
                objectApiName:'Contact',
                actionName:'view'
            }           
 
        });  
    }
}