export const LOCALES = ['en', 'zh-tw', 'ko'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
	en: 'EN',
	'zh-tw': '中文',
	ko: '한국어',
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
	en: 'en',
	'zh-tw': 'zh-TW',
	ko: 'ko',
};

export const LOCALE_DATE_FORMAT: Record<Locale, string> = {
	en: 'en-US',
	'zh-tw': 'zh-TW',
	ko: 'ko-KR',
};

export function getLocaleFromPathname(pathname: string): Locale {
	if (pathname === '/zh-tw' || pathname.startsWith('/zh-tw/')) {
		return 'zh-tw';
	}

	if (pathname === '/ko' || pathname.startsWith('/ko/')) {
		return 'ko';
	}

	return DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string): string {
	const stripped = pathname.replace(/^\/(zh-tw|ko)(?=\/|$)/, '');
	return stripped === '' ? '/' : stripped;
}

export function localizePath(pathname: string, locale: Locale): string {
	const basePath = stripLocalePrefix(pathname);

	if (locale === DEFAULT_LOCALE) {
		return basePath;
	}

	return `${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${basePath === '/' ? '' : basePath}`;
}

export function getLocaleFromContentId(id: string): Locale {
	if (id.startsWith('zh-tw/')) {
		return 'zh-tw';
	}

	if (id.startsWith('ko/')) {
		return 'ko';
	}

	return DEFAULT_LOCALE;
}

export function getPostLocale(post: { id: string; data: { lang?: string } }): Locale {
	if (post.data.lang && LOCALES.includes(post.data.lang as Locale)) {
		return post.data.lang as Locale;
	}

	return getLocaleFromContentId(post.id);
}

export function getLocalizedPostSlug(id: string, locale: Locale): string {
	if (locale === DEFAULT_LOCALE) {
		return id;
	}

	return id.replace(new RegExp(`^${locale}/`), '');
}
