// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			data: { userID: string | undefined; username: string | undefined } | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
