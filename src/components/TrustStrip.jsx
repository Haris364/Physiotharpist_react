import Container from './ui/Container';
import { RevealGroup, RevealItem } from './ui/Reveal';
import { trustStrip } from '../data/site';

export default function TrustStrip() {
  return (
    <section aria-label="Practice at a glance" className="border-y border-ink/10 bg-paper">
      <Container size="wide">
        <RevealGroup
          stagger={0.1}
          className="grid grid-cols-2 divide-ink/10 sm:divide-x lg:grid-cols-4"
        >
          {trustStrip.map((item) => (
            <RevealItem
              key={item.label}
              className="px-4 py-7 text-center sm:px-6 sm:py-8 lg:px-8 lg:py-9"
            >
              <p className="font-display text-[1.7rem] font-light leading-none tracking-[-0.02em] text-ink lg:text-[2rem]">
                {item.value}
              </p>
              <p className="mt-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-400">
                {item.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
