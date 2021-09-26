/* eslint-disable no-duplicate-case */
import React from 'react'
import { moves } from '../Util/Rotations';

export const DefaultState = {

	// state of keys
	skybox: 1,
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false,
	letterKey: null,
	mainAxis: 'x', // can be x, y, or z
	moving: false,
	undoing: false,
	mixing: false,
	mixAmount: 10,
	mix: [],
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
		case 'changeSkybox':
			return {
				...state,
				skybox: parseInt(action.payload)
			}

		/**
		 * Clean up after a move's animation has finished
		 */
		case 'endMove':
			if (state.moving){
				let { positions, history } = state;
				positions = moves[state.letterKey].operation(positions);
				let newHistory = history.slice();
				if (!state.undoing){
					newHistory.push(state.letterKey);
				}
				return {
					...state,
					letterKey: null,  // unset move
					moving: false,    // prevents further animation, and allows next move
					positions,        // update cubes to new positions,
					history: newHistory, // save updated history
					undoing: false    // set undo to false
				}
			} else {
				return state;
			}
		
		/**
		 * Triggered on Backspace
		 */
		case 'undo':
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
		
		/** 
		 * Triggered on Mix button push,
		 * sets the mix array to a number of moves to perform
		*/
		case 'mix':
			if (!state.moving && !state.mixing){
				const moves = [
					'u', 'l', 'f', 'r', 'b', 'd', // clockwise
					'U', 'L', 'F', 'R', 'B', 'D', // counter clockwise
					'm', 'M', 'e', 'E', 's', 'S', // slice turns
				];
				let newMix = [];
				for (let i = 0; i < state.mixAmount; i++){
					let move = moves[Math.floor(Math.random()*moves.length)];
					newMix.push(move);
				}
				return {
					...state,
					mixing: true,
					mix: newMix
				}
			} else {
				return state;
			}

		/**
		 * Peforms the next move in the mix array
		 * will be called in useFrame loop when moving is false
		 * and mixing is true
		 */
		case 'doNextMix':
			let {mixing, mix, moving} = state;
			if (moving){
				return state;
			}
			if (mixing){
				if (mix.length > 0){
					let nextMix = mix[mix.length - 1];
					let newMix = mix.slice(0, -1);
					return {
						...state,
						letterKey: nextMix,
						moving: true,
						undoing: false,
						mixing: true,
						mix: newMix
					}
				} else {
					return {
						...state,
						mixing: false,
						moving: false,
						undoing: false
					}
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