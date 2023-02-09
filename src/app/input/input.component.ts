import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Card} from "../generate/Card";
class DialogOverviewExampleDialog {
}
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

constructor(

   private route: ActivatedRoute,
    private router:Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public id: number,
  ) {}


  showImage:boolean=true;


  imageUrl:string='';
  text:string='';


  ngOnInit(): void {
  }

  onClickImage(value: string): void {

    this.showImage = true;
    let c :Card ={cols: 0, id: this.id, image_url: value, name: '', rows: 0, show_image: true, text: value}
     this.dialogRef.close(c);
  }

  onClickText(value: string): void {
    this.showImage = false;
    let c :Card ={cols: 0, id: this.id, image_url: '', name: '', rows: 0, show_image: false, text: value}
    this.dialogRef.close(c);
  }

  handleClick() {
  document.getElementById('upload-file')!.click();
}

addAttachment(fileInput: any) {
  const fileReaded = fileInput.target.files[0];
  console.log(fileReaded)
  //  handle the rest
   const reader = new FileReader();
      reader.readAsDataURL(fileReaded as any);
      reader.onload = () => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = reader.result as string;

    this.showImage = true;
    let c :Card ={cols: 0, id: this.id, image_url: img.src, name: '', rows: 0, show_image: true, text: img.src}
     this.dialogRef.close(c);
      };

}

}
