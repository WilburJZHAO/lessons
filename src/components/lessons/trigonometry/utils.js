/**
 * Pick up a random integer between min(inclusive) and max(inclusive) except the numbers in except array
 * @param Number min
 * @param Number max
 * @param Array<Number> exceptArr
 * @returns A random number
 */
export const pickRandomNumberWithExcept = (min, max, exceptArr = []) => {
	let randomNum;
	do {
		randomNum = Math.floor(Math.random() * (max-min+1)) + min;
	} while ( exceptArr.indexOf(randomNum) !== -1)
	return randomNum;
}

/**
 * Pick up a random element from an array
 * @param Array arr
 */
export const pickRandomElementFromArray = (arr=[]) => {
	if(arr.length === 0) {
		return null;
	}
	const n = Math.floor(Math.random()*arr.length + 1) - 1;
	return arr[n];
}

/**
 * Given a point(x, y) on round and radius(r), calculate the angle.
 * 给定圆周上一点（平面直角坐标系），计算其对应的角度值
 * @param Number x
 * @param Number y
 * @param Number r
 * @returns Angle value
 */
export const getDegree = (x, y, r) => {
	let degree;
	const asinValue = Math.asin(y/r);	// 反正弦值
	if(x>=0 && y>=0) degree = asinValue*(180/Math.PI);			// I quadrant, X axis and Y axis 第一象限及x轴 y轴
	else if(x<0 && y>=0) degree = 180 - asinValue*(180/Math.PI);			// II quadrant, X axis 第二象限及x轴
	else if(x<0 && y<0)	degree = Math.abs(asinValue*(180/Math.PI)) + 180;			// III quadrant 第三象限
	else if(x>=0 && y<0) degree = asinValue*(180/Math.PI) + 360;			// IV quadrant, Y axis 第四象限及y轴
	return Math.round(degree);
}

/**
 * Draw a circle and its corresponding rectangular plane coordinate system
 * 在Canvas上画圆和平面直角坐标系
 * @param Canvas Object canvas
 * @returns ctx Object
 */
 export const drawCircle = (canvas) => {
 		if(!canvas || !canvas.getContext) {
 			return null;
 		}
 		const ctx = canvas.getContext('2d');
		ctx.save();
		ctx.lineWidth = 2;
 		ctx.clearRect(0, 0, canvas.width, canvas.height);
 		/** Width: 600, Height: 600 */
 		/** Center: 300, 300  R: 240 */
 		ctx.beginPath();
 		ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
 		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
 		ctx.font="24px Verdana";
 		ctx.fillText('1', 300, 40); 	// Draw 1 on X axis
 		ctx.fillText('1', 560, 300); 	// Draw 1 on Y axis
 		ctx.fillText('-1', 40, 300); 	// Draw -1 on X axis
 		ctx.fillText('-1', 300, 560);	// Draw -1 on Y axis

 		ctx.beginPath();
 		ctx.strokeStyle = 'rgba(180, 180, 180, 0.8)';
 		for(let i = 1; i <= 9 ; i++) {		// Draw grid on Y direction
 			if( ((240 / 5) * i + 60) === 300 ) {
 				continue;		// Skip Y axis
 			}
 			ctx.moveTo( (240 / 5) * i + 60, 58);
 			ctx.lineTo( (240 / 5) * i + 60, 542);
 			ctx.stroke();
 		}

 		for(let i = 1; i <= 9; i++) {		// Draw grid on X direction
 			if( ((240 / 5) * i + 60) === 300 ) {
 				continue;		// Skip X axis
 			}
 			ctx.moveTo( 58, (240 / 5) * i + 60);
 			ctx.lineTo( 542, (240 / 5) * i + 60);
 			ctx.stroke();
 		}

 		ctx.strokeRect(58, 58, 484, 484);	// Draw outer square
		ctx.lineWidth = 4;
 		ctx.beginPath();
 		ctx.strokeStyle = 'rgba(50, 90, 250, 0.8)';
 		ctx.moveTo(58, 300);
 		ctx.lineTo(542, 300);	// Draw X axis
 		ctx.stroke();
 		ctx.moveTo(300, 58);
 		ctx.lineTo(300, 542);	// Draw Y axis
 		ctx.stroke();
 		ctx.strokeStyle = 'rgba(255, 45, 45, 0.8)';
 		ctx.beginPath();
 		ctx.arc(300, 300, 240, 0, Math.PI * 2, true); // Draw circle
 		ctx.stroke();
		ctx.restore();
 }

/**
 * Draw the position on circle based on where mouse clicked
 * @param Canvas Object
 * @param x The position where mouse clicked (X direction)
 * @param y The position wehre mouse clicked (Y direction)
 * @returns degree
 */
