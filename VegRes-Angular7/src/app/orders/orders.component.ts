import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList;
  constructor(private ordService: OrderService,
              private router: Router,
              private toster: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.ordService.getOrderList().then(res => this.orderList = res);
  }

  openForEdit(orderID: number) {
    this.router.navigate(['order/edit/' + orderID]);
  }

  onOrderDelete(id: number) {
    if (confirm('Are you sure to delete the record?')) {
      this.ordService.deleteOrder(id).then(res => {
        this.refreshList();
        this.toster.warning('Deleted Successfully' , 'Veg Restaurent App');
      });
    }
  }

}
