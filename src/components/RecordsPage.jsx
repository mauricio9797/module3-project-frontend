import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

const RecordPage = () => {
  const location = useLocation();
  const transcription = location.state;

  return (
    <div>
    <p> This is the transcription:  </p>
    <p> {transcription} </p>
    <Link to="/write"> <button> Write me something </button></Link> 
  </div>
  )
};

export default RecordPage;