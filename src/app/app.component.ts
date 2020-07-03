import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Squibler';
  @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
        if (window.scrollY > 10) {
            let element = document.getElementById('my-homepage-navbar');
            element.classList.add('sticky');
        } else {
            let element = document.getElementById('my-homepage-navbar');
            element.classList.remove('sticky');
        }
    }
}
