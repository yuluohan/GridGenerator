import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CardsData} from "../generate/CardsData";
import {HttpClient} from "@angular/common/http";
import {Card} from "../generate/Card";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {InputComponent} from "../input/input.component";
import html2canvas from "html2canvas";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})
export class GridsComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,   private route: ActivatedRoute,
    private router:Router,private http:HttpClient,public dialog: MatDialog,
              private cookieService: CookieService) { }

  id:number=0;

  allCards:Card[]=[]

  title:string=""

  type:string="";

  url:string = 'https://api.chiwutang.uk/grid';

  hidden: string="hidden";

    cards = this.breakpointObserver.observe(Breakpoints.Large).subscribe(
    data=> {
      return this.allCards;
    }
  );
  showSpinner: boolean= true;


  ngOnInit(): void {

      const id = this.route.snapshot.paramMap.get('id')!;
      this.id=Number(id);
      this.http.get<CardsData>(this.url+"/"+id,{ observe: 'response' }).subscribe(response=>{
    console.log(response)

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


        this.title = response.body?.title!
        this.allCards = response.body?.cards!


        let cookie = this.cookieService.get(String(this.id)+"yuban")
           if (cookie == ''){
          console.log("首次访问无缓存")
        }else {
          this.allCards = JSON.parse(cookie)
        }



        for (let i=0; i<this.allCards.length; i++){
            this.allCards[i].cols=col;
            this.allCards[i].rows=1;
            this.allCards[i].show_image = false
        }
        this.showSpinner = false
      })
  }

  onClick(id:number){
      const dialogRef = this.dialog.open(InputComponent, {data: id,});

            dialogRef.afterClosed().subscribe(result => {
              this.updateData(result.id,result.show_image,result.text)
            });

  }


  updateData(id:number,showImage:boolean,text:string) {
     for (let i=0; i<this.allCards.length; i++){
            if (this.allCards[i].id==id){
              this.allCards[i].show_image=showImage
              if (showImage){
                this.allCards[i].image_url=text
              }else{
                     this.allCards[i].text=text
              }
            }
        }

     this.cookieService.set(String(this.id)+"yuban", JSON.stringify(this.allCards) );
  }


  screenshot(){
    html2canvas(<HTMLElement>document.querySelector("#capture")).then(canvas => {
    const imgUrl = canvas.toDataURL("png"); // 获取生成的图片的url
    console.log(imgUrl);
    const src = imgUrl;
    const link = document.createElement("a")
    link.href = src
    link.download = "screenshot.png"
    link.click()
    link.remove()
  })
  }

}
