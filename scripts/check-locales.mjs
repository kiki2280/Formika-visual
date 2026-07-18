import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const localeNames = ["ru", "lv", "en"];
const locales = Object.fromEntries(
  localeNames.map((locale) => [
    locale,
    JSON.parse(
      readFileSync(resolve(`src/locales/${locale}.json`), "utf8"),
    ),
  ]),
);

function flatten(value, prefix = "", output = new Map()) {
  if (typeof value === "string") {
    output.set(prefix, value);
    return output;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Unsupported locale value at "${prefix}"`);
  }

  for (const [key, child] of Object.entries(value)) {
    flatten(child, prefix ? `${prefix}.${key}` : key, output);
  }

  return output;
}

const flattened = Object.fromEntries(
  localeNames.map((locale) => [locale, flatten(locales[locale])]),
);
const referenceKeys = [...flattened.ru.keys()].sort();
const errors = [];

for (const locale of localeNames) {
  const keys = [...flattened[locale].keys()].sort();
  const missing = referenceKeys.filter((key) => !flattened[locale].has(key));
  const extra = keys.filter((key) => !flattened.ru.has(key));

  for (const key of missing) errors.push(`${locale}: missing ${key}`);
  for (const key of extra) errors.push(`${locale}: extra ${key}`);

  for (const [key, value] of flattened[locale]) {
    if (!value.trim()) errors.push(`${locale}: empty ${key}`);
    if (/\[TODO (?:RU|LV|EN)\]/.test(value)) {
      errors.push(`${locale}: TODO marker in ${key}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Locale validation passed: ${referenceKeys.length} keys in ru, lv and en.`,
  );
}
