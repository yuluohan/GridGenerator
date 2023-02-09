import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Card} from "./Card";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CardsData} from "./CardsData";
import {MatDialog} from "@angular/material/dialog";
import {ResultComponent} from "../result/result.component";

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent {


  allCards:Card[]=[]

  id:number=1

  title:string=""



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
    this.allCards.push({show_image: true, image_url: "", text: "", id: 0, cols: 1, rows: 1, name: ""});
  }

  onClickAdd(){
      this.allCards.push({image_url: "", show_image: true, text: "", id: this.id, cols: 1, rows: 1, name: ""});
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



  post(cards: Card[], title: string){
    console.log(title)
    console.log(cards)
    let cardsData = {cards: cards,  title: title, username: "test"};
    this.http.post<CardsData>(this.url,cardsData,{ observe: 'response' }).subscribe(response=>
        {
          console.log(response)
          if (response.status==200){
            // @ts-ignore
            let id =response.body.id
            const dialogRef = this.dialog.open(ResultComponent, {data: id,});

            dialogRef.afterClosed().subscribe(result => {


            });

          }else {
            alert(response)
          }
        });
  }


}
