import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private _user:UserService, private _router:Router) { 
    this._user.user()
    .subscribe(
      data=>console.log(data),
      error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit(): void {
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.log(error)
    
    )
  }
}
