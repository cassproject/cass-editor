// Waits for the CaSS server the tests run against (see e2e/docker-compose.yml).
import { CASS_URL } from './support/env.js';

export default async function globalSetup() {
    const deadline = Date.now() + 180_000;
    let last = '';
    while (Date.now() < deadline) {
        try {
            const res = await fetch(CASS_URL + 'ping');
            const body = await res.json();
            if (body.ping === 'pong') {
                console.log(`CaSS ${body.version} at ${CASS_URL}`);
                return;
            }
            last = JSON.stringify(body).slice(0, 200);
        } catch (ex) {
            last = ex.message;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    throw new Error(`CaSS is not answering at ${CASS_URL}ping (${last}).\n` +
        'Start it with: docker compose -f e2e/docker-compose.yml up -d --wait\n' +
        'or point E2E_CASS_URL at a running CaSS server.');
}
