import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const KeywordRow = ({keyword,owner,domain,results}) => {

  const latestResult=results.reverse()[0]
  const [latestRank, setLatestRank]=useState(results.reverse()[0].rank)
  useEffect(()=>{
     setTimeout(checkRank, 3000); 
  },[latestRank])
  
  function checkRank(){
    if(!latestRank){
      const url='/api/results?id='+latestResult.rank.brightDataResponseId
      axios.get(url).then(response =>{
        const newRank=response.data.rank
        if(newRank){
          setLatestRank(newRank)
        }
        else{
          setTimeout(checkRank, 3000);
        }
      })
    }
  }
  return (
    <div className='flex gap-2 bg-white border border-blue-200 border-b-4 pr-0 rounded-lg items-center my-3'>
       <Link
       href={`/domains/`+domain+`/`+encodeURIComponent(keyword) }
       className='font-bold grow block'>{keyword}</Link>
      
       <div className='bg-green-100 w-48 h-[64px]'>
        {!latestResult &&(
          <div>Loading... </div>
        ) }
       {latestResult && (
        <div>{latestRank} </div>
       )}
       </div>
        
        </div>
  )
}

export default KeywordRow