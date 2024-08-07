'use client'

import Chart from "@/components/Chart";
import DeleteButton from "@/components/DeleteButton";
import DoubleHeader from "@/components/DoubleHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
export default function KeywordPage(props){
   const domain=props.params.domain;
    const keyword=decodeURIComponent(props.params.keyword) ;
    const urlParams='?domain='+domain+'&keyword='+ encodeURIComponent(keyword)
    const url='/api/keywords'+urlParams
    const router=useRouter()
    const [results,setResults] = useState([]);
    useEffect(() => {
      axios.get('/api/keywords?keyword='+keyword+'&domain='+domain)
        .then(response => setResults(response.data.results));
    }, []);
    async function deleteKeyword(){
       await axios.delete(url ).then(() => {
         router.push('/domains/'+domain);
          });
    }


    function showDeletePopup() {
        MySwal.fire({
          title: 'Delete?',
          text: `Do you want to delete keyword ${keyword}?`,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Delete',
          confirmButtonColor: '#f00',
          showCloseButton: true,
          showCancelButton: true,
          reverseButtons: true,
          focusCancel: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            deleteKeyword();
          }
        })
      }
    return(
        <div>
            <div className="flex gap-2 items-end mb-4" >
            <DoubleHeader preTitle={domain}
            preTitleLink={`/domains/${domain}`}
            mainTitle={keyword}/>
            <div className="p-2">
            <DeleteButton onClick={showDeletePopup}/>    
            </div>   
            </div>
           <Chart width={'100%'} results={results}/>
        </div>
    )
}