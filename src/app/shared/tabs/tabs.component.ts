import {
  AfterViewInit,
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TabFragmentPipe } from 'src/app/pipes/tab/tab-fragment.pipe';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit,AfterViewInit {
  @Input() tabsvalue: string[]= []
  @Input() bgColorClassNotSelected:string = 'bg-default';
  @Input() setNotUndefined:boolean=false
  _tabsResIndex:number
  @Input() slimTab:boolean=true
  @Input() tabsResIndex:number
  @Output() tabsResIndexChange= new EventEmitter<number>()

  @Input() navFragmentBase: number[] = [];
  @Input() mark: number;

  @Output() tabAdd = new EventEmitter<void>()
  addable: boolean;

  seemless: boolean;

  @ViewChild("tabContainer") tabs: ElementRef ;

  overFlow: boolean = false
  firstVisible:boolean=true
  lastVisible:boolean=false
  constructor(
    private renderer: Renderer2,
    private cdref: ChangeDetectorRef,
    private fragPipe: TabFragmentPipe,
    @Optional() @Attribute('addable') addable: any,
    @Optional() @Attribute('seemless') seemless: any
  ) {
    this.addable = addable != undefined;
    this.seemless = seemless != undefined;
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.cdref.detectChanges();

    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

}
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.isTextOverflow()


  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      event.target.innerWidth;
      this.isTextOverflow()
    }

  selectTabs(value, $event){
    (this.tabsResIndex == value && !this.setNotUndefined) ? this.tabsResIndex = undefined : this.tabsResIndex=value
    this.tabsResIndexChange.emit(this.tabsResIndex)
    if (this.overFlow) {
      if (this.tabs.nativeElement.clientWidth*0.75<=$event.pageX) {
        this.scrollRight($event.target.clientWidth*1.25)
      }else if(this.tabs.nativeElement.clientWidth*0.25<=$event.pageX){
        this.scrollLeft($event.target.clientWidth*1.25)
      }

    }
  }

  toggle(value) {
    if (this.tabsResIndex == value && !this.setNotUndefined) {
      return this.fragPipe.transform(this.navFragmentBase);
    }

    return this.fragPipe.transform([...this.navFragmentBase, value]);
  }


    /**
   * Check the element if it is text-overflow
   * @param elementId
   */
  isTextOverflow(): void {
    const elem = this.tabs.nativeElement

    let prov:boolean
    if (elem) {
      prov = elem.offsetWidth < elem.scrollWidth

    }
    else {
        prov =  false;
    }
    if (prov != this.overFlow) {
     this.overFlow = prov
    this.cdref.detectChanges();

    }

  }



  scrollLeft(scrollPixel?:number) {
    if (!scrollPixel) {
     scrollPixel =  this.tabs.nativeElement.children[1].clientWidth * 4

    }
    if (scrollPixel>this.tabs.nativeElement.clientWidth) {
      scrollPixel =this.tabs.nativeElement.clientWidth *0.3
    }

    this.tabs.nativeElement.scrollTo({ left: (this.tabs.nativeElement.scrollLeft - scrollPixel), behavior: 'smooth' });
  }

  scrollRight(scrollPixel?:number) {
    if (!scrollPixel) {
      scrollPixel =  this.tabs.nativeElement.children[1].clientWidth * 4

     }
     if (scrollPixel>this.tabs.nativeElement.clientWidth) {
       scrollPixel =this.tabs.nativeElement.clientWidth *0.3
     }

    this.tabs.nativeElement.scrollTo({ left: (this.tabs.nativeElement.scrollLeft + scrollPixel), behavior: 'smooth' });
  }
  calculateClasses(first, last, index) {
    let res={}
    if (this.slimTab) {
      res['slim-tab'] = true
    }
    /*if (this.overFlow) {
      if (first) {
        res['margin-btn-left'] = true
      }
      if (last) {
        res['margin-btn-right'] = true
      }

    }*/


    if (index!=this.tabsResIndex) {
      res[this.bgColorClassNotSelected] = true


    }else{
      res['active']=true
      res['underline']=true
    }
    return res

  }
  getNotSelectedClass(){
    if (this.tabsResIndex != undefined) {
      return "bg-gray-2"
    }
    return this.bgColorClassNotSelected
  }

  onIntersection($event, first, last){
    if (first) {
      this.firstVisible = $event.visible
    }else{
      this.lastVisible = $event.visible
    }
  }

}
