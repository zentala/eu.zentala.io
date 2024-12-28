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
						{ label: 'Principles', link: '/book/principles/' },
						
					],
				},
				{
					label: 'Language Integration',
					items: [
					  { label: 'Administrative Implementation', link: '/book/language-integration-administrative-implementation/' },
					  { label: 'Media and Cultural Integration', link: '/book/media-cultural-integration/' },
					  { label: 'Economic Growth Through Language Unity', link: '/book/economic-growth-language-unity/' },
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
