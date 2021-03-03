import { Html } from 'drei';

function Cube(props){

	console.log('Cube Props', props);

	const colorMap = {
		black: "#000000",
		red: "red",
		blue: "blue",
		orange: "#ce8500",
		green: "green",
		yellow: "yellow",
		white: "#ffffff"
	};

	const getColoredSides = () => {

		let arr = Array(6).fill("black");
		let blue = [2,11,20,5,14,23,8,17,26];
		let green = [0,3,6,9,12,15,18,21,24];
		let white = [0,1,2,9,10,11,18,19,20]
		let yellow = [6,7,8,15,16,17,24,25,26];
		let red = [0,1,2,3,4,5,6,7,8];
		let orange = [24,25,26,21,22,23,18,19,20];

		if (blue.includes(props.ID)){
			arr[0] = "blue"
		}
		if (green.includes(props.ID)){
			arr[1] = "green"
		}
		if (white.includes(props.ID)){
			arr[2] = "white"
		}
		if (yellow.includes(props.ID)){
			arr[3] = "yellow"
		}
		if (red.includes(props.ID)){
			arr[4] = "red";
		}
		if (orange.includes(props.ID)){
			arr[5] = "orange"
		}
		return arr.map(color => <meshBasicMaterial
			attachArray="material"
			color={colorMap[color]}
			metalness={1}
		/>);
	}

	return (
		<mesh
			{...props}
			castShadow
		>
			<Html scaleFactor={5} position={[0,0,0]}>
				{ props.ID }
			</Html>
			<boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
			{ getColoredSides() }
		</mesh>
	)
}

export default Cube