import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { API_URL } from "../config/config.index";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

function Display() {
  const gotToken = localStorage.getItem("authToken");
  const user = useContext(AuthContext);
  const { userId } = useParams();

  const [displayedRecord, setDisplayedRecord] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(0);
 

  
  const navigate = useNavigate();
  const handleLikeButton =  () => {
    setToggle((current) => !current);
    setCount((prevCount) => prevCount + 1);
    }
  useEffect(() => {
    axios
      .get(`${API_URL}/auth/display`, {
        headers: { Authorization: `Bearer ${gotToken}` },
      })
      .then((res) => {
        setDisplayedRecord(res.data);
        console.log("data",res.data)
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, [toggle]);

  const handleDeleteTranscription = async (recordId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your transcription?"
    );
    if (confirmDelete && gotToken) {
      try {
        await axios.post(
          `${API_URL}/auth/display`,
          { recordId },
          {
            headers: { Authorization: `Bearer ${gotToken}` },
          }
        );
        setDisplayedRecord(prevRecords =>
          prevRecords.filter(record => record._id !== recordId)
        );
        setToggle(current => !current);
      } catch (err) {
        console.log("There was an error while deleting the transcript", err);
      }
    }
    
  };

  return (
    <Layout>
      <div className="display-main-div">
        <h3 className="small-h3">Transcript:</h3>
        {fetching ? (
          <li>Loading transcript...</li>
        ) : (
          <div>
            {displayedRecord.map((entry, index) => (
              <div key={index}>
              <p>This is a transcript: {entry.transcript} </p> 

             
              {console.log("entry._id", entry._id)}
                {entry.writtenText.map((item, itemIndex) => (
                  <div key={itemIndex}>
                  <p>This is a written text:  {item.text} </p>
                  {console.log("item id", item._id)}
                  <button className="red-button" onClick={() => handleDeleteTranscription(entry._id)}> Delete </button> 
                  <div>
    <button style={{backgroundColor: 'rgb(128, 255, 0)'}}
    
    onClick={ handleLikeButton}>
     
    
  
    <p>Likes {count}</p>
    Like button
  </button>
  </div>

                
                  </div>
                  
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
  
                }
 
export default Display;