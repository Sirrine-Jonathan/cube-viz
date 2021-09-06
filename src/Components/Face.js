import React from 'react'
import FaceZero from './FaceZero'
import FaceOne from './FaceOne'
import FaceTwo from './FaceTwo'

function Face(props){

	const getFace = () => {
		if (props.type === 0){
			return <FaceZero {...props} />
		} else if (props.type === 1){
			return <FaceOne {...props} />
		} else {
			return <FaceTwo {...props} />
		}
	}

	return (
		getFace()
	)
}

export default Face