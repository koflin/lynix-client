import { ApiService } from './../api/api.service';
import { Injectable, OnInit } from '@angular/core';
import { Tool } from 'src/app/models/tool';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private tools: BehaviorSubject<Tool[]>;

  constructor(private api: ApiService) {
    this.tools = new BehaviorSubject(null);

    this.update();
  }

  getAll() {
    return this.tools.asObservable();
  }

  create(tool: Tool) {
    this.api.post<Tool[]>('tools', tool).subscribe(() => this.update());
  }

  delete(id: string) {
    this.api.delte('tools/' + id).subscribe(() => this.update());
  }

  getById(id: string) {
    return this.tools.asObservable().pipe(
      map(tools => tools.find(tool => tool.id === id))
    );
  }

  update() {
    this.api.get<Tool[]>('tools').subscribe(tools => {
      this.tools.next(tools);
    });
  }
}
