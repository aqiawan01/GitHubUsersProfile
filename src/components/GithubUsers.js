import React, { useEffect, useState } from 'react';
const url = "https://api.github.com/users";

const GithubUsers = () => {
  const [users, SetUsers] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(false);

  const getUsers = async () => {
    SetIsLoading(true);
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Something went wrong.")
        }
        const data = await response.json();
        SetUsers(data);
        SetIsLoading(false);
    } catch (err) {
        SetError(true);
    }
   
  };
  useEffect(() => {
    getUsers()
  }, []);
  return (
    <div className="--bg-primary --py2">
       <div className="container">
        <header>
            <h1 className="--text-center --text-light">Github Users</h1>
            <div className="--line"></div>
        </header>
        {isLoading && (
           <div>
           {/* Loading Skeleton */}
           <div className="--skeleton --card --bg-light --p --flex-start">
             <div className="--profile-img --skeleton"></div>
             <div>
               <div className="--skeleton --text-light --text-small"></div>
               <div className="--skeleton --text-light --text-small"></div>
             </div>
           </div>
           <div className="--skeleton --card --bg-light --p --flex-start">
             <div className="--profile-img --skeleton"></div>
             <div>
               <div className="--skeleton --text-light --text-small"></div>
               <div className="--skeleton --text-light --text-small"></div>
             </div>
           </div>
           {/* Repeat the skeleton structure for each user */}
         </div>
        )}
        <div className="--grid-25 --py">
            {error ? (<h4 className="--text-light">Something went wrong</h4>) : (
                 users.map((user) => {
                    const {id, login, avatar_url, html_url} = user;
                    return (
                        <div key={id} className="--card --bg-light --p --flex-start">
                        <img src={avatar_url} alt="image" className="--profile-img --mx" />
                        <span>
                            <h4>{login}</h4>
                            <a href={html_url} target="_blank">View Profile</a>
                        </span>
                    </div>
                    )
                })
            )}
            {}
            
        </div>
       </div>
    </div>
  )
}

export default GithubUsers