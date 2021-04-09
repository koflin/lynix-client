import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { ProductTemplatesService } from 'src/app/core/productTemplates/product-tempaltes.service';
import { Order } from 'src/app/models/order';

import { InputOutputValue, SingleMultiChoiceItem } from '../models/InputOutputValue';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input ()  order: Order

  @Output() orderChange= new EventEmitter<Order>()
  @Input () checkForError:boolean=false
  @Output() selectTab= new EventEmitter<number>()
  productOptions:SingleMultiChoiceItem[]
  ignoreOptions:SingleMultiChoiceItem[]
  name:InputOutputValue
  dueDate: InputOutputValue
  description: InputOutputValue

  @Input() navFragment: string;

  constructor(
    private cdRef: ChangeDetectorRef,
    private productTemplatesService: ProductTemplatesService
    ) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges ): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    this.setInputFields()
    this.setProductOptions()
    this.setIgnoreProductOptions()
  }

  setProductOptions(){
    this.productTemplatesService.getAll().subscribe(temp => {
      this.productOptions = temp.map((t)=> {
        return {value: t.id, label:t.name}
      })
    })


  }
  setIgnoreProductOptions(){
    if (this.order) {
      this.productTemplatesService.getAll().subscribe((products) => {
        this.ignoreOptions = products.filter((product) => {
          return this.order.products.findIndex(productUsed => productUsed.template && productUsed.template.id === product.id) !== -1;
        }).map((t)=> {
          return {value: t.id, label:t.name}
        })
      });
    }
  }

  setInputFields(){
    this.name = new InputOutputValue("name", "Work order name", false)
    this.dueDate = new InputOutputValue("duedate", "Delivery Date", false)
    this.description = new InputOutputValue("description", "Description", false)

  }

  changeDeliveryDate(newDate: string) {
    this.order.deliveryDate = newDate != 'Invalid Date' ? moment(newDate, 'DD.MM.YYYY').toDate() : undefined;
    this.cdRef.detectChanges();
    this.orderChange.emit(this.order);
  }

  addProduct() {
    this.order.products.push({
      quantity: 1,
      template: {
        companyId: undefined,
        id: undefined,
        name: '',
        description: undefined,
        processes: []
      },
    });
  }

  removeProduct(index: number) {
    this.order.products.splice(index, 1);
  }
  productSelector($e, index){
    //verhindert Loops
    if ($e) {
      if ( $e.hasOwnProperty('value')) {
        let set = false
        if (this.order.products[index].template) {
          if ( this.order.products[index].template.id != $e.value) {
            set = true
          }
        }else{
          set = true
        }
        if (set && $e) {
          this.productTemplatesService.getById($e.value).subscribe(template => {
            this.order.products[index].template = template;
            this.setIgnoreProductOptions()
            this.orderChange.emit(this.order)
          });
        }
      }else{
        if ($e.label) {
          this.order.products[index].template.name = $e.label;
          this.orderChange.emit(this.order)
        }

      }
    }




  }


}
