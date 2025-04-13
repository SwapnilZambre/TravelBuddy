import { Component, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
private router=inject(Router)
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    const sc = window.scrollY;
    if (sc > 150) {
      navbar.classList.add('navbar-scroll');
    } else {
      navbar.classList.remove('navbar-scroll');
    }
  }
  logout(){
this.router.navigate(['/signin'])
  }
}
