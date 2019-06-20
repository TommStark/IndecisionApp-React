import React from 'react';
import Option from './Option'

const Options = props => {
  return (
    <div>
    <div className='widget-header'>
    <h3 className='widget-header__title'> Your Options</h3>
      <button 
      onClick={props.HandleDeleteOptions}
      className='button button--link'
      > Remove All</button>
    </div>
      {props.opciones.length === 0 && <p className=' widget__message'>Please add a Option to get started!</p>}
      {props.opciones.map((options , index) => (
        <Option
          handleDeleteOption={props.HandleDeleteOption}
          key={options}
          index={index + 1}
          optionText={options} />
      ))}
    </div>
  );
};

export default Options;