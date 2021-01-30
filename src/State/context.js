/* eslint-disable no-duplicate-case */
import React from 'react'

export const DefaultState = {
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false,
	faceConfig: 0,
	move: null,
	moving: false,
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
		case 'move':

			// update faceConfig to appropriate move
			let newFaceConfig;
			// eslint-disable-next-line default-case
			switch(action.payload){
				case 'f':
				case 'F':
				case 'b':
				case 'B':
				case 's':
				case 'S':
					newFaceConfig = 0;
				break;
				case 'u':
				case 'U':
				case 'd':
				case 'D':
				case 'e':
				case 'E':
					newFaceConfig = 1;
				break;
				case 'l':
				case 'L':
				case 'r':
				case 'R':
				case 'm':
				case 'M':
					newFaceConfig = 2;
				break;
				default:
					newFaceConfig = state.faceConfig
			}

			return {
				...state,
				moving: true,
				move: action.payload,
				faceConfig: newFaceConfig
			}
		case 'endMove':
			return {
				...state,
				moving: false
			}
		default:
	}
	return state;
}

export const AppDispatchContext = React.createContext(DefaultState);
export const AppStateContext = React.createContext(DefaultState);