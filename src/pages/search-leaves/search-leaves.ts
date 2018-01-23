import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormsModule, NgForm } from '@angular/forms';
import {commonMethods} from '../../helper/common-methods'
import * as _ from 'lodash';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {serachservice} from '../../providers/search-service/search-service';

@IonicPage()
@Component({
  selector: 'page-search-leaves',
  templateUrl: 'search-leaves.html',
})
export class SearchLeavesPage {
  uid: string;
  Results;
  SearchResults:FormGroup;
  GetCurrentDate:Date=new Date();
  
  constructor(public navCtrl: NavController,
    private _searchService:serachservice,
    private formgroup:FormBuilder,
    private _cmnMethods:commonMethods,
    public navParams: NavParams) {
    this.uid = localStorage.getItem('myId');
    this.SearchResults=this.formgroup.group(
      {
         from:[this.GetCurrentDate,Validators.required],
         to:[this.GetCurrentDate,Validators.required],
      }
    );
  }

  ionViewDidLoad() {
  }

  searchLeave() {
    let from:Date = new Date(this.SearchResults.value['from']);
    let to:Date = new Date(this.SearchResults.value['to']);
    let teamId = localStorage.getItem('myTeam');
    let isManager = localStorage.getItem('isManagerRole');
    if ((from != null && to !=null)) 
    {
      this._cmnMethods.InitializeLoader();
      this._searchService.getSearchresults(true,teamId,from,to).subscribe(result => {
        this.Results = _.filter(result,function(query){
          return query.to<=to;
        });
        console.log(this.Results);
        this._cmnMethods.loader.dismiss();
      }, err => {
        console.log(err);
        this._cmnMethods.showToast(err);
        
      });
    }
  }
}
