public with sharing class AccountChildRecords {
    @AuraEnabled(cacheable=true)
    public static List<Account> getChildAccounts(Id accountId) {
        List<Account> childAccounts = [SELECT Id, Name, AccountNumber, BillingStreet, BillingCity, BillingState, BillingPostalCode FROM Account WHERE ParentId = :accountId];
        return childAccounts;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildContacts(Id accountId) {
        List<Contact> childContacts = [SELECT Id, Name, Email, Phone, MailingStreet, MailingCity, MailingState, MailingPostalCode FROM Contact WHERE AccountId IN (SELECT Id FROM Account WHERE ParentId = :accountId)];
        return childContacts;
    }
}