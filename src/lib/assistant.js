import { intents, assistantProfile, quickPrompts } from '../data/knowledge';
import { contact } from '../data/site';

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'?\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const STOP_WORDS = new Set([
  'do', 'i', 'you', 'my', 'me', 'is', 'it', 'a', 'an', 'the', 'to', 'of', 'and', 'or',
  'can', 'what', 'how', 'about', 'for', 'with', 'are', 'was', 'be', 'have', 'has', 'get',
  'please', 'thanks', 'thank', 'would', 'like', 'if', 'in', 'on', 'at', 'we', 'any', 'there',
]);

const tokenize = (question) =>
  question
    .split(' ')
    .map((word) => word.replace(/[^a-z0-9]/g, ''))
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

// Keyword matching is word-boundary based. Plain `includes` let short keywords
// fire inside unrelated words — "train" inside "marathon training injury"
// sent that question to the clinic-location answer. The trailing (s|es) keeps
// plurals working, so "chest pain" still matches "chest pains".
const PHRASE_CACHE = new Map();

function phraseMatcher(phrase) {
  let cached = PHRASE_CACHE.get(phrase);
  if (!cached) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    const plural = /s$/.test(phrase) ? '' : '(?:s|es)?';
    cached = new RegExp(`(?:^|[^a-z0-9'])${escaped}${plural}(?:$|[^a-z0-9'])`);
    PHRASE_CACHE.set(phrase, cached);
  }
  return cached;
}

// Multi-word keywords are worth more than single words, and a keyword whose
// words all appear in any order still counts at a lower weight — so "down my
// leg" still reaches sciatica without a single common word hijacking the query.
const score = (question, tokens, intent) =>
  intent.keywords.reduce((total, keyword) => {
    const phrase = normalize(keyword);
    if (!phrase) return total;
    if (phraseMatcher(phrase).test(question)) return total + (phrase.includes(' ') ? 3 : 1.6);

    const words = phrase.split(' ').filter((word) => word.length > 2);
    if (words.length < 2) return total;
    return words.every((word) => tokens.includes(word)) ? total + 2 : total;
  }, 0);

function findIntent(question) {
  const tokens = tokenize(question);

  const ranked = intents
    .map((intent) => ({ intent, value: score(question, tokens, intent) }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value || b.intent.priority - a.intent.priority);

  const top = ranked[0];
  if (!top) return null;

  // "Do you treat knee pain?" is a question about the knee, not about our
  // treatment list, so a generic intent never wins when a specific one matched.
  if (top.intent.generic) {
    const specific = ranked.find((entry) => !entry.intent.generic);
    if (specific) return specific.intent;
  }

  return top.intent;
}

const fallbackAnswer = () => [
  'I do not have a confident answer for that one, and I would rather not guess about your recovery.',
  `For anything clinical, the most reliable answer comes from a proper assessment — you can request an appointment on this site or call ${contact.phone}.`,
  'In the meantime I can help with booking, opening hours, costs, referrals, what to expect at your first visit, the conditions we treat and the treatments we offer.',
];

export const greeting = () => assistantProfile.greeting;
export const prompts = quickPrompts;

export function resolveAnswer(question) {
  const intent = findIntent(normalize(question));

  if (!intent) {
    return {
      text: fallbackAnswer(),
      chips: ['Book an appointment', 'Treatments we offer', 'Opening hours'],
    };
  }

  return {
    text: intent.answer,
    chips: intent.chips ?? [],
    action: intent.action,
    urgent: Boolean(intent.urgent),
    id: intent.id,
  };
}
