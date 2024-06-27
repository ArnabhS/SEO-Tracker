'use client'

import NewDomainForm from "@/components/NewDomainForm";
import DomainList from "@/components/DomainsList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [domains, setDomains]=useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
      
      fetchDomains();
  },[])
  function fetchDomains() {
    setLoading(true);
    axios.get('/api/domains').then(res => {
      setDomains(res.data.domains);
      setLoading(false);
    });
  }

  return (
    <div>
      <NewDomainForm onNew={fetchDomains} />
      {loading && (
        <div>Loading...</div>
      )}
      {!loading && (
        <DomainList domains={domains} />
      )}
    </div>
  );
}
