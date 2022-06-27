import './App.css';
import React from 'react'
import MakeNavbar from './component/navigation/navbar';
import { Route, Routes } from 'react-router-dom';
import MakeLandingPage from './page/landing-page';
import MakeSignUp from './page/signup-page';
import MakeSignIn from './page/signin-page';
import { CurrentUserProvider } from './config/CurrentUserContext';
import MakeHomeNavigation from './component/navigation/homeNavigation';
import MakeHome from './page/home-page';
import MakeKanban from './page/kanban-page';
import MakeWorkspaceNavigation from './component/navigation/workspaceNavigation';

function MakeMyWorkspace() {
  return (
    <CurrentUserProvider>
      <div>
        <MakeNavbar />
        <div className=" flex">
          <MakeHomeNavigation />
          <div className="p-14 justify-center">
            <MakeHome />
          </div>
        </div>
      </div>
    </CurrentUserProvider>
  )
}

function MakeMyBoards() {
  return (
    <CurrentUserProvider>
      <div>
        <MakeNavbar />
        <div className=" flex">
          <MakeWorkspaceNavigation />
        </div>
      </div>
    </CurrentUserProvider>
  )
}

function MakeMyKanban(){
  return(
    <CurrentUserProvider>
      <div>
        <MakeNavbar />
        <div>
          <MakeKanban />
        </div>
      </div>
    </CurrentUserProvider>
  )
}

function App() {
  return (
    // <MakeKanban />
    <Routes>
      <Route path="/" element={MakeLandingPage()}></Route>
      <Route path="/sign-up" element={MakeSignUp()}></Route>
      <Route path="/sign-in" element={MakeSignIn()}></Route>
      <Route path="/my-workspace" element={MakeMyWorkspace()}></Route>
      <Route path="/w/:wID" element={MakeMyBoards()}></Route>
      <Route path="/w/:wID/b/:bID" element={MakeMyKanban()}></Route>
      <Route path="/testing" element={MakeMyKanban()}></Route>
    </Routes>
  );
}

export default App;
