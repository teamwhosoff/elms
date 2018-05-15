import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { commentsController } from '../../components/controllers/comments-controller';
import * as moment from 'moment';
import { AppContextProvider } from '../../providers/app-context/app-context';
import { LeaveServicev2Provider } from '../../providers/leave-servicev2/leave-servicev2';
import {UserServiceV2Provider} from '../../providers/user-service-v2/user-service-v2';
import {LeaveStatus} from '../../models/leavestatus.enum';
import {DetailsviewPage} from '../detailsview/detailsview';



@IonicPage()
@Component({
  selector: 'page-search-leaves',
  templateUrl: 'search-leaves.html'
})
export class SearchLeavesPage {

  SearchResults: boolean = true;
  fromDate = new Date().toISOString();
  maxToDate = moment(new Date()).add(90, 'days').format('YYYY-MM-DD');
  toDate=this.maxToDate;
  minFromDate = moment(new Date()).add(-90, 'days').format('YYYY-MM-DD');
  responseteam=[];  
  Myteam:string;
  disableSelector:boolean;


  constructor(private appContext: AppContextProvider,
    private leavesSvc: LeaveServicev2Provider, private _userV2:UserServiceV2Provider,private alertCtrl: commentsController,private modalCtrl:ModalController) {
    this.appContext.searchedLeaves.subscribe(leaves => { console.log(leaves) });
    this.leavesSvc.getTeams().subscribe(teamsList=>{
      this.responseteam = teamsList});
      
    if (this.appContext.myProfileObject.isManager) {
    this.disableSelector = this.appContext.myProfileObject.isManager;
      this.Myteam = "All";
    }
    else {
      this.disableSelector = this.appContext.myProfileObject.isManager;
      this.Myteam = this.appContext.myProfileObject.team.id;
    }
     
  }

  getMaxFromDate(toDate) {
    return moment(toDate).format('YYYY-MM-DD');
  }

  getMinToDate(fromDate) {
    return moment(fromDate).format('YYYY-MM-DD');
  }

  validatedate()
  {
    if(moment(this.fromDate).format('YYYY-MM-DD')> moment(this.toDate).format('YYYY-MM-DD'))
    {
     this.SearchResults=false;
    }
    else
    this.SearchResults=true;
  }

  searchLeave(fromDate, toDate,value) {
    var from = this.leavesSvc.getDateRange(fromDate);
    var to = this.leavesSvc.getDateRange(toDate);
    this._userV2.getUsersByTeamID(value.trim()).subscribe(
      UsersbyTeam=>{
        this.appContext.getAllTeams.next(UsersbyTeam);
        this.appContext.searchedLeaves.next([]);
        this.leavesSvc.searchLeavesByDateRange(from.start, to.end,this.appContext.searchedLeaves);
      }
    )
  }

  isSearchResultsAvailable() {
    return this.appContext.searchedLeavesCollection && this.appContext.searchedLeavesCollection.length > 0;
  }

  acceptLeave(leaveID: any) {
    this.leavesSvc.updateLeaveStatus(leaveID,true,LeaveStatus.Accepted,"Approved");
  }

  getColor(status) {
    switch (status) {
      case 0:
        return 'gray';
      case 1:
        return 'green';
      case 2:
        return 'red';
      default:
        return 'orange';
    }
  }
  
  ionViewWillEnter () {
	this.appContext.searchedLeaves.next([]);
  }
  ionViewWillLeave() {
    this.appContext.searchedLeaves.next([]);
  }

  CallPrompt(keyObj: string)
  {
    let Modaltitle="Reject Leave";
    let Modalmsg="Do you wish to reject this leave request?";
    this.alertCtrl.presentPrompt(keyObj,Modaltitle,Modalmsg,LeaveStatus.Declined);
  }

  MoreInfo(obj: any) {
    let leaveObj = {
      name: obj.owner.name,
      from: obj.from,
      to: obj.to,
      reason: obj.reason,
      photoUrl: obj.owner.photoUrl
    };
  
    let myModal = this.modalCtrl.create(DetailsviewPage, leaveObj);
    myModal.present();
  }

}
