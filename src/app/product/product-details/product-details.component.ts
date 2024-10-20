import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productDetails: any;
  productId: any;
  $unSubscribe = new Subject<void>();

  constructor(private productService: ProductService,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  ngOnDestroy(): void {
    this.$unSubscribe.next();
    this.$unSubscribe.complete();
  }
  
  getData() {
    this.productService.getProductDetails(this.productId)
    .pipe(takeUntil(this.$unSubscribe))
    .subscribe(res=>{
      this.productDetails = res
    },(err)=>{
      console.error('The error'+err);
    })
  }

}
