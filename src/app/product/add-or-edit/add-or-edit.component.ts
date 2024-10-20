import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrl: './add-or-edit.component.css'
})
export class AddOrEditComponent implements OnInit, AfterViewInit {
  count: number = 0;
  isBuy: boolean = true;             
  isAddToCartClicked: boolean = true; 
  messageContent: string = '';
  notSelected: boolean = false;
  canShowEnabled: boolean = true;

  @Output() productCount = new EventEmitter();
  @Input() productDataSource: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  incrementClick() {
    this.notSelected = false;
    this.count++;
  }

  decrementClick() {
    this.count = (this.count === 0) ? 0 : --this.count;
  }

  onSubmit() {
    this.isBuy = false;
  }

  addToCart(event: any) {
    if (this.count === 0) {
      this.messageContent = 'Please select at least one quantity';
      this.notSelected = true;
    } else {
      this.messageContent = 'Added Successfully to the cart';
      this.isAddToCartClicked = false;
      this.productDataSource['Count'] = this.count;
      this.productCount.emit(this.productDataSource);
    }
  }

  cancel() {
    this.isBuy = true;
    this.count = 0;
    this.isAddToCartClicked = true;
    this.messageContent = '';
    this.notSelected = false;
  }
}
