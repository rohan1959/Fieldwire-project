export class Floorplan {
  id: string;
  name: string;
  blueprint: string;
  blueprint_url: string;

  thumb_300: string;
  thumb_300_url: string;

  thumb_2000: string;
  thumb_2000_url: string;

  createdAt: string;
  updatedAt: string;

  type: string;

  file: File;
  constructor(floorplanObj) {
    if (floorplanObj._id) {
      this.id = floorplanObj._id;
      this.name = floorplanObj.name;

      this.blueprint = floorplanObj.blueprint;
      this.blueprint_url = floorplanObj.blueprint_url;

      this.thumb_300 = floorplanObj.thumb_300;
      this.thumb_300_url = floorplanObj.thumb_300_url;

      this.thumb_2000 = floorplanObj.thumb_2000;
      this.thumb_2000_url = floorplanObj.thumb_2000_url;

      this.type = floorplanObj.type;

      this.createdAt = floorplanObj.createdAt;
      this.updatedAt = floorplanObj.updatedAt;
    } else {
      this.file = floorplanObj;
      this.name = floorplanObj.name;
    }
  }
}
