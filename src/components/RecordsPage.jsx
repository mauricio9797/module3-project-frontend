import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import Layout from "./Layout";

const RecordPage = () => {
  const location = useLocation();
  const transcription = location.state;

  return (
    <Layout>
    <div>
    <p> This is the transcription:  </p>
    <p> {transcription} </p>
    <Link to="/write"> <button> Write me something </button></Link> 
  </div>
  </Layout>
  )
};

export default RecordPage;