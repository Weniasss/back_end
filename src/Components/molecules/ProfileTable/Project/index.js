import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../StatusBadge";
import { Button } from "react-bootstrap";
import ajax from "../../../../Services/fetchService";
import jwt_decode from "jwt-decode";
import { useLocalState } from "../../../../util/useLocalStorage";
import { useState } from "react";

export const Project = (props) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);
  const navigate = useNavigate();

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
    <tr>
      <td class="p-4 font-medium text-gray-900 whitespace-nowrap">
        Project # {props.number}
      </td>
      <td class="p-4 text-gray-700 whitespace-nowrap">{props.branch}</td>
      <StatusBadge text={props.status} />

      <td class="p-4 whitespace-nowrap space-x-5">
        {props.statusUser === "code_reviewer" &&
        props.status === "Submitted" ? (
          <Button
            onClick={() => {
            //   claimAssignment(assignment);
            }}
          >
            Claim
          </Button>
        ) : (
          <Button
            className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded text-xs font-medium"
            onClick={() => {
              navigate(`/assignments/${props.id}`);
            }}
          >
            Read More
          </Button>
        )}
      </td>
    </tr>
  );
};
