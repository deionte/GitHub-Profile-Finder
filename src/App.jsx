import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const result = await fetch(`https://api.github.com/users/${userInput}`);
      const jsonResult = await result.json();
      setUser(jsonResult);
      if (jsonResult.message == "Not Found") {
        toast.error("Please enter a valid username");
      }
    };

    fetchData();
  };

  function UserData() {
    if (user.name !== undefined) {
      return (
        <div className="profile-card">
          <img className="user-profile-img" src={user.avatar_url} />
          <a
            className="user-details user-link"
            href={user.html_url}
            target="_blank"
          >
            @{user.login}
          </a>
          <div className="user-details">Name: {user.name}</div>
          <div className="user-details">Repos: {user.public_repos}</div>
          <div className="user-details">Followers: {user.followers}</div>
          <div className="user-details">Following: {user.following}</div>
        </div>
      );
    } else {
      return (
        <div className="profile-card">
          <p className="user-details">Enter a GitHub username</p>
        </div>
      );
    }
  }

  return (
    <>
      <img
        className="logo"
        src="../GHProfileFinderLogo.png"
        alt="GitHub Profile Finder Logo"
      />

      <div className="search-container">
        <form method="post" onSubmit={handleSubmit} id="search">
          <label>
            <input
              type="text"
              id="site-search"
              size="10px"
              placeholder="Username"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </label>
          <button className="search-button" type="submit">
            <FaSearch></FaSearch>
          </button>
        </form>
      </div>

      <UserData />
    </>
  );
}

export default App;
