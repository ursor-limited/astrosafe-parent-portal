"use client";

import React, { useEffect, useState } from "react";
import ApiController from "./api";

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
    activity1days?: number;
    activity7days?: number;
    activity14days?: number;
    activity28days?: number;
  }
  

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

  useEffect(() => {
    // const userList: IUser = await ApiController.listAllUsers();
    ApiController.listAllUsers().then((a) => {
      setUserList(a)
    }
  )
  }, []);

  useEffect(() => {
    const tmpUserList = userList?.map(user => ({
      ...user,
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
    <h1>My Data</h1>
    <ul>

      {userList.map(item => (
    <tr key={item.id}>
      <td>{item.auth0Id}</td>
      <td>{item.id}</td>
      <td>{item.createdAt?.split("T")[0]}</td>
      <td>{item.updatedAt?.split("T")[0]}</td>
      <td>{item.subscriptionDate?.split("T")[0]}</td>
      <td>{item.useDates.length}</td>
      <td>{item.activity28days}</td>
      <td>{item.activity14days}</td>
      <td>{item.activity7days}</td>
      <td>{item.activity1days}</td>
      <td>{<a href={`http://localhost:3000/admin/${item.id}`}>Go to profile</a>}</td>
    </tr>
  ))}
    </ul>
  </div> : <></>
  );
}
