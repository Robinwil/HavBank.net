import { registerWithRegistry } from "./register";

const env = process.env;
if (
  env.REGISTRY_URL &&
  env.REGISTRY_SIGNING_SECRET &&
  env.REGISTRY_FQDN &&
  env.REGISTRY_NAME
) {
  registerWithRegistry({
    fqdn: env.REGISTRY_FQDN,
    parent_fqdn: env.REGISTRY_PARENT_FQDN,
    name: env.REGISTRY_NAME,
    description: env.REGISTRY_DESCRIPTION,
    registry_url: env.REGISTRY_URL,
    signing_secret: env.REGISTRY_SIGNING_SECRET,
  }).catch((err) => {
    console.error("[registry] registration error:", err);
  });
}
