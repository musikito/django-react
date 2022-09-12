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

  renderSwitch = (param) => {
    switch (param + 1) {
      case 1:
        return "primary ";
      case 2:
        return "secondary";
      case 3:
        return "success";
      case 4:
        return "danger";
      case 5:
        return "warning";
      case 6:
        return "info";
      default:
        return "yellow";
    }
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {

    fetch('http://localhost:8000/api/citas/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        autor: this.state.user,
        mensaje: this.state.quote
      })
    });

  }

  render() {
    return (

      <div className="container jumbotron ">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text"
                id="basic-addon1">
                {" "}
                Autor{" "}
              </span>
            </div>
            <input type="text" className="form-control"
              placeholder="Nombre del Autor"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.user} name="user"
              onChange={this.handleInput} />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Tu Cita
              </span>
            </div>
            <textarea className="form-control "
              aria-label="With textarea"
              placeholder="Escribe tu pensamiento..."
              value={this.state.quote} name="quote"
              onChange={this.handleInput}>
            </textarea>
          </div>

          <button type="submit" className="btn btn-primary mb-5">
            Enviar
          </button>
        </form>
        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#000000",
          }}
        />





        {this.state.data.map(cita => {
          return (
            <div key={cita.id}>
              <div className="card shadow-lg">
                <div className={"bg-" + this.renderSwitch(cita.id % 6) +
                  " card-header"}>Cita {cita.id + 1}</div>
                <div className="card-body">
                  <blockquote className={"text-" + this.renderSwitch(cita.id % 6) +
                    " blockquote mb-0"}>
                    <h1> {cita.mensaje} </h1>
                    <footer className="blockquote-footer">
                      {" "}
                      <cite title="Source Title">{cita.autor}</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
              <span className="border border-primary "></span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);