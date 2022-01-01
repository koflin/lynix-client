import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InViewportModule } from 'ng-in-viewport';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TagInputModule } from 'ngx-chips';
import { ToastrModule } from 'ngx-toastr';

import { HideIfUnauthorizedDirective } from '../auth/hide-if-unauthorized.directive';
import { ShowIfUnauthorizedDirective } from '../auth/show-if-unauthorized.directive';
import { DatetimePipe } from '../pipes/datetime/datetime.pipe';
import { DurationUnitPipe } from '../pipes/duration/duration-unit.pipe';
import { DurationPipe } from '../pipes/duration/duration.pipe';
import { LanguagePipe } from '../pipes/language/language.pipe';
import { VideoTypePipe } from '../pipes/media-type/media-type.pipe';
import { PermissionPipe } from '../pipes/permission/permission.pipe';
import { StatusBadgePipe } from '../pipes/status/status-badge.pipe';
import { StatusPipe } from '../pipes/status/status.pipe';
import { TabFragmentPipe } from '../pipes/tab/tab-fragment.pipe';
import { TabIndicesPipe } from '../pipes/tab/tab-indices.pipe';
import { UserStatusPipe } from '../pipes/user/user-status.pipe';
import {
  BottomNavigationOrderDraftComponent,
} from './bottom-navigation-order-draft/bottom-navigation-order-draft.component';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';
import { ChartBarStakedComponent } from './chart/chart-bar-staked/chart-bar-staked.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { ComponentViewComponent } from './component-view/component-view.component';
import { CheckboxSelectComponent } from './forms/checkbox-select/checkbox-select.component';
import { RangeDatePickerComponent } from './forms/range-date-picker/range-date-picker.component';
import { SingleDatePickerComponent } from './forms/single-date-picker/single-date-picker.component';
import { SingleMultipleChoiceComponent } from './forms/single-multiple-choice/single-multiple-choice.component';
import { TextAreaComponent } from './forms/text-area/text-area.component';
import { TextFieldComponent } from './forms/text-field/text-field.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
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
    TabIndicesPipe,
    StatusPipe,
    DurationUnitPipe,
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
    PermissionPipe,
    StatusBadgePipe,
    ComponentViewComponent,
    LanguageSelectComponent,
    LanguagePipe,
    UserStatusPipe,
    DatetimePipe,
    RangeDatePickerComponent,
    CheckboxSelectComponent,
    DurationUnitPipe,
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

    TagInputModule,
    //https://github.com/Gbuomprisco/ngx-chips
    BsDropdownModule,
    // https://valor-software.com/ngx-bootstrap/#/dropdowns

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
    PermissionPipe,
    StatusBadgePipe,
    ComponentViewComponent,
    LanguageSelectComponent,
    LanguagePipe,
    UserStatusPipe,
    DatetimePipe,
    RangeDatePickerComponent,
    TagInputModule,
    BsDropdownModule,
    CheckboxSelectComponent
  ]

})
export class SharedModule { }
