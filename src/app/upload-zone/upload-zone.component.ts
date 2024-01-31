import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { raw } from 'express';
import * as xls from 'xlsx';

@Component({
  selector: 'app-upload-zone',
  templateUrl: './upload-zone.component.html',
  styleUrl: './upload-zone.component.css'
})
export class UploadZoneComponent {
  title = "Upload-Zone";
  fileUploadUrl = 'http://localhost:8080/product/upload';
  constructor(private _http:HttpClient){  }

  ngOnInit(): void{

  }

  file: any;
  records:any;
  heads_Obj:any = [];
  body_Obj:any = [];

  clearFile(){
    this.file.values = null; 
    this.records =null;
    this.heads_Obj = null;
    this.body_Obj = null;
    this.readExcelFile(this.file);
  }

  readExcelFile(event: any) {
    this.body_Obj = [];

    this.file = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsArrayBuffer(this.file);

    fileReader.onload =()=>{
      let data = fileReader.result;
      let workbook = xls.read(data, {type:'array'});

      const sheetname = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetname];
      this.records =  xls.utils.sheet_to_json(sheet1, {raw:true})
      
      const count = this.records.filter((item: any) => item).length;

      // console.log(count);
      var heads_Obj = this.records[0];

      // console.log(this.records);
      // console.log(this.records[0]);

      this.records.forEach((element:any) => {
        this.heads_Obj = Object.keys(element);
        this.body_Obj.push(Object.values(element));
      });

      // console.log(this.heads_Obj);
      // console.log(this.body_Obj);

    }
  }

// 

uploadFile(){
  let formData = new FormData();
  formData.append('file', this.file);

  this._http.post(this.fileUploadUrl, formData).subscribe(
    (data) =>{
      //Success
      console.log(data);
      alert(data);
      // alert("File is uploaded");

    },
    (error) =>{
      console.log(error);
    }
  );
}


}
