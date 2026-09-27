import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUp, Bot, CalendarCheck, RotateCcw, Sparkles, X } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { cn } from '../../lib/cn';
import { useEscapeKey, useLockBodyScroll } from '../../hooks/useUi';
import { prompts, resolveAnswer } from '../../lib/assistant';
import { askAssistant } from '../../lib/api';
import { assistantProfile } from '../../data/knowledge';
import { contact } from '../../data/site';

let messageId = 0;
const nextId = () => {
  messageId += 1;
  return `m${messageId}`;
};

const openingMessage = () => ({
  id: nextId(),
  from: 'bot',
  text: [assistantProfile.greeting],
  chips: prompts.slice(0, 3),
});

export default function CareAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([openingMessage]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const reduce = useReducedMotion();
  const panelId = useId();

  useLockBodyScroll(open);
  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 420);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, typing, reduce]);

  const respond = useCallback(
    async (question) => {
      setTyping(true);
      const remote = await askAssistant(question).catch(() => null);
      const answer = remote ?? resolveAnswer(question);
      const delay = reduce ? 120 : 520;
      await new Promise((resolve) => window.setTimeout(resolve, delay));
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: 'bot', text: answer.text, chips: answer.chips, action: answer.action, urgent: answer.urgent },
      ]);
    },
    [reduce],
  );

  const send = useCallback(
    (raw) => {
      const question = raw.trim();
      if (!question || typing) return;
      setMessages((prev) => [...prev, { id: nextId(), from: 'user', text: [question] }]);
      setInput('');
      respond(question);
    },
    [respond, typing],
  );

  const onSubmit = (event) => {
    event.preventDefault();
    send(input);
  };

  const onChipClick = (chip) => {
    if (chip === 'Call the clinic') {
      window.location.assign(contact.phoneHref);
      return;
    }
    send(chip);
  };

  const restart = useCallback(() => setMessages([openingMessage()]), []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close the clinic assistant' : 'Open the clinic assistant'}
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(
          'group fixed bottom-5 right-5 z-[55] flex h-14 items-center gap-3 rounded-full pl-4 pr-5 text-sm font-medium shadow-lift transition-colors duration-400 ease-premium motion-safe:animate-assistant-in',
          open ? 'bg-ink text-white' : 'bg-ink text-white hover:bg-teal',
        )}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-mint text-ink">
          {open ? (
            <X className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          ) : (
            <Bot className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          )}
          {!open ? (
            <span
              className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-mint ring-2 ring-ink"
              aria-hidden="true"
            />
          ) : null}
        </span>
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask about your care'}</span>
        <span className="sm:hidden">{open ? 'Close' : 'Ask'}</span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            key="assistant"
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label={`${assistantProfile.name}, ${assistantProfile.role}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="fixed inset-x-3 bottom-24 z-[54] flex max-h-[min(34rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-panel sm:inset-x-auto sm:right-5 sm:w-[24.5rem]"
          >
            <header className="flex items-center gap-3 border-b border-ink/8 bg-white px-4 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-ink">
                <Bot className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.9rem] font-medium text-ink">{assistantProfile.name}</p>
                <p className="flex items-center gap-1.5 text-[0.72rem] text-ink-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
                  {assistantProfile.role}
                </p>
              </div>
              <button
                type="button"
                onClick={restart}
                aria-label="Start a new conversation"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </header>

            <div
              ref={listRef}
              className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((message) => (
                <div key={message.id} className="space-y-2.5">
                  {message.text.map((paragraph, i) =>
                    message.from === 'user' ? (
                      <p
                        key={i}
                        className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-white"
                      >
                        {paragraph}
                      </p>
                    ) : (
                      <p
                        key={i}
                        className={cn(
                          'max-w-[92%] whitespace-pre-line rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[0.875rem] leading-relaxed',
                          message.urgent
                            ? 'bg-clay/12 text-ink ring-1 ring-clay/25'
                            : 'bg-white text-ink-600 ring-1 ring-ink/8',
                        )}
                      >
                        {paragraph}
                      </p>
                    ),
                  )}

                  {message.from === 'bot' && message.chips?.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {message.chips.map((chip) => (
                        <li key={chip}>
                          <button
                            type="button"
                            onClick={() => onChipClick(chip)}
                            className="rounded-full border border-ink/15 px-3 py-1.5 text-[0.78rem] text-ink-600 transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-white"
                          >
                            {chip}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {message.action ? (
                    <Link
                      to={message.action.replace('navigate:', '')}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 rounded-full bg-teal px-3.5 py-2 text-[0.8rem] font-medium text-white transition-colors hover:bg-teal-600"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
                      Go to booking
                    </Link>
                  ) : null}
                </div>
              ))}

              {typing ? (
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 ring-1 ring-ink/8">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-teal/60"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.16 }}
                    />
                  ))}
                  <span className="sr-only">Assistant is typing</span>
                </div>
              ) : null}
            </div>

            <div className="border-t border-ink/8 bg-white px-4 py-3">
              <p className="mb-2.5 flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-ink-400">
                <Sparkles className="mt-px h-3 w-3 shrink-0 text-teal" strokeWidth={1.6} aria-hidden="true" />
                {assistantProfile.disclaimer}
              </p>
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <label htmlFor={`${panelId}-input`} className="sr-only">
                  Type your question
                </label>
                <input
                  id={`${panelId}-input`}
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about treatments, hours, costs…"
                  autoComplete="off"
                  className="h-11 flex-1 rounded-full border border-ink/12 bg-paper px-4 text-[0.875rem] text-ink transition-colors placeholder:text-ink-400/70 focus:border-teal focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-teal disabled:opacity-35"
                >
                  <ArrowUp className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
