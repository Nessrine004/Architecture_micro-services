import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,
    RouterModule ],
  templateUrl: './OLD_products.html',
  styleUrls: ['./OLD_products.css']
})
export class Products implements OnInit {

  products: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:9999/inventory-service/products")
      .subscribe({
        next: (data: any) => {
          this.products = data;
        },
        error: (err) => {
          console.error("Erreur :", err);
        }
      });
  }
}
