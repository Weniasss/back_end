import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/organisms/Navbar";

import { useLocalState } from "../util/useLocalStorage";
import { Button, Card, Row, Col, Badge } from "react-bootstrap";

import { useState, useEffect } from "react";
// import { useState } from "react";
import ajax from "../Services/fetchService";

import jwt_decode from "jwt-decode";
import { ButtonCustom } from "../Components/atoms/Button";
import StatusBadge from "../Components/molecules/StatusBadge";
import { useUser } from "../UserProvider";
import { HeaderTable } from "../Components/molecules/HeaderTable";
import { Project } from "../Components/molecules/ProfileTable/Project";
import { TitleTable } from "../Components/molecules/ProfileTable/TitleTable";

export const UserProfilePage = () => {
  const user = useUser();

  const navigate = useNavigate();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);
  const [query, setQuery] = useState("");

  let name = "";

  if (user.jwt) {
    const decodeJwt = jwt_decode(user.jwt);
    name = decodeJwt.sub;
  }

  function createAssigment() {
    ajax("api/assignments", "POST", user.jwt).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  }

  useEffect(() => {
    ajax("api/assignments", "GET", user.jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
      console.log(user.jwt);
    });
  }, []);

  function claimAssignment(assignment) {
    const decodeJwt = jwt_decode(user.jwt);
    const user1 = {
      username: decodeJwt.sub,
      authorities: decodeJwt.authorities,
    };

    assignment.codeReviewer = user1;

    assignment.status = "Project in Progress";

    ajax(`/api/assignments/${assignment.id}`, "PUT", user.jwt, assignment).then(
      (updateAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updateAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }
  console.log(query)

  return (
    <div>
      <Navbar />

      <nav aria-label="breadcrumb" className="w p-2 mx-5 bg-opacity-60">
        <div class="grid grid-cols-3 gap-x-10">
          <div class="col-span-1  bg-gray-100 rounded-lg bg-opacity-40 max-h-80 ml-5">
            <div className="mb-5 text-4xl tracking-widest grid place-items-center p-5 ">
              <p className="text-3xl  text-gray-900 font-normal font-mono  text-left  flex">
                Hello , {name} !
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-36 w-36 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div class="col-span-2 row-span-1 bg-gray-100 rounded-lg bg-opacity-40 mr-5">
            <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
              <p className="text-3xl  text-gray-900 font-normal font-mono  text-left pb-4 flex">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>{" "} */}
                Statistic
              </p>
              <p className="text-2xl  text-gray-900 font-normal font-mono  text-left pb-2 border-t-2 border-dashed">
                User Name : <span className="font-bold text-xl ">{name}</span>
              </p>
              <p className="text-2xl  text-gray-900 font-normal font-mono  text-left pb-2">
                User Email :{" "}
                <span className="font-bold text-xl ">233299@edu.p.lodz.pl</span>
              </p>
            </div>
          </div>
        </div>
      </nav>

      {name !== "code_reviewer" ? (
        <div className="mx-16 my-5">
          <button
            class="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring "
            onClick={() => createAssigment()}
          >
            <span class="absolute inset-0 border border-stone-600 group-active:border-stone-500"></span>
            <span class="tracking-widest text-2xl block px-10 py-3 transition-transform bg-stone-600 border border-stone-600 active:border-stone-500 active:bg-stone-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
              Create New Project
            </span>
          </button>
        </div>
      ) : (
        <></>
      )}

      {name !== "code_reviewer" ? (
        <div>
          <div class="grid grid-cols-4 gap-4 mx-12 my-5 ">
            <div className="col-span-2"></div>
            <div>
              <h1 className="text-2xl text-right">Filter projects</h1>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search..."
                onChange={e=> setQuery(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div class="col-span-2 row-span-2 bg-gray-100 rounded-lg bg-opacity-40  mx-12">
            <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
              <TitleTable title="Projects" />

              <div class="overflow-x-auto">
                <table class="min-w-full text-sm divide-y divide-gray-200">
                  <HeaderTable />

                  <tbody class="divide-y divide-gray-100">
                    {assignments ? (
                      <>
                        {assignments.filter(assignment=>assignment.branch.toLowerCase().includes(query)).map((assignment) => (
                          <Project
                            number={assignment.number}
                            branch={assignment.branch}
                            status={assignment.status}
                            
                            id={assignment.id}
                          />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div class="col-span-2 row-span-2 bg-gray-100 rounded-lg bg-opacity-40  mx-12">
            <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
              <TitleTable title="Project Submitted" />

              <div class="overflow-x-auto">
                <table class="min-w-full text-sm divide-y divide-gray-200">
                  <HeaderTable />

                  <tbody class="divide-y divide-gray-100">
                    {assignments ? (
                      <>
                        {assignments
                          .filter(
                            (assignment) => assignment.status === "Submitted"
                          )
                          .map((assignment) => (
                            <tr>
                              <td class="p-4 font-medium text-gray-900 whitespace-nowrap">
                                Project # {assignment.number}
                              </td>
                              <td class="p-4 text-gray-700 whitespace-nowrap">
                                {assignment.branch}
                              </td>
                              <StatusBadge text={assignment.status} />

                              <td class="p-4 whitespace-nowrap space-x-5">
                                {name === "code_reviewer" &&
                                assignment.status === "Submitted" ? (
                                  <Button
                                    onClick={() => {
                                      claimAssignment(assignment);
                                    }}
                                  >
                                    Claim
                                  </Button>
                                ) : (
                                  <Button
                                    className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded text-xs font-medium"
                                    onClick={() => {
                                      navigate(`/assignments/${assignment.id}`);
                                    }}
                                  >
                                    Read More
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-span-2 row-span-2 bg-gray-100 rounded-lg bg-opacity-40  mx-12">
            <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
              <TitleTable title="Project In Progress" />

              <div class="overflow-x-auto">
                <table class="min-w-full text-sm divide-y divide-gray-200">
                  <HeaderTable />

                  <tbody class="divide-y divide-gray-100">
                    {assignments ? (
                      <>
                        {assignments
                          .filter(
                            (assignment) =>
                              assignment.status === "Project in Progress"
                          )
                          .map((assignment) => (
                            <Project
                              number={assignment.number}
                              branch={assignment.branch}
                              status={assignment.status}
                              id={assignment.id}
                            />
                          ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-span-2 row-span-2 bg-gray-100 rounded-lg bg-opacity-40  mx-12">
            <div className="mb-5 text-4xl tracking-widest grid place-items-left p-5 ">
              <TitleTable title="Finishing Projects" />

              <div class="overflow-x-auto">
                <table class="min-w-full text-sm divide-y divide-gray-200">
                  <HeaderTable />

                  <tbody class="divide-y divide-gray-100">
                    {assignments ? (
                      <>
                        {assignments
                          .filter(
                            (assignment) => assignment.status === "Completed"
                          )
                          .map((assignment) => (
                            <Project
                              number={assignment.number}
                              branch={assignment.branch}
                              status={assignment.status}
                              id={assignment.id}
                            />
                          ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
