// Central source of truth for the two portfolio "modes" (calm / playful).
// The chosen mode is persisted so returning visitors skip the chooser and
// land straight on their preferred version.

export const VERSION_KEY = 'portfolio-version';

export const VERSIONS = ['calm', 'playful'];

// Maps a stored version to its landing route.
export const VERSION_ROUTES = {
  calm: '/calm',
  playful: '/playful',
};

// Normalises a stored value, migrating the legacy 'professional' label to 'calm'.
export const normaliseVersion = (value) => {
  if (value === 'professional') return 'calm';
  return VERSIONS.includes(value) ? value : null;
};

// Persists the chosen version (used by the chooser and the in-nav switcher).
export const rememberVersion = (version) => {
  try {
    window.localStorage.setItem(VERSION_KEY, version);
  } catch {
    /* localStorage may be unavailable (private mode) — fail silently */
  }
};
