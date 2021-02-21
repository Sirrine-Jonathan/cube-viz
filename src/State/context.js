/* eslint-disable no-duplicate-case */
import React from 'react'
import { moves } from '../Util/Rotations';

export const DefaultState = {
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false,
	faceConfig: 0,
	move: null,
	debug_move: null,
	moving: false,

	// this object maintains the data for animations only
	rotations: {
		// face configuration type Zero
		0: {
			0: 0, // faceID zero z rotation
			1: 0, // faceID one z rotation
			2: 0  // faceID two z rotation
		},
		// face configuration type One
		1: {
			0: 0, // y rotation
			1: 0, // y rotation
			2: 0  // y rotation
		},
		// face configuration type Two
		2: {
			0: 0, // x rotation
			1: 0, // x rotation
			2: 0  // x rotation
		}
	},
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

	// cubeName is index for each cube's rotation array
	cubeRotations: [
		[0,0,0],[0,0,0],[0,0,0],
		[0,0,0],[0,0,0],[0,0,0],
		[0,0,0],[0,0,0],[0,0,0],

		[0,0,0],[0,0,0],[0,0,0],
		[0,0,0],[0,0,0],[0,0,0],
		[0,0,0],[0,0,0],[0,0,0],

		[0,0,0],[0,0,0],[0,0,0],
		[0,0,0],[0,0,0],[0,0,0],
		[0,0,0],[0,0,0],[0,0,0]
	],

	// cubeName is index for each cube's axel mapping array
	cubeAxelMapping: [
		[0,1,2],[0,1,2],[0,1,2],
		[0,1,2],[0,1,2],[0,1,2],
		[0,1,2],[0,1,2],[0,1,2],

		[0,1,2],[0,1,2],[0,1,2],
		[0,1,2],[0,1,2],[0,1,2],
		[0,1,2],[0,1,2],[0,1,2],

		[0,1,2],[0,1,2],[0,1,2],
		[0,1,2],[0,1,2],[0,1,2],
		[0,1,2],[0,1,2],[0,1,2],
	],
	positionMap: [
		[
			24, 25, 26,
			21, 22, 23,
			18, 19, 20,
			
			15, 16, 17,
			12, 13, 14,
			9, 10, 11,
		
			6, 7, 8,
			3, 4, 5,
			0, 1, 2
		],
		[
			20,23,26,
			11,14,17,
			2,5,8,
		
			19,22,25,
			10,13,16,
			1,4,7,
		
			18,21,24,
			9,12,15,
			0,3,6
		],
		[
			8,17,26,
			7,16,25,
			6,15,24,
		
			5,14,23,
			4,13,22,
			3,12,21,
		
			2,11,20,
			1,10,19,
			0,9,18
		]
	],
	spin: [0, 0, 0]
}

export const reducer = (state, action) => {
	let newState;
	let inc = 45;
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
			let newFaceConfig = moves[action.payload].faceConfig;
			return {
				...state,
				moving: true,
				move: action.payload,
				faceConfig: newFaceConfig,
			}
		case 'debug_move':
			return {
				...state,
				moving: true,
				debug_move: action.payload
			}
		case 'endMove':
			if (state.moving){
				let { positions, cubeRotations, cubeAxelMapping } = state;
				positions = moves[state.move].operation(positions);
				let { rotations, am } = moves[state.move].cubeOperation(cubeRotations, positions, cubeAxelMapping);
				cubeRotations = rotations;
				cubeAxelMapping = am;
				return {
					...state,
					move: null,                        // unset move
					moving: false,                     // prevents further animation, and allows next move
					rotations: DefaultState.rotations, // reset each face to its default state
					positions,                         // update cubes to new positions,
					cubeRotations,                     // rotate each individual cube so that it faces the correct direction
					cubeAxelMapping                    // update the axel orientation for each cube
				}
			} else {
				return state;
			}
		case 'setRotations':
			let newRotations = { 
				...state.rotations, 
				[action.payload.faceConfig]: {
					...state.rotations[action.payload.faceConfig],
					[action.payload.faceID]: action.payload.newVal
				}
			};
			return {
				...state,
				rotations: newRotations
			}
		case 'setDebugSpin':
			console.log(action.payload);
			let newSpin = Array.from(state.spin);
			let newCubeRotations = JSON.parse(JSON.stringify(state.cubeRotations));
			newCubeRotations[0][action.payload.axis] = action.payload.newVal;
			newSpin[action.payload.axis] = action.payload.newVal;
			return {
				...state,
				cubeRotations: newCubeRotations
				//spin: newSpin
			}
		case 'endDebugMove':
			return {
				...state,
				debug_move: null,
				moving: false
			};
		default:
	}
	return state;
}

export const AppDispatchContext = React.createContext(DefaultState);
export const AppStateContext = React.createContext(DefaultState);