import { AfterContentInit, Component, destroyPlatform, OnInit } from '@angular/core';
import { IEvent } from 'angular8-yandex-maps';
import { map } from 'jquery';
import { event, layout } from 'yandex-maps';

const DELIVERY_TARIFF = 250;
declare var ymaps: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  addressModel = {
  address: ''
  }
  
  ngOnInit() {
  }
  

  public route
  public onRoutePanelLoad(): void {
    this.onInput()
    // const routePanel = event.instance.routePanel;

    ymaps.geolocation.get({
    }).then(res => {
      this.map = res.geoObjects.position
      console.log(this.map)
    })

      // from: [51.251257, 51.442868],
      // to: this.userLocation.latlng
    // })

    
  }

  // public calculate(routeLength): number {
    // return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
  // }

  public map = []
  public userLocation = {
    latlng: [], 
    name: ''
  }
  onInputReady() {    
    ymaps.geolocation.get({
    }).then(res => {
      // this.map = res.geoObjects.position
      console.log(this.map, 'is it me??')
      let tempData = res.geoObjects.get(0).properties.get('metaDataProperty').GeocoderMetaData.Address.Components
      this.userLocation.name = tempData[tempData.length - 2].name + ', ' + tempData[tempData.length - 1].name + ', ' + tempData[tempData.length - 3].name + ', ' + tempData[tempData.length - 5].name
      this.userLocation.latlng = this.map
      console.log(res.geoObjects.get(0).properties.get('metaDataProperty'));
      (<HTMLInputElement>document.getElementById('suggest')).value = this.userLocation.name

      this.onAddressIsReady()
    })

  }

  public suggestView
  public res
  onInput() {
    this.suggestView = new ymaps.SuggestView('suggest',
      {
        boundedBy: [[51.173749, 51.357983], [51.291850, 51.468269]],
      },
      console.log('hello')
    );

    this.suggestView.events.add("select", e => {
      console.log(e.get('item'))
      ymaps.geocode(e.get('item').value).then(res => {
        let firstGeoObject = res.geoObjects.get(0)
        console.log(firstGeoObject.geometry.getCoordinates())
        this.userLocation.latlng = firstGeoObject.geometry.getCoordinates()
        this.onAddressIsReady()
      })
      this.userLocation.name = e.get('item').displayName
      // (<HTMLInputElement>document.getElementById('suggest')).value = e.get('item').displayName;
    })

  }
  
  public distance
  public deliveryCost
  onAddressIsReady() {
    console.log(this.userLocation.latlng)
    console.log(ymaps.coordSystem.geo.getDistance([51.251257, 51.442868], this.userLocation.latlng), 'meters')
    this.distance = (ymaps.coordSystem.geo.getDistance([51.251257, 51.442868], this.userLocation.latlng) / 1000).toFixed(1)
    let _delivery = Math.round(this.distance * DELIVERY_TARIFF)
    if (_delivery < 300) this.deliveryCost = 300
    else this.deliveryCost = _delivery
  }

}
