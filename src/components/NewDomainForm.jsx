import React from 'react'

const NewDomainForm = () => {
  return (
    <form className="flex gap-2 my-8" >
      <input
        className="bg-white border border-b-4 border-blue-200 px-4 py-2 text-xl rounded-lg grow"
        type="text" placeholder="NewDomain.com"/>
      <button
        type="submit"
        className="bg-indigo-500 text-white px-8 rounded-lg border border-b-4 border-indigo-700">
        Add
      </button>
    </form>
  )
}

export default NewDomainForm