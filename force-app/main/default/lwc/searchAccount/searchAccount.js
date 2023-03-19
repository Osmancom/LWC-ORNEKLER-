import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccounts from '@salesforce/apex/AccountSearchCls.getAccounts';

const DELAY = 300;

export default class SearchAccount extends NavigationMixin(LightningElement) {
  accountName = '';
  @track accountList = [];
  accountSelected = false;
  accountId;

  @wire(getAccounts, { actName: '$accountName' })
  retrieveAccouts({ error, data }) {
    if (data) {
      this.accountList = data;
      this.accountSelected = false;
    } else if (error) {
      // handle error
    }
  }

  handleKeyChange(event) {
    const searchString = event.target.value;
    window.clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
      this.accountName = searchString;
    }, DELAY);
  }

  handleAccountSelection(event) {
    const accountId = event.currentTarget.dataset.id;
    this.accountSelected = true;
    this.accountId = accountId;
  }

  navigateToAccountRecord() {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: this.accountId,
        objectApiName: 'Account',
        actionName: 'view',
      },
    });
  }
}

