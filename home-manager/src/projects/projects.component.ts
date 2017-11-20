import {Component} from "@angular/core";
import {Project} from "./project.model";
import {ProjectsService} from "./projects.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects: Array<Project>;

  constructor(private projectService: ProjectsService) {
    this.getProjects();
  }

  getProjects() {
    this.projectService.get().subscribe(projects => {
      this.projects = projects;
    });
  }
}
