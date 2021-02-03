/* eslint-disable default-case */
import React from 'react'
import './ColorMaterial'
import { RoundedBox } from 'drei';

function Cube(props) {


	const colorMap = {
		black: "#000000",
		red: "red",
		blue: "blue",
		orange: "#ce8500",
		green: "green",
		yellow: "yellow",
		white: "#ffffff"
	};

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
			blue = [2,5,8,11,14,17,20,23,26]
			green = [0,3,6,9,12,15,18,21,24]
			white = [6,7,8,15,16,17,24,25,26]
			yellow = [0,1,2,9,10,11,18,19,20];
			red = [18,19,20,21,22,23,24,25,26]
			orange = [0,1,2,3,4,5,6,7,8];
		} else if (props.type === 1) {
			/*
				faces bottom to top
				cubes back to front, left to right
			*/
			blue = [6,7,8,15,16,17,24,25,26]
			green = [0,1,2,9,10,11,18,19,20]
			white = [18,19,20,21,22,23,24,25,26]
			yellow = [0,1,2,3,4,5,6,7,8];
			red = [2,5,8,11,14,17,20,23,26]
			orange = [0,3,6,9,12,15,18,21,24];
		} else {
			/*
				faces left to right
				cubes bottom to top, back to front 
			*/
			blue = [18,19,20,21,22,23,24,25,26]
			green = [0,1,2,3,4,5,6,7,8];
			white = [2,5,8,11,14,17,20,23,26];
			yellow = [0,3,6,9,12,15,18,21,24];
			red = [6,7,8,15,16,17,24,25,26];
			orange = [0,1,2,9,10,11,18,19,20];
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
		<boxBufferGeometry args={[1, 1, 1]} />
		{ getColoredSides(props.colorID) }
	</mesh>
	)
}

export default Cube