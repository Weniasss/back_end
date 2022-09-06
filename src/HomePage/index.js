import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/organisms/Navbar";
import { Hero } from "../Components/organisms/Hero";
import { Title } from "../Components/atoms/Title";
import { ServiceSection } from "../Components/organisms/ServiceSection";
import { StepSection } from "../Components/organisms/StepSection";
import { ExampleProjectsSection } from "../Components/organisms/ExampleProjectsSection";
import { StatsSection } from "../Components/organisms/StatsSection";
import { FooterSection } from "../Components/organisms/FooterSection";
import { ButtonCustom } from "../Components/atoms/Button";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";
const HomePage = () => {
  const user = useUser();
  const [comment, setComment] = useState({
    text: "",
    user: user.jwt,

  });

  function updateComment(value){
    const commentCopy = {...comment}
    commentCopy.text = value;
    setComment(commentCopy);

  }

  useEffect(() => {
    console.log("zzzz");
  }, [comment])

  function submitComment() {
    ajax("/api/comments", "POST", user.jwt, comment).then((data) => {
      console.log(data);
    });
  }

  return (
    <div>
      <Hero />

      <Title text="Services" />

      <ServiceSection />

      <Title text="Steps" />

      <StepSection />

      <StatsSection />

      <Title text="Example Projects" />

      <ExampleProjectsSection />

      {/* <Title text="Reviews"/> */}

      <div className="mt-4">
        <h1>add coment</h1>
        <input className="w-1/2 border-slate-100" onChange={(e) => updateComment(e.target.value)}>
          {/* onChange={setComment} */}
          {/* onChange={setComment} */}
        </input>

        <button className="bg-slate-50" onClick={() => submitComment()}>
          Post comment{" "}
        </button>
      </div>

      <FooterSection />
    </div>
  );
};

export default HomePage;
