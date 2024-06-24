import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://eu.zentala.io',
	integrations: [
		starlight({
			title: 'EU Reforms',
			social: {
				github: 'https://github.com/zentala/eu.zentala.io',
			},
			sidebar: [
				{
					label: 'Book',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Reasons', link: '/book/reasons/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
