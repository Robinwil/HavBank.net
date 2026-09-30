// Every page is static content, so prerender at build time and let the adapter
// serve plain files. Routes that need the server opt out with `prerender = false`
// (the /sparing and /tjenester redirects, and pages that read query params at SSR).
export const prerender = true;
