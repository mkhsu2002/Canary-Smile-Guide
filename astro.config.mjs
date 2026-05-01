// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://smile-guild.canarydentalsurrey.com',
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					'zh-tw': 'zh-TW',
					ko: 'ko-KR',
				},
			},
		}),
	],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh-tw', 'ko'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
