@isTest
global class weatherController2TestMock implements HttpCalloutMock{
     /**
     * @author        : Emin Akbas
     * @name          : respond
     * @created date  : October 1, 2022
     * @modified date :
     * @description   : method to be used at returning fake data
     * @param         : HTTPRequest request
     * @return        : HTTPResponse - response
     */

     global HTTPResponse respond(HTTPRequest request){
        HTTPResponse response = new HTTPResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(200);
        return response;
        //response.setBody('{"weatherObservation":{"elevation":8,"lng":-1.8,"observation": "LESO 021115Z 36005KT 320V050 9999 OVC005 BKN021 19/17 Q1027", "ICAO": "LESO", "clouds": "overcast","dewPoint": "17","cloudsCode": "OVC","datetime": "2022-10-02 11:15:00", "countryCode": "ES","temperature": "19","humidity": 88,"stationName": "San Sebastian / Fuenterrabia","weatherCondition": "n/a","windDirection": 360,"hectoPascAltimeter": 1027,"windSpeed": "05","lat": 43.35 }');
     }
}

