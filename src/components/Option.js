import React from 'react';

const Option = props => {
  return (
    <div className='option'>
      <p className='option__text'>{props.index}. {props.optionText}</p>
      <button
        onClick={(e) => {
          props.handleDeleteOption(props.optionText)          
        }}
        className='button button--link'
        >
        Delete
      </button>
    </div>
  );
};

export default Option;