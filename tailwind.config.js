import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				grey: '#D9D9D9',
				maristred: '#C9072A',
				maristgrey: '#ACADAD',
			},
		},
	},
	plugins: [skeleton],
};
