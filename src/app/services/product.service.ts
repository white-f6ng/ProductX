import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  Count?:number;
  PrimaryKey?:number;
  TotalCost?:number;
  isSelected?:boolean;
  isDeleted?:boolean;
  isOrdered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = 'https://fakestoreapi.com/products';
  }

  getProductDetails(id?:string) {
    if(id !=null){
      return this.http.get<Product[]>(`${this.apiUrl}/${id}`)
    }else{

      return this.http.get<Product[]>(this.apiUrl)
    }
  }
}
