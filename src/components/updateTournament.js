import axios from "axios"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./style.css"

const UpdateTournament = () => {
	const [city, setCity] = useState("")
	const [state, setState] = useState("")
	const [date, setDate] = useState("")
	const [maxNumberOfTeams, setMaxNumberOfTeams] = useState("")
	const [specificPark, setSpecificPark] = useState("")
	const [entryCost, setEntryCost] = useState("")
	const [tournamentRuleset, setTournamentRuleset] = useState("")
	const [bracketType, setBracketType] = useState("")
	const [description, setDescription] = useState("")
	const [prize, setPrize] = useState("")
	const navigate = useNavigate()
	const [errors, setErrors] = useState([])
	const { id } = useParams()
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/softball/" + id)
			.then((res) => {
				console.log(res.data)
				setCity(res.data.city)
				setState(res.data.state)
				setDate(res.data.date)
				setMaxNumberOfTeams(res.data.maxNumberOfTeams)
				setSpecificPark(res.data.specificPark)
				setEntryCost(res.data.entryCost)
				setTournamentRuleset(res.data.tournamentRuleset)
				setBracketType(res.data.bracketType)
				setDescription(res.data.description)
				setPrize(res.data.prize)
			})
			.catch((err) => {
				console.log(err.res)
			})
	}, [])

	const onSubmitHandler = (t) => {
		t.preventDefault()
		axios
			.put("http://localhost:8000/api/softball/" + id, {
				city,
				state,
				date,
				maxNumberOfTeams,
				specificPark,
				entryCost,
				prize,
				description,
				tournamentRuleset,
				bracketType,
			})
			.then((res) => {
				console.log(res)
				navigate("/")
			})
			.catch((err) => {
				console.log(err)
				const errorResponse = err.response.data.err.errors
				console.log(errorResponse)
				const errorArr = []

				for (const key of Object.keys(errorResponse)) {
					errorArr.push(errorResponse[key].message)
				}
				setErrors(errorArr)
			})
	}

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
				<h4>Update your tournament information</h4>
				<p>
					Posting to our database allows your tournament to gain more
					exposure with our users!
				</p>
				<form onSubmit={onSubmitHandler}>
					{errors.map((err, index) => (
						<p key={index} style={{ color: "red" }}>
							{err}
						</p>
					))}
					<div className="formContainer">
						<div className="formLeft">
							<div className="">
								<label>City</label>
								{errors.city ? (
									<p>{errors.city.message}</p>
								) : null}

								<p>
									<input
										type="text"
										name="city"
										placeholder={city}
										value={city}
										onChange={(t) => {
											setCity(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="">
								<label>State</label>
								<p>
									<select
										style={{
											width: "250px",
											backgroundColor: "white",
											color: "black",
											height: "50px",
										}}
										name="state"
										value={state}
										placeholder="State"
										onChange={(t) => {
											setState(t.target.value)
										}}
									>
										<option value="0">Select State:</option>
										<option value="AL">Alabama</option>
										<option value="AK">Alaska</option>
										<option value="AZ">Arizona</option>
										<option value="AR">Arkansas</option>
										<option value="CA">California</option>
										<option value="CO">Colorado</option>
										<option value="CT">Connecticut</option>
										<option value="DE">Delaware</option>
										<option value="DC">
											District Of Columbia
										</option>
										<option value="FL">Florida</option>
										<option value="GA">Georgia</option>
										<option value="HI">Hawaii</option>
										<option value="ID">Idaho</option>
										<option value="IL">Illinois</option>
										<option value="IN">Indiana</option>
										<option value="IA">Iowa</option>
										<option value="KS">Kansas</option>
										<option value="KY">Kentucky</option>
										<option value="LA">Louisiana</option>
										<option value="ME">Maine</option>
										<option value="MD">Maryland</option>
										<option value="MA">
											Massachusetts
										</option>
										<option value="MI">Michigan</option>
										<option value="MN">Minnesota</option>
										<option value="MS">Mississippi</option>
										<option value="MO">Missouri</option>
										<option value="MT">Montana</option>
										<option value="NE">Nebraska</option>
										<option value="NV">Nevada</option>
										<option value="NH">
											New Hampshire
										</option>
										<option value="NJ">New Jersey</option>
										<option value="NM">New Mexico</option>
										<option value="NY">New York</option>
										<option value="NC">
											North Carolina
										</option>
										<option value="ND">North Dakota</option>
										<option value="OH">Ohio</option>
										<option value="OK">Oklahoma</option>
										<option value="OR">Oregon</option>
										<option value="PA">Pennsylvania</option>
										<option value="RI">Rhode Island</option>
										<option value="SC">
											South Carolina
										</option>
										<option value="SD">South Dakota</option>
										<option value="TN">Tennessee</option>
										<option value="TX">Texas</option>
										<option value="UT">Utah</option>
										<option value="VT">Vermont</option>
										<option value="VA">Virginia</option>
										<option value="WA">Washington</option>
										<option value="WV">
											West Virginia
										</option>
										<option value="WI">Wisconsin</option>
										<option value="WY">Wyoming</option>
									</select>
								</p>
							</div>
							<div className="">
								<label>Date</label>
								<p>
									<input
										type="date"
										name="date"
										value={date}
										onChange={(t) => {
											setDate(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="">
								<label>Max Teams</label>
								<p>
									<input
										type="number"
										min={1}
										max={100}
										name="maxNumberOfTeams"
										placeholder="Max Teams"
										value={maxNumberOfTeams}
										onChange={(t) => {
											setMaxNumberOfTeams(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="">
								<label>Park Name</label>
								<p>
									<input
										type="text"
										name="specificPark"
										placeholder="Park Name"
										value={specificPark}
										onChange={(t) => {
											setSpecificPark(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="description">
								<label>Description</label>
								<p>
									<textarea
										className="descriptionInput"
										name="description"
										placeholder="Benefit/Description/Qualifiers"
										value={description}
										onChange={(t) => {
											setDescription(t.target.value)
										}}
									/>
								</p>
							</div>
						</div>
						<div className="formRight">
							<div className="">
								<label>Entry Fee</label>
								<p>
									<input
										type="double"
										name="entryCost"
										placeholder="Entry Fee"
										value={entryCost}
										onChange={(t) => {
											setEntryCost(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="">
								<label>Ruleset</label>
								<p>
									<input
										type="text"
										name="tournamentRuleset"
										placeholder="Ruleset (ex. ASA)"
										value={tournamentRuleset}
										onChange={(t) => {
											setTournamentRuleset(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="">
								<label>Bracket Type (ex. double-elim)</label>
								<p>
									<input
										type="text"
										name="bracketType"
										placeholder="Bracket Type (ex. Double Elim)"
										value={bracketType}
										onChange={(t) => {
											setBracketType(t.target.value)
										}}
									/>
								</p>
							</div>
							<div className="">
								<label>Prize Money</label>
								<p>
									<input
										type="text"
										name="prize"
										placeholder="Prize Money"
										value={prize}
										onChange={(t) => {
											setPrize(t.target.value)
										}}
									/>
								</p>
							</div>
							<input className="submit" type="submit" />
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateTournament
