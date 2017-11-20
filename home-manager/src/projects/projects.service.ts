import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Project} from "./project.model";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {Floorplan} from "./floorplan.model";
import {environment} from "../environments/environment";

@Injectable()
export class ProjectsService {

  constructor(private http: Http) {

  }

  /**
   * Gets Reindex API
   * @returns {Observable<any>} Response from server
   */
  create(projectObj) {
    return this.http.post(`${environment.serviceUrl}projects`, projectObj);
  }

  get(): Observable<Array<Project>> {
    return this.http.get(`${environment.serviceUrl}projects`).pipe(map((res: any) => {
      const response = res.json();
      return response.map(item => new Project(item));
    }));
  }

  getById(id): Observable<Project> {
    return this.http.get(`${environment.serviceUrl}projects/${id}`).pipe(map((res: any) => {
      const response = res.json();
      return new Project(response);
    }));
  }

  uploadFloorplan(projectId: string, file): Observable<Floorplan> {
    const formData = new FormData();

    formData.append('projectId', projectId);
    formData.append('floorplan', file, file.name);

    return this.http.post(`${environment.serviceUrl}projects/${projectId}/floorplans`, formData)
      .pipe(map((res:any) => new Floorplan(res.json())));
  }
}
