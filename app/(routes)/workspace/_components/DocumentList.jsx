import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DocumentOptions from "./DocumentOptions";
import { toast } from "sonner";

function DocumentList({ documentList , params }) {
  const router = useRouter();

  const DeleteDocument = async(docId) => {
    await deleteDoc(doc(db, "workspaceDocuments", docId));
    toast.success("Document deleted successfully", {
      description: "The document has been removed from your workspace.",
    });
  }

  return (
    <div className="">
      {documentList.map((doc, index) => (
        <div key={index} onClick={()=>router.push('/workspace/'+params?.workspaceid+"/"+doc?.id)} className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer ${doc?.id==params?.documentid && 'bg-white'} flex justify-between items-center`}>
          {/* Display document emoji and name */}
          <div className="flex items-center gap-2">
            {!doc.emoji && <Image src={'/loopdocument.svg'} width={20} height={20} /> }
            <h2 className="flex gap-2">{doc?.emoji}{doc.documentName}</h2>
          </div>
          <DocumentOptions doc={doc} DeleteDocument={(docId)=>DeleteDocument(docId)}/>
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
