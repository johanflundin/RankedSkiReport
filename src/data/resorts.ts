import type { Resort } from './types';

export const RESORTS: Resort[] = [
  { slug: 'killington', name: 'Killington',         location: 'Vermont, USA',             country: 'usa',     region: 'North America', visited: 'Feb 2024', age: 'three' },
  { slug: 'stratton',   name: 'Stratton',           location: 'Vermont, USA',             country: 'usa',     region: 'North America', visited: 'Mar 2024', age: 'three' },
  { slug: 'aspen',      name: 'Aspen',              location: 'Colorado, USA',            country: 'usa',     region: 'North America', visited: 'Dec 2024', age: 'four' },
  { slug: 'mammoth',    name: 'Mammoth',            location: 'California, USA',          country: 'usa',     region: 'North America', visited: 'Jan 2025', age: 'four' },
  { slug: 'jackson',    name: 'Jackson Hole',       location: 'Wyoming, USA',             country: 'usa',     region: 'North America', visited: 'Feb 2025', age: 'four' },
  { slug: 'whistler',   name: 'Whistler Blackcomb', location: 'British Columbia, Canada', country: 'canada',  region: 'North America', visited: 'Mar 2026', age: 'five', full: true },
  { slug: 'bigsky',     name: 'Big Sky',            location: 'Montana, USA',             country: 'usa',     region: 'North America', visited: 'Mar 2025', age: 'four' },
  { slug: 'telluride',  name: 'Telluride',          location: 'Colorado, USA',            country: 'usa',     region: 'North America', visited: 'Mar 2025', age: 'four' },
  { slug: 'snowbird',   name: 'Snowbird / Alta',    location: 'Utah, USA',                country: 'usa',     region: 'North America', visited: 'Apr 2025', age: 'four' },
  { slug: 'parkcity',   name: 'Park City',          location: 'Utah, USA',                country: 'usa',     region: 'North America', visited: 'Apr 2025', age: 'four', __placeholder: true },
  { slug: 'vail',       name: 'Vail',               location: 'Colorado, USA',            country: 'usa',     region: 'North America', visited: 'Dec 2025', age: 'five', __placeholder: true },
  { slug: 'chamonix',   name: 'Chamonix',           location: 'Haute-Savoie, France',     country: 'france',  region: 'Europe',        visited: 'Jan 2026', age: 'five' },
  { slug: 'cervinia',   name: 'Cervinia',           location: 'Aosta Valley, Italy',      country: 'italy',   region: 'Europe',        visited: 'Jan 2026', age: 'five' },
  { slug: 'solden',     name: 'Sölden',             location: 'Tyrol, Austria',           country: 'austria', region: 'Europe',        visited: 'Feb 2026', age: 'five' },
  { slug: 'stubai',     name: 'Stubaital Glacier',  location: 'Tyrol, Austria',           country: 'austria', region: 'Europe',        visited: 'Feb 2026', age: 'five' },
  { slug: 'obergurgl',  name: 'Obergurgl',          location: 'Tyrol, Austria',           country: 'austria', region: 'Europe',        visited: 'Feb 2026', age: 'five' },
  { slug: 'dolomiti',   name: 'Dolomiti Superski',  location: 'South Tyrol, Italy',       country: 'italy',   region: 'Europe',        visited: 'Feb 2026', age: 'five' },
  { slug: 'zermatt',    name: 'Zermatt',            location: 'Valais, Switzerland',      country: 'swiss',   region: 'Europe',        visited: 'Mar 2026', age: 'five', __placeholder: true },
  { slug: 'valdisere',  name: "Val d'Isère",        location: 'Savoie, France',           country: 'france',  region: 'Europe',        visited: 'Apr 2026', age: 'five', __placeholder: true },
  { slug: 'niseko',     name: 'Niseko',             location: 'Hokkaido, Japan',          country: 'japan',   region: 'Asia',          visited: 'Forthcoming', age: '—', __placeholder: true, forthcoming: true },
];

export const WHISTLER_INDEX = RESORTS.findIndex(r => r.slug === 'whistler');
