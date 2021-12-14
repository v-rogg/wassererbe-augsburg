export async function loadAssets(two, assets) {
	const agriculturalLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/agricultural.svg', (svg) => {
			assets.agricultural = svg;
			console.log('loaded agricultural');
			resolve();
		});
	});

	const grassLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/grass.svg', (svg) => {
			assets.grass = svg;
			console.log('loaded grass');
			resolve();
		});
	});

	const forestLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/forest.svg', (svg) => {
			assets.forest = svg;
			console.log('loaded forest');
			resolve();
		});
	});

	const industrialLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/industrial.svg', (svg) => {
			assets.industrial = svg;
			console.log('loaded industrial');
			resolve();
		});
	});

	const residentialLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/residential.svg', (svg) => {
			assets.residential = svg;
			console.log('loaded residential');
			resolve();
		});
	});

	const energyLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/energy.svg', (svg) => {
			assets.energy = svg;
			console.log('loaded energy');
			resolve();
		});
	});

	const specialLoad = new Promise<void>((resolve) => {
		two.load('http://localhost:8080/map/special.svg', (svg) => {
			assets.special = svg;
			console.log('loaded special');
			resolve();
		});
	});

	await agriculturalLoad;
	await grassLoad;
	await forestLoad;
	await industrialLoad;
	await residentialLoad;
	await energyLoad;
	await specialLoad;

	console.log('all loaded');
}
