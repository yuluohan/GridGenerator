import { Component, OnInit } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Card} from "./Card";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CardsData} from "./CardsData";
import {MatDialog} from "@angular/material/dialog";
import {ResultComponent} from "../result/result.component";

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit{


  allCards:Card[]=[]

  id:number=1

  title:string=""

  col:number = 20;


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        // 移动端
        return this.allCards;
      }
      return this.allCards;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private http: HttpClient,public dialog: MatDialog) {

  }

  onClickAdd(){
      this.allCards.push({image_url: "", show_image: true, text: "", id: this.id, cols: this.col, rows: 1, name: ""});
      this.id=this.id+1;
  }

  onClickDelete(id:number){
    let index = this.findItemById(this.allCards, id)
     this.allCards.splice(index,1)
  }

  onClickEditName(id:number,name:string){
    let index = this.findItemById(this.allCards, id)
    this.allCards[index].name=name
  }

  findItemById(cards:Card[],id:number){
    for (let i=0; i<cards.length; i++){
      if (cards[i].id==id)
        return i
    }
    return -1
  }


    private url = 'https://api.chiwutang.uk/grid/';  // URL to web ap


  post(cards: Card[], title: string, token: string){

    let cardsData = {cards: cards,  title: title, username: "test",token:token};
    this.http.post<CardsData>(this.url,cardsData,{ observe: 'response' }).pipe(catchError(this.handleError)).subscribe(response=>
        {
          console.log(response)

            // @ts-ignore
            let id =response.body.id
            const dialogRef = this.dialog.open(ResultComponent, {data: id,});

            dialogRef.afterClosed().subscribe(result => {


            });

        });
  }

  ngOnInit(): void {

     let col = 20;

        if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
          col = 15;
      }
      if (this.breakpointObserver.isMatched(Breakpoints.Medium)){
         col = 20
      }
      if (this.breakpointObserver.isMatched(Breakpoints.Small)){
        col = 60;
      }
      if (this.breakpointObserver.isMatched(Breakpoints.Handset)){
        col = 60;
      }
      if (this.breakpointObserver.isMatched(Breakpoints.Web)){
        col = 20
      }
      if (this.breakpointObserver.isMatched(Breakpoints.Tablet)){
        col = 24
      }

    this.col= col;

      this.allCards.push({show_image: true, image_url: "", text: "", id: 0, cols: this.col, rows: 1, name: ""});

  }

  private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
    alert(error.error.message)
  return throwError(() => new Error(error.error.message));
}


}
