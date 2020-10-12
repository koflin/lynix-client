import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { OrdersOverviewComponent } from './views/orders/orders-overview/orders-overview.component';
import { ProcessesOverviewComponent } from './views/processes/processes-overview/processes-overview.component';
import { ProcessNodeComponent } from './components/process-node/process-node.component';
import { ProductTemplateLibraryComponent } from './views/templates/product/product-template-library/product-template-library.component';
import { ProcessTemplateLibraryComponent } from './views/templates/process/process-template-library/process-template-library.component';
import { ProcessTemplateNodeComponent } from './components/process-template-node/process-template-node.component';
import { ProductTemplateNodeComponent } from './components/product-template-node/product-template-node.component';
import { ToolLibraryComponent } from './views/tools/tool-library/tool-library.component';
import { ToolNodeComponent } from './components/tool-node/tool-node.component';
import { OrdersDraftComponent } from './views/orders/orders-draft/orders-draft.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductTemplateTabComponent } from './components/product-template-tab/product-template-tab.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductTemplateSelectionComponent } from './components/product-template-selection/product-template-selection.component';
import {MatTableModule} from '@angular/material/table';
import { ProcessTemplateSelectionComponent } from './components/process-template-selection/process-template-selection.component';
import { ProcessTemplateTabComponent } from './components/process-template-tab/process-template-tab.component';
import { StepTemplateTabComponent } from './components/step-template-tab/step-template-tab.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { OrderTabComponent } from './components/order-tab/order-tab.component';
import { GuideComponent } from './views/guide/guide.component';
import { StepGuideTabComponent } from './components/step-guide-tab/step-guide-tab.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    HomeComponent,
    NavComponent,
    OrdersOverviewComponent,
    ProcessesOverviewComponent,
    ProcessNodeComponent,
    ProductTemplateLibraryComponent,
    ProcessTemplateLibraryComponent,
    ProcessTemplateNodeComponent,
    ProductTemplateNodeComponent,
    ToolLibraryComponent,
    ToolNodeComponent,
    OrdersDraftComponent,
    ProductTemplateTabComponent,
    ProductTemplateSelectionComponent,
    ProcessTemplateSelectionComponent,
    ProcessTemplateTabComponent,
    StepTemplateTabComponent,
    OrderTabComponent,
    GuideComponent,
    StepGuideTabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
