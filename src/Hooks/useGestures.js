import { useEffect, useRef } from 'react';
import useWindowSize from './useWindowSize';

const useGestures = (ref) =>  {
	
	const { windowWidth } = useWindowSize();
	const position = useRef({x: 'x', y: 'y'});
	const points = useRef([]);
	let touches = [];
	let clear = true;
	let running = false;

	const handleGestureStart = (e) => {
		e.preventDefault();
		if (window.PointerEvent) {
			e.target.setPointerCapture(e.pointerId);
		}
		touches.push(e.pointerId);
		if (touches.length <= 1){
			clear = true;
			running = false;
		} else {
			clear = false;
		}
		position.current = getGesturePointFromEvent(e);
		points.current = [position.current, ...points.current];
	}

	const handleGestureMove = (e) => {
		e.preventDefault();
		if (touches.length > 1){
			clear = false;
		}
		position.current = getGesturePointFromEvent(e);
		points.current = [position.current, ...points.current];
	}

	const handleGestureEnd = (e) => {
		e.preventDefault();
		if (touches.length > 1){
			clear = false;
		}
		touches = touches.filter(touch => touch !== e.pointerId);

		if (!running){
			if (touches && touches.length <= 1 && clear){
				running = true;
				setTimeout(() => {
					running = false;
				}, 3000)
				processGesture(points.current, e);
				points.current = [];
			}
		}
	}

	const getGesturePointFromEvent = (e) => {
		var point = {};
		if(e.targetTouches) {
			point.x = e.targetTouches[0].offsetX;
			point.y = e.targetTouches[0].offsetY;
		} else {
			point.x = e.offsetX;
			point.y = e.offsetY;
		}
		return point;
	}

	const processGesture = (points) => {
		if (points.length <= 0) return;

		// get the targets dimensions
		const element_dimensions = ref.current.getBoundingClientRect();

		// more work to determine that it's something resembling a circle
		let half_width = Math.floor(element_dimensions.width / 2);
		let half_height = Math.floor(element_dimensions.height / 2);

		// some circle helpers
		const getQuadrant = (point) => {
			if (point.x < half_width && point.y < half_height){
				return 0;
			} else if (point.x > half_width && point.y < half_height){
				return 1;
			} else if (point.x > half_width && point.y > half_height){
				return 2;
			} else {
				return 3;
			}
		}

		// detect tap
		// first see if the draw path (rough estimate) is longer than the width and height
		if (
			(
				// is pretty short
				points.length < (element_dimensions.width / 5) &&
				points.length < (element_dimensions.height / 5)
			) && (
				// starts and ends in same place
				getQuadrant(points[0]) === getQuadrant(points[points.length - 1])
			)
		){

			// which quandrant tapped
			let quadrant = getQuadrant(points[0]);
			if (quadrant == 0){
				Gestures.dispatch('tap-top-left', {});
			} else if (quadrant == 1){
				Gestures.dispatch('tap-top-right', {});
			} else if (quadrant == 2){
				Gestures.dispatch('tap-bottom-right', {});
			} else {
				Gestures.dispatch('tap-bottom-left', {});
			}
			
		} else if (
			points.length > (element_dimensions.width) &&
			points.length > (element_dimensions.height)
		){

			/*
				pretty sure its a circle by this point
				we could also check that each part is container within the same quadrant of the parent to
				rule out any zigzag stuff, but this should do fine
			*/
			let third_index = Math.floor(points.length / 3);
			let four_points = [
				points[0],
				points[third_index],
				points[third_index * 2],
				points[points.length - 1]
			];
			const four_point_quadrants = four_points.map(point => getQuadrant(point));

			// determine if it's clockwise or counter clockwise
			// first find which axis has the greatest difference between points 1 and 3
			const vertical_disparity   = Math.abs(four_points[0].y - four_points[2].y);
			const horizontal_disparity = Math.abs(four_points[0].x - four_points[2].x);

			// log some more of what we are using to find the circle direction

			if (horizontal_disparity > vertical_disparity){
				// x had the greater disparity
				// if point 2 is lower than point 4, its a counter clockwise circle
				if (four_points[1].y < four_points[3].y){
					Gestures.dispatch('counter-clockwise', {});
				} else {
					Gestures.dispatch('clockwise', {});
				}

			} else {
				// y had the greater disparity
				// if point two is to the left of point 4, its a counter clockwise circle
				if (four_points[1].x < four_points[3].x){
					Gestures.dispatch('counter-clockwise', {});
				} else {
					Gestures.dispatch('clockwise', {});
				}
			}
		/*
			NOT A CIRCLE, LET'S FIGURE OUT THE LINES
		*/
		}	else {

			// define line helper functions
			const isSwiperRight = (points) => {
				// is swipe right
				if (
					points[0].x > points[points.length - 1].x && 
					Math.abs(points[0].x - points[points.length - 1].x) > 50
				){
					return true;
				} 
				// is swipe left
				else if (
					points[0].x < points[points.length - 1].x &&
					Math.abs(points[0].x - points[points.length - 1].x) > 50
				){
					return false;
				}
			}
			const isSwiperUp = (points) => {
				// is swipe up
				if (
					points[0].y < points[points.length - 1].y &&
					Math.abs(points[0].y - points[points.length - 1].y) > 50
				){
					return true;
				} 
				// is swipe down
				else if (
					points[0].y > points[points.length - 1].x &&
					Math.abs(points[0].y - points[points.length - 1].y) > 50
				){
					return false;
				}
			}

			// is closer to a horizontal line than vertical?
			if (
				Math.abs(points[0].x - points[points.length - 1].x) >
				Math.abs(points[0].y - points[points.length - 1].y)
			){
				// is bottom
				const midline_horizontal = element_dimensions.height / 2;
				if (
					(points[0].y > midline_horizontal) &&
					(points[points.length - 1].y > midline_horizontal)
				){
					if (isSwiperRight(points)){
						Gestures.dispatch('bottom-right', {});
					} else {
						Gestures.dispatch('bottom-left', {});
					}
				// is top
				} else if (
					(points[0].y < midline_horizontal) &&
					(points[points.length - 1].y < midline_horizontal)
				){
					if (isSwiperRight(points)){
						Gestures.dispatch('top-right', {});
					} else {
						Gestures.dispatch('top-left', {});
					}
				}
			} else {
				// is left
				const midline_vertical = element_dimensions.width / 2;
				if (
					(points[0].x < midline_vertical) &&
					(points[points.length - 1].x < midline_vertical)
				){
					if (isSwiperUp(points)){
						Gestures.dispatch('left-up', {});
					} else {
						Gestures.dispatch('left-down', {});
					}
				// is right
				} else if (
					(points[0].x > midline_vertical) &&
					(points[points.length - 1].x > midline_vertical)
				){
					if (isSwiperUp(points)){
						Gestures.dispatch('right-up', {});
					} else {
						Gestures.dispatch('right-down', {});
					}
				}
			}
		}
	}

	useEffect(() => {
		let element = ref.current;
		if (windowWidth <= 800){
			element.addEventListener('pointerdown', handleGestureStart, true);
			element.addEventListener('pointermove', handleGestureMove, true);
			element.addEventListener('pointerup', handleGestureEnd, true);
			element.addEventListener('pointercancel', handleGestureEnd, true);
			return () => {
				element.removeEventListener('pointerdown', handleGestureStart, true);
				element.removeEventListener('pointermove', handleGestureMove, true);
				element.removeEventListener('pointerup', handleGestureEnd, true);
				element.removeEventListener('pointercancel', handleGestureEnd, true);
			}
		}
	}, []);

	const Gestures = {
		_events: {},
		dispatch(event, data) {
		  if (!this._events[event]) return;
		  this._events[event].forEach(callback => callback(data))
		},
		subscribe(event, callback) {
		  if (!this._events[event]) this._events[event] = [];
		  this._events[event].push(callback);
		},
		unsubscribe(event) {
		  if (!this._events[event]) return;
		  delete this._events[event];
		}
	}

	return Gestures
}

export default useGestures;