'use client'

import DomainRow from "./DomainRow";
import DoubleHeader from "./DoubleHeader";



export default function DomainList({domains}){
   
    return(
        <div>
         <DoubleHeader
        preTitle={'Your domains'}
        mainTitle={domains.length+' Domains'} />
      {domains.map(domain => (
        <DomainRow
          {...domain}
        />
      ))}
        </div>
    )
}