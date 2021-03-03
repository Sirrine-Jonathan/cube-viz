/* eslint-disable default-case */
import React, { useContext } from 'react'
import './ColorMaterial'
import { AppStateContext } from '../State/context'
import { Html } from 'drei';
import { Math } from 'three'

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

	const getRealCubeName = (n) => {
		let positionTranslated = state.positionMap[props.type].indexOf(n);
		let realCubeName = state.positions[positionTranslated];
		return realCubeName;
	}

	const getColoredSides = () => {

		let cubeID = getRealCubeName(props.colorID)
		let arr = Array(6).fill("black");
		let blue = [2,11,20,5,14,23,8,17,26];
		let green = [0,3,6,9,12,15,18,21,24];
		let white = [0,1,2,9,10,11,18,19,20]
		let yellow = [6,7,8,15,16,17,24,25,26];
		let red = [0,1,2,3,4,5,6,7,8];
		let orange = [24,25,26,21,22,23,18,19,20];

		if (blue.includes(cubeID)){
			arr[0] = "blue"
		}
		if (green.includes(cubeID)){
			arr[1] = "green"
		}
		if (white.includes(cubeID)){
			arr[2] = "white"
		}
		if (yellow.includes(cubeID)){
			arr[3] = "yellow"
		}
		if (red.includes(cubeID)){
			arr[4] = "red";
		}
		if (orange.includes(cubeID)){
			arr[5] = "orange"
		}
		return arr.map(color => <meshBasicMaterial
			attachArray="material"
			color={colorMap[color]}
			metalness={1}
		/>);
	}

	let cubeName = getRealCubeName(props.colorID);
	let rotationsDeg = state.cubeRotations[cubeName];
	
	/*
	let rotations = [
		Math.degToRad(rotationsDeg[state.cubeAxelMapping[cubeName][0]]),
		Math.degToRad(rotationsDeg[state.cubeAxelMapping[cubeName][1]]),
		Math.degToRad(rotationsDeg[state.cubeAxelMapping[cubeName][2]])
	]
	*/



	const getRotations = () => {
		let r = rotationsDeg;
		// if (cubeName === 0){
		// 	r[0] += state.spin[0];
		// 	r[1] += state.spin[1];
		// 	r[2] += state.spin[2];
		// }
		let rotations = [
			Math.degToRad(r[0]),
			Math.degToRad(r[1]),
			Math.degToRad(r[2])
		]
		if (cubeName === 0){
			console.log('rotationsDeg', rotationsDeg);
		}
		return rotations;
	}

	return (
	<mesh
		{...props}
		castShadow
		rotation={[...getRotations()]}
	>

		{ 
			(getRealCubeName(props.colorID) === 0) ?
			(
				<>
					<Html scaleFactor={5} position={[0,0,0]}>
						{ getRealCubeName(props.colorID) }
					</Html>
				<axesHelper size={20} />
				</>
			):null
		}
		<boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
		{ getColoredSides() }
	</mesh>
	)
}

export default Cube