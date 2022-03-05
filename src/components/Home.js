import React from 'react';
import Ticket from './../images/movie_tickets.jpg'

export const Home = () => {
  return(
    <>
      <div className="text-center">
        <h2>HOME</h2>
        <hr />
        <img src={Ticket} alt="movie ticket"></img>
      </div>
    </>
  )
};