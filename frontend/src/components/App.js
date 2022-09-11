import React, { Component } from "react";
import { render } from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

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
    
      <><div className="container jumbotron ">
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

        </div>
        
        <ul>
                {this.state.data.map(cita => {
                    return (
                        <li key={cita.id}>
                            {cita.autor} - {cita.mensaje}
                        </li>
                    );
                })}
            </ul></>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);