import React, { useContext, useEffect} from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import Rubiks from './Rubiks'
import * as THREE from 'three'
import { Plane, Html } from "drei";
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
			onCreated={({ gl, scene }) => {
				gl.toneMapping = THREE.ACESFilmicToneMapping
				gl.outputEncoding = THREE.sRGBEncoding
				scene.background = new THREE.Color('#75A1D0')
			}}
		>
			<AppStateContext.Provider value={v}>
				<AppDispatchContext.Provider value={d}>
					<CameraController />
					<ambientLight intensity={1}/>
					<directionalLight
						intensity={0.5} 
						castShadow
						shadow-mapSize-height={512}
						shadow-mapSize-width={512}
					/>
					
					<Html scaleFactor={10} position={[-2,5,0]} append>
						<h1>Cube Visualizer</h1>
						<h4>By Jonathan Sirrine</h4>
					</Html>
					<Rubiks space="1.5" />
					<Plane
						receiveShadow
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, -5, 0]}
						args={[1000, 1000]}
						color={"blue"}
					>
						<meshLambertMaterial attach="material" color="#a1d075" />
					</Plane>
					<Effects />
				</AppDispatchContext.Provider>
			</AppStateContext.Provider>
		</Canvas>
	)
}

export default Scene