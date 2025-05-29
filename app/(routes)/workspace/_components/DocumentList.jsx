import React from "react";
import Image from "next/image";

function DocumentList({ documentList }) {
  return (
    <div>
      {documentList.map((doc, index) => (
        <div key={index}>
          <div className="flex items-center gap-2 pl-5">
            {!doc.emoji && <Image src={'/loopdocument.svg'} width={20} height={20} /> }
            <h2 className="flex gap-2">{doc?.emoji}{doc.documentName}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
