import C2S from 'canvas2svg';
import dat from 'dat.gui/build/dat.gui';

import './styles/index.css';

const gui = new dat.GUI();

const container = document.querySelector('.container');

const ctx = new C2S(800, 600);
ctx.lineWidth = 0.1;
ctx.fillStyle = '#fff';
ctx.strokeStyle = '#000';

const first = {
	amplitude: 150,
	frequency: 2.01,
	phase: 0,
	delta: 0.0085,
};
const second = {
	amplitude: 150,
	frequency: 3,
	phase: Math.PI * 7 / 16,
	delta: 0,
};
const third = {
	amplitude: 150,
	frequency: 3,
	phase: 0,
	delta: 0.065,
};
const fourth = {
	amplitude: 150,
	frequency: 2,
	phase: 0,
	delta: 0,
};

const drawHarmonograph = () => {
	ctx.clearRect(0, 0, 800, 600);
	ctx.save();
	ctx.translate(400, 300);
	ctx.beginPath();
	for (let t = 0; t < 100; t += 0.01) {
		const x =
			first.amplitude *
				Math.sin(first.frequency * t + Math.PI * first.phase) *
				Math.exp(-first.delta * t) +
			second.amplitude *
				Math.sin(second.frequency * t + Math.PI * second.phase) *
				Math.exp(-second.delta * t);
		const y =
			third.amplitude *
				Math.sin(third.frequency * t + Math.PI * third.phase) *
				Math.exp(-third.delta * t) +
			fourth.amplitude *
				Math.sin(fourth.frequency * t + Math.PI * fourth.phase) *
				Math.exp(-fourth.delta * t);
		ctx.lineTo(x, y);
	}
	ctx.stroke();
	ctx.restore();
	container.appendChild(ctx.getSvg());
};

drawHarmonograph();

const f1 = gui.addFolder('First');
f1.add(first, 'amplitude');
f1.add(first, 'frequency');
f1.add(first, 'phase');
f1.add(first, 'delta');
f1.open();
const f2 = gui.addFolder('Second');
f2.add(second, 'amplitude');
f2.add(second, 'frequency');
f2.add(second, 'phase');
f2.add(second, 'delta');
f2.open();
const f3 = gui.addFolder('Third');
f3.add(third, 'amplitude');
f3.add(third, 'frequency');
f3.add(third, 'phase');
f3.add(third, 'delta');
f3.open();
const f4 = gui.addFolder('Fourth');
f4.add(fourth, 'amplitude');
f4.add(fourth, 'frequency');
f4.add(fourth, 'phase');
f4.add(fourth, 'delta');
f4.open();

const download = () => {
	const element = document.createElement('a');
	element.setAttribute('href', `data:image/svg+xml;charset=utf-8,${ctx.getSerializedSvg()}`);
	element.setAttribute('download', 'harmonograph.svg');
	element.style.display = 'none';
	document.body.appendChild(element);
	setTimeout(() => {
		element.click();
		setTimeout(() => {
			document.body.removeChild(element);
		}, 10);
	}, 10);
};

const obj = { redraw: drawHarmonograph, download };
gui.add(obj, 'redraw');
gui.add(obj, 'download');

window.addEventListener('keydown', e => {
	if (e.keyCode === 82) drawHarmonograph();
});
