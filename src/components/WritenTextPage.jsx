import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

function WritenTextPage() {
    const gotToken = localStorage.getItem("authToken");
    const [writtenText, setWrittenText] = useState("");
    const [fetching, setFetching] = useState(true);

    useEffect(() => {                               
    axios
        .get("http://localhost:5005/auth/write",
        {
            headers: { authorization: `Bearer ${gotToken}` }
          })
        .then((response) => {
            const { text } = response.data;
            setWrittenText(text);  
            setFetching(false);
        });
    
    }, [] );

    return (
        <Layout>
            <div>
                Written text:
                {fetching ? <p>Loading ...</p> : <p>{writtenText}</p>}
            

            </div>
    </Layout>
    )
    }

    export default WritenTextPage;
