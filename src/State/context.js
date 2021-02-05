/* eslint-disable no-duplicate-case */
import React from 'react'
import { rotatef, rotateF } from '../Util/Rotations';

export const DefaultState = {
	ArrowDown: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowRight: false,
	faceConfig: 0,
	move: null,
	moving: false,
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
	]
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
			let n = Array.from(state.positions);
			let nn = Array.from(state.positions);
			let newPositionMap = Array.from(state.positionMap);

			// eslint-disable-next-line default-case
			switch(action.payload){
				case 'f':
					newFaceConfig = 0;
					nn = rotatef(n);
					newPositionMap[0] = rotateF(newPositionMap[0]);
				break;
				case 'F':
					newFaceConfig = 0;
					nn = rotateF(n);
					newPositionMap[0] = rotatef(newPositionMap[0]);
				break;
				case 'b':
					newFaceConfig = 0;
				break;
				case 'B':
					newFaceConfig = 0;
				break;
				case 's':
					newFaceConfig = 0;
				break;
				case 'S':
					newFaceConfig = 0;
				break;
				case 'u':
					newFaceConfig = 1;
				break;
				case 'U':
					newFaceConfig = 1;
				break;
				case 'd':
					newFaceConfig = 1;
				break;
				case 'D':
					newFaceConfig = 1;
				break;
				case 'e':
					newFaceConfig = 1;
				break;
				case 'E':
					newFaceConfig = 1;
				break;
				case 'l':
					newFaceConfig = 2;
				break;
				case 'L':
					newFaceConfig = 2;
				break;
				case 'r':
					newFaceConfig = 2;
				break;
				case 'R':
					newFaceConfig = 2;
				break;
				case 'm':
					newFaceConfig = 2;
				break;
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
				faceConfig: newFaceConfig,
				positions: nn,
				positionMap: newPositionMap
			}
		case 'endMove':
			console.log('ending move');
			return {
				...state,
				moving: false
			}
		case 'setRotations':
			let newRotations = { 
				...state.rotations, 
				[action.payload[0]]: {
					...state.rotations[action.payload[0]],
					[action.payload[1]]: action.payload[2] 
				}
			};
			return {
				...state,
				rotations: newRotations
			}
		default:
	}
	return state;
}

export const AppDispatchContext = React.createContext(DefaultState);
export const AppStateContext = React.createContext(DefaultState);