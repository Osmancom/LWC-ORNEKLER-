/**
* 
*@author			     : 	Emin Akbas
*@name					 :  weatherController2Test
*@created date			 :  October 1, 2022
*@modified  date        :
*@description			 :  This test class is used to test the weatherController2.performCallout class
*
**/
@isTest
private class weatherController2Test {
    /**
*@author		: 	Emin Akbas
*@name			:  weatherController2Test
*@created date	:  October 1, 2022
*@modified date :
*@description   : method to create test account data
*/
    @testSetup
    static void setup() {
        Account testAcc = new Account(Name = 'TestAcc');
        insert testAcc;    
        
    }
    /**
*@author		: 	Emin Akbas
*@name			:  weatherController2Test
*@created date	:  October 1, 2022
*@modified date :
*@description   : method to test the CallWeather method of weatherController2.performCallout class
*/
    @isTest 
    static void testWeatherUpdate() {
        Account acc = [SELECT Id, Name FROM Account WHERE Name='TestAcc' LIMIT 1];
        Id idAcc = acc.id;
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new weatherController2TestMock()); 
        weatherController2.performCallout(idAcc);
        Test.stopTest();   
        
    }
}