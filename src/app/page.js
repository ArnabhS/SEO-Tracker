import DomainRow from "@/components/DomainRow";
import DoubleHeader from "@/components/DoubleHeader";
import NewDomainForm from "@/components/NewDomainForm";

export default function Home() {

  return (
   <div>
    <NewDomainForm/>
    <DoubleHeader preTitle={'Your Domains'} mainTitle={'4 Domains'}/>
    <DomainRow/>
    <DomainRow/>
    <DomainRow/>
   </div>
  );
}
