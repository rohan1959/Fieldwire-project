import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from "@angular/core";
import {Project} from "../project.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectsService} from "../projects.service";

@Component({
  selector: 'app-add-project-btn',
  templateUrl: "./addProjectBtn.component.html",
  styleUrls: ['./addProjectBtn.component.scss']
})
export class AddProjectBtnComponent {
  @ViewChild('addModalContent')
  private addModalContentTpl: TemplateRef<any>;

  @Output()
  complete = new EventEmitter();

  addProjectForm: FormGroup;
  modalRef: any;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private projectService:ProjectsService) {
    this.addProjectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  addModal() {
      this.modalRef = this.modalService.open(this.addModalContentTpl);
  }

  add() {
    this.projectService.create(this.addProjectForm.value).subscribe(res => {
      this.modalRef.close();
      this.complete.emit();
    });
  }
}
