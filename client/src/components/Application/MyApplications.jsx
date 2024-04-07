import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModel from "./ResumeModel";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [status,setStatus] = useState("Pending");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const handleStatusUpdate = (id) => {
    axios
      .put(
        `http://localhost:4000/application/update/${id}`,
        { status
        },
        { withCredentials: true }
      )
      .then((res) => {
        // Handle success response
        console.log(res.data);
      })
      .catch((error) => {
        // Handle error response
        console.log(error.response.data.message);
      });
  };

  const handleStatusChange = (e,id) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    handleStatusUpdate(id);
  };
  useEffect(() => {
    try {
      // console.log(user);
      if (user && user.role === "Company") {
        // console.log("hello");
        axios
          .get("http://localhost:4000/application/company/jobapp", {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data.applications);
            setApplications(res.data.applications);
          });
      }
    // console.log(user.role);
      if(user && user.role === "Student") {
        // console.log("hello");
        axios
          .get("http://localhost:4000/application/my", {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data.applications);
            setApplications(res.data.applications);

          })
          .catch((error)=>{
            console.log(error);
          }) ;
      }

      if (user && user.role === "Tnp") {
        // console.log("hello");
        axios
          .get("http://localhost:4000/application/tnp/allapp", {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data.applications);
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, setStatus]);

  if (!isAuthorized) {
    navigateTo("/");
  }
  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <section className="my_applications page">
      {user && user.role === "Student" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <></>
      )}
      {user && user.role ==="Company" ? (
          <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                  
                />
              );
            })
          )}
        </div>
        ):(
          <></>
        )
      }
      {modalOpen && (
        <ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />
      )}

      {user && user.role === "Tnp" ? (
        <div className="container">
          <h1>{user.institute} Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <TnpCard
                  element={element}
                  key={element._id}
                />
              );
            })
          )}
        </div>
      ) : (
        <></>
      )}
    </section>
    </>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>Company:</span> {element.name}
          </p>
        </div>
        <div className="resume">
            <a href={element.resume.url} target="_blank">
                Resume
            </a>
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
        <div >
        <button className={element.status}>
          {element.status}
        </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
        </div>
        <div className="resume">
          <a href={element.resume.url} target="_blank">
            Resume
          </a>
        </div>
        <div>
          <select
            className={element.status}
            value={element.status}
            onChange={(e) => {
              const newStatus = e.target.value;
              // // TODO: Update the status in the backend using an API call
              axios
                .put(
                  `http://localhost:4000/application/update/${element._id}`,
                  { status: newStatus },
                  { withCredentials: true }
                )
                .then((res) => {
                  // Handle success response
                  setStatus(newStatus);
                  console.log(res.data);
                })
                .catch((error) => {
                  // Handle error response
                  console.log(error.response.data.message);
                });
            }}
          >
            <option value="Pending">Pending</option>
            <option value="Selected">Selected</option>
            <option value="Not Selected">Not Selected</option>
          </select>
        </div>
      </div>
    </>
  );
};

const TnpCard = ({ element, key }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
        </div>
        <div className="resume">
            <a href={element.resume.url} target="_blank">
                Resume
            </a>
        </div>
        <div >
          <button className={element.status}>
            {element.status}
          </button>
        </div>
      </div>
    </>
  );
};