
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Transcribe() {
  const [transcription, setTranscription] = useState("");
  const [fetching, setFetching] = useState(true);
  const gotToken = localStorage.getItem("authToken");

  useEffect(() => {                               
    axios
      .get("http://localhost:5005/auth/transcribe" ,
      {
        headers: { authorization: `Bearer ${gotToken}` },
      } )
      .then((response) => {
        console.log(response.data);
        const { text } = response.data;
        setTranscription(text);  
        setFetching(false);
      });
    
  }, [] );

  return (
    <div>
      Transcription
       {fetching && <p>Loading ...</p>}
      <p>{transcription}</p>

      <Link to="/write"> <button> Write me something </button></Link> 
    </div>
  )
}

export default Transcribe
