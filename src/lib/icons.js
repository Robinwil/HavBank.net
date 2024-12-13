import { addCollection } from '@iconify/svelte';
import heroicons from '@iconify-json/heroicons/icons.json';

// Add the entire Heroicons collection for offline use
addCollection(heroicons);

// Export commonly used icons for convenience
export const icons = {
	// Navigation
	home: 'heroicons:home',
	menu: 'heroicons:bars-3',
	close: 'heroicons:x-mark',

	// Actions
	arrowRight: 'heroicons:arrow-right',
	check: 'heroicons:check',

	// Finance
	banknotes: 'heroicons:banknotes',
	creditCard: 'heroicons:credit-card',
	chartBar: 'heroicons:chart-bar',
	buildingLibrary: 'heroicons:building-library',

	// UI Elements
	user: 'heroicons:user',
	userGroup: 'heroicons:user-group',
	userPlus: 'heroicons:user-plus',
	shield: 'heroicons:shield-check',
	lock: 'heroicons:lock-closed',
	star: 'heroicons:star',

	// Communication
	chat: 'heroicons:chat-bubble-left-right',
	phone: 'heroicons:phone',
	envelope: 'heroicons:envelope',

	// Misc
	calendar: 'heroicons:calendar',
	calculator: 'heroicons:calculator',
	deviceMobile: 'heroicons:device-phone-mobile'
};
