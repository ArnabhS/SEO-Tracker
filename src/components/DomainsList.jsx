'use client'

import DomainRow from "./DomainRow";
import DoubleHeader from "./DoubleHeader";



export default function DomainList({domains, keywords}){
   
    return(
        <div>
         <DoubleHeader
        preTitle={'Your domains'}
        mainTitle={domains.length+' Domains'} />
      {domains.map(domainDoc => (
        <DomainRow
          {...domainDoc}
          keywords={keywords.filter(k => k.domain === domainDoc.domain)}
        />
      ))}
        </div>
    )
}