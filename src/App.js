import './App.css';
import React, { useReducer, useMemo, useEffect, useState } from 'react'
import { AppStateContext, AppDispatchContext, DefaultState, reducer } from './State/context'
import Scene from './Components/Scene'
import Rubiks from './Components/Rubiks'
import TopBar from './Components/TopBar'
import Title from './Components/Title'
import Cubemap from './Components/Cubemap'
import Help from './Components/Help'
const dev = false;

function App() {

	// App state setup
	const [state, dispatch] = useReducer(reducer, DefaultState);
	const context = useMemo(() => {
		return {state, dispatch}
	}, [state, dispatch])

	const [showHelp, setShowHelp] = useState(false);

	// global key listeners - on key press
	const turnKeyOn = (e) => {

		if (e.key === 'Backspace'){
			dispatch({ type: 'undo' });
		}

		// arrow keys for rotating the cube
		if (e.key.includes('Arrow')){
			dispatch({ type: e.key, payload: true });
		}

		// https://ruwix.com/the-rubiks-cube/notation/
		const letterKeys = [
			'u', 'l', 'f', 'r', 'b', 'd', // clockwise
			'U', 'L', 'F', 'R', 'B', 'D', // counter clockwise
			'm', 'M', 'e', 'E', 's', 'S', // slice turns
		];
		if (letterKeys.includes(e.key)){
			if (!state.moving){
				dispatch({ type: 'letterKey', 'payload': e.key });
			}
		}

		const numbers = '0123456789'.split('');
		if (numbers.includes(e.key)){
			dispatch({ type: 'changeSkybox', 'payload': e.key });
		}
	}

	// global key listeners - on key release
	const turnKeyOff = (e) => {
		dispatch({ type: e.key, payload: false});
		if (e.key === 'h' || e.key === 'H'){
			setShowHelp(!showHelp);
		}
	}

	const trigger = (key) => {
		if (!state.moving){
			dispatch({ type: 'letterKey', 'payload': key });
		}
	}

	// attach listeners
	useEffect(() => {
		window.addEventListener('keyup', turnKeyOff);
		window.addEventListener('keydown', turnKeyOn);
		window.trigger = trigger;
		return () => {
			window.removeEventListener('keyup', turnKeyOff);
			window.removeEventListener('keydown', turnKeyOn);
		}
	})

	return (
		<AppStateContext.Provider value={context.state}>
			<AppDispatchContext.Provider value={context.dispatch}>
				<div className="App">
					{(dev) ? (<TopBar />):null}
					<header className="App-header">
						<Title />
						<Cubemap />
						<Help show={showHelp} />
						<Scene
							displayEnvironment={true}
						>
							<Rubiks />
						</Scene>
					</header>
				</div>
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

export default App;
