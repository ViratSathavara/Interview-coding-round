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
<UserList />
{/* <PaginatedUsers /> */}
{/* <AxiosExample /> */}
    </  >
  );
};

export default App;
