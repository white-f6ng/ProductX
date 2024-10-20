import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { map, Subject, takeUntil } from 'rxjs';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('addOrEditRef', { static: false }) addOrEditRef!: AddOrEditComponent;

  @ViewChildren(AddOrEditComponent) addOrEditRefs!: QueryList<AddOrEditComponent>;

  productListDetails: Product[] = [];
  selectedListDetails: Product[] = [];
  $unSubscribe = new Subject<void>();
  count: number = 0;

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getProductData();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
    this.$unSubscribe.complete();
  }
  
  getProductData() {
    const cachedData = localStorage.getItem('productListDetails');
    if (cachedData) {
      this.productListDetails = JSON.parse(cachedData);
    } else {
      this.productService.getProductDetails()
        .pipe(
          takeUntil(this.$unSubscribe),
          map(products =>
            products.map((product, i) => ({ ...product, PrimaryKey: i }))
          )
        )
        .subscribe(
          (res) => {
            this.productListDetails = res;
            localStorage.setItem('productListDetails',JSON.stringify(res));  
          },
          (err) => {
            console.error('Error fetching product details:', err);
          }
        );
    }
  }

  countValueChange(dataItem: any) {
    for (let i = 0; i < this.productListDetails.length; i++) {
      if (this.productListDetails[i].PrimaryKey === dataItem.PrimaryKey) {
        this.selectedListDetails.unshift(dataItem);
        break;
      }
    }
  }

  ProductDeleteDetails(event: any) {
    this.selectedListDetails = event.filter((x: any) => !x.isDeleted);
    let productSource = event.filter((x: any) => x.isDeleted);

    this.addOrEditRefs.forEach((x) => {
      productSource.forEach((y: any) => {
        if (x.productDataSource.PrimaryKey === y.PrimaryKey) {
          x.cancel();
          y.isOrdered = false;
        }
      })
    });
  }
  goToProductDetails(productId: number){
    this.router.navigate(['/product', productId]);
  }
}
