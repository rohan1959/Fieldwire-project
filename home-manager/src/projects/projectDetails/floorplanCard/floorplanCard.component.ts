import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from "@angular/core";
import {Floorplan} from "../../floorplan.model";
import {ProjectsService} from "../../projects.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-floorplan-card',
  templateUrl: "./floorplanCard.component.html",
  styleUrls: ['floorplanCard.component.scss']
})
export class FloorplanCardComponent implements OnInit {
  @ViewChild('viewFloorplan')
  private viewFloorplanTpl: TemplateRef<any>;

  @Input() floorplan: Floorplan;
  @Input() index: number;

  @Input() projectId: string;
  @Output() update = new EventEmitter();
  modalRef: any;

  constructor(private sanitizer: DomSanitizer, private modalService: NgbModal, private projectService: ProjectsService) {
  }

  ngOnInit() {
    if(!this.floorplan.id) {
      this.projectService.uploadFloorplan(this.projectId, this.floorplan.file).subscribe(res => {
        this.update.emit({floorplan: res, index: this.index});
        // this.floorplan = res;
      });
    }
  }

  sanitizeImage(image = "") {
    if(this.floorplan.type === 'application/pdf') {
      image = '/assets/pdf.jpg';
    } else if (!image) {
      image = '/assets/loading.gif';
    }

    return image ? this.sanitizer.bypassSecurityTrustStyle(`url(${image})`) : '';
  }

  viewFloorplanModal() {
    this.modalRef = this.modalService.open(this.viewFloorplanTpl, {
      windowClass: 'modal-90'
    });
  }

  get documentURI() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.floorplan.blueprint_url);
  }
}
