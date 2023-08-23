import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
    query GetUserInfo($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

interface MatchedUser {
    username: string;
    submitStats: {
        difSubmissionNum: {
            difficulty: string;
            count: number;
            submissions: number;
        }[];
    };
}

function Leaderboard() {
    const [username, setUsername] = useState('');
    const { loading, error, data } = useQuery<MatchedUser>(GET_USER_INFO, {
        variables: { username },
        skip: username === ''
    });

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    if (loading) return <span>..loading</span>;
    if (error) return <span>Error: {error.message}</span>;


    return (
        <div>
            <h1>Leaderboard</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Enter a username"
                />
                <button type="submit">Get Info</button>
            </form>
            {username && (
                <div>
                    <h2>User Information</h2>
                    <p>Username: {user.username}</p>
                </div>
            )}
        </div>
    )
}

export default Leaderboard;