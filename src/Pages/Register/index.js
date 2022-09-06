import React, { useState } from "react";
import { useUser } from "../../UserProvider";
import { useLocalState } from "../../util/useLocalStorage";
import { useNavigate } from "react-router-dom";

import ajax from "../../Services/fetchService";

const Register = () => {
  const user1 = useUser();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "vova",
    password: "1234",
  });

  function updatePassword(value) {
    const update = { ...user };
    update.password = value;
    setUser(update);
  }

  function updateName(value) {
    const update = { ...user };
    update.username = value;
    setUser(update);
  }

  function submitComment() {
    const reqBody = {
      username: "vovasss",
      password: 1234,
    };
    const fetchData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };

    if (user1.jwt) {
      fetchData.headers.Authorization = `Bearer ${user1.jwt}`;
    }

    if (reqBody) {
      fetchData.body = JSON.stringify(reqBody);
    }

    return fetch("/api/users", fetchData).then((response) => {
      if (response.status === 200) return response.json();
    });
  }

  return (
    <>
      <section class="text-gray-600 body-font  bg-cover bg-img h-screen">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-6">
            <h1 class="sm:text-7xl text-4xl font-extrabold title-font mb-8 text-gray-900 tracking-widest">
              Sign<span className="text-white">Up </span>
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto ">
            <div class="grid items-center justify-center">
              <div class="p-4  w-2/2">
                <div class="relative">
                  <label
                    for="name"
                    class="leading-7 text-1xl font-semibold text-gray-600"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={user.username}
                    //   onChange={(e) => updateName(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-4 w-2/2">
                <div class="relative">
                  <label
                    for="name"
                    class="leading-7 text-1xl font-semibold text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    //   onChange={(e) => updatePassword(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className=" flex justify-center gap-8 pt-5">
                <button
                  class="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring "
                  onClick={() => submitComment()}
                >
                  <span class="absolute inset-0 border border-stone-600 group-active:border-stone-500"></span>
                  <span class="tracking-widest text-2xl block px-10 py-3 transition-transform bg-stone-600 border border-stone-600 active:border-stone-500 active:bg-stone-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                    Sign Up
                  </span>
                </button>
              </div>
              <a onClick={() => navigate("/login")}>Log In</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
//rsc
export default Register;
