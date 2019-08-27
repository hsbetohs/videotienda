import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatProgressSpinnerModule,
      MatInputModule,
    ],
    declarations: [
      NavbarComponent,
      SpinnerComponent,
      FilterPipe
    ],
    exports: [
      RouterModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NavbarComponent,
      SpinnerComponent,
      MatProgressSpinnerModule,
      MatInputModule,
      // BrowserAnimationsModule,
      FilterPipe
    ],
    providers: [
    ]
})
export class SharedModule { }
