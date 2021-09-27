import { Html } from '@react-three/drei'
const controlStyle = { 
	background: 'rgba(14,14,14,0.5)',
	padding: '20px',
	borderRadius: '2px',
	width: '500px'
}
const ControlDisplay = ({state}) => {
	{/*
		'u', 'l', 'f', 'r', 'b', 'd', // clockwise
		'U', 'L', 'F', 'R', 'B', 'D', // counter clockwise
		'm', 'M', 'e', 'E', 's', 'S', // slice turns
	*/}
	return (
		<Html position={[-5, 5, 0]}>
			<div style={controlStyle}>
				<h2>Controls</h2>
				<table>
					<tr>
						<td>u</td>
						<td>Upper face</td>
					</tr>
					<tr>
						<td>l</td>
						<td>l</td>
					</tr>
					<tr>
						<td>u</td>
						<td>Upper face</td>
					</tr>
				</table>
			</div>
			<div style={controlStyle}>
				<div>Position: {state.positions.indexOf(0)}</div>
				<div>Rotations: [{state.cubeRotations[0][0]}, {state.cubeRotations[0][1]}, {state.cubeRotations[0][2]}]</div>
				<div>Axis Adjs: [{state.cubeAxelMapping[0][0]}, {state.cubeAxelMapping[0][1]}, {state.cubeAxelMapping[0][2]}]</div>
			</div>
		</Html>
	)
}

export default ControlDisplay;