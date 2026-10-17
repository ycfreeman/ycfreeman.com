// oxlint-disable-next-line typescript/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ycfreeman-com",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
      providers: {
        cloudflare: "6.22.1",
      },
    };
  },
  async run() {
    const production = $app.stage === "production";

    new sst.cloudflare.StaticSiteV2("Site", {
      build: {
        command: "pnpm build",
        output: "out",
      },
      notFound: "404",
      domain: production ? "www.ycfreeman.com" : undefined,
    });

    if (!production) return;

    // SST's `domain.redirects` uses Page Rules, which reject account-owned API tokens.
    const zone = cloudflare.getZoneOutput({
      filter: { name: "ycfreeman.com" },
    });

    new cloudflare.DnsRecord("ApexRecord", {
      zoneId: zone.id,
      name: "ycfreeman.com",
      type: "AAAA",
      content: "100::",
      proxied: true,
      ttl: 1,
    });

    new cloudflare.Ruleset("Redirects", {
      zoneId: zone.id,
      name: "Redirects",
      kind: "zone",
      phase: "http_request_dynamic_redirect",
      rules: [
        {
          action: "redirect",
          expression: 'http.host eq "ycfreeman.com"',
          actionParameters: {
            fromValue: {
              statusCode: 301,
              targetUrl: {
                expression:
                  'concat("https://www.ycfreeman.com", http.request.uri.path)',
              },
              preserveQueryString: true,
            },
          },
        },
        {
          action: "redirect",
          expression: "not ssl",
          actionParameters: {
            fromValue: {
              statusCode: 301,
              targetUrl: {
                expression:
                  'concat("https://", http.host, http.request.uri.path)',
              },
              preserveQueryString: true,
            },
          },
        },
      ],
    });
  },
});
