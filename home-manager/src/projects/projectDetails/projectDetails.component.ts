import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {Project} from "../project.model";
import {ProjectsService} from "../projects.service";
import {ParamMap, ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Floorplan} from "../floorplan.model";

@Component({
  selector: 'app-project-details',
  templateUrl: './projectDetails.component.html',
  styleUrls: ['projectDetails.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project = new Project({});

  constructor(private projectsService: ProjectsService,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) =>
      this.getProject(params.get('projectId'))
    );
  }

  getProject(projectId) {
    console.log(projectId);
    return this.projectsService.getById(projectId).subscribe(res => {
      this.project = res;
    });
  }

  addFloorplans(ev) {
    if (ev.files && ev.files.length > 0) {
      for (let i = 0; i < ev.files.length; i++) {
        let file = ev.files[i];
        let fileIndex = this.project.floorplans.findIndex(item => item.name === file.name);

        if(fileIndex > -1) {
          // if name already exists replace it
          this.project.floorplans[fileIndex] = new Floorplan(file);
        } else {
          this.project.floorplans.push(new Floorplan(file));
        }

      }
      this.ref.detectChanges();
    }
  }
  updateFloorplan(floorplan) {
    this.project.floorplans[floorplan.index] = floorplan.floorplan;
    this.ref.detectChanges();
  }

}
