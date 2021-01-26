import React from 'react'

function Cube(props) {
  return (
    <mesh
	  {...props}
	>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
	</mesh>
  )
}

export default Cube