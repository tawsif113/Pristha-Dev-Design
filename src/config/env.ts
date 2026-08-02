interface PublicEnvironment {
  siteUrl: string;
  apiBaseUrl?: string;
  analyticsId?: string;
}

export function getPublicEnvironment(): PublicEnvironment {
  return {
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000",
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  };
}
