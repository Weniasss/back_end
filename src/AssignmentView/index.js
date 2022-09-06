import React, { useEffect, useRef, useState } from "react";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";
import { Navbar } from "../Components/organisms/Navbar";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";

import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Badge,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";

const AssignmentView = () => {
  const user = useUser();
  let name = "";

  if (user.jwt) {
    const decodeJwt = jwt_decode(user.jwt);
    name = decodeJwt.sub;
  }

  let navigate = useNavigate();

  let isAvailable;
  // const [jwt, setJwt] = useLocalState("", "jwt");

  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const [branch, setBranch] = useState("");

  const prevAssignmentValue = useRef(assignment);

  async function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save() {
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);

      // navigate("/Profile");
    } else if (assignment.status === "Project in Progress") {
      updateAssignment("status", assignmentStatuses[4].status);
    } else {
      // assignment.status = assignmentStatuses[1].status;

      persist();
    }
  }

  function persist() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }

  useEffect(() => {
    if (prevAssignmentValue.current.status !== assignment.status) {
      persist();
    }

    prevAssignmentValue.current = assignment;
  }, [assignment]);

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";

        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);

  useEffect(() => {
    console.log(assignmentStatuses);
  }, [assignmentEnums]);

  return (
    <div className="mt-5">
      <Navbar />

      <div>
        <nav aria-label="breadcrumb" className="w p-2 mx-5 bg-opacity-60">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2 bg-gray-100 rounded-lg bg-opacity-40">
              <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
                <p className="text-3xl  text-gray-900 font-normal font-mono  text-left pb-4 ">
                  INFO ABOUT PROJECT{" "}
                </p>
                <p className="text-2xl  text-gray-900 font-normal font-mono  text-left pb-2 border-t-2 border-dashed">
                  Project name :{" "}
                  {assignment.status !== "Pending Submission" ? (
                    <span className="font-bold text-xl">
                      {assignment.branch}
                    </span>
                  ) : (
                    <input
                      type="text"
                      name="name"
                      id="branch"
                      value={assignment.branch}
                      onChange={(e) =>
                        updateAssignment("branch", e.target.value)
                      }
                      placeholder="Write project name . . ."
                      class="w-full my-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  )}
                </p>

                <p className="text-2xl  text-gray-900 font-normal font-mono  text-left pb-2">
                  Technology :{" "}
                  {assignment.status !== "Pending Submission" ? (
                    <span className="font-bold text-xl">
                      {assignment.codeReviewVideoUrl}
                    </span>
                  ) : (
                    <input
                      type="text"
                      name="name"
                      id="codeReviewVideoUrl"
                      value={assignment.codeReviewVideoUrl}
                      onChange={(e) =>
                        updateAssignment("codeReviewVideoUrl", e.target.value)
                      }
                      placeholder="Write techologies . . ."
                      class="w-full my-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  )}
                </p>
                <p className="text-2xl  text-gray-900 font-normal font-mono  text-left pb-2 border-b-2 border-dashed">
                  Description :
                  {assignment.status !== "Pending Submission" ? (
                    <span className="font-bold text-lg">
                      {assignment.description}
                    </span>
                  ) : (
                    <textarea
                      rows="8"
                      id="description"
                      value={assignment.description}
                      onChange={(e) =>
                        updateAssignment("description", e.target.value)
                      }
                      class="my-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your description . . ."
                    ></textarea>
                  )}
                </p>
              </div>
            </div>
            <div class="bg-gray-100 rounded-lg bg-opacity-40">
              <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
                <p className="text-3xl  text-gray-900 font-normal font-mono  text-left pb-4 ">
                  INFO STATUS PROJECT{" "}
                </p>
                <p className="text-2xl  text-gray-900 font-normal font-mono  text-left pb-2 border-t-2 border-dashed">
                  Code status :{" "}
                  <span className="font-bold text-xl text-green-600">
                    {assignment.status}
                  </span>
                </p>

                {assignment.status === "Completed" ? (
                  <p className=" flex text-2xl  text-gray-900 font-normal font-mono  text-left pt-2 p-2">
                    Source code:
                    <a
                      rel="noopener noreferrer"
                      href="https://github.com/Weniasss/ProgramCurrencyCalculator"
                      title="GitHub"
                      className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-13 h-13 "
                      >
                        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                      </svg>
                    </a>
                  </p>
                ) : (
                  <p className=" flex text-2xl  text-gray-900 font-normal font-mono  text-left pt-2 p-2">
                    Source code:{" "}
                    <p className="text-xl ml-5 font-bold text-yellow-400 bg-opacity-40">
                      <FontAwesomeIcon
                        className="mr-4 text-4xl"
                        icon={faClock}
                      />
                    </p>
                  </p>
                )}

                {assignment.status === "Completed" ? (
                  <p className=" flex text-2xl  text-gray-900 font-normal font-mono  text-left pt-2 p-2 border-b-2 border-dashed">
                    Score project:
                    <div className="flex items-center space-x-2 text-yellow-500">
                      <span className="text-xl font-bold"> 4.5 </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current"
                      >
                        <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                      </svg>
                    </div>
                  </p>
                ) : (
                  <p className=" flex text-2xl  text-gray-900 font-normal font-mono  text-left pt-2 p-2">
                    Score project:{" "}
                    <p className="text-xl ml-5 font-bold text-yellow-400 bg-opacity-40">
                      <FontAwesomeIcon
                        className="mr-4 text-4xl"
                        icon={faClock}
                      />
                    </p>
                  </p>
                )}

                {assignment.status === "Pending Submission" ? (
                  <div className="d-flex gap-5">
                    <div className="flex justify-center mt-5">
                      <button
                        class="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring "
                        onClick={() => save()}
                      >
                        <span class="absolute inset-0 border border-stone-600 group-hover:border-green-400"></span>
                        <span class="tracking-widest text-2xl block px-8 py-2 transition-transform bg-stone-600 border border-green-600 group-hover:border-green-500 group-hover:bg-green-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                          Sent Project
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {assignment.status === "Completed" ? (
            <div className="grid grid-cols-5 gap-4">
              <div class="mt-5 bg-gray-100 rounded-lg bg-opacity-40 col-start-2 col-span-3">
                <p className="flex justify-center text-3xl  text-gray-900 font-normal font-mono  text-left pt-4  ">
                  PROJECT REPORT{" "}
                </p>
                <div className="p-5">
                  <p className="text-2xl  text-gray-900 font-normal font-mono  text-left border-t-2 border-dashed pt-2">
                    {assignment.report}
                    <span className="font-bold text-xl text-green-900">
                      {assignment.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : assignment.status === "Project in Progress" &&
            name === "code_reviewer" ? (
            <div className="grid grid-cols-5 gap-4">
              <div class="mt-5 bg-gray-100 rounded-lg bg-opacity-40 col-start-2 col-span-3">
                <p className="flex justify-center text-3xl  text-gray-900 font-normal font-mono  text-left pt-4  ">
                  PROJECT REPORT{" "}
                </p>
                <div className="px-5">
                  <textarea
                    rows="8"
                    id="report"
                    value={assignment.report}
                    onChange={(e) => updateAssignment("report", e.target.value)}
                    class=" my-3 block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your description . . ."
                  ></textarea>
                </div>

                {assignment.status === "Project in Progress" ? (
                  <div className="d-flex gap-5">
                    <div className="flex justify-center mt-5">
                      <button
                        class="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring "
                        onClick={() => save()}
                      >
                        <span class="absolute inset-0 border border-stone-600 group-hover:border-green-400"></span>
                        <span class="tracking-widest text-2xl block px-8 py-2 transition-transform bg-stone-600 border border-green-600 group-hover:border-green-500 group-hover:bg-green-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                          Sent Report
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </nav>
      </div>
    </div>
  );
};

export default AssignmentView;
