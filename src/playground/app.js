class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.HandleDeleteOptions = this.HandleDeleteOptions.bind(this);
    this.HandlePick = this.HandlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.HandleDeleteOption = this.HandleDeleteOption.bind(this);
    this.state = {
      options: props.options
    };
  }
  componentDidMount() {
    try {
      const option = localStorage.getItem('options');
      const options = JSON.parse(option)
     
      if (!!option) {
        this.setState({options})
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
    alert(option);
  }

  render() {
    const subtitle = "put your life in the hand of a computer";
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOption={this.state.options.length > 0}
          HandlePick={this.HandlePick}
        />
        <Options
          opciones={this.state.options}
          HandleDeleteOption={this.HandleDeleteOption}
          HandleDeleteOptions={this.HandleDeleteOptions}
        />
        <AddOptions handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}
IndecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "Indecision"
};

const Action = props => {
  return (
    <div>
      <button onClick={props.HandlePick} disabled={!props.hasOption}>
        Whats should i do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.HandleDeleteOptions}> RemoveAll</button>
      {props.opciones.length === 0 && <p>Please add a Option to get started!</p>}
      {props.opciones.map(i => (
        <Option
          handleDeleteOption={props.HandleDeleteOption}
          key={i}
          optionText={i} />
      ))}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(e) => { props.handleDeleteOption(props.optionText) }
        }
      >
        Delete
      </button>
    </div>
  );
};

class AddOptions extends React.Component {
  
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
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.HandleAddOption}>
          <input type="text" name="option" />
          <button>Add option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <IndecisionApp options={["option 1", " option 2"]} />,
  document.getElementById("app")
);
