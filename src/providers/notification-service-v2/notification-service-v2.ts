import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AppContextProvider } from '../app-context/app-context';
import { LeaveServicev2Provider } from '../leave-servicev2/leave-servicev2';

@Injectable()
export class NotificationServiceV2 {

    constructor(
        public appContext: AppContextProvider,
        private leaveSvc: LeaveServicev2Provider,
        public store: AngularFirestore) {

        this.appContext.notificationsV2.subscribe(notifications => {
            this.getMyNotificationDetails();
        })

    }

    getMyNotificationDetails() {
        this.appContext.notificationLeaves.next([]);
        if (this.appContext.notificationsV2Collection && this.appContext.notificationsV2Collection.length > 0) {
            let leaves = [];
            this.appContext.notificationsV2Collection.forEach(n => {

                this.store.doc('eLeaves/' + n.leaveId).ref.get().then((result: any) => {
                    if (result.exists) {

                        result = result.data();
                        result.leaveId = n.leaveId;

                        result.owner.get()
                            .then((userRef: any) => {
                                let user = userRef.data();
                                user.manager.get().then(managerRef => {
                                    user.manager = managerRef.data();
                                    result.owner = user;

                                    if (user.email == this.appContext.myProfileObject.email) {
                                        result.isMyLeave = true;
                                    }
                                    else if (user.manager.email == this.appContext.myProfileObject.email) {
                                        result.isMyReporteeLeave = true;
                                    }

                                    console.log(result);
                                    leaves.push(result);
                                    this.appContext.notificationLeaves.next(leaves);
                                })
                            })
                    }
                });
            })
        }
    }

    clearNotification(leaveId) {
        this.store.collection('eNotifications').doc(this.appContext.myProfileObject.email)
            .collection('notifications', ref => ref.where('leaveId', '==', leaveId))
            .snapshotChanges().subscribe((items: any) => {
                items.forEach(item => {
                    // console.log(item);
                    item.payload.doc.ref.delete().then(() => {
                        this.getMyNotificationDetails();
                        console.log("Notification successfully deleted!");
                    }).catch(function (error) {
                        this.getMyNotificationDetails();
                        console.error("Error removing Notification: ", error);
                    });
                })
            })
    }

}