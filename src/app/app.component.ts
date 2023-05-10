import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  map: any;
  style : string = 'mapbox://styles/mapbox/streets-v11';
  lat : number = 37.75;
  lng : number = -80.41;
  public date : any = new Date('2020-12-24');
  activeToggle: string = 'map'
  geojson: any = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates: [-80.41, 37.75],
        },
      },
      {
        type: 'Feature',
        properties: {
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates: [-80.43, 37.65],
        },
      },
      {
        type: 'Feature',
        properties: {
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates: [-80.39, 37.60],
        },
      },
      {
        type: 'Feature',
        properties: {
          iconSize: [50, 50],
        },
        geometry: {
          type: 'Point',
          coordinates: [-80.39, 37.70],
        },
      },
    ],
  };

  public mapData: any = [
    {
      workFlow: 'Requires Location',
      from: 'denisgordiyenya@gmail.com',
      to: 'denisgordiyenya@gmail.com',
      dueDate: '06 December',
      lat: 37.75,
      lng: -80.41,
    },
    {
      workFlow: 'Requires Location',
      from: 'denisgordiyenya@gmail.com',
      to: 'denisgordiyenya@gmail.com',
      dueDate: '06 December',
      lat: 25.75,
      lng: -70.41,
    },
    {
      workFlow: 'Requires Location',
      from: 'denisgordiyenya@gmail.com',
      to: 'denisgordiyenya@gmail.com',
      dueDate: '06 December',
      lat: 15.75,
      lng: -65.41,
    },
    {
      workFlow: 'Requires Location',
      from: 'denisgordiyenya@gmail.com',
      to: 'denisgordiyenya@gmail.com',
      dueDate: '06 December',
      lat: 10.75,
      lng: -80.41,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibmFlZW1haG1hZDEwMSIsImEiOiJjbDloMmEwamgwbzl1NDJvOGp0Zzk1bDBmIn0.pBHIa0g0Q4FhMsHVqMLLog',
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat],
      preserveDrawingBuffer: true
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
      // Load an image from an external URL.
      this.map.loadImage(
        '../assets/images/marker_icon.png',
        (error: any, image: any) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('marker', image);
          this.map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: this.geojson.features
            },
          });
        
          // Add a layer to use the image to represent the data.
          this.map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point', // reference the data source
            layout: {
              'icon-image': 'marker', // reference the image
              'icon-size': 1.00,
            },
          });
        }
      );
    });
  }

  exportImage() {
    const a = document.createElement('a');
    a.href = this.map.getCanvas().toDataURL();
    a.download = 'map.png';
    document.body.appendChild(a);
    a.click();
  }

  changeToggle(value : string) {
    this.activeToggle = value;
  }
  
}
