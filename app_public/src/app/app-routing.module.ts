import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceLogFormComponent } from './maintenance-log-form/maintenance-log-form.component';
import { MaintenanceLogTableComponent } from './maintenance-log-table/maintenance-log-table.component';
import { GateTableComponent } from './gate-table/gate-table.component';
import { GateFormComponent } from './gate-form/gate-form.component';

import { UserProfileComponent } from './home/user.profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { Role } from './_models/role';

import { UpdateMaintenanceLogComponent } from './update-maintenance-log/update-maintenance-log.component';
import { InspectionLogTableComponent } from './inspection-log-table/inspection-log-table.component';
import { InspectionLogFormComponent } from './inspection-log-form/inspection-log-form.component';
import { UpdateInspectionLogComponent } from './update-inspection-log/update-inspection-log.component';
import { UpdateGateComponent } from './update-gate/update-gate.component';
import { CanDeactivateGuard }    from './_helpers/can-deactivate.guard';

const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'home', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

  { path: 'gate', component: GateTableComponent, canActivate: [AuthGuard] },
  { path: 'addGate', component: GateFormComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },  
  { path: 'updateGate/:gateID', component: UpdateGateComponent, canActivate: [AuthGuard] },

  { path: 'maintenanceLog', component: MaintenanceLogTableComponent, canActivate: [AuthGuard] },
  { path: 'addMaintenanceLog', component: MaintenanceLogFormComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },  
  { path: 'updateMaintenanceLog/:maintenanceLogID', component: UpdateMaintenanceLogComponent, canActivate: [AuthGuard] },

  { path: 'inspectionLog', component: InspectionLogTableComponent, canActivate: [AuthGuard] },
  { path: 'addInspectionLog', component: InspectionLogFormComponent, canActivate: [AuthGuard] },  
  { path: 'updateInspectionLog/:inspectionLogID', component: UpdateInspectionLogComponent},

  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
