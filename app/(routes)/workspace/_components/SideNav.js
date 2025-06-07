"use client";
import { useEffect, useState } from "react";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React from "react";
import { query } from "firebase/firestore";
import { collection, onSnapshot, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";

function SideNav({ params }) {
  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  const GetDocumentList = () => {
    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceid))
    );

    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDocumentList((documentList) => [...documentList, doc.data()]);
      });
    });
  };

  const CreateNewDocument = () => {
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId:workspaceId,
      createdby: "User Name",
      documentName: "New Document",
      emoji: "",
      workspaceId: Number(params?.workspaceid),
      documentId: docId,
    });

  return (
    <div className="md:w-72 hidden h-screen md:block fixed bg-blue-100 p-2">
      <div className="flex justify-between items-center p-5">
        <Logo />
        <Bell className="cursor-pointer text-gray-500" />
      </div>

      <hr className=""></hr>

      <div>
        <div className="flex justify-between items-center p-4">
          <h2 className="font-medium">Workspace Name</h2>
          <Button size="sm">+</Button>
        </div>
      </div>

      {/* Document List  */}
      <DocumentList documentList = {documentList} params={params}/>

    </div>
  );
}

export default SideNav;
