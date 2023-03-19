public with sharing class CaseManager {
    
    @AuraEnabled
    public static List<Case> getCaseRecordsById(string caseId){
        String searchCase = '';
        if (string.isNotBlank(caseId)) {
            searchCase = '%'+caseId+'%';
            return [SELECT Id, CaseNumber, Origin, Status, Subject FROM Case WHERE CaseNumber like :searchCase];
        } else {
            return NULL;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> getAllCases(){
        try {
            return [SELECT Id, CaseNumber, Subject, Priority, Status, Origin FROM Case];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}