import React from "react";

const StatusBadge = (props) => {
  const { variant, text } = props;

  function getColorOfBadge() {
	if(text === "Completed"){
		return "bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium";
	}
	else if (text === "In Review") {
		return "bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded text-xs font-medium";
	} else if(text === "Pending Submission") {
		return "bg-blue-100 text-blue-700 px-3 py-1.5 rounded text-xs font-medium";
	} else if(text === "Submitted"){
		return "bg-pink-100 text-pink-700 px-3 py-1.5 rounded text-xs font-medium";

	}
  }

  return (
    <td class="p-4 text-gray-700 whitespace-nowrap">
      <strong 
		className={getColorOfBadge()}
		class="px-3 py-1.5 rounded text-xs font-medium">
        {text}
      </strong>
    </td>
  );
};

export default StatusBadge;
