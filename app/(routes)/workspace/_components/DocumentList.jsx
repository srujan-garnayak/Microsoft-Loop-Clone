import React from "react";
import Image from "next/image";

function DocumentList({ documentList , params }) {
  return (
    <div className="">
      {documentList.map((doc, index) => (
        <div key={index} className={`mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer ${doc?.id==params?.documentid && 'bg-white'}`}>
          <div className="flex items-center gap-2">
            {!doc.emoji && <Image src={'/loopdocument.svg'} width={20} height={20} /> }
            <h2 className="flex gap-2">{doc?.emoji}{doc.documentName}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
