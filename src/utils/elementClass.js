const ELEMENT_CLASSES = {
	fire: 'badge--fire',
	water: 'badge--water',
	wind: 'badge--wind',
	earth: 'badge--earth',
};

export const getElementBadgeClass = (element) =>
	ELEMENT_CLASSES[element] || 'badge--default';

export const getElementLabel = (element) => {
	const labels = {
		fire: 'Огонь',
		water: 'Вода',
		wind: 'Ветер',
		earth: 'Земля',
	};
	return labels[element] || element;
};
