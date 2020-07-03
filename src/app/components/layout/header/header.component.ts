import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  selected: string;

  constructor(public router: Router) { }

  getRouter(): any {
    return this.router;
  }

  transition(item): any {
    switch (item) {
      case 'ideas':
        this.router.navigateByUrl('/dashboard/ideas');
        break;
      case 'projects':
        this.router.navigateByUrl('/dashboard/projects');
        break;
      case 'editor':
        this.router.navigateByUrl('/dashboard/editor');
        break;
      case 'boards':
        this.router.navigateByUrl('/dashboard/boards');
        break;
      default:
        return true;
    }
  }
  ngOnInit() { }
}
