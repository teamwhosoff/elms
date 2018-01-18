import { LeaveStatus } from "./leavestatus.enum";

export interface Leave {
    requestor: string,
    from: Date,
    to: Date,
    isHalfDay: boolean,
    reason: string,
    approver: string,
    status: LeaveStatus,
    createdAt: any,
    modifiedAt: Date,
    isRead :boolean,
    name?: string,
    photoUrl?: string,
    key:string
  }