import React from 'react';
import ReactDOM from 'react-dom';

export default class AddOptions extends React.Component {
  
  constructor(props) {
    super(props);
    this.HandleAddOption = this.HandleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  HandleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    
    this.setState(() => ({ error }));
    
    if (!error){
      e.target.elements.option.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
        <form className='add-option' onSubmit={this.HandleAddOption}>
          <input className='add-option__input' type="text" name="option" />
          <button
          className='button'
          >Add option</button>
        </form>
      </div>
    );
  }
}