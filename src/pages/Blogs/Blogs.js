import React from "react";
import { useTitle } from "../../hooks/useTitle";

const Blogs = () => {
  useTitle("Blogs");
  return (
    <div className="gap-5 flex flex-col p-5 max-w-2xl mx-auto">
      <div tabindex="0" class="collapse">
        <input type="checkbox" defaultChecked/>
        <div class="collapse-title text-xl font-medium bg-base-300">
          What are different ways to manage a state in a React application?
        </div>
        <div class="collapse-content">
          <p>
            There are four main types of state you need to properly manage in
            your React apps: Local state, Global state, Server state, URL state
          </p>
        </div>
      </div>
      <div tabindex="0" class="collapse">
        <input type="checkbox"/>
        <div class="collapse-title text-xl font-medium bg-base-300">
          What are different ways to manage a state in a React application?
        </div>
        <div class="collapse-content">
          <p>
            There are four main types of state you need to properly manage in
            your React apps: Local state, Global state, Server state, URL state
          </p>
        </div>
      </div>
      <div tabindex="0" class="collapse">
        <input type="checkbox"/>
        <div class="collapse-title text-xl font-medium bg-base-300">
          What are different ways to manage a state in a React application?
        </div>
        <div class="collapse-content">
          <p>
            There are four main types of state you need to properly manage in
            your React apps: Local state, Global state, Server state, URL state
          </p>
        </div>
      </div>
      <div tabindex="0" class="collapse">
        <input type="checkbox"/>
        <div class="collapse-title text-xl font-medium bg-base-300">
          What are different ways to manage a state in a React application?
        </div>
        <div class="collapse-content">
          <p>
            There are four main types of state you need to properly manage in
            your React apps: Local state, Global state, Server state, URL state
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
