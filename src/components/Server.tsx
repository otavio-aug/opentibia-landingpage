import { FC, useEffect, useState } from "react";
import card from "../assets/images/card.png"
import newGif from "../assets/images/new.gif"
import loadingGif from "../assets/images/loading.gif"

interface ServerProps {
	name: string;
	status?: string;
	type: string;
	onlinePlayers?: number;
	onlineRecord?: number;
	creationDate: string;
	serverLocation: string;
	isNew: boolean;
	siteUrl: string;
}

interface ServerInfoProps {
	initialServer: ServerProps;
}

const Server: FC<ServerInfoProps> = ({ initialServer }) => {
	const statusStyle = initialServer.status === "Online" ? "OnlineColor" : "OfflineColor";
	const [server, setServer] = useState<ServerProps>(initialServer);
    const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const requestUrl = `http://${server.siteUrl}/api/infos.php`;
			try {
				const res = await fetch(requestUrl, {
					method: "GET",
					mode: "cors",
					headers: {
						"Content-Type": "Application/Json",
					}
				});
				if (res.ok) {
					const data = await res.json()
					setServer(prevServer => ({
						...prevServer,
						onlinePlayers: data.onlinePlayers,
						onlineRecord: data.onlineRecord,
						status: data.status,
					}));
				}
			} catch(e) {
				setServer(prevServer => ({
					...prevServer,
					onlinePlayers: 0,
                    onlineRecord: 0,
                    status: "Offline",
				}))
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [server.siteUrl])
	
	if (isLoading) {
        return <div className="ServerInfoContainer"><img src={loadingGif} alt="loading!" /></div>;
    }

	return (
		<>
			<div className="ServerInfoContainer">
				<div className="Server" style={{
					backgroundImage: `url(${card})`,
					backgroundPosition: "center",
				}}>

				<div className="ServerContent">
					<div className="ServerName">
						<h3>{server.name}</h3>
						{server.isNew && (
								<img src={newGif} alt="New server" />
						)}
					</div>
						<h3>Status: <span className={statusStyle}>{server.status}</span></h3>
						<h3>Online players: {server.onlinePlayers}</h3>
						<h3>Players record: {server.onlineRecord}</h3>
						<h3>Type: {server.type}</h3>
						<h3>Creation date: {server.creationDate}</h3>
					</div>
					<div className="ServerButton">
						<a href={server.siteUrl}>
							<h3>PLAY NOW!</h3>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Server;
