import { useContext } from 'react'
import styled from 'styled-components'
import { AppDispatchContext } from '../State/context'

const Container = styled.div`
	position: absolute;
	background: rgba(213,213,213,0.5);
	padding: 10px 20px;
	color: #000;
	top: 0;
	left: 0;
	z-index: 2;
	text-align: center;
	width: 100%;
	box-sizing: border-box;
`;

const Button = styled.button`
	padding: 4px 15px 3px;
	margin: 4px 2px;
	border: 1px solid #333;
	border-radius: 3px;
	background: transparent;
	&:hover {
		background: rgba(213,213,213, 0.2);
		cursor: pointer;
	}
`;

const Title = () => {
	const dispatch = useContext(AppDispatchContext);
	return (
		<Container>
			Rubik's Cube
			<div style={{
				fontSize: '10px',
				letterSpacing: '5px',
				textTransform: 'uppercase',
				textAlign: 'center'
			}}>
				Visualizer
			</div>
			<div>
				<Button onClick={() => {
					dispatch({type: 'mix'});
				}}>Mix</Button>
				<Button onClick={() => {
					dispatch({type: 'undo'});
				}}>Undo</Button>
			</div>
		</Container>
	)
}

export default Title;