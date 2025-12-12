import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.html',
  styleUrls: ['./bills.css']
})
export class Bills implements OnInit {

  bills: any[] = [];
  customerId!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('customerId')!;

    const url = `http://localhost:8888/billing-service/api/bills/search/byCustomerId?customerId=${this.customerId}`;

    this.http.get<any>(url).subscribe({
      next: (resp) => {
        this.bills = resp._embedded?.bills ?? [];
      },
      error: (err) => console.error(err)
    });
  }
}
