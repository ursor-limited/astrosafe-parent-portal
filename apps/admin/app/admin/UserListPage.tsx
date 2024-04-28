"use client";

import React, { useEffect, useState } from "react";
import ApiController from "./api";
import Button from './Button';
import styles from './Table.module.css'; // Import CSS module for styling

export interface IUser {
    id: string;
    auth0Id: string;
    subscribed: boolean;
    createdAt: string;
    updatedAt: string;
    subscriptionDate: string;
    useDates: string[];
    subscriptionDeletionDate?: string;
    paymentFailed: boolean;
    activityalldays?: number;
    activity1days?: number;
    activity7days?: number;
    activity14days?: number;
    activity28days?: number;
  }
  
export type sortFilerTypes =  "auth0Id" | "createdAt" | "subscriptionDate" | "useDates" | "activity1days" | "activity7days" | "activity14days" | "activity28days" | "activityalldays";
  
// Suppose you have a list of dates in string format
function getActivityInLastNDays(dateStrings: string[], N: number): number {
  
  // Convert date strings to Date objects
  const dates = dateStrings.map(dateString => new Date(dateString));

  // Get the current date
  const currentDate = new Date();

  const currentDateTime: number = currentDate.getTime(); // Convert current date to milliseconds

  // Count the number of dates within the last 14 days
  const count: number = dates.reduce((acc, date) => acc + ((currentDateTime - date.getTime()) <= 1000 * 60 * 60 * 24 * N ? 1 : 0), 0);
  return count
};


export default function UserListPage() {
  const [userList, setUserList] = useState<IUser[] | null>(null);
  const [sortedUserList, setSortedUserList] = useState<IUser[] | null>(null);
  const [sortBy, setSortBy] = useState<"asc" | "desc" | null>(null);
  const [sortField, setSortField] = useState<sortFilerTypes>('activity28days');

  const sortActivity = (srtFld: sortFilerTypes) => {
    if (sortField === srtFld) {
      if (sortBy === 'asc') {
        setSortBy('desc');
      } else {
        setSortBy('asc');
      }  
    } else {
      setSortField(srtFld)
      setSortBy('desc');
    }
  };

  useEffect(() => {
    ApiController.listAllUsers().then((usrLst) => {
      setUserList(usrLst)

      setSortedUserList(usrLst)
    }
  )
  }, []);



  useEffect(() => {
    if (userList){
      const srtedUsrLst = [...userList].sort((a, b) => {
        if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
          return sortBy === 'asc' 
          ? (a[sortField ?? "createdAt"] as string ?? "0").localeCompare(b[sortField ?? "createdAt"] as string ?? "0")
          : (b[sortField ?? "createdAt"] as string ?? "0").localeCompare(a[sortField ?? "createdAt"] as string ?? "0");
        } else if  (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
          if (sortBy === 'asc') {
            return (a[sortField] as number ?? 0) - (b[sortField] as number ?? 0);
          } else if (sortBy === 'desc') {
            return (b[sortField] as number ?? 0) - (a[sortField] as number ?? 0);
          } else {
            return 0;
          } 
        } else {
          return 0
        }
      });
      setSortedUserList(srtedUsrLst)  
    }
  }, [sortBy]);

  useEffect(() => {
    const tmpUserList = userList?.map(user => ({
      ...user,
      activityalldays: getActivityInLastNDays(user.useDates, 1500),
      activity1days: getActivityInLastNDays(user.useDates, 1),
      activity7days: getActivityInLastNDays(user.useDates, 7),
      activity14days: getActivityInLastNDays(user.useDates, 14),
      activity28days: getActivityInLastNDays(user.useDates, 28)
    }));
    if (tmpUserList) {
      setUserList(tmpUserList)
    } 
  }, [userList]);

  
  return (userList ? 
    <div>
    <h1>Data</h1> 


<table className={styles.table}>
      <thead>
    <tr>
    {/* setSortField("activity7days") */}
    <td>{<Button onClick={() => sortActivity("auth0Id")} sortingDirection={sortBy}>Email </Button>}</td>
    <td>{<Button onClick={() => sortActivity("createdAt")} sortingDirection={sortBy}>Created At </Button>}</td>
    <td>{<Button onClick={() => sortActivity("subscriptionDate")} sortingDirection={sortBy}>Subscribed </Button>}</td>
    <td>{<Button onClick={() => sortActivity("activityalldays")} sortingDirection={sortBy}>ActiveDays (all) </Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity28days")} sortingDirection={sortBy}>ActiveDays (last 28) </Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity14days")} sortingDirection={sortBy}>ActiveDays (last 14) </Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity7days")} sortingDirection={sortBy}>ActiveDays (last 7) </Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity1days")} sortingDirection={sortBy}>ActiveDays (last 1) </Button>}</td>
    <td> Profile Link </td>
    </tr>
    </thead>
    <tbody>
      {(sortedUserList ?? []).map(item => (
    <tr key={item.id}>
      <td>{item.auth0Id}</td>
      <td>{item.createdAt?.split("T")[0]}</td>
      <td>{item.subscriptionDate?.split("T")[0]}</td>
      <td>{item.activityalldays}</td>
      <td>{item.activity28days}</td>
      <td>{item.activity14days}</td>
      <td>{item.activity7days}</td>
      <td>{item.activity1days}</td>
      <td>{<a href={`http://localhost:3000/admin/${item.id}`}>Go to profile</a>}</td>
    </tr>
  ))}
     </tbody>
</table>
  </div> : <></>
  );
}
