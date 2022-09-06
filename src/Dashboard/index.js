import React, { useEffect } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Navbar } from "../Components/organisms/Navbar";

import { useState } from "react";
import { Link } from "react-router-dom";
import ajax from "../Services/fetchService";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, Row, Col, Badge } from "react-bootstrap";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

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
  const navigate = useNavigate();


  return (
    <div className="m-5">
      <Row>
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
      </Row>

      <div className="mb-5 text-center">
        <Button size="lg" onClick={() => createAssigment()}>
          Submit New Assignment
        </Button>
      </div>

      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
        >
          {assignments.map((assignment) => (
            // <Col>
            <Card key={assignment.id} style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assigment #{assignment.number}</Card.Title>
                <div className="d-flex align-items-start">
                  <Badge
                    pill
                    bg={assignment.status === "Completed" ? "success" : "info"}
                    // className="alig-items-start"
                    style={{ fontSize: "1em" }}
                  >
                    {assignment.status}
                  </Badge>
                </div>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle> */}
                <Card.Text className="mt-1">
                  <p>GitHub URL: {assignment.githubUrl}</p>
                  <p>Branch: {assignment.branch}</p>
                </Card.Text>

                <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
            // </Col>
          ))}
        </div>
      ) : (
        <></>
      )}
      {/* <button onClick={() => createAssigment()}>Submit new Assigment</button> */}


    </div>
  );
};

export default Dashboard;

//rsc
