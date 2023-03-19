import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const ACCOUNT_OBJECT = 'Account';

export default class CreateAccount extends LightningElement {
    name = '';
    type = '';
    industry = '';
    phone = '';
    annualRevenue = '';

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleTypeChange(event) {
        this.type = event.target.value;
    }

    handleIndustryChange(event) {
        this.industry = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleAnnualRevenueChange(event) {
        this.annualRevenue = event.target.value;
    }

    handleSave() {
        const fields = {};
        fields.Name = this.name;
        fields.Type = this.type;
        fields.Industry = this.industry;
        fields.Phone = this.phone;
        fields.AnnualRevenue = this.annualRevenue;

        const recordInput = { apiName: ACCOUNT_OBJECT, fields };
        createRecord(recordInput)
            .then(account => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}
