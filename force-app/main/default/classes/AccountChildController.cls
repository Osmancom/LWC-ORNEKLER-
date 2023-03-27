public with sharing class AccountChildController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getChildAccounts(Id accountId) {
        List<Account> childAccounts = new List<Account>();
        try {
            childAccounts = [SELECT Id, Name, AccountNumber, BillingStreet, BillingCity, BillingState, BillingPostalCode FROM Account WHERE ParentId = :accountId];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving child accounts: ' + e.getMessage());
        }
        return childAccounts;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildContacts(Id accountId) {
        List<Contact> childContacts = new List<Contact>();
        try {
            childContacts = [SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingState, MailingPostalCode FROM Contact WHERE AccountId = :accountId];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving child contacts: ' + e.getMessage());
        }
        return childContacts;
    }
}
