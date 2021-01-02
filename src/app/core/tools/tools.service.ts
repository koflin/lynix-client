import { ApiService } from './../api/api.service';
import { Injectable, OnInit } from '@angular/core';
import { Tool } from 'src/app/models/tool';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private toolsChange: BehaviorSubject<void>;
  onToolsChange: Observable<void>;

  constructor(private api: ApiService) {
    this.toolsChange = new BehaviorSubject(null);
    this.onToolsChange = this.toolsChange.asObservable();
  }

  getAll() {
    return this.api.get<Tool[]>('tools');
  }

  create(tool: Tool) {
    this.api.post<Tool[]>('tools', tool).subscribe(() => this.toolsChange.next());
  }

  delete(id: string) {
    this.api.delete('tools/' + id).subscribe(() => this.toolsChange.next());
  }

  getById(id: string) {
    return this.api.get('tools/' + id);
  }
}
