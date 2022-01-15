import Tooltip from '$lib/Primitives/Tooltip.svelte';

export function tooltip(node, key?) {
	let title;
	let tooltipComponent;
	let hotkey;

	function mouseOver(event) {
		// NOTE: remove the `title` attribute, to prevent showing the default browser tooltip
		// remember to set it back on `mouseleave`
		title = node.getAttribute('title');
		node.removeAttribute('title');
		hotkey = node.getAttribute('hotkey');

		tooltipComponent = new Tooltip({
			props: {
				title: title,
				x: event.pageX,
				y: event.pageY,
				key: hotkey
			},
			target: document.body
		});
	}
	function mouseMove(event) {
		tooltipComponent.$set({
			x: event.pageX,
			y: event.pageY
		});
	}
	function mouseLeave() {
		tooltipComponent.$destroy();
		// NOTE: restore the `title` attribute
		node.setAttribute('title', title);
	}

	node.addEventListener('mouseover', mouseOver);
	node.addEventListener('mouseleave', mouseLeave);
	node.addEventListener('mousemove', mouseMove);

	return {
		destroy() {
			node.removeEventListener('mouseover', mouseOver);
			node.removeEventListener('mouseleave', mouseLeave);
			node.removeEventListener('mousemove', mouseMove);
		}
	};
}
