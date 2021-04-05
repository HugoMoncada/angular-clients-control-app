import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean; 
  userLoggedIn: string; 

  constructor(
    private loginService:LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true; 
        this.userLoggedIn = auth.email;
      }
      else{
        this.isLoggedIn= false;
      }
    })
  }


  logOut(){
    this.loginService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
