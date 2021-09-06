import styled from 'styled-components'

const Container = styled.div`
	position: absolute;
	transition: all 0.3s;
	background: rgba(213,213,213, 0.5);
	color: #000;
	left: 50%;
	bottom: 50px;
	transform: translate(-50%, 0) scale(${props => (props.show) ? 1:0.001});
	opacity: ${props => (props.show) ? '1':'0'};
	z-index: 2;
	text-align: center;
`;

const Title = styled.div`
	font-size: 18px;
	width: 100%;
	text-align: left;
	background: rgba(13,13,13,0.3);
	box-sizing: border-box;
	padding: 3px 15px;
`;

const Inner = styled.div`
	font-size: 14px;
	padding: 5px 15px;
`;

const Row = styled.div`
	text-align: left;
`;

const Help = ({ show }) => {
	return (
		<Container show={show}>
			<Title>Moves</Title>
			<Inner>
				<Row>Clockwise: u, l, f, r, b, d</Row>
				<Row>Counter Clockwise: U, L, F, R, B, D</Row>
				<Row>Slice Turns: m, M, e, E, s, S</Row>
			</Inner>
		</Container>
	)
}

export default Help;