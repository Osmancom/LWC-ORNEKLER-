public with sharing class ContactController1 {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
    //     return [
    //         SELECT FirstName, LastName, Email
    //         FROM Contact
    //          WITH SECURITY_ENFORCED
    //          ORDER BY LastName
    //    ];
    throw new AuraHandledException('Forced error');
    }
}