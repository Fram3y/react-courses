import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Import Pages
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";

import { Index as CoursesIndex } from "./pages/courses/Index";
import { Show as CourseShow } from "./pages/courses/Show";
import { Edit as CourseEdit } from "./pages/courses/Edit";
import { Create as CourseCreate } from "./pages/courses/Create";

import { Index as LecturerIndex } from "./pages/lecturers/Index";
import { Create as LecturerCreate } from "./pages/lecturers/Create";
import { Edit as LecturerEdit } from "./pages/lecturers/Edit";

import { Index as EnrolmentIndex } from "./pages/enrolments/Index";
import { Create as EnrolementCreate } from "./pages/enrolments/Create";
import { Show as EnrolementShow } from "./pages/enrolments/Show";
import { Edit as EnrolementEdit } from "./pages/enrolments/Edit";

import { PageNotFound } from "./pages/PageNotFound";

// Import Components
import { Navbar } from "./components/Navbar";

function App() 
{
  const [authenticated, setAuthenticated] = useState(false);

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      setAuthenticated(true);
    }
  }, [])

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if(auth){
      localStorage.setItem('token', token);
    }
    else {
      localStorage.removeItem('token');
    }
  };

  if(authenticated){
    protectedRoutes = (
      <>
        <Route path="/courses/create" element={<CourseCreate/>} />
        <Route path="/courses/:id/edit" element={<CourseEdit/>} />
        <Route path="/courses/:id" element={<CourseShow/>} />

        <Route path="/lecturers/create" element={<LecturerCreate/>} />
        <Route path="/lecturers/:id/edit" element={<LecturerEdit />} />

        <Route path="/enrolments/create" element={<EnrolementCreate/>} />
        <Route path="/enrolments/:id" element={<EnrolementShow/>} />
        <Route path="/enrolments/:id/edit" element={<EnrolementEdit/>} />
      </>
    );
  } 

  return (
    <BrowserRouter>
    <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated}/>
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/courses" element={<CoursesIndex authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>
        <Route path="/lecturers" element={<LecturerIndex authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>
        <Route path="/enrolments" element={<EnrolmentIndex authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/>
        {protectedRoutes}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
