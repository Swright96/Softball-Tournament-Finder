import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import axios from "axios"
import { Link } from "react-router-dom"

const Dashboard = (props) => {
	const [tournament, setTournament] = useState([])
	const deleteTournament = (tournamentId) => {
		axios
			.delete("http://localhost:8000/api/softball/" + tournamentId)
			.then((res) => {
				console.log(res)
				console.log("Deleted!")
				const filteredTournaments = tournament.filter((tournament) => {
					return tournament._id !== tournamentId
				})
				setTournament(filteredTournaments)
			})
			.catch((err) => console.log(err))
	}
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/softball")
			.then((res) => setTournament(res.data.Softball))
			.catch((err) => {
				console.log(err.res)
			})
	}, [])

	return (
		<div>
			<div className="navbar">
				<h1>
					<a
						href="/"
						style={{
							color: "black",
							backgroundColor: "white",
							textDecoration: "none",
						}}
					>
						Tournament Finder!
					</a>
				</h1>
			</div>
			<div className="container">
				<h2>Dashboard</h2>
				<h4 style={{ fontSize: "18px" }}>
					The place to go for your slowpitch softball tournament
					finding needs!
				</h4>
				<div className="tournamentAdd">
					<a href="/tournament/add">
						<button
							style={{
								color: "black",
								backgroundColor: "white",
								marginBottom: "10px",
								float: "right",
							}}
						>
							Add A Tournament
						</button>
					</a>
				</div>

				<div className="table">
					<Table striped bordered hover size="sm" variant="dark">
						<thead>
							<tr>
								<th width="250px">City, State</th>
								<th width="250px">Date</th>
								<th>Max Teams</th>
								<th width="250px">Actions</th>
							</tr>
						</thead>
						<tbody>
							{tournament.map((tournament, index) => {
								return (
									<tr key={tournament._id}>
										<td>{`${tournament.city}, ${tournament.state}`}</td>
										<td>{`${tournament.date}`}</td>
										<td
											style={{ width: "250px" }}
										>{`${tournament.maxNumberOfTeams}`}</td>
										<td>
											<Link
												to={`/tournament/${tournament._id}`}
											>
												<button
													style={{
														backgroundColor:
															"white",
														color: "black",
														width: "65px",
													}}
												>
													Details
												</button>
											</Link>
											<Link
												to={`/tournament/update/${tournament._id}`}
											>
												<button
													style={{
														backgroundColor:
															"white",
														color: "black",
														width: "65px",
													}}
												>
													Update
												</button>
											</Link>
											<button
												onClick={(t) => {
													deleteTournament(
														tournament._id
													)
												}}
												style={{
													backgroundColor: "white",
													color: "black",
													width: "65px",
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	)
}
export default Dashboard
