import './App.css';
import React, { useReducer, useMemo, useEffect } from 'react'
import Scene from './Components/Scene'
import { AppStateContext, AppDispatchContext, DefaultState, reducer } from './State/context'
import TopBar from './Components/TopBar'



function App() {

	const [state, dispatch] = useReducer(reducer, DefaultState);

	const context = useMemo(() => {
		return {state, dispatch}
	}, [state, dispatch])

	const turnKeyOn = (e) => {

		if (e.key.includes('Arrow')){
			dispatch({ type: e.key, payload: true });
		}
		
		if (e.key === '1' || e.key === '2' || e.key === '3'){
			console.log(`Face Config: ${e.key}`);
			dispatch({ type: 'faceConfig', payload: e.key - 1})
		}
		

		// https://ruwix.com/the-rubiks-cube/notation/
		const moves = [
			'u', 'l', 'f', 'r', 'b', 'd', // clockwise
			'U', 'L', 'F', 'R', 'B', 'D', // counter clockwise
			'm', 'M', 'e', 'E', 's', 'S', // slice turns
		];
		if (moves.includes(e.key)){
			if (!state.moving){
				dispatch({ type: 'move', 'payload': e.key });
			}
		}

		const debug_moves = [
			'x', 'X', 'y', 'Y', 'z', 'Z'
		]
		if (debug_moves.includes(e.key)){
			if (!state.moving){
				dispatch({ type: 'debug_move', 'payload': e.key })
			}
		}
	}

	const turnKeyOff = (e) => {
		dispatch({ type: e.key, payload: false});
	}

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
				<TopBar />
				<header className="App-header">
					<Scene />
				</header>
			</div>
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

export default App;
