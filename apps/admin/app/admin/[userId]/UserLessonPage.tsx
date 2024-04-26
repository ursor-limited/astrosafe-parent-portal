"use client";

import React, { useEffect, useState } from "react";
import ApiController from "../api";

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
  }

export default function UserLessonPage(props: {userId: string}) {
  const [lessonList, setLessonList] = useState<ILesson[] | null>(null);

  useEffect(() => {
    // const userList: IUser = await ApiController.listAllUsers();
    // "65c7feebc52f652279581c71"
    ApiController.getUserLessons(props.userId).then((a) => {
      setLessonList(a)
    }
  )
  }, []);


  
  return (lessonList ? 
    <div>
    <h1>My Lesson</h1>
    <ul>

      {lessonList.map(item => (
    <tr key={item.id}>
      <td>{item.title}</td>
      <td>{item.contents.length}</td>
      <td>{item.createdAt?.split("T")[0]}</td>
      <td>{<a href={`https://dev.astrosafe.co/lesson/${item.id}`}>Go to lesson</a>}</td>
    </tr>
  ))}
    </ul>
  </div> : <></>
  );
}
