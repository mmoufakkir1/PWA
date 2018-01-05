import React from 'react';

export default function DetailPage({ context=null}) {
  if (context === null) {
    return (<div><p>No Content Found</p></div>);
  }
  
  return (
      <div>
        {context}
      </div>
  );
}