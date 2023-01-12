import React from "react";
import { useTitle } from "../../hooks/useTitle";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const Blogs = () => {
  useTitle("Blogs");
  return (
    <div className="gap-5 flex flex-col p-5 max-w-2xl mx-auto mt-20">
      {/* 1st question */}
      <div tabindex="0" class="collapse">
        <input type="checkbox" defaultChecked />
        <div class="collapse-title text-xl font-medium bg-base-300 text-left flex justify-between items-center">
          What are the different ways to manage a state in a React application?{" "}
          <IoMdArrowDropdownCircle />
        </div>
        <div class="collapse-content">
          <p className="mt-5 text-justify">
            There are four main types of state you need to properly manage in.
            They are named below : your React apps: Local state, Global state,
            Server state, URL state
          </p>
        </div>
      </div>
      {/* 2nd question */}

      <div tabindex="0" class="collapse">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium bg-base-300 text-left flex justify-between items-center">
          How does prototypical inheritance work? <IoMdArrowDropdownCircle />
        </div>
        <div class="collapse-content">
          <p className="mt-5 text-justify">
            Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
            Traditionally, in order to get and set the [[Prototype]] of an
            object, we use Object.getPrototypeOf and Object.
          </p>
        </div>
      </div>
      {/* 3rd question */}

      <div tabindex="0" class="collapse">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium bg-base-300 text-left flex justify-between items-center">
          What is a unit testing? Why should we write unit testing?{" "}
          <IoMdArrowDropdownCircle />
        </div>
        <div class="collapse-content">
          <p className="mt-5 text-justify">
            Unit Testing is a type of software testing where individual units or
            components of a software are tested. The purpose is to validate that
            each unit of the software code performs as expected. Unit Testing is
            done during the development (coding phase) of an application by the
            developers. Unit Tests isolate a section of code and verify its
            correctness. A unit may be an individual function, method,
            procedure, module, or object.
          </p>
        </div>
      </div>

      {/* 4th question */}

      <div tabindex="0" class="collapse">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium bg-base-300 text-left flex justify-between items-center">
          React vs Angular vs Vue differences? <IoMdArrowDropdownCircle />
        </div>
        <div class="collapse-content">
          <p className="mt-5 text-justify">
            To capture all changes to the DOM, Angular.js creates a watcher for
            each binding. Every time the view updates, the new values compare
            with the old ones. This can end up in poorer performance in large
            mobile applications. Because React uses a virtual DOM, when the view
            is modified, the new DOM compares it to the virtual DOM and changes
            accordingly. Vue.js has better performance thanks to the virtual
            DOM, which is useful for complicated programs. It may be as little
            as 20KB while maintaining its speed and versatility, allowing it to
            achieve considerably better performance than competing frameworks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
