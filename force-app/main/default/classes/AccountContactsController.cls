public with sharing class AccountContactsController {
    @AuraEnabled(cacheable=true)
    public static Map<String, List<sObject>> getAccountsWithContacts(Id accountId) {
        Map<String, List<sObject>> result = new Map<String, List<sObject>>();
        List<Account> accounts = [SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingCountry, BillingPostalCode
                                  FROM Account
                                  WHERE Id = :accountId];
        List<Contact> contacts = [SELECT Id, Name, MailingStreet, MailingCity, MailingState, MailingCountry, MailingPostalCode
                                  FROM Contact
                                  WHERE AccountId = :accountId];
        result.put('accounts', accounts);
        result.put('contacts', contacts);
        return result;
    }
}
