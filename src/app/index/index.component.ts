import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor( private router:Router,) { }

  ngOnInit(): void {
  }

  onClick(id:number){
       this.router.navigate([''+id]);
  }
    onClickNew(){
       this.router.navigate(['new']);
  }



}
