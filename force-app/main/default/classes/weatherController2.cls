public class weatherController2 {

    public class WeatherData{
        @AuraEnabled public decimal temperature;
        @AuraEnabled public decimal cityWindSpeed;
        @AuraEnabled public decimal humidity;
        @AuraEnabled public string station;
        @AuraEnabled public string latitude;
        @AuraEnabled public string longitude;
     } 
     
    @AuraEnabled (cacheable=true)
    public static WeatherData performCallout(ID recordId) {
    
    string lat;
    string lng;


    Account acc = [Select Id, Location__latitude__s, Location__longitude__s from Account WHERE Id=:recordId];
    lat = string.valueof(acc.Location__latitude__s);
    lng = string.valueOf(acc.Location__longitude__s);

    String endPoint = 'http://api.geonames.org/findNearByWeatherJSON?';
    HttpRequest req = new HttpRequest();
    req.setEndpoint(endPoint+'lat=' + lat + '&lng='+lng+ '&username=meminakbas');
    req.setMethod('GET');
    Http http = new Http();
    HTTPResponse res = http.send(req);
    JSONParser parser = JSON.createParser(res.getBody());

    WeatherData weather = new WeatherData();
    weather.latitude = lat;
    weather.longitude = lng;
 
    while (parser.nextToken() != null) {
        if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
            parser.nextValue();
            if (parser.getCurrentName() == 'temperature') {
                    weather.temperature = Decimal.valueOf(parser.getText());
            } else if (parser.getCurrentName() == 'windSpeed') {
                    weather.cityWindSpeed = Decimal.valueOf(parser.getText());
            }else if (parser.getCurrentName() == 'humidity') {
                weather.humidity = Decimal.valueOf(parser.getText());
            }else if (parser.getCurrentName() == 'stationName') {
                weather.station = parser.getText();
            }

        }
    }
    return weather;        
}

@AuraEnabled (cacheable=true)
    public static WeatherData CurrentLocCallout(string lat,string lng) {

    String endPoint = 'http://api.geonames.org/findNearByWeatherJSON?';
    HttpRequest req = new HttpRequest();
    req.setEndpoint(endPoint+'lat=' + lat + '&lng='+lng+ '&username=meminakbas');
    req.setMethod('GET');
    Http http = new Http();
    HTTPResponse res = http.send(req);
    JSONParser parser = JSON.createParser(res.getBody());

    WeatherData weather = new WeatherData();
    weather.latitude = lat;
    weather.longitude = lng;
 
    while (parser.nextToken() != null) {
        if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
            parser.nextValue();
            if (parser.getCurrentName() == 'temperature') {
                    weather.temperature = Decimal.valueOf(parser.getText());
            } else if (parser.getCurrentName() == 'windSpeed') {
                    weather.cityWindSpeed = Decimal.valueOf(parser.getText());
            }else if (parser.getCurrentName() == 'humidity') {
                weather.humidity = Decimal.valueOf(parser.getText());
            }else if (parser.getCurrentName() == 'stationName') {
                weather.station = parser.getText();
            }

        }
    }
    return weather;        
}

    
    @AuraEnabled(cacheable=true)
    public static void sendEmailController(String body, String subject){
        List<User> UserList =
        [SELECT id, name, email FROM User WHERE Email !='autoproc@00d7q00000cfrkrua1' AND Email !='automatedclean@00d7q00000cfrkrua1' AND Email !='noreply@00d7q00000cfrkrua1'];

        List<String> emailString = new List<String>();

        for(User u: UserList){
            emailstring.add(u.email);
        }   

        try{
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(emailString);
            mail.setSubject(subject);
            mail.setHtmlBody('<h1>'+ body + '</h1>');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
        
    }

    @AuraEnabled
    public static string latestReport(){
        emailmessage latestmails = [select id, messageDate,TextBody from emailmessage where messageDate = this_year  order by messageDate DESC Limit 1];
        string lastemail = string.valueOf(latestmails.messageDate);
        system.debug(lastemail);
        return lastemail;
    }

    
    }


