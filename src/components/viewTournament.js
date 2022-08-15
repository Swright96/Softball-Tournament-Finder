import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const ViewTournament = (props) => {
	const [tournament, setTournament] = useState({})
	const { id } = useParams()

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/softball/" + id)
			.then((res) => {
				console.log(res.data)
				setTournament(res.data)
			})
			.catch((err) => console.log(err))
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
				<h1>
					Tournament in {tournament.city}, {tournament.state}
				</h1>
				<div className="detailsContainer">
					<div className="detailsLeft">
						<p>Date: {tournament.date}</p>
						<p>Located at {tournament.specificPark}</p>
						<p>
							Description: <br />
							{tournament.description}
						</p>
					</div>
					<div className="detailsRight">
						<p>Ruleset: {tournament.tournamentRuleset}</p>
						<p>Bracket Style: {tournament.bracketType}</p>
						<p>Max Teams: {tournament.maxNumberOfTeams}</p>
						<p>Prize: {tournament.prize}</p>
						<p>Registration Fee: {tournament.entryCost}</p>
						<a href="/">
							<button
								style={{
									color: "black",
									backgroundColor: "white",
								}}
							>
								Home
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ViewTournament
