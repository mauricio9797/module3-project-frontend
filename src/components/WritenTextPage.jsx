import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";
import MiniNavBar from "./MiniNavBar";
import { Link } from "react-router-dom";
import loadingImage from "../img/loading.gif";
import { useParams } from "react-router-dom";

function WritenTextPage() {
  const gotToken = localStorage.getItem("authToken");
  const [writtenText, setWrittenText] = useState("");
  const [fetching, setFetching] = useState(true);
  const { recordId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/write/${recordId}`, {
        headers: { authorization: `Bearer ${gotToken}` },
      })
      .then((response) => {
        const { text } = response.data;
        setWrittenText(text);
        setFetching(false);
      });
  }, [gotToken, recordId]);

  return (
    <Layout>
      <MiniNavBar />
      <div className="WrittenTextPage"> 
        <h1>Written text</h1>
        <div className="text-div">
         {fetching ? <img className="loading-gif" src={loadingImage} alt="loading"/> : <p>{writtenText}</p>}
        </div>

        <Link to="/display"><button className="pink-button"> See all texts </button></Link>
      </div>
    </Layout>
  );
}

export default WritenTextPage;
