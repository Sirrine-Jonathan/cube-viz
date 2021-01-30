import React, { useContext } from 'react'
import { AppStateContext } from '../State/context'

function TopBar(){
	const state = useContext(AppStateContext);
	return (
		<div>type: {state.move}</div>
	)
}

export default TopBar