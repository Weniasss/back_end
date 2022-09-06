import React, { useEffect } from "react";
import { useLocalState } from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import { Button, Card, Row, Col, Badge, Container } from "react-bootstrap";

import { Navbar } from "../Components/organisms/Navbar";

const CodeReviwerDashboard = () => {

  let navigate = useNavigate();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);


	function editReview(assignment){
		window.location.href = `/assignments/${assignment.id}`;
	}

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, []);

  function createAssigment() {
    ajax("api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
  }

  function claimAssignment(assignment) {
    const decodeJwt = jwt_decode(jwt);
    const user = {
      username: decodeJwt.sub,
      authorities: decodeJwt.authorities,
    };

    assignment.codeReviewer = user;

    assignment.status = "Project in Progress";

    ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updateAssignment) => {
        const assignmentsCopy = [...assignments];
        const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
        assignmentsCopy[i] = updateAssignment;
        setAssignments(assignmentsCopy);
      }
    );
  }

  return (
    <Container>
      
      <Navbar/>

      {/* <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row> */}

      <h1 className="mb-5">Code Reviewer</h1>

      <br></br>

      <div className="assignment-wrapper  submitted">
        <div className="assignment-wrapper-title h3 px-2">Awaiting Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Submitted")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Submitted")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assigment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <Badge pill style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <Card.Text className="mt-1">
                      <p>GitHub URL: {assignment.githubUrl}</p>
                      <p>Branch: {assignment.branch}</p>
                    </Card.Text>

                    <Button
                      onClick={() => {
                        claimAssignment(assignment);
                      }}
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <>
            <p>No assignments found</p>
          </>
        )}
      </div>

      <br></br>

		<div className="assignment-wrapper  in-review">
        <div className="assignment-wrapper-title h3 px-2">In Review</div>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "Project in Progress")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Project in Progress")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assigment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <Badge pill bg="warning" style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <Card.Text className="mt-1">
                      <p>GitHub URL: {assignment.githubUrl}</p>
                      <p>Branch: {assignment.branch}</p>
                    </Card.Text>


						  <Button
                      variant="warning"
                      onClick={() => {
                        editReview(assignment);
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <>
            <p>No assignments found</p>
          </>
        )}
      </div>

		<br></br>

      <div className="assignment-wrapper  needs-update">
        <div className="assignment-wrapper-title h3 px-2">Finished Projects</div>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "Completed")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Completed")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assigment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <Badge pill bg="success" style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <Card.Text className="mt-1">
                      <p>GitHub URL: {assignment.githubUrl}</p>
                      <p>Branch: {assignment.branch}</p>
                    </Card.Text>

                    <Button
                      variant="success"
                      onClick={() => {
                        claimAssignment(assignment);
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <>
            <p>No assignments found</p>
          </>
        )}
      </div>

      <br></br>

    
      <div className="assignment-wrapper  needs-update">
        <div className="assignment-wrapper-title h3 px-2">Сancelled projects</div>

        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <Card key={assignment.id} style={{ width: "18rem" }}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assigment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <Badge pill bg="danger" style={{ fontSize: "1em" }}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <Card.Text className="mt-1">
                      <p>GitHub URL: {assignment.githubUrl}</p>
                      <p>Branch: {assignment.branch}</p>
                    </Card.Text>

                    <Button
                      variant="danger"
                      onClick={() => {
                        claimAssignment(assignment);
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <>
            <p>No assignments found</p>
          </>
        )}
      </div>
      {/* <button onClick={() => createAssigment()}>Submit new Assigment</button> */}
    </Container>
  );
};

export default CodeReviwerDashboard;

//rsc
