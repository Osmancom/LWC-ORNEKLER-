public with sharing class FetchAccount {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        try {
            List<Account> accounts = [SELECT Id, Name, Phone, Rating FROM Account LIMIT 10];
            return accounts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
