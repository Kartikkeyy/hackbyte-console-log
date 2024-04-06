import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import data from "./data.js";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

//   This useeffect will run whenever the page will get refreshed.
  useEffect(() => {
    let apiUrl;
    if (user.role === "Student" || user.role === "Tnp" ) {
      apiUrl = "http://localhost:4000/job/instjob";
    } else{
      apiUrl = "http://localhost:4000/job/companyseeall";
    }
    try {
      axios
        .get(apiUrl, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ONGOING JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <p>{element.institute}</p>
                  <Link to={`/job/instjob/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;