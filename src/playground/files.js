// JSX - JavaScript XML



const app = {
  title: 'Indecision App',
  subtitle: 'Put your lige in the hands of a computer',
  options: []
}

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
}

const onRemoveAll = () => {
  app.options = []
  render();
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option)
  // console.log(randomNum)
}
const renderInput = () => {

}

const appRoot = document.getElementById('app');

let bool = false;

const toggle = () => {
  bool = !bool;
  render();
}

const render = () => {
  const template = (
    <div>
      <h1>  {app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length === 0 ? "No Options" : "Here are your Options" }</p>
      <button onClick={onMakeDecision} disabled={app.options.length === 0}> What Should I do</button>
      <button onClick={onRemoveAll}> Remove all</button>
      <ol>
        {app.options.map((options) => <li key={options}>{options}</li>)}
      </ol>
      <button onClick={toggle}>{!bool ? "Mostrar Input" : "Ocultar Input"}</button>
      {bool ?
        <form onSubmit={onFormSubmit}>
          <input type="text" name="option"></input>
          <button>Add option</button>
        </form>
        : null}
    </div>
  )
  ReactDOM.render(template, appRoot);
}

render();







