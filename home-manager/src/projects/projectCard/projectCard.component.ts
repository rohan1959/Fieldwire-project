import {Component, Input} from "@angular/core";
import {Project} from "../project.model";

@Component({
  selector: 'app-project-card',
  templateUrl: "./projectCard.component.html",
  styleUrls:['projectCard.component.scss']
})
export class ProjectCardComponent {
  @Input() project: Project;
}
