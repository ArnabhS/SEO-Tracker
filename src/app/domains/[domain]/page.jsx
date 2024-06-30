'use client'
import DeleteButton from '@/components/DeleteButton';
import DoubleHeader from '@/components/DoubleHeader';
import KeywordRow from '@/components/KeywordRow';
import NewKeywordForm from '@/components/NewKeywordForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const DomainPage = (props) => {
  const [keywords,setKeywords]=useState([])
  const [loading, setLoading]=  useState(false)
  const [results,setResults] = useState([]);
  const router = useRouter();
    const domain = props.params.domain;
    useEffect(() => {
      fetchKeywords();
    }, []);
    function fetchKeywords() {
      setLoading(true);
      axios.get('/api/keywords?domain='+domain).then(response => {
        setKeywords(response.data.keywords);
        setResults(response.data.results);
        setLoading(false);
      });
    }

    function deleteDomain() {
      axios.delete('/api/domains?domain='+domain).then(() => {
        router.push('/');
      });
    }

    function showDeletePopup() {
      MySwal.fire({
        title: 'Delete?',
        text: `Do you want to delete ${domain}?`,
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
          deleteDomain();
        }
      })
    }
  return (
    <div>
      <div className="flex items-end">
        <DoubleHeader 
        preTitle='Domains' 
        preTitleLink={'/'}
        mainTitle={domain} />
        <div className="p-2">
          <DeleteButton onClick={showDeletePopup} />
        </div>
        </div>
        <NewKeywordForm domain={domain} onNew={()=>{}}/>
        {!loading && keywords.map(keywordDoc => (
        <KeywordRow {...keywordDoc}
                    key={keywordDoc._id}
                    results={results.filter(r => r.keyword === keywordDoc.keyword)} />
      ))}
       {!loading && !keywords?.length && (
        <div>No keywords found :(</div>
      )}
    </div>
  )
}

export default DomainPage