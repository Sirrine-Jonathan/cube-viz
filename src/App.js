import './App.css';
import React, { useReducer, useMemo, useEffect } from 'react'
import { AppStateContext, AppDispatchContext, DefaultState, reducer } from './State/context'
import Scene from './Components/Scene'
import Rubiks from './Components/Rubiks'
import TopBar from './Components/TopBar'

const dev = false;

function App() {

	// App state setup
	const [state, dispatch] = useReducer(reducer, DefaultState);
	const context = useMemo(() => {
		return {state, dispatch}
	}, [state, dispatch])

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
	}

	// global key listeners - on key release
	const turnKeyOff = (e) => {
		dispatch({ type: e.key, payload: false});
	}

	// attach listeners
	useEffect(() => {
		window.addEventListener('keyup', turnKeyOff);
		window.addEventListener('keydown', turnKeyOn);
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
						<div style={{
							position: 'absolute', 
							background: 'rgba(213,213,213,0.5)',
							padding: '10px 20px',
							color: '#000',
							top: 0,
							left: 0,
							zIndex: '99999',
							textAlign: 'center'
						}}>
							Rubik's Cube
							<div style={{
								fontSize: '10px',
								letterSpacing: '5px',
								textTransform: 'uppercase',
								textAlign: 'center'
							}}>
								Visualizer
							</div>
						</div>
						<Scene
							displayEnvironment={false}
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
