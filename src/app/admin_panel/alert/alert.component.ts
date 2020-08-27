import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsPostService } from 'src/app/adminService/news-post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
alert: FormGroup;
alertObj;
  deleteId: any;

  constructor(private fb: FormBuilder, private postdb: NewsPostService, private toastr: ToastrService) { 
    this.alert = this.fb.group(
      {
        alert_text: ['', [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    this.getAlert();
  }

  createAlerts(){
    return this.postdb.postAlert(this.alert.value).subscribe(res => {
    console.log(res);
    this.getAlert();
  },
  (error) => {
    this.toastr.error('Could not create tags, No empty tags allowed', 'Invalid Entry');
  },
  () => {
    this.toastr.success('Tags is created sucessfully', 'Tags Added');
  });
}

getAlert() {
  this.postdb.getAlert().subscribe(res => {
    this.alertObj = res;
    console.log(res);
  });
}

getAlertById(id) {
  this.postdb.getAlertById(id).subscribe(res => {
   this.alertObj = res
    console.log(res);
  })
}

setalertDeleteId(id){
  this.deleteId = id;
  console.log(this.deleteId)
}

updateAlert(id, alert){

}

deleteAlert(id) {
this.postdb.deleteAlert(this.deleteId).subscribe(res => {
  this.alertObj = res
  console.log(res)
},(error) => {
  console.log(error);
},
() => {
  this.getAlert();
}
)
}
}


