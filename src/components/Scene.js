import React, { useContext, useEffect } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import Rubiks from './Rubiks'
import { Plane } from "drei";
import Effects from './Effects'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AppDispatchContext, AppStateContext } from '../State/context'

const CameraController = () => {
	const { camera, gl } = useThree();
	useEffect(
		() => {
			const controls = new OrbitControls(camera, gl.domElement);
		
			controls.minDistance = 3;
			controls.maxDistance = 20;
			return () => {
				controls.dispose();
			};
		},
		[camera, gl]
	);
	return null;
};

function Scene(){
	const v = useContext(AppStateContext);
	const d = useContext(AppDispatchContext);

	return (
		<Canvas
			gl={{ antialias: false, alpha: false }}
			camera={{ position: [0, 3, 5], fov: 90, near: 2, far: 20 }}
			shadowMap
			colorManagement
			// onCreated={({ gl, scene }) => {
			// 	gl.toneMapping = THREE.ACESFilmicToneMapping
			// 	gl.outputEncoding = THREE.sRGBEncoding
			// 	//scene.background = new THREE.Color('#373740')
			// }}
		>
			<AppStateContext.Provider value={v}>
				<AppDispatchContext.Provider value={d}>
					<CameraController />
					<ambientLight intensity={0.5}/>
					<directionalLight
						intensity={0.8} 
						castShadow
						shadow-mapSize-height={512}
						shadow-mapSize-width={512}
					/>
					<Rubiks space="1.04" />
					<Plane
						receiveShadow
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, -5, 0]}
						args={[1000, 1000]}
						color="blue"
					>
						<meshStandardMaterial attach="material" color="" />
					</Plane>
					<Effects />
				</AppDispatchContext.Provider>
			</AppStateContext.Provider>
		</Canvas>
	)
}

export default Scene