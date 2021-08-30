import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { ProcessTemplate } from 'src/app/models/processTemplate';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-manual-detail',
  templateUrl: './manual-detail.component.html',
  styleUrls: ['./manual-detail.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class ManualDetailComponent implements OnInit {

  breadCrumbs: BreadCrumbInfo[]=[]

  id: string;
  stepToggleId:number=0;
  processTemplate: ProcessTemplate;

  stepNames:string[]=[]

  constructor(
    private route: ActivatedRoute,
    private processTemplateService: ProcessTemplatesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.update();
      }
    });

    this.route.fragment.subscribe((fragment) => {
      if (!fragment) {
        return;
      }

      const parts = fragment.split('.');

      if (parts.length >= 2) {
        this.stepToggleId = parseInt(parts[1]);
      }
    });
  }

  update() {
    this.processTemplateService.getById(this.id).subscribe(async (process) => {
      this.processTemplate = process;

      this.breadCrumbs=[{name: $localize `Process Manuals`, url: "/manuals/overview" }, {name: this.processTemplate.name , url: this.router.url},];

      this.stepNames = this.processTemplate.steps.map((s)=>{
        return s.title
      })
      this.stepNames.unshift($localize `Overview`)
      this.stepNames.push($localize `Finish`)
    });
  }

  onExit() {
    this.router.navigate(['manuals/overview']);
  }
  onPrevious() {
    if (this.stepToggleId > 0) {
      this.stepToggleId -= 1;
    }
  }

  onNext() {
    if (this.stepToggleId < this.processTemplate.steps.length + 1) {
      this.stepToggleId += 1;
    }
  }
}
