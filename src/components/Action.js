import React from 'react';


const Action = props => {
  return (
    <div>
      <button 
      onClick={props.HandlePick} 
      disabled={!props.hasOption}
      className='big-button'
      >
        Whats should i do?
      </button>
    </div>
  );
};


export default Action;