export const drawPosition = (canvas, clientX, clientY) => {
	const ctx = canvas.getContext('2d');
	const rect = canvas.getBoundingClientRect();

	// Get the position on canvas when user clicks mouse.
	const x = (clientX - rect.left) * (canvas.width / rect.width);
	const y = (clientY - rect.top) * (canvas.height / rect.height);

	// Get the distance from click position to center
	const r = Math.sqrt((x - 300) * (x - 300) + (y - 300) * (y - 300));
	// Check if the mouse is clicked within the circle area
	if (r > 0 && r <= 240) {		// If click happens within the circle
		drawCircle(canvas);
		const xToCenter = x - 300;
		const yToCenter = 300 - y;	// Get the position relative to center

		const xToCenterR = xToCenter * (240 / r);
		const yToCenterR = yToCenter * (240 / r);	// Get the position on circle(relative to center)

		const degree = getDegree(xToCenterR, yToCenterR, 240);

		const xEnd = 300 + xToCenterR;
		const yEnd = 300 - yToCenterR;	// Get the position on circle(relative to up-left point)
		ctx.save();
		ctx.lineWidth = 3;
		// draw guides
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255, 60, 230, 0.5)';
		ctx.moveTo(xEnd, yEnd);
		ctx.lineTo(xEnd ,300);
		ctx.stroke();
		ctx.moveTo(xEnd, yEnd);
		ctx.lineTo(300, yEnd);
		ctx.stroke();

		// draw angles
		ctx.strokeStyle = 'rgba(255, 50, 50, 1)';
		ctx.beginPath();
		ctx.moveTo(300, 300);
		ctx.lineTo(540, 300);
		ctx.moveTo(300, 300);
		ctx.lineTo(xEnd, yEnd);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(300, 300, 60, 0, (360 - degree) * (Math.PI/180), true);
		ctx.stroke();
		ctx.restore();
		return degree;
	} else {
		return null;
	}
}


// DONE TO HERE



export const drawCoord = (canvas) => {
		/**
		 * Width: 600, Height: 300
		 * X axis: 300, Y axis: 120 ???? TODO - work this out - double???
		 */
		if(!canvas || !canvas.getContext) {
			return null;
		}
		const ctx = canvas.getContext('2d');

		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(180, 180, 180, 1)';
		ctx.strokeRect(0, 20, 600, 240);

		ctx.beginPath();
		ctx.strokeStyle = 'blue';
		ctx.moveTo(0, 20);
		ctx.lineTo(0, 260);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, 140);
		ctx.lineTo(600, 140);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = 'rgba(50, 50, 255, 1)';
		ctx.font="24px Verdana";
		ctx.fillText('X', 574, 130);
		ctx.fillText('Y', 6, 50);
		// ctx.fillText('0', 8, 165);
		ctx.restore();

}

/**
 * Draw sin wave
 */
export const drawSinWave = (canvas, degree = 0) => {
	if(!canvas || !canvas.getContext) {
		return null;
	}
	if(!degree) {
		return null;
	}
	drawCoord(canvas);
	const ctx = canvas.getContext('2d');

	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
	let startX = 0, startY = 140;

	for(let i = 0; i <= degree; i++) {	// i - degree (the value on X axis)
		ctx.moveTo(startX, startY);  // start point

		let endX = i * 600 / 360; // 300 - X轴在Canvas上的长度
		// 360 - 实际X轴上应有数

		// 70 - 坐标原点到Canvas原点的距离
		// 60 - 120/2 坐标Y轴的高度
		let endY = 140 - Math.sin(i * Math.PI / 180) * 120;
		// counter += increase;
		ctx.lineTo(endX, endY);
		ctx.stroke();

		startX = endX; startY = endY;	// 记录下一次的开始点位置
	}

	ctx.font = '18px Verdana';
	// ctx.fillText('X:' + (degree*Math.PI/180).toFixed(2) + 'radian', 12, 115);
	// ctx.fillText('Y:' + Math.sin(degree*Math.PI/180).toFixed(2), 12, 125);
	ctx.fillText( (degree * Math.PI / 180).toFixed(2), degree / 360 * 600, 160);

	ctx.beginPath();
	ctx.strokeStyle="rgba(255, 30, 30, 0.8)";
	ctx.moveTo(startX, startY);
	ctx.lineTo(startX, 140);
	ctx.stroke();
	ctx.moveTo(startX, startY);
	ctx.lineTo(0, startY);
	ctx.stroke();
	ctx.restore();
}

/**
 * Draw cos wave
 */
export const drawCosWave = (canvas, degree = 0) => {
	if(!canvas || !canvas.getContext) {
		return null;
	}
	if(!degree) {
		return null;
	}
	drawCoord(canvas);
	const ctx = canvas.getContext('2d');
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

	let startX = 0, startY = 20;
	for(let i = 0; i <= degree; i++) {
		ctx.moveTo(startX, startY);
		let endX = i * 600 / 360;
		let endY = 140 - Math.cos(i * Math.PI / 180) * 120;
		ctx.lineTo(endX, endY);
		ctx.stroke();
		startX = endX; startY = endY;
	}

	ctx.font = '18px Verdana';
	// ctx.fillText('X:' + (degree*Math.PI/180).toFixed(2) + 'radian', 12, 115);
	// ctx.fillText('Y:' + Math.sin(degree*Math.PI/180).toFixed(2), 12, 125);
	ctx.fillText( (degree * Math.PI / 180).toFixed(2), degree / 360 * 600, 160);

	ctx.beginPath();
	ctx.strokeStyle="rgba(255, 30, 30, 0.8)";
	ctx.moveTo(startX, startY);
	ctx.lineTo(startX, 140);
	ctx.stroke();
	ctx.moveTo(startX, startY);
	ctx.lineTo(0, startY);
	ctx.stroke();
	ctx.restore();
}