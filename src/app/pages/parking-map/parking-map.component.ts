import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const mapboxgl: any;

@Component({
  selector: 'app-parking-map',
  templateUrl: './parking-map.component.html',
  styleUrls: ['./parking-map.component.scss'],
})
export class ParkingMapComponent implements OnInit {
  @Input() address!: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.address) {
      this.geocodeAddress();
    }
  }

  geocodeAddress(): void {
    const accessToken =
      'pk.eyJ1IjoiY2FybGFzaGF3aSIsImEiOiJjbHN5dzBzMXAwaG1kMmtyb3pocnBvZzBlIn0.4k81B20yAJlUaU3hWCiCpQ';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      this.address
    )}.json?access_token=${accessToken}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        if (data && data.features && data.features.length > 0) {
          const coordinates = data.features[0].center;
          this.initMap(coordinates);
        } else {
          console.error('No coordinates found for the given address.');
        }
      },
      (error) => {
        console.error('Geocoding error:', error);
      }
    );
  }

  initMap(coordinates: [number, number]): void {
    if (!mapboxgl || !mapboxgl.Map || !mapboxgl.Marker) {
      console.error('mapboxgl is not properly initialized.');
      return;
    }

    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2FybGFzaGF3aSIsImEiOiJjbHN5dzBzMXAwaG1kMmtyb3pocnBvZzBlIn0.4k81B20yAJlUaU3hWCiCpQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 14,
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  }
}
