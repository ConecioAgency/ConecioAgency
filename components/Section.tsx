import ScrollAnimation from './ScrollAnimation';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className = '', id }: SectionProps) {
  return (
    <ScrollAnimation
      className={`relative py-20 ${className}`}
      direction="up"
      delay={0.2}
    >
      <div id={id} className="container mx-auto px-4">
        {children}
      </div>
    </ScrollAnimation>
  );
} 