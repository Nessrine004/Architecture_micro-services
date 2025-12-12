import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductsResponse {
  _embedded: {
    products: Product[];
  };
}

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = 'http://localhost:8888/inventory-service/api/products';


    this.http.get<ProductsResponse>(url).subscribe({
      next: (resp) => {
        console.log('Réponse API : ', resp._embedded.products );
        this.products = resp._embedded.products ?? [];
        console.log('Produits : ', this.products);
      },
      error: (err) => {
        console.error('ERREUR APPEL API', err);
      }
    });
  }
}
