import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';

export default class AccountCreateSampleComp extends NavigationMixin(LightningElement) {
  objectApiName = ACCOUNT_OBJECT;
  fields = [NAME_FIELD, TYPE_FIELD, INDUSTRY_FIELD, PHONE_FIELD, ACCOUNT_NUMBER_FIELD];

  handleAccountCreate(event) {
    const evt = new ShowToastEvent({
      title: 'Account Created',
      message: 'Record ID: ' + event.detail.id,
      variant: 'success',
    });
    this.dispatchEvent(evt);

    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: event.detail.id,
        objectApiName: 'Account',
        actionName: 'view',
      },
    });
  }
}

