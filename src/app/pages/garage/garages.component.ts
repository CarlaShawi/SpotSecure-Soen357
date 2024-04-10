import { Component, OnInit } from '@angular/core';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {
  garages: any;

  constructor(private garageService: GarageService) { }

  ngOnInit(): void {
    this.garageService.getGarages().subscribe(data => {
      this.garages = data;
      console.log(this.garages); // Check the retrieved garages data in console
    });
  }
}
