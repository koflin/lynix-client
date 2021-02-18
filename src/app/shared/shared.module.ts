import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { InViewportModule } from 'ng-in-viewport';
import { TextFieldComponent } from './forms/text-field/text-field.component';
import { SingleDatePickerComponent } from './forms/single-date-picker/single-date-picker.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SingleMultipleChoiceComponent } from './forms/single-multiple-choice/single-multiple-choice.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextAreaComponent } from './forms/text-area/text-area.component';

import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProcessComponent } from './process/process.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { StepComponent } from './step/step.component';
import { CarouselModule } from 'ngx-bootstrap';
import { BottomNavigationOrderDraftComponent } from './bottom-navigation-order-draft/bottom-navigation-order-draft.component';
import { ProcessNodeComponent } from './process-node/process-node.component';
import { StepGuideTabComponent } from './step-guide-tab/step-guide-tab.component';
import { ChartBarStakedComponent } from './chart/chart-bar-staked/chart-bar-staked.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';

@NgModule({
  declarations: [TopNavigationComponent,
    TabsComponent,
    BreadcrumbHeaderComponent,
    TextFieldComponent,
    SingleDatePickerComponent,
    SingleMultipleChoiceComponent,
    TextAreaComponent,
    OrderComponent,
    ProductComponent,
    ProcessComponent,
    StepComponent,
    BottomNavigationOrderDraftComponent,
    ProcessNodeComponent,
    StepGuideTabComponent,
    ChartBarStakedComponent,
    PieChartComponent,



     ],
  imports: [
    CommonModule,
    RouterModule,
    // ngxDatatable für komplizierte Tables
    NgxDatatableModule,

    ButtonsModule.forRoot(),
    FormsModule,
    // inViewportModule kann aufzeigen, was im Viewport ist
    InViewportModule,
    BsDatepickerModule.forRoot(),
    // ngSelectModule ist für single und multiple choice inputfelder
    NgSelectModule,
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    // lodash https://lodash.com/ Nutzung für Arrays und Objekte nützlich, weil native funktionen manchmal unzuverlässig sind (deep clone, check if 2 nested objects/arrays are equal )
    // list.js für einfache Tables
    //restliche modules sind in der Dokumentation ersichtlich
  ],
  exports:[
    TopNavigationComponent,
    NgxDatatableModule,
    BreadcrumbHeaderComponent,
    ButtonsModule,
    FormsModule,
    TabsComponent,
    InViewportModule,
    TextFieldComponent,
    SingleDatePickerComponent,
    BsDatepickerModule,
    SingleMultipleChoiceComponent,
    NgSelectModule,
    TextAreaComponent,
    OrderComponent,
    ProductComponent,
    ProcessComponent,
    AccordionModule,
    StepComponent,
    CarouselModule,
    BottomNavigationOrderDraftComponent,
    ProcessNodeComponent,
    StepGuideTabComponent,
    ChartBarStakedComponent,
    PieChartComponent,





  ]

})
export class SharedModule { }
