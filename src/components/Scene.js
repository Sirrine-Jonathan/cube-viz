import React, { useContext } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { CubeTextureLoader } from "three";
import Rubiks from './Rubiks'
import * as THREE from 'three'
import { Plane, OrbitControls } from "drei";
import { AppDispatchContext, AppStateContext } from '../State/context'


function Environment() {
	const { scene } = useThree();
	const loader = new CubeTextureLoader();
	// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	const texture = loader.load([
	  "./cube/px.png",
	  "./cube/nx.png",
	  "./cube/py.png",
	  "./cube/ny.png",
	  "./cube/pz.png",
	  "./cube/nz.png",
	]);
	// Set the scene background property to the resulting texture.
	scene.background = texture;
	return null;
}

function Scene(){
	const v = useContext(AppStateContext);
	const d = useContext(AppDispatchContext);

	return (
		<Canvas
			camera={{ position: [0,3,5], fov: 90, near: 2, far: 20 }}
			gl={{ antialias: false, alpha: false }}
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
				<OrbitControls
					enableDamping
					enableZoom={true}
					enablePan={true}
					dampingFactor={0.3}
					rotateSpeed={1.1}
					minPolarAngle={Math.PI / 3.5}
					maxPolarAngle={Math.PI / 1.5}
				/>
					<ambientLight intensity={1}/>
					<directionalLight
						intensity={0.5} 
						castShadow
						shadow-mapSize-height={512}
						shadow-mapSize-width={512}
					/>
					<Rubiks space="1.03" />
					<Plane
						receiveShadow
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, -5, 0]}
						args={[10, 10]}
					>
						<meshLambertMaterial attach="material" color="#fff" />
					</Plane>
					{/* <Environment /> */}
				</AppDispatchContext.Provider>
			</AppStateContext.Provider>
		</Canvas>
	)
}

export default Scene