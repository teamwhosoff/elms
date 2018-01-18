import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaveServiceProvider } from '../../providers/leave-service/leave-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MyLeavesPage } from "../my-leaves/my-leaves"

@IonicPage()
@Component({
  selector: 'page-new-leave',
  templateUrl: 'new-leave.html',
})
export class NewLeavePage {
  
  LeaveForm: FormGroup;
  myDate: Date = new Date();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,    
    public leaveService: LeaveServiceProvider) {
      this.LeaveForm = this.formBuilder.group({
        isHalfDay: [true],
        from: [this.myDate.toISOString(), Validators.required],
        to: [this.myDate.toISOString(), Validators.required],
        reason: ['', Validators.required]
      });
  }
  
  addLeave(){
    this.leaveService.createLeave(this.LeaveForm.value,"");
    this.navCtrl.pop();
  }

}
