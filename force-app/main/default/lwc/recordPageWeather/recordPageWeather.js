import { LightningElement, track, wire, api} from 'lwc';
import performCallout from '@salesforce/apex/weatherController2.performCallout';
import performCurrentCallout from '@salesforce/apex/weatherController2.CurrentLocCallout';
import sendEmailToUser from '@salesforce/apex/weatherController2.sendEmailController'
import lastEmailTime from '@salesforce/apex/weatherController2.latestReport'
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';


export default class RecordPageWeather extends LightningElement { @track lati;
    @track long;
    @track temp = '';
    @track humi ='';
    @track windSpeed='';
    @track stationName='';
    @track title='Weather Information'
    mapMarkers;
    zoomLevel = 10;
    error='Error var';
    @api recordId;
    zoomLevel = 10;
    @track subject = ''
    @track body = ''
    @api infoMail

    @wire(performCallout,{recordId:'$recordId'
    })wiredDataAccount({error,data}){
        if(data){
            this.temp = data.temperature
            this.windSpeed=data.cityWindSpeed
            this.humi = data.humidity
            this.stationName=data.station
            this.title = 'Weather Information of ' + data.station
            this.mapMarkers=[{location:{Latitude:data.latitude,Longitude:data.longitude}}];
            this.subject = 'Weather Information of ' + data.station
            this.body = 'Current Temperature: '+data.temperature + ' Current Wind Speed: '+data.cityWindSpeed + ' Current Humidity: '+data.humidity;
        }
    }

    currentlocation(){ 
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position)=>{
            console.log("position: ",position);
            console.log("position coords: ",position.coords);
            console.log("position coords lat: ",position.coords.latitude);
        
            performCurrentCallout ({ lat: position.coords.latitude,lng: position.coords.longitude}).then(data => {
            this.temp = data.temperature
            this.windSpeed=data.cityWindSpeed
            this.humi = data.humidity
            this.stationName=data.station
            this.title = 'Weather Information of ' + data.station
            this.mapMarkers=[{location:{Latitude:data.latitude,Longitude:data.longitude}}];
            this.subject = 'Weather Information of ' + data.station
            this.body = 'Current Temperature: '+data.temperature+'°'+ + ' Current Wind Speed: '+data.cityWindSpeed +'kmh'+ ' Current Humidity: '+data.humidity+'%';
            }).catch(err => console.log(err));
            });    
        }
   }


   sendEmailAfterEvent(){ 
    const recordInput = {body: this.body, subject: this.subject} 
    sendEmailToUser(recordInput)
    .then( () => {
        console.log('Email is sent');
        this.updateLastEmailTime();
        alert('Report has been sent to all users.')
    }).catch( error => {
        console.log('ERROR, Message: ' + JSON.stringify(error))
        alert('Limit has been reached.')
    })
}

    
   handleClick(event){
        this.currentlocation();   
   }
  
   handlesendMail(){
       this.sendEmailAfterEvent();
   }

   updateLastEmailTime(){
    lastEmailTime().then(result =>{
        this.infoMail = result;
    })
    .catch(error =>{
        console.debug(error);
    })
}
    connectedCallback(){
    this.updateLastEmailTime();
}
   }