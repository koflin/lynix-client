import { Component, Input,EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductTempaltesService } from 'src/app/core/productTemplates/product-tempaltes.service';
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
  constructor(private productTemplatesService: ProductTempaltesService ) { }

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
    let temp = this.productTemplatesService.getAll()
    this.productOptions = temp.map((t)=> {
      return {value: t.id, label:t.name}
    })
    
    
  }
  setIgnoreProductOptions(){
    this.ignoreOptions = this.productTemplatesService.getAll().filter((product) => {
      return this.order.products.findIndex(productUsed => productUsed.template && productUsed.template.id === product.id) !== -1;
    }).map((t)=> {
      return {value: t.id, label:t.name}
    })

  }

  setInputFields(){
    this.name = new InputOutputValue("name", "Work order name", false)
    this.dueDate = new InputOutputValue("duedate", "Delivery Date", false)
    this.description = new InputOutputValue("description", "Description", false)
    
  }
  
  addProduct() {
    this.order.products.push({
      quantity: 1,
      template: null,
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
          this.order.products[index].template = this.productTemplatesService.getById($e.value);
          this.setIgnoreProductOptions()
          this.orderChange.emit(this.order)
        }
      }else{
        if ($e.label) {
          this.order.products[index].template = this.productTemplatesService.create(
            {
              companyId: null,
              id: null,
              name: $e.label,
              processes: [],
            }
          );
          this.orderChange.emit(this.order)
        }
        
      }
    }
    
    
    
    
  }
 

}
