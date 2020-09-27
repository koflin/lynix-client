import { Injectable } from '@angular/core';
import { Tool } from 'src/app/models/tool';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private tools: Tool[] = [
    {
      id: 't0',
      name: 'Saw'
    },
    {
      id: 't1',
      name: 'Welding machine'
    }
  ];

  constructor() { }

  getAll() {
    return this.tools;
  }

  getById(id: string) {
    return this.tools.find(tool => tool.id === id);
  }
}
