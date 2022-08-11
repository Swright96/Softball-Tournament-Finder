import React from "react"
import Dashboard from "./components/dashboard"
import CreateTournament from "./components/createTournament"
import ViewTournament from "./components/viewTournament"
import UpdateTournament from "./components/updateTournament"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route element={<Dashboard />} path="/" default />
					<Route
						element={<CreateTournament />}
						path="/tournament/add"
					/>
					<Route
						element={<ViewTournament />}
						path="/tournament/:id"
					/>
					<Route
						element={<UpdateTournament />}
						path="/tournament/update/:id"
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
