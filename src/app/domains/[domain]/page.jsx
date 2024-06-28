'use client'
import DoubleHeader from '@/components/DoubleHeader';
import NewKeywordForm from '@/components/NewKeywordForm';
import React from 'react'

const DomainPage = (props) => {
    const domain = props.params.domain;
  return (
    <div>
        <DoubleHeader preTitle='Domains' mainTitle={domain} />
        <NewKeywordForm domain={domain} onNew={()=>{}}/>
    </div>
  )
}

export default DomainPage