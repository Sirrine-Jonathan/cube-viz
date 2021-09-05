/* eslint-disable no-duplicate-case */
import React from 'react'
import { Vector3, MathUtils, Group } from 'three';
import { moves } from '../Util/Rotations';

export const DefaultState = {

	// state of keys
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false,
	letterKey: null,
	mainAxis: 'x', // can be x, y, or z
	moving: false,
	undoing: false,
	animating: false,
	cubeRefs: [],
	sceneRef: null,
	positions: [
		0,1,2,
		3,4,5,
		6,7,8,

		9,10,11,
		12,13,14,
		15,16,17,

		18,19,20,
		21,22,23,
		24,25,26
	],
	history: []
}



export const reducer = (state, action) => {
	switch(action.type){

		/**
		 * These actions update the state of the keyboard
		*/
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
		case 'letterKey':
			let axis = moves[action.payload].mainAxis;
			return {
				...state,
				moving: true,
				letterKey: action.payload,
				mainAxis: axis,
			}

		/**
		 * These actions used for initializing DOM refs
		 */
		case 'setRef':
			let newRefs = [...state.cubeRefs];
			newRefs[action.payload.id] = action.payload.ref;
			return {
				...state,
				cubeRefs: newRefs
			}
		case 'setSceneRef':
			return {
				...state,
				sceneRef: action.payload
			}

		/**
		 * Clean up after a move's animation has finished
		 */
		case 'endMove':
			if (state.moving){
				let { positions, history } = state;
				positions = moves[state.letterKey].operation(positions);
				if (!state.undoing){
					history.push(state.letterKey);
					console.log('history', history);
				}
				return {
					...state,
					letterKey: null,  // unset move
					moving: false,    // prevents further animation, and allows next move
					positions,        // update cubes to new positions,
					history: history, // save updated history
					undoing: false    // set undo to false
				}
			} else {
				return state;
			}
		
		case 'undo':
			console.log('start of undo', state);
			let { history } = state;
			if (!state.moving && history.length > 0){
				let lastMove = history[history.length - 1];
				let undoMove = lastMove;
				if (lastMove === lastMove.toUpperCase()){
					undoMove = lastMove.toLowerCase();
				} else if (lastMove === lastMove.toLowerCase()){
					undoMove = lastMove.toUpperCase();
				}
				let newHistory = history.slice(0, -1);
				console.log(`undoing with ${undoMove}`);
				console.log('newHistory', newHistory);
				let axis = moves[lastMove].mainAxis;
				return {
					...state,
					moving: true,
					undoing: true,
					letterKey: undoMove,
					mainAxis: axis,
					history: newHistory
				}
			} else {
				return state;
			}
		
		case 'setRotations':
			let newRotations = {
				...state.rotations,
				[action.payload.mainAxis]: {
					...state.rotations[action.payload.mainAxis],
					[action.payload.faceID]: action.payload.newVal
				}
			};
			return {
				...state,
				rotations: newRotations
			}

	}
	return state;
}

export const AppDispatchContext = React.createContext(DefaultState);
export const AppStateContext = React.createContext(DefaultState);