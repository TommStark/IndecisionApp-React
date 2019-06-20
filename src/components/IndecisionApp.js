import React from 'react';

import AddOptions from './AddOptions'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.HandleDeleteOptions = this.HandleDeleteOptions.bind(this);
    this.HandlePick = this.HandlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.HandleDeleteOption = this.HandleDeleteOption.bind(this);
    this.HandleClosemodal = this.HandleClosemodal.bind(this);
    this.state = {
      options: [],
      selectedOption: undefined,
    };
  }
  componentDidMount() {
    try {
      const option = localStorage.getItem('options');
      const options = JSON.parse(option)

      if (!!option) {
        this.setState({ options })
      }
    } catch (e) {
      //do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      console.log('funciona');
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json)
    }
  }
  HandleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  HandleDeleteOption(optionToremove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToremove !== option)
    }))
  }

  handleAddOption(item) {
    if (!item) {
      return "Enter Valid Value to Add item";
    } else if (this.state.options.indexOf(item) > -1) {
      return "this option already exits";
    }
    this.setState(prevState => ({ options: prevState.options.concat(item) }));
  }

  HandlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    console.log(this.state.selectedOption);
    this.setState(() => ({ selectedOption: option }));
    console.log(this.state.selectedOption);
  }

  HandleClosemodal() {
    this.setState(() => ({ selectedOption: undefined }))
  }

  render() {
    const subtitle = "put your life in the hand of a computer";
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className='container'>
          <Action
            hasOption={this.state.options.length > 0}
            HandlePick={this.HandlePick}
          />
          <div className='widget'>
            <Options
              opciones={this.state.options}
              HandleDeleteOption={this.HandleDeleteOption}
              HandleDeleteOptions={this.HandleDeleteOptions}
            />
            <AddOptions handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          closeModal={this.HandleClosemodal}
        />
      </div>

    );
  }
}
IndecisionApp.defaultProps = {
  options: []
};