import { NgModule } from '@angular/core';
import {ProjectsComponent} from "./projects.component";
import {ProjectCardComponent} from "./projectCard/projectCard.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ProjectDetailsComponent} from "./projectDetails/projectDetails.component";
import {AddProjectBtnComponent} from "./addProjectBtn/addProjectBtn.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProjectsService} from "./projects.service";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AddFloorplanBtnComponent} from "./projectDetails/addFloorplanBtn/addFloorplanBtn.component";
import {FloorplansComponent} from "./projectDetails/floorplans/floorplans.component";
import {FloorplanCardComponent} from "./projectDetails/floorplanCard/floorplanCard.component";
import {SanitizeStyle} from "../app/sanitize.pipe";
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop/lib/ngx-drop';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent},
  { path: 'projects/:projectId', component: ProjectDetailsComponent}
];

@NgModule({
  declarations: [
    AddFloorplanBtnComponent,
    AddProjectBtnComponent,
    FloorplansComponent,
    FloorplanCardComponent,
    ProjectsComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    SanitizeStyle
  ],
  imports: [
    CommonModule,
    FileDropModule,
    HttpModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProjectsService
  ],
  bootstrap: [],
  exports: [
    ProjectsComponent,
  ]
})
export class ProjectsModule { }
