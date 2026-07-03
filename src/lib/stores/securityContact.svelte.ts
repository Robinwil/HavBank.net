/**
 * Shared reactive state for the security-contact dialog.
 * Clicking any "ta kontakt om sikkerhet/innhold"-style button on the site
 * opens the same dialog, which exposes the security e-mail address and the
 * corresponding PGP public key for responsible disclosure.
 */

export const SECURITY_EMAIL = 'security@r01.no';

/**
 * Canonical OpenPGP v4 fingerprint of the primary key embedded below
 * (ed25519). Verify any key you receive by comparing against this value
 * and against the copy published on r01.no.
 *
 *   gpg --show-keys --with-fingerprint <(curl -s https://r01.no/.well-known/pgp-key.txt)
 */
export const SECURITY_PGP_FINGERPRINT = '9F3B D11F 20C1 6C9C B39A  85C5 37A9 71DF 2A56 D06E';

/** Second, independent source for the same public key (out-of-band verification). */
export const SECURITY_PGP_KEY_URL = 'https://r01.no/.well-known/pgp-key.txt';

/** Machine-readable security contact (RFC 9116). */
export const SECURITY_TXT_URL = 'https://havbank.net/.well-known/security.txt';

export const SECURITY_PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEaVOekRYJKwYBBAHaRw8BAQdAW9BElvkYMiLP98nHZGdKSHVGzZpOR4/d
U13n1OGdK6zNIXNlY3VyaXR5QHIwMS5ubyA8c2VjdXJpdHlAcjAxLm5vPsLA
EQQTFgoAgwWCaVOekQMLCQcJEDepcd8qVtBuRRQAAAAAABwAIHNhbHRAbm90
YXRpb25zLm9wZW5wZ3Bqcy5vcmfsDhiCkDXDSI4xGiu6rayWbUYKGGI2p7xI
1Zy9I8Hs5wMVCggEFgACAQIZAQKbAwIeARYhBJ870R8gwWycs5qFxTepcd8q
VtBuAAAb7wD8D0i0AlEafUEkRjuyZbkqfcmzrciVdFYZtq5Euowt8fEA/3WU
eHX4U2WtuFCyqs62pQ0Zvm/+EVWK1LTYbSoKlM8AzjgEaVOekRIKKwYBBAGX
VQEFAQEHQNFoBRS6Vu0YLS+gvXxzpAdvBtkGb4hdd0WmgzzLe+t7AwEIB8K+
BBgWCgBwBYJpU56RCRA3qXHfKlbQbkUUAAAAAAAcACBzYWx0QG5vdGF0aW9u
cy5vcGVucGdwanMub3JnfkpAeh0rJWp1/AbSG8jQuMuo/sw4JgRMS2ztP9H3
uk0CmwwWIQSfO9EfIMFsnLOahcU3qXHfKlbQbgAAtvIA/1d6MOQcfw5lFnox
VM5H64wRbBYW4U85Y729yvKwMaDtAP9e2ucabpyAgk8JdGuzlv36/VqAETvn
7DmMDfp+cMBUCw==
=x/j8
-----END PGP PUBLIC KEY BLOCK-----`;

export const securityContactState = $state({
	/** @type {boolean} */
	isOpen: false
});

export function openSecurityContact() {
	securityContactState.isOpen = true;
}

export function closeSecurityContact() {
	securityContactState.isOpen = false;
}
