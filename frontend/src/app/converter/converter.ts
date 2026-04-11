import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.html',
  styleUrl: './converter.css',
})
export class Converter implements OnInit{
  value: number = 0;
  category: string = 'length';
  from_unit: string = '';
  to_unit: string = '';
  result: number = 0;

units:any = {
  length: ['millimeter','centimeter','meter','kilometer','inch','foot','yard','mile'],
  weight: ['milligram','gram','kilogram','ounce','pound'],
    temperature: ['celsius','fahrenheit','kelvin']
};

constructor(private http: HttpClient) {}

ngOnInit() {
    this.from_unit = this.units[this.category][0];
    this.to_unit = this.units[this.category][1];
  }

  onCategoryChange() {
    this.from_unit = this.units[this.category][0];
    this.to_unit = this.units[this.category][1];
  }

  onChange() {
  this.convert();
}
convert() {
  setTimeout(() => {
    this.http.post<any>('http://127.0.0.1:8000/api/convert/', {
    value: this.value,
    from_unit: this.from_unit,
    to_unit: this.to_unit,
    category: this.category
  }).subscribe(res => {
    this.result = res.result;
  });
  }, 0);
  
}
}