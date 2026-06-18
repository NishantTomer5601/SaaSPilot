import { Helmet } from "@dr.pogodin/react-helmet";
import { SITE_DOMAIN } from "@/lib/seo-routes";
import { buildHomeJsonLd, buildPageJsonLd } from "@/lib/seo";

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  isHome?: boolean;
}

export function SeoHead({
  title,
  description,
  path = "/",
  ogType = "website",
  isHome = false,
}: SeoHeadProps) {
  const url = `${SITE_DOMAIN}${path}`;
  const jsonLd = isHome
    ? buildHomeJsonLd()
    : buildPageJsonLd(path, title, description);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="SaaSPilot" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
