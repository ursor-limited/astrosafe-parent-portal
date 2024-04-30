"use client";

import React, { useEffect, useState } from "react";
import ApiController from "../api";
import Button from '../../Button';
import styles from '../../Table.module.css'; // Import CSS module for styling


export type AstroContent =
  | "video"
  | "worksheet"
  | "lesson"
  | "link"
  | "image"
  | "text";


export interface ILesson {
    id: string;
    creatorId?: string;
    title: string;
    description?: string;
    contents: {
      type: AstroContent;
      contentId: string;
    }[];
    contentOrder: string[];
    imageUrls?: string[];
    createdAt: string;
    updatedAt: string;
    contentAmount?: number;
  }

  export type lessonSortFilerTypes =  "title" | "createdAt" | "contentAmount" ; 


export default function UserLessonPage(props: {userId: string}) {
  const [lessonList, setLessonList] = useState<ILesson[] | null>(null);
  const [sortedLessonList, setSortedLessonList] = useState<ILesson[] | null>(null);

  
  const [sortBy, setSortBy] = useState<"asc" | "desc" | null>(null);
  const [sortField, setSortField] = useState<lessonSortFilerTypes>('createdAt');


    const sortActivity = (srtFld: lessonSortFilerTypes) => {
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
    console.log("APIS")

    // const userList: IUser = await ApiController.listAllUsers();
    // "65c7feebc52f652279581c71"
    ApiController.getUserLessons(props.userId).then((a: ILesson[]) => {
          const tmpLsnList = a.map(lesson => ({
            ...lesson,
            contentAmount: lesson.contents.length,
          }));
          if (tmpLsnList) {
          setLessonList(tmpLsnList)
          setSortedLessonList(tmpLsnList)
        }
      })
  }, []);

  useEffect(() => {
    if (lessonList){
      const srtedLsnLst = [...lessonList].sort((a, b) => {
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
      setSortedLessonList(srtedLsnLst)  
    }
  }, [sortBy, lessonList]);
  
  return (sortedLessonList ? 
    <div>
    <h1>Account List</h1>
    <table className={styles.table} >
    <thead>
    {/* <tr>
        <th colSpan={colSpanNumber4}></th>
        <th colSpan={colSpanNumber5}>active days</th>
        <th colSpan={colSpanNumber5}>created days</th>
        <th></th>
      </tr> */}
  <tr>
  <td>{<Button onClick={() => sortActivity("title")} sortingDirection={(sortField === 'title') ? sortBy : null}>Title</Button>}</td>
  <td>{<Button onClick={() => sortActivity("createdAt")} sortingDirection={(sortField === 'createdAt') ? sortBy : null}>Created At</Button>}</td>
  <td>{<Button onClick={() => sortActivity("contentAmount")} sortingDirection={(sortField === 'contentAmount') ? sortBy : null}>Ttl. Cnt.</Button>}</td>
  <td>Lesson Link</td>
  </tr>
  </thead>
  <tbody>
  {sortedLessonList.map(item => (
    <tr key={item.id}>
      <td>{item.title}</td>
      <td>{item.createdAt?.split("T")[0]}</td>
      <td>{item.contentAmount}</td>
      <td>{<a href={`https://dev.astrosafe.co/lesson/${item.id}`}>Go to lesson</a>}</td>
    </tr>
  ))}
   </tbody>
</table>
  </div> : <></>
  );
}
