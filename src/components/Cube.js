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

	const convert = (n) => {
		//if (n === 26){debugger}
		let realCubeName = getRealCubeName(n);
		let realCubePosition = getRealCubePosition(realCubeName);
		let converted = state.positionMap[props.type][realCubePosition];
		return converted;
	}

	const getRealCubeName = (n) => {
		let realCubeName = state.positionMap[props.type].indexOf(n);
		return realCubeName;
	}

	const getRealCubePosition = (n) => {
		let realCubePosition = state.positions.indexOf(n);
		return realCubePosition;
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

		if (props.type === 0){ //f


			/*
				faces back to front
				cubes left to right, bottom to top
			*/
			blue = [2,5,8,11,14,17,20,23,26].map(convert);
			green = [0,3,6,9,12,15,18,21,24].map(convert);
			white = [6,7,8,15,16,17,24,25,26].map(convert);
			yellow = [0,1,2,9,10,11,18,19,20].map(convert);
			red = [18,19,20,21,22,23,24,25,26].map(convert);
			orange = [0,1,2,3,4,5,6,7,8].map(convert);

		} else if (props.type === 1) { // u



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

		} else if (props.type === 2) { // r

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

		//colorID = convert(colorID);

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
			{/* <div>{ getRealCubeName(props.colorID) } : { getRealCubePosition(getRealCubeName(props.colorID)) }</div> */}
			{ props.colorID }
		</Html>
		<boxBufferGeometry args={[1, 1, 1]} />
		{ getColoredSides(props.colorID) }
	</mesh>
	)
}

export default Cube