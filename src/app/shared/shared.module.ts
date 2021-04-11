import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InViewportModule } from 'ng-in-viewport';
import { CarouselModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { HideIfUnauthorizedDirective } from '../auth/hide-if-unauthorized.directive';
import { ShowIfUnauthorizedDirective } from '../auth/show-if-unauthorized.directive';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { VideoTypePipe } from '../pipes/media-type/media-type.pipe';
import { TabFragmentPipe } from '../pipes/tab-fragment/tab-fragment.pipe';
import { TabIndicesPipe } from '../pipes/tab-indices/tab-indices.pipe';
import {
  BottomNavigationOrderDraftComponent,
} from './bottom-navigation-order-draft/bottom-navigation-order-draft.component';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';
import { ChartBarStakedComponent } from './chart/chart-bar-staked/chart-bar-staked.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { SingleDatePickerComponent } from './forms/single-date-picker/single-date-picker.component';
import { SingleMultipleChoiceComponent } from './forms/single-multiple-choice/single-multiple-choice.component';
import { TextAreaComponent } from './forms/text-area/text-area.component';
import { TextFieldComponent } from './forms/text-field/text-field.component';
import { OrderComponent } from './order/order.component';
import { ProcessNodeComponent } from './process-node/process-node.component';
import { ProcessComponent } from './process/process.component';
import { ProductComponent } from './product/product.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StepGuideTabComponent } from './step-guide-tab/step-guide-tab.component';
import { StepComponent } from './step/step.component';
import { TabsComponent } from './tabs/tabs.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';

@NgModule({
  providers: [
    TabFragmentPipe,
    TabIndicesPipe
  ],
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
    HideIfUnauthorizedDirective,
    ShowIfUnauthorizedDirective,
    SpinnerComponent,
    DurationPipe,
    VideoTypePipe,
    TabFragmentPipe,
    TabIndicesPipe,
     ],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
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
    HideIfUnauthorizedDirective,
    ShowIfUnauthorizedDirective,
    SpinnerComponent,
    DurationPipe,
    VideoTypePipe,
    TabFragmentPipe,
    TabIndicesPipe,
  ]

})
export class SharedModule { }
