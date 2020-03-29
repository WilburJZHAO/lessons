/**
 * Pick up a random number between min(inclusive) and max(exclusive)
 */
const pickRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generate an area of a triangle
 * @param Boolean hasDecimal
 * @return Number a random value which represents the area of a triangle
 */
export const generateTriangleArea = (hasDecimal = false) => {
	let angle = pickRandomNumber(10, 40);
	if(hasDecimal) {
		angle = angle - .5 * (Math.random() > 0.2 ? 1 : 0);
	}
	return angle;
}

/**
 * Draw grid on canvas
 */
export const drawGrid = (canvas) => {
	if(!canvas || !canvas.getContext) {
		return null;
	}
	const ctx = canvas.getContext('2d');
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgba(119, 218, 230, 0.7)';
	for(let i = 0; i <= 15; i++) {	// Draw grid on Y direction
		ctx.moveTo(30 + 36 * i, 10);
		ctx.lineTo(30 + 36 * i , 370);
		ctx.stroke();
	}
	for(let i = 0; i <= 10; i++) {	// Draw grid on X direction
		ctx.moveTo(30, 10 + 36 * i);
		ctx.lineTo(570, 10 + 36 * i);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.fillStyle = "rgba(50, 120, 255, 1)";
	ctx.font ="20px Verdana";
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle';

	ctx.fillText('0', 13, 385);

	for(let i = 1; i <= 10; i++) { // y axis labels
			ctx.fillText(i, 13, (370 - 36 * i));
	}
	for(let i = 1; i <= 15; i++) { // x axis labels
			ctx.fillText(i, 30 + 36 * i , 385);
	}
	ctx.restore();
}

/**
 * 将平面直角坐标系上的点转换成Canvas上的坐标
 * Convert from Cartesian plane point to Canvas coordinates
 */
export const cartesianToCanvas = (x, y) => {
	return {
		canvasX: x * 36 + 30,
		canvasY: 400 - 30 - y * 36
	}
};

/**
 * 将Canvas上的坐标转换成平面直角坐标系上的点
 * Convert from Canvas coordinates to Cartesian plane point
 */
export const canvasToCartesian = (canvasX, canvasY) => {
	return {
		x: (canvasX - 30) / 36,
		y: (400 - 30 - canvasY) / 36
	}
}

/**
 * Draw triangle on canvas
 * @param Object canvas
 * @param Object p1 point with height
 * @param Object p2 point on X axis
 * @param Object p0 point on origin point, (0, 0) by default
 */
export const drawTriangle = (canvas, p1, p2, p0 = {x: 0, y:0}) => {
	if(!canvas || !canvas.getContext) {
		return null;
	}
	const canvasP1 = cartesianToCanvas(p1.x, p1.y);
	const canvasP2 = cartesianToCanvas(p2.x, p2.y);
	const canvasP0 = cartesianToCanvas(p0.x, p0.y);
	const ctx = canvas.getContext('2d');
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = '#000';
	ctx.fillStyle = 'rgba(245, 180, 50, 0.4)';
	ctx.moveTo(canvasP0.canvasX, canvasP0.canvasY);
	ctx.lineTo(canvasP1.canvasX, canvasP1.canvasY);
	ctx.lineTo(canvasP2.canvasX, canvasP2.canvasY);
	ctx.lineTo(canvasP0.canvasX, canvasP0.canvasY);
	// Draw triangle
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

/**
 * Draw a circle where user can click and drag the point
 */
export const drawDraggableArea = (canvas, p) => {
	if(!canvas || !canvas.getContext) {
		return null;
	}
	const ctx = canvas.getContext('2d');
	const canvasP = cartesianToCanvas(p.x, p.y);
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.fillStyle = 'rgba(230, 0, 0, 0.15)';
	ctx.strokeStyle = 'rgba(230, 0, 0, 1)';
	ctx.arc(canvasP.canvasX, canvasP.canvasY, 10, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

/** Allow user to drag p1 i.e. height of triangle */
export const dragHeight = (canvas, clientX, clientY, p1, p2) => {
	const ctx = canvas.getContext('2d');
	const rect = canvas.getBoundingClientRect();

	// The position on canvas
	const canvasX = (clientX - rect.left)*(canvas.width/rect.width);
	const canvasY = (clientY - rect.top)*(canvas.height/rect.height);
	// console.log(canvasX, canvasY);
	// const canvasP1 = cartesianToCanvas(p1.x, p1.y);
	// const dToP1 = Math.sqrt((canvasX-canvasP1.canvasX)*(canvasX-canvasP1.canvasX) + (canvasY-canvasP1.canvasY)*(canvasY-canvasP1.canvasY) );
	let {x, y} = canvasToCartesian(canvasX, canvasY);	// 获得在平面直角坐标系中的位置

	let newP1 = p1;
	if(x>=0 && x<=15 && y>=1) {	// 如果y>=0.5 则移动三角形的高
		if(y > 10) {
			newP1 = { x, y: 10 };
		} else {
			newP1 = {x, y};
		}
		// console.log(newP1);
		// if(x>=0 && x<=15 && y<=10) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawGrid(canvas);
			drawTriangle(canvas, newP1, p2);
			drawDraggableArea(canvas, newP1);
			drawDraggableArea(canvas, p2);
		// }
	}
	return newP1;
}

export const clearCanvas = (canvas) => {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/** Allow user to drag p2 i.e. base of triangle */
export const dragBase = (canvas, clientX, clientY, p1, p2) => {
	const ctx = canvas.getContext('2d');
	const rect = canvas.getBoundingClientRect();

	// The position on canvas
	const canvasX = (clientX - rect.left)*(canvas.width/rect.width);
	const canvasY = (clientY - rect.top)*(canvas.height/rect.height);
	// console.log(canvasX, canvasY);
	// const canvasP1 = cartesianToCanvas(p1.x, p1.y);
	// const dToP1 = Math.sqrt((canvasX-canvasP1.canvasX)*(canvasX-canvasP1.canvasX) + (canvasY-canvasP1.canvasY)*(canvasY-canvasP1.canvasY) );
	let {x, y} = canvasToCartesian(canvasX, canvasY);	// 获得在平面直角坐标系中的位置
	// if(x<0) x=0;
	// if(x>15) x=15;
	// if(y<=0.5) y=0.5;
	// if(y>10) y=10;
	let newP2 = p2;
	if(y>=-0.5 && y<=0.5 && x>=1) {	// 如果y<0.5，则移动三角形的底边
		if(x > 10) {
			newP2 = {x: 10, y: 0};
		} else {
			newP2 = {x, y: 0};
		}
		// if(x>=0 && x<=10) {
			clearCanvas(canvas);
			drawGrid(canvas);
			drawTriangle(canvas, p1, newP2);
			drawDraggableArea(canvas, p1);
			drawDraggableArea(canvas, newP2);
		// }
	}
	return newP2;
}