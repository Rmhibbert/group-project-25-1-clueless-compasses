import { writable } from 'svelte/store';

export const selectedAgency = writable('All');
export const selectedPage = writable('All');

export let hazardAddress= writable(''); //this is used for both incident and hazard pages
export let searchQuery=writable('');

