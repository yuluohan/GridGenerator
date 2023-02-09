import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
class DialogOverviewExampleDialog {
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

constructor(
   private route: ActivatedRoute,
    private router:Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public id: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([''+this.id]);
  }

  ngOnInit(): void {
  }

}
