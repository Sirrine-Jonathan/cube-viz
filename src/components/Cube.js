/* eslint-disable default-case */
import React, { useContext } from 'react'
import './ColorMaterial'
import { AppStateContext } from '../State/context'
import { Html } from 'drei';

function Cube(props) {

	const state  = useContext(AppStateContext);

	const colorMap = {
		black: "#000000",
		red: "red",
		blue: "blue",
		orange: "#ce8500",
		green: "green",
		yellow: "yellow",
		white: "#ffffff"
	};

	/*
const positionMapZero = [
	24, 25, 26,
	21, 22, 23,
	18, 19, 20,
	
	15, 16, 17,
	12, 13, 14,
	9, 10, 11,

	6, 7, 8,
	3, 4, 5,
	0, 1, 2
];

const positionMapOne = [
	20,23,26,
	11,14,17,
	2,5,8,

	19,22,25,
	10,13,16,
	1,4,7,

	18,21,24,
	9,12,15,
	0,3,6
];

const positionMapTwo = [
	8,17,26,
	7,16,25,
	6,15,24,

	5,14,23,
	4,13,22,
	3,12,21,

	2,11,20,
	1,10,19,
	0,9,18
];

const positionMap = [
	positionMapZero,
	positionMapOne,
	positionMapTwo
]
	*/



	const convert = (n) => {
		let colorCubePositionName = state.positionMap[props.type].indexOf(n);
		let newPositionOfCubeName = state.positions[colorCubePositionName];
		let converted = state.positionMap[props.type][newPositionOfCubeName];
		return converted;
	}

	const convertHalf = (n) => {
		let colorCubePositionName = state.positionMap[props.type].indexOf(n);
		return colorCubePositionName;
	}


	const getColoredSides = (colorID) => {

		let arr = Array(6).fill("black");
		/*
			0: right
			1: left
			2: top
			3: bottom
			4: front
			5: back
		*/
		let blue, green, white, yellow, red, orange;

		if (props.type === 0){


			/*
				faces back to front
				cubes left to right, bottom to top
			*/
			blue = [2,5,8,11,14,17,20,23,26].map(convert); console.log('blue', blue);
			green = [0,3,6,9,12,15,18,21,24].map(convert);
			white = [6,7,8,15,16,17,24,25,26].map(convert);
			yellow = [0,1,2,9,10,11,18,19,20].map(convert);
			red = [18,19,20,21,22,23,24,25,26].map(convert);
			orange = [0,1,2,3,4,5,6,7,8].map(convert);
		} else if (props.type === 1) {



			/*
				faces bottom to top
				cubes back to front, left to right
			*/
			blue = [6,7,8,15,16,17,24,25,26].map(convert);
			green = [0,1,2,9,10,11,18,19,20].map(convert);
			white = [18,19,20,21,22,23,24,25,26].map(convert);
			yellow = [0,1,2,3,4,5,6,7,8].map(convert);
			red = [2,5,8,11,14,17,20,23,26].map(convert);
			orange = [0,3,6,9,12,15,18,21,24].map(convert);
		} else {
			/*
				faces left to right
				cubes bottom to top, back to front 
			*/
			blue = [18,19,20,21,22,23,24,25,26].map(convert);
			green = [0,1,2,3,4,5,6,7,8].map(convert);
			white = [2,5,8,11,14,17,20,23,26].map(convert);
			yellow = [0,3,6,9,12,15,18,21,24].map(convert);
			red = [6,7,8,15,16,17,24,25,26].map(convert);
			orange = [0,1,2,9,10,11,18,19,20].map(convert);
		}
	

		if (blue.includes(colorID)){
			arr[0] = "blue"
		}
		if (green.includes(colorID)){
			arr[1] = "green"
		}
		if (white.includes(colorID)){
			arr[2] = "white"
		}
		if (yellow.includes(colorID)){
			arr[3] = "yellow"
		}
		if (red.includes(colorID)){
			arr[4] = "red";
		}
		if (orange.includes(colorID)){
			arr[5] = "orange"
		}

		return arr.map(color => <meshLambertMaterial attachArray="material" color={colorMap[color]} />);
	}

	return (
	<mesh
		{...props}
		castShadow
	>
		<Html scaleFactor={5} position={[0,0,0]}>
			<div>{ convertHalf(props.colorID) }</div>
		</Html>
		<boxBufferGeometry args={[1, 1, 1]} />
		{ getColoredSides(props.colorID) }
	</mesh>
	)
}

export default Cube