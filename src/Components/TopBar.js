import React, { useContext } from 'react'
import { AppStateContext, AppDispatchContext } from '../State/context'

function TopBar(){
	const state = useContext(AppStateContext);
	const dispatch = useContext(AppDispatchContext);
	const config = {
		keys: true,
		full: false,
	}
	return (
		<div>
			
			{/* FULL JSON */}
			{(config.full) ? (
				<div>
					<h1>State</h1>
					{
						Object.keys(state).map(key => {
							return (
								<div>{key}: {JSON.stringify(state[key]) }</div>
							)
						})
					}
				</div>
			):null}

			{/* keys */}
			{(config.keys) ? (
				<div>
					{
						
						Object.keys(state).map(key => {
							let allowed = ['skybox'];
							if (allowed.includes(key)){
								return (
									<div>{key}: {JSON.stringify(state[key]) }</div>
								)
							} else {
								return null;
							}
						})
					}
					<div>
						<button onClick={() => {
							dispatch({ type: 'undo' });
						}}>Undo</button>
					</div>
					<div style={{height: '20px'}}></div>
				</div>
			):null}

		</div>
	)
}

export default TopBar;