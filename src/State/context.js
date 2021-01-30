import React from 'react'

export const DefaultState = {
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false,
	faceConfig: 0
}

export const reducer = (state, action) => {
	switch(action.type){
		case 'ArrowLeft':
			return {
				...state,
				[action.type]: action.payload
			};
		case 'ArrowRight':
			return {
				...state,
				[action.type]: action.payload
			};
		case 'ArrowUp':
			return {
				...state,
				[action.type]: action.payload
			};
		case 'ArrowDown':
			return {
				...state,
				[action.type]: action.payload
			};
		case 'faceConfig':
			return {
				...state,
				faceConfig: action.payload
			}
		default:
	}
	return state;
}

export const AppDispatchContext = React.createContext(DefaultState);
export const AppStateContext = React.createContext(DefaultState);