import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
	state = {
		detalles: [],
		user: "",
		quote: "",
	};

	componentDidMount() {
		let data;

		axios
			.get('http://localhost:8000/api/citas/')
			.then((res) => {
				data = res.data;
				this.setState({
					detalles: data,
				});
			})
			.catch((err) => {});
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
		e.preventDefault();

		axios
			.post('http://localhost:8000/api/citas/', {
				autor: this.state.user,
				mensaje: this.state.quote,
			})
			.then((res) => {
				this.setState({
					user: "",
					quote: "",
				});
			})
			.catch((err) => {});
	};

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

				{this.state.detalles.map((detalle, id) => (
					<div key={id}>
						<div className="card shadow-lg">
							<div className={"bg-" + this.renderSwitch(id % 6) +
										" card-header"}>Cita {detalle.id + 1}</div>
							<div className="card-body">
								<blockquote className={"text-" + this.renderSwitch(id % 6) +
												" blockquote mb-0"}>
									<h1> {detalle.mensaje} </h1>
									<footer className="blockquote-footer">
										{" "}
										<cite title="Source Title">{detalle.autor}</cite>
									</footer>
								</blockquote>
							</div>
						</div>
						<span className="border border-primary "></span>
					</div>
				))}
			</div>
		);
	}
}
export default App;
