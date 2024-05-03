"use client";

import React, { useEffect, useState } from "react";
import ApiController from "./api";
import Button from '../Button';
import styles from '../Table.module.css'; // Import CSS module for styling

export interface IUser {
    id: string;
    auth0Id: string;
    subscribed: boolean;
    createdAt: string;
    updatedAt: string;
    subscriptionDate: string;
    useDates: string[];
    creationDates?: string[];
    subscriptionDeletionDate?: string;
    paymentFailed: boolean;
    activityalldays?: number;
    activity1days?: number;
    activity7days?: number;
    activity14days?: number;
    activity28days?: number;
    createdalldays?: number;
    created1days?: number;
    created7days?: number;
    created14days?: number;
    created28days?: number;
    totalCreated?: number;
  }

  export interface ICreatedDatesDict {
    [creatorId: string]: ICreatorStatsDict;
  }

  export interface ICreatorStatsDict {
    creationDates: string[];
    totalCount: number;
  }


  export interface IMetrics {
    oneDayAgo: number,
    sevenDaysAgo: number,
    forteenDaysAgo: number,
    twentyeightDaysAgo: number,
    allTime: number
  }
  

export type sortFilerTypes =  "auth0Id" | "createdAt" | "subscriptionDate" | "useDates" | "totalCreated" | "activity1days" | "activity7days" | "activity14days" | "activity28days" | "activityalldays" | "created1days" | "created7days" | "created14days" |  "created28days" | "createdalldays"; 
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

const countNonZeroValues = (array: IUser[], field: sortFilerTypes) => {
  return array.reduce((count, obj) => {
    // Check if the field exists and its value is non-zero
    if (obj.hasOwnProperty(field) && obj[field] !== 0) {
      return count + 1; // Increment count if the condition is met
    } else {
      return count; // Otherwise, return the current count
    }
  }, 0); // Start with count initialized to 0
};


const addCreationCountsToUserList = (firstList: IUser[], secondList: ICreatedDatesDict[] ) => {

  // Get an array of creatorIds from the keys of secondList
  const creatorIds = Object.keys(secondList) as string[];

  // Define mappings to store creatorId and creationDates
  const creatorIdToCreationDatesMap = {} as { [key: string]: string[] };
  const creatorIdToTotalCreatedMap = {} as { [key: string]: number };

  // Iterate over the creatorIds
  creatorIds.forEach((creatorId: string) => {
    //@ts-ignore
    const creatorEntry = secondList[creatorId];
    if (creatorEntry) {
      creatorIdToCreationDatesMap[creatorId] = creatorEntry.creationDates;
      creatorIdToTotalCreatedMap[creatorId] = creatorEntry.totalCount;
    }
  });

    ////
  // Loop through the first list and add creationDates if creatorId exists in the mapping
  const updatedFirstList = firstList.map(item => {
      const creationDates = creatorIdToCreationDatesMap[item.id] ?? [];
      const totalCreated = creatorIdToTotalCreatedMap[item.id] ?? 0;
      return { ...item, creationDates, totalCreated}; // Merge the creationDates into the object
  });

  return updatedFirstList;
}

export default function UserListPage() {
  const [userList, setUserList] = useState<IUser[] | null>(null);
  const [sortedUserList, setSortedUserList] = useState<IUser[] | null>(null);
  const [createdAtDict, setCreatedAtDict] = useState<ICreatedDatesDict[] | null>(null);

  const [sortBy, setSortBy] = useState<"asc" | "desc" | null>(null);
  const [sortField, setSortField] = useState<sortFilerTypes>('activity28days');

  // create functions to get these summary statistics cheaply
  const [videoCountDict, setVideoCountDict] = useState<IMetrics | null>(null);
  const [lessonCountDict, setLessonCountDict] = useState<IMetrics | null>(null);

  const [aau, setAau] = useState<number | null>(null);
  const [mau, setMau] = useState<number | null>(null);
  const [wau, setWau] = useState<number | null>(null);
  const [dau, setDau] = useState<number | null>(null);



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
      }
   )

  ApiController.getTotalVideoCounts().then((vCntDct) =>{
    setVideoCountDict(vCntDct)
      }
    )

  ApiController.getTotalLessonCounts().then((lCntDct) =>{
    setLessonCountDict(lCntDct)
      }
    )
    ApiController.getLessonCreatedAtDict().then((crtdDict) => {
      setCreatedAtDict(crtdDict)
      }
    )
  

  }, []);


  useEffect(() => {
    if (sortedUserList){
      const srtedUsrLst = [...sortedUserList].sort((a, b) => {
        if (typeof (a[sortField] ?? "0") === 'string' && typeof (b[sortField] ?? "0") === 'string') {
          return sortBy === 'asc' 
          ? (a[sortField ?? "createdAt"] as string ?? "0").localeCompare(b[sortField ?? "createdAt"] as string ?? "0")
          : (b[sortField ?? "createdAt"] as string ?? "0").localeCompare(a[sortField ?? "createdAt"] as string ?? "0");
        } else if  (typeof (a[sortField] ?? 0) === 'number' && typeof (b[sortField] ?? 0) === 'number') {
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
  }, [sortBy, sortField]);


  useEffect(() => {
    if (userList && createdAtDict) {
      var tmpUserList = addCreationCountsToUserList(userList, createdAtDict)      
      tmpUserList = tmpUserList?.map(user => ({
        ...user,
        activityalldays: getActivityInLastNDays(user.useDates, 9999),
        activity1days: getActivityInLastNDays(user.useDates, 2),
        activity7days: getActivityInLastNDays(user.useDates, 8),
        activity14days: getActivityInLastNDays(user.useDates, 15),
        activity28days: getActivityInLastNDays(user.useDates, 29),
        createdalldays: getActivityInLastNDays(user.creationDates ?? [], 9999),
        created1days: getActivityInLastNDays(user.creationDates ?? [], 2),
        created7days: getActivityInLastNDays(user.creationDates ?? [], 8),
        created14days: getActivityInLastNDays(user.creationDates ?? [], 15),
        created28days: getActivityInLastNDays(user.creationDates ?? [], 29),
      }));
      if (tmpUserList) {
        setSortedUserList(tmpUserList)
        const tmpAau = countNonZeroValues(tmpUserList, "activityalldays")
        const tmpMau = countNonZeroValues(tmpUserList, "activity28days")
        const tmpWau = countNonZeroValues(tmpUserList, "activity7days")
        const tmpDau = countNonZeroValues(tmpUserList, "activity1days")
  
        setAau(tmpAau)
        setMau(tmpMau)
        setWau(tmpWau)
        setDau(tmpDau)
      } 
    }  

  }, [createdAtDict, userList]);

  const colSpanNumber4: number = parseInt("4", 10); // Convert string to number
  const colSpanNumber5: number = parseInt("5", 10); // Convert string to number

  return (sortedUserList ? 
    <div>
    <h1>Data</h1> 

    <h3>
      Total active users: {aau} |
      MAU: {mau} |
      WAU: {wau} |
      DAU: {dau}
    </h3>

    <h3>
    <b>Lessons:</b> Total: {lessonCountDict?.allTime ? lessonCountDict.allTime : 0} |
    28D: {lessonCountDict?.twentyeightDaysAgo ? lessonCountDict.twentyeightDaysAgo : 0} |
    14D: {lessonCountDict?.forteenDaysAgo ? lessonCountDict.forteenDaysAgo : 0} |
    7D: {lessonCountDict?.sevenDaysAgo ? lessonCountDict.sevenDaysAgo : 0} |
    1D: {lessonCountDict?.oneDayAgo ? lessonCountDict.oneDayAgo : 0} 
    </h3>

    <h3>
    <b>videos:</b> Total: {videoCountDict?.allTime ? videoCountDict.allTime : 0} |
    28D: {videoCountDict?.twentyeightDaysAgo ? videoCountDict.twentyeightDaysAgo : 0} |
    14D: {videoCountDict?.forteenDaysAgo ? videoCountDict.forteenDaysAgo : 0} |
    7D: {videoCountDict?.sevenDaysAgo ? videoCountDict.sevenDaysAgo : 0} |
    1D: {videoCountDict?.oneDayAgo ? videoCountDict.oneDayAgo : 0} 
    </h3>

    
<table className={styles.table} >
      <thead>
      <tr>
          <th colSpan={colSpanNumber4}></th>
          <th colSpan={colSpanNumber5}>active days</th>
          <th colSpan={colSpanNumber5}>lesson created days</th>
          <th></th>
        </tr>
    <tr>
    {/* setSortField("activity7days") */}
    <td>{<Button onClick={() => sortActivity("auth0Id")} sortingDirection={(sortField === 'auth0Id') ? sortBy : null}>Email</Button>}</td>
    <td>{<Button onClick={() => sortActivity("createdAt")} sortingDirection={(sortField === 'createdAt') ? sortBy : null}>Created At</Button>}</td>
    <td>{<Button onClick={() => sortActivity("subscriptionDate")} sortingDirection={(sortField === 'subscriptionDate') ? sortBy : null}>Subscribed</Button>}</td>
    <td>{<Button onClick={() => sortActivity("totalCreated")} sortingDirection={(sortField === 'totalCreated') ? sortBy : null}>Tot. Lsns.</Button>}</td>
    <td>{<Button onClick={() => sortActivity("activityalldays")} sortingDirection={(sortField === 'activityalldays') ? sortBy : null}>All</Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity28days")} sortingDirection={(sortField === 'activity28days') ? sortBy : null}>28D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity14days")} sortingDirection={(sortField === 'activity14days') ? sortBy : null}>14D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity7days")} sortingDirection={(sortField === 'activity7days') ? sortBy : null}>7D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("activity1days")} sortingDirection={(sortField === 'activity1days') ? sortBy : null}>1D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("createdalldays")} sortingDirection={(sortField === 'createdalldays') ? sortBy : null}>All</Button>}</td>
    <td>{<Button onClick={() => sortActivity("created28days")} sortingDirection={(sortField === 'created28days') ? sortBy : null}>28D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("created14days")} sortingDirection={(sortField === 'created14days') ? sortBy : null}>14D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("created7days")} sortingDirection={(sortField === 'created7days') ? sortBy : null}>7D</Button>}</td>
    <td>{<Button onClick={() => sortActivity("created1days")} sortingDirection={(sortField === 'created1days') ? sortBy : null}>1D</Button>}</td>
    <td> Profile Link </td>
    </tr>
    </thead>
    <tbody>
      {sortedUserList  && sortedUserList.map(item => (
    <tr key={item.id}>
      <td>{item.auth0Id}</td>
      <td>{item.createdAt?.split("T")[0]}</td>
      <td>{item.subscriptionDate?.split("T")[0]}</td>
      <td>{item.totalCreated}</td>
      <td>{item.activityalldays}</td>
      <td>{item.activity28days}</td>
      <td>{item.activity14days}</td>
      <td>{item.activity7days}</td>
      <td>{item.activity1days}</td>
      <td>{item.createdalldays}</td>
      <td>{item.created28days}</td>
      <td>{item.created14days}</td>
      <td>{item.created7days}</td>
      <td>{item.created1days}</td>
      <td>{<a href={`http://localhost:3000/admin/${item.id}`}>Go to profile</a>}</td>
    </tr>
  ))}
     </tbody>
</table>
  </div> : <></>
  );
}
