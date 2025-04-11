import React from "react";
import FetchExample from "./FetchExample";
import AxiosExample from "./AxiosExample";
import EmployeeApp from "./EmployeeApp";
import Todo from "./Todo";
import SearchFilter from "./SearchFilter";
import Loading from "./Loading";
import ThemeToggle from "./ToggleTheme/ToggleTheme";  
import DebouncedSearch from "./DebouncedSearch";
import MultiStepForm from "./MultiStepForm";
import DynamicTabs from "./DynamicTabs";
import PaginatedUsers from "./PaginatedUsers";
import LoginForm from "./LoginForm";
import UserList from "./Redux/features/users/UserList";
import Navbar from "./React-router-dom/Navbar";
import Home from "./React-router-dom/Home";
import Contact from "./React-router-dom/Contact";
import About from "./React-router-dom/About";
import User from "./React-router-dom/User";
import { Route, Routes } from "react-router-dom";
import InfiniteScrolling from "./InfiniteScrolling/InfiniteScrolling";

const App = () => {
  return (
    <>

{/* <DynamicTabs /> */}
{/* <ThemeToggle /> */}
{/* <DebouncedSearch /> */}
{/* <MultiStepForm /> */}
{/* <Loading /> */}
{/* <SearchFilter /> */}
{/* <Todo /> */}
{/* <EmployeeApp /> */}
{/* <FetchExample /> */}
{/* <LoginForm /> */}
{/* <UserList /> */}
{/* <PaginatedUsers /> */}
{/* <AxiosExample /> */}



{/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>*/}
    <InfiniteScrolling />
    </> 
  );
};

export default App;
