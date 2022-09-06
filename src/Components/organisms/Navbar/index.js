import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserProvider";
import { useLocalState } from "../../../util/useLocalStorage";

export const Navbar = () => {
  const navigate = useNavigate();

  const user = useUser();

  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div>
      <nav class="bg-white shadow dark:bg-gray-800 mb-10">
        <div class="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <a
            onClick={() => navigate("/")}
            class="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-gray-200 border-b-2 border-stone-500 mx-1.5 sm:mx-6"
          >
            home
          </a>

          <a
            onClick={() => navigate("/addEmployee")}
            href=""
            class="text-2xl font-bold border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-stone-500 mx-1.5 sm:mx-6"
          >
            Services
          </a>

          <a
            onClick={() => navigate("/privacyPolicy")}
            href="#"
            class="text-2xl font-bold border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-stone-500 mx-1.5 sm:mx-6"
          >
            Example Projects
          </a>
          {user.jwt ? (
            <a
              onClick={() => navigate("/Profile")}
              href="#"
              class="text-2xl font-bold border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-stone-500 mx-1.5 sm:mx-6"
            >
              User profile
            </a>
          ) : (
            <></>
          )}

          {!user.jwt ? (
            <a
              onClick={() => navigate("/logIn")}
              class="text-2xl font-bold border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-stone-500 mx-1.5 sm:mx-6"
            >
              Log in
            </a>
          ) : (
            <></>
          )}

          {!user.jwt ? (
            <a
              onClick={() => navigate("/logIn")}
              class="text-2xl font-bold border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-stone-500 mx-1.5 sm:mx-6"
            >
              Sign up
            </a>
          ) : (
            <></>
          )}

          {user.jwt ? (
            <a
              onClick={() => navigate("/logIn")}
              class="text-2xl font-bold border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-stone-500 mx-1.5 sm:mx-6"
            >
              Log out
            </a>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
};
