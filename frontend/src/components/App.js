import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Cargando..."
    };
  }

  componentDidMount() {
    fetch("api/citas")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Algo no esta funcionando!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <ul>
        {this.state.data.map(cita => {
          return (
            <li key={cita.id}>
              {cita.autor} - {cita.mensaje}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);