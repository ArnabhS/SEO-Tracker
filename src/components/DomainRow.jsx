import React from 'react'

const DomainRow = () => {
    const keywords=[
        'github', 'git', 'copilot'
      ]
  return (
    <div>
          <div className="flex gap-2 bg-white border border-blue-200 border-b-4 p-4 rounded-lg items-center">
        <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" className="h-10"/>
        <div>
      <h2 className="font-bold text-xl leading-4">Github.com</h2>
      {keywords.map(keyword=>(
        <>
        <span className="bg-slate-200 inline-block m-1 p-1 rounded-md text-xs text-gray-500">
          {keyword}
        </span>
        </>
       ))}
      </div>
      <div>
        <div className="bg-green-200 w-36 h-20"></div>
      </div>
    </div>
    </div>
  )
}

export default DomainRow