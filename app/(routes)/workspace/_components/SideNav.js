"use client";
import { useEffect, useState } from "react";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { Bell, Loader2Icon } from "lucide-react";
import React from "react";
import { doc, query, setDoc } from "firebase/firestore";
import { collection, onSnapshot, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const MAX_FILE=process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

function SideNav({ params }) {
  const [documentList, setDocumentList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  const GetDocumentList = () => {
    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceid))
    );

    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      setDocumentList([]); // Clear the list before adding new documents

      querySnapshot.forEach((doc) => {
        setDocumentList((documentList) => [...documentList, doc.data()]);
      });
    });
  };

  // Create New Document

  const CreateNewDocument = async () => {

    if (documentList.length >= MAX_FILE) {
      toast("Upgrade to create more files",{
        description: "You have reached the maximum file limit.",
        action: {
          label: "Upgrade",
          onClick: () => {
            router.push("/upgrade");
          },
        },
      });
      return;
    }

    setLoading(true);
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: Number(params?.workspaceid),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      documentName: "Untitled Document",
      emoji: null,
      id: docId,
      documentOutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      Output: [],
    });

    setLoading(false);
    router.replace("/workspace/" + params?.workspaceid + "/" + docId);
  };

  return (
    <div className="md:w-72 hidden h-screen md:block fixed bg-blue-50 p-2">
      <div className="flex justify-between items-center p-5">
        <Logo />
        <Bell className="cursor-pointer text-gray-500" />
      </div>

      <hr className=""></hr>

      <div>
        <div className="flex justify-between items-center p-4">
          <h2 className="font-medium">Workspace Name</h2>
          <Button size="sm" onClick={CreateNewDocument}>
            {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "+"}
          </Button>
        </div>
      </div>

      {/* Document List  */}
      <DocumentList documentList={documentList} params={params} />

      {/* Progress Bar  */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList?.length/MAX_FILE)*100} />
        <h2 className="text-sm text-center my-2">
          <strong>{documentList?.length}</strong> Out of <strong>5</strong> files
          used
        </h2>
        <h2 className="text-sm text-center my-2">
          Upgrade for unlimited access
        </h2>
      </div>
    </div>
  );
}

export default SideNav;
