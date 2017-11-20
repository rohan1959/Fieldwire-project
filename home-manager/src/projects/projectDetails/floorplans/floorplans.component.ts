import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ParamMap, ActivatedRoute} from "@angular/router";
import {Floorplan} from "../../floorplan.model";

@Component({
  selector: 'app-floorplans',
  templateUrl: './floorplans.component.html',
  styleUrls: ['floorplans.component.scss']
})
export class FloorplansComponent implements OnInit {
  @Input() floorplans: Array<Floorplan>;
  @Input() projectId: string;
  @Output() addFloorplans = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  add(ev) {
    this.addFloorplans.emit({
      files: ev.files
    });
  }

  updateFloorplan(floorplan) {
    this.update.emit(floorplan);
  }
}
