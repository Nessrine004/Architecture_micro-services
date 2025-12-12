import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';   // ⬅ pour *ngFor

interface Customer {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],                     // ⬅ très important
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class Customers implements OnInit {

  customers: Customer[] = [];
  errorMessage = '';

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    const url = 'http://localhost:8888/customer-service/api/customers';

    this.http.get<any>(url).subscribe({
      next: (resp) => {
        console.log('Réponse API complète = ', resp);
        this.customers = resp._embedded?.customers ?? [];
        console.log('Customers = ', this.customers);
      },
      error: (err) => {
        console.error('ERREUR APPEL API customers', err);
        this.errorMessage = 'Erreur de chargement des clients';
      }
    });
  }

  getBills(c: Customer) {
    this.router.navigate(['/bills', c.id]);
  }
}
