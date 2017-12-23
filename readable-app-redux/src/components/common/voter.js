import React from 'react';
import FontAwesome from 'react-fontawesome';

export const VOTER_UP_VOTE = 'upVote';
export const VOTER_DOWN_VOTE = 'downVote';

// --------------------------------------------------------
// Voter component allows the user to Up Vote or Down Vote
// a post or a comment.
// --------------------------------------------------------
const Voter = props => {
  return (
    <div>
      <FontAwesome
        onClick={() => props.vote(VOTER_UP_VOTE)}
        name="plus-square"
        className="cursorPointer"
      />{' '}
      {props.score} like(s){' '}
      <FontAwesome
        onClick={() => props.vote(VOTER_DOWN_VOTE)}
        name="minus-square"
        className="cursorPointer"
      />
    </div>
  );
};

export default Voter;
