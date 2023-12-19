import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadZoneComponent } from './upload-zone/upload-zone.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent,
  },
  {
    path:'upload-zone',
    component: UploadZoneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
