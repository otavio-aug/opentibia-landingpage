import "./App.css";
import Server from "./components/Server";
import lpConfig from "./LPConfig.json"

function App() {
	const servers = lpConfig.servers
	return (
		<>
			<div className="App">
				<img className="InfoLogo" src={require("./assets/images/logo.gif")} alt="ServerInfoLogo"/>
				<div className="ServerContainer">
					{servers.map((server, index) => {
						return(
							<div className="ServerInformation" key={index}>
								<Server initialServer={server} key={index}></Server>
							</div>	
						)
					})}
				</div>
			</div>
		</>
	);
}

export default App;
