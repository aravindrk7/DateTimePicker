import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateTimePickerComponent } from 'src/app/date-time-picker/date-time-picker.component';

const routes: Routes = [
  {
    path:'dateTimer',
    component:DateTimePickerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
