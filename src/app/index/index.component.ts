import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {HttpClient} from "@angular/common/http";
import {CardsData} from "../generate/CardsData";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  firstCol: number=1;
  col:number = 1;
    private url = 'https://api.chiwutang.uk/grid/random';  // URL to web ap

  constructor( private breakpointObserver: BreakpointObserver,private router:Router,private http:HttpClient) { }

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


  onClickRandom() {
this.http.get<CardsData>(this.url).subscribe(response=>{
   this.router.navigate([''+response.id]);
})
  }
}
