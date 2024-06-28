import React from 'react'

const KeywordRow = ({keyword,owner,domain}) => {
  return (
    <div className='flex gap-2 bg-white border border-blue-200 border-b-4 pr-0 rounded-lg items-center my-3'>
       <h3 className='font-bold grow'>{keyword}</h3>
       <div className='bg-green-100 w-48 h-[64px]'>

       </div>
        
        </div>
  )
}

export default KeywordRow