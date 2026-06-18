import { SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from "./seo-routes";

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

export function buildHomeJsonLd(): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_DOMAIN}/#website`,
        url: SITE_DOMAIN,
        name: SITE_NAME,
        description: SITE_TAGLINE,
        publisher: { "@id": `${SITE_DOMAIN}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_DOMAIN}/#organization`,
        name: SITE_NAME,
        url: SITE_DOMAIN,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_DOMAIN}/SaaSPilotLogo.png`,
        },
        sameAs: [
          "https://twitter.com/saaspilot",
          "https://linkedin.com/company/saaspilot",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_DOMAIN}/#webpage`,
        url: SITE_DOMAIN,
        name: `${SITE_NAME} — The SaaS Knowledge Hub`,
        isPartOf: { "@id": `${SITE_DOMAIN}/#website` },
        about: { "@id": `${SITE_DOMAIN}/#organization` },
        description: SITE_TAGLINE,
      },
    ],
  };
}

export function buildPageJsonLd(path: string, title: string, description: string): JsonLdGraph {
  const url = `${SITE_DOMAIN}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_DOMAIN}/#website` },
        about: { "@id": `${SITE_DOMAIN}/#organization` },
      },
    ],
  };
}
