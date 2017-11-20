import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
declare let $: any;

@Component({
  selector: 'app-add-floorplan-btn',
  templateUrl: './addFloorplanBtn.component.html',
  styleUrls: ['addFloorplanBtn.component.scss']
})
export class AddFloorplanBtnComponent  implements AfterViewInit{
  @Output() add = new EventEmitter();

  constructor() {

  }

  ngAfterViewInit() {
    document.getElementById("floorplanFiles").onchange = this.onSelectFiles.bind(this);
  }

  addFiles() {
    document.getElementById("floorplanFiles").click();

  }

  onSelectFiles(ev, fl) {
    console.log(ev, fl, ev.target.files);
    this.add.emit({files: ev.target.files});
  }

  onFileDrop(ev) {
    for (const file of ev.files) {
      file.fileEntry.file(fileObj => {
        console.log(fileObj);
        this.add.emit({files: [fileObj]});
      });
    }
  }
}
