import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { Order } from 'src/app/models/order';
import { ProcessTemplate } from 'src/app/models/processTemplate';
import { ProductTemplate } from 'src/app/models/productTemplate';
import { StepTemplate } from 'src/app/models/stepTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { ComponentInfo } from 'src/app/models/ui/componentInfo';
import { ComponentType } from 'src/app/models/ui/componentType';
import { TabFragmentPipe } from 'src/app/pipes/tab/tab-fragment.pipe';
import { TabIndicesPipe } from 'src/app/pipes/tab/tab-indices.pipe';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-component-view',
  templateUrl: './component-view.component.html',
  styleUrls: ['./component-view.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ]
})
export class ComponentViewComponent implements OnInit {

  @Input() component: any;
  @Input() topType: Exclude<ComponentType, 'step'>;

  @Input() isEdited: boolean;
  @Output() isEditedChange = new EventEmitter<boolean>();

  @Input() productToggleIndex: number;
  @Output() productToggleIndexChange = new EventEmitter<number>();

  @Input() processToggleIndex: number;
  @Output() processToggleIndexChange = new EventEmitter<number>();

  @Input() stepToggleIndex: number;
  @Output() stepToggleIndexChange = new EventEmitter<number>();

  @Input() currentComponent: ComponentInfo;
  @Output() currentComponentChange = new EventEmitter<ComponentInfo>();

  @Output() breadcrumbsChange = new EventEmitter<BreadCrumbInfo[]>();

  order: Order;
  product: ProductTemplate;
  process: ProcessTemplate;
  step: StepTemplate;

  topName: string;

  productNames: string[];
  processNames: string[];
  stepNames: string[];

  fragment: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indicesPipe: TabIndicesPipe,
    private fragPipe: TabFragmentPipe
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;

      let parts = this.indicesPipe.transform(fragment);
      parts.push(...new Array<number>(3 - parts.length));

      this.productToggleIndex = parts[0];
      this.productToggleIndexChange.emit(this.productToggleIndex);

      this.processToggleIndex = parts[1];
      this.processToggleIndexChange.emit(this.processToggleIndex);

      this.stepToggleIndex = parts[2];
      this.stepToggleIndexChange.emit(this.stepToggleIndex);

      this.updateComponents();
    });
  }

  updateComponents() {
    this.order = this.topType === 'order' ? this.component : undefined;
    this.product = this.topType === 'product' ? this.component : (this.productToggleIndex != undefined ? this.order.products[this.productToggleIndex].template : undefined);
    this.process = this.topType === 'process' ? this.component : (this.processToggleIndex != undefined ? this.product.processes[this.processToggleIndex].template : undefined);

    if (this.process && this.stepToggleIndex >= this.process.steps.length) {
      this.addStep();
    }

    this.step = this.stepToggleIndex != undefined ? this.process.steps[this.stepToggleIndex] : undefined;

    this.topName = this.process?.name;
    if (this.product) this.topName = this.product?.name;
    if (this.order) this.topName = this.order?.name;

    this.productNames = this.order?.products?.map(product => product.template.name);
    this.processNames = this.product?.processes?.map(process => process.template.name);
    this.stepNames = this.process?.steps?.map(step => step.title);

    console.log(this.order);
    console.log(this.product);
    console.log(this.process);
    console.log(this.step);

    console.log(this.productNames);
    console.log(this.processNames);
    console.log(this.stepNames);

    switch(this.getBottomType()) {
      case 'order':
        this.currentComponent = {
          name: this.order.name,
          index: undefined,
          type: 'order',
          typeDisplayname: $localize `order`
        };
        break;

      case 'product':
        this.currentComponent = {
          name: this.product.name,
          index: this.productToggleIndex,
          type: 'product',
          typeDisplayname: $localize `product`
        };
        break;

      case 'process':
        this.currentComponent = {
          name: this.process.name,
          index: this.processToggleIndex,
          type: 'process',
          typeDisplayname: $localize `process`
        };
        break;

      case 'step':
        this.currentComponent = {
          name: this.step.title,
          index: this.stepToggleIndex,
          type: 'step',
          typeDisplayname: $localize `step`
        };
        break;
    }

    this.currentComponentChange.emit(this.currentComponent);

    let breadCrumbs: BreadCrumbInfo[] = [];
    const baseUrl = this.router.url.split('#')[0];

    if (this.product) {
      breadCrumbs.push({
        name: this.product.name,
        url: new RouteInfo(baseUrl + '#' + this.fragPipe.transform([this.productToggleIndex]))
      });
    }

    if (this.process) {
      breadCrumbs.push({
        name: this.process.name,
        url: new RouteInfo(baseUrl + '#' + this.fragPipe.transform([this.productToggleIndex, this.processToggleIndex]))
      });
    }

    if (this.step) {
      breadCrumbs.push({
        name: this.step.title,
        url: new RouteInfo(baseUrl + '#' + this.fragPipe.transform([this.productToggleIndex, this.processToggleIndex, this.stepToggleIndex]))
      });
    }

    this.breadcrumbsChange.emit(breadCrumbs);
  }

  getBottomType() {
    if (this.step) return 'step';
    if (this.process) return 'process';
    if (this.product) return 'product';
    return 'order';
  }

  detectChange() {
    this.isEdited = true;
    this.isEditedChange.emit(this.isEdited);
  }

  addStep() {
    this.process.steps.push({
      title: $localize `Unnamed Step` + ' ' + (this.process.steps.length+1),
      keyMessage: null,
      tasks: null,
      materials: [],
      toolIds: [],
      pictureUris: [],
      videoUris: [],
      estimatedTime: 0,
    });
  }
}
