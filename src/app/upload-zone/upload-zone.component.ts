import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('myInputForSelectFile')
  myInputResetVariable: any;

  clearFile(){
    this.file.values = null; 
    this.records =null;
    this.heads_Obj = null;
    this.body_Obj = null;
    //this.readExcelFile(this.file);

    // This is for reset input file
    // console.log(this.myInputResetVariable.nativeElement.files);
    this.myInputResetVariable.nativeElement.value = "";
    // console.log(this.myInputResetVariable.nativeElement.files);
  }

  readExcelFile(event: any) {
    this.body_Obj = [];
    this.heads_Obj = [];

    this.file = event.target.files[0]; //Store data from Uploaded File
    let fileReader = new FileReader(); 
    fileReader.readAsArrayBuffer(this.file); //File Reader help to store file in binary string or array buffer

    fileReader.onload =()=>{
      let data = fileReader.result; //Store array buffer data in data varable
      let workbook = xls.read(data, {type:'array'}); // Here we are reading file data

      const sheetname = workbook.SheetNames; //Get the name of excel sheet postioned on index 0
      const sheet1 = workbook.Sheets[sheetname[0]];
      this.records =  xls.utils.sheet_to_json(sheet1) // Finally records come into the Array Form
      
      const count = this.records.filter((item: any) => item).length;

      console.log(count);
      var heads_Obj = this.records[0];

      //  console.log(this.records);
      //  console.log(this.records[0]);

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
