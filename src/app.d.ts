// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			data: { loggedIn: boolean; userID: string | undefined } | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
