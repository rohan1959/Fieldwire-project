import {Floorplan} from "./floorplan.model";

export class Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;

  floorplans: Array<Floorplan>;

  constructor(projectObj) {
    this.id = projectObj._id;
    this.name = projectObj.name;
    this.description = projectObj.description;
    this.createdAt = projectObj.createdAt;
    this.updatedAt = projectObj.updatedAt;

    this.floorplans = projectObj.floorplans ? projectObj.floorplans.map(item => new Floorplan(item)) : [];
  }
}
