"use client";

import React,{useEffect} from "react";
import qs from "query-string";
import axios from "axios";


export  function Test() {

    const url = qs.stringifyUrl({
        url: "/api/server-fetch",
        query: {
            page: 1,
            limit: 5,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(url);
                console.log(response.data);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
        <h1>Test</h1>
        </div>
    );
    }