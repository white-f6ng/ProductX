import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements AfterViewInit {

  @Input() productListDetails: Product[] = [];
  @Output() ProductDeleteDetails = new EventEmitter<Product[]>;
  productDetails: Product[] = [];
  isDialogOpen: boolean = false;
  TotalPrice: number = 0;
  isBuyTriggered: boolean = false;
  messageContent: string = '';
  submitTriggered: boolean = false;
  eventTrigger: boolean = false;
  deleteIconDisabled: boolean = false;
  iscontentAvailable: boolean = true;

  constructor() { }


  ngAfterViewInit(): void {
    this.productDetails = this.productListDetails;
  }

  onCheckOut() {
    if (this.productListDetails?.length) {
      this.isDialogOpen = true;
      let isSelected = this.productListDetails.filter(x => x.isSelected);
      if (isSelected.length === 0) {
        this.TotalPrice = 0;
      }
      this.iscontentAvailable = true;
      this.productListDetails.forEach(x => {
        x.TotalCost = x.price * (x?.Count ?? 1)
      });
    } else {
      this.submitTriggered = false;
      this.iscontentAvailable = false;
      this.messageContent = 'Please select atleast one item to be display on the cart'
    }
    this.isDialogOpen = true;
  }

  deleteProduct(dataItem: any) {

    this.TotalPrice -= parseFloat(dataItem.TotalCost.toFixed(2));
    if (this.productListDetails.length === 1) {
      this.isBuyTriggered = false;
    }
    this.deleteProductsAfterSuccess([dataItem]);

  }

  onSelect(product: any) {
    let productDetails: Product[] = [];
    for (let i = 0; i <= this.productListDetails?.length; i++) {
      if (this.productListDetails[i].PrimaryKey === product.PrimaryKey) {
        this.productListDetails[i].isSelected = true;
        break;
      }
    }
    this.TotalPrice += product.TotalCost;
    this.isBuyTriggered = true;
    this.TotalPrice = parseFloat(this.TotalPrice.toFixed(2));
  }

  deleteProductsAfterSuccess(product: Product[]) {
    product.forEach(x => {
      this.productListDetails.forEach(y => {
        if (y.PrimaryKey === x.PrimaryKey) {
          y.isDeleted = true;
          y.isSelected = false;
        }
      })
    })
    this.ProductDeleteDetails.emit(this.productListDetails);
  }


  onClose(): void {
    this.isDialogOpen = false;
    this.messageContent = ''
    this.TotalPrice = 0;
    this.deleteProductsAfterSuccess(this.productListDetails)
  }

  Onsubmit() {
    this.submitTriggered = false;
    this.isBuyTriggered = false;
    this.eventTrigger = false;
    this.messageContent = 'Order Placed Successfully'
    this.deleteIconDisabled = true;
    this.productListDetails.forEach(x => {
      x.isOrdered = true;
    })

  }

}
