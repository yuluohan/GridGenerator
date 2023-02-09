import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  firstCol: number=1;
  col:number = 1;

  constructor( private breakpointObserver: BreakpointObserver,private router:Router,) { }

  ngOnInit(): void {
      if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
          this.col = 4;
          this.firstCol =0;
      }
  }

  onClick(id:number){
       this.router.navigate([''+id]);
  }
    onClickNew(){
       this.router.navigate(['new']);
  }



}
