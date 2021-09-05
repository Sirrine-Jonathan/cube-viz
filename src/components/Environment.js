import { useThree } from 'react-three-fiber'
import { CubeTextureLoader } from "three"

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

export default Environment;