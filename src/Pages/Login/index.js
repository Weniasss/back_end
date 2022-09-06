import React, { useState } from "react";
import { useUser } from "../../UserProvider";
import { useLocalState } from "../../util/useLocalStorage";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const user = useUser();

  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => Promise.all([response.json(), response.headers]))
      .then(([body, headers]) => {
        user.setJwt(headers.get("authorization"))
        navigate("/Profile");
      });

  }

  return (
    <>
      <section class="text-gray-600 body-font  bg-cover bg-img h-screen">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-6">
            <h1 class="sm:text-7xl text-4xl font-extrabold title-font mb-8 text-gray-900 tracking-widest">
              Log<span className="text-white">In </span>
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className=" flex justify-center gap-8 pt-5">
                <button
                  class="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring "
                  onClick={() => sendLoginRequest()}
                >
                  <span class="absolute inset-0 border border-stone-600 group-active:border-stone-500"></span>
                  <span class="tracking-widest text-2xl block px-10 py-3 transition-transform bg-stone-600 border border-stone-600 active:border-stone-500 active:bg-stone-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                    Log In
                  </span>
                </button>
              </div>
              <a
                onClick={() => navigate("/signUp")}
              >Sign up</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
//rsc
export default Login;
