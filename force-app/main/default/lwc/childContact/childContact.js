import { LightningElement,wire,api } from 'lwc';
import getChildContact from '@salesforce/apex/GetAccountContact.getRelatedContacts';
import {NavigationMixin} from 'lightning/navigation';
export default class ChildContact extends NavigationMixin(LightningElement) {

@api accId;


@wire (getChildContact, {
    childAccId:'$accId'

}) relatedContacts;

navigateToViewContactPage(event) {
        
    var recId = event.target.name;
    
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: recId,
            objectApiName: 'Contact',
            actionName: 'view'
        },
    });
    }

}