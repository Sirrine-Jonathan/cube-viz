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
		dispatch({ type: e.key, payload: true });
		console.log(`key: ${e.key}`);
		if (e.key === '1' || e.key === '2' || e.key === '3'){
			console.log(`Face Config: ${e.key}`);
			dispatch({ type: 'faceConfig', payload: e.key - 1})
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
