import { useInView } from 'react-intersection-observer';
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiPython,
  SiDocker, SiPostgresql, SiMongodb, SiGraphql, SiFlutter,
  SiFirebase, SiFigma, SiKubernetes,
  SiRedis, SiTensorflow, SiVuedotjs, SiGo,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import './TechStack.css';

const row1 = [
  { Icon: SiReact,       name: 'React' },
  { Icon: SiNextdotjs,   name: 'Next.js' },
  { Icon: SiNodedotjs,   name: 'Node.js' },
  { Icon: SiTypescript,  name: 'TypeScript' },
  { Icon: SiPython,      name: 'Python' },
  { Icon: SiDocker,      name: 'Docker' },
  { Icon: SiPostgresql,  name: 'PostgreSQL' },
  { Icon: SiMongodb,     name: 'MongoDB' },
  { Icon: SiGraphql,     name: 'GraphQL' },
];

const row2 = [
  { Icon: SiFlutter,     name: 'Flutter' },
  { Icon: FaAws,         name: 'AWS' },
  { Icon: SiFirebase,    name: 'Firebase' },
  { Icon: SiFigma,       name: 'Figma' },
  { Icon: SiKubernetes,  name: 'Kubernetes' },
  { Icon: SiRedis,       name: 'Redis' },
  { Icon: SiTensorflow,  name: 'TensorFlow' },
  { Icon: SiVuedotjs,    name: 'Vue.js' },
  { Icon: SiGo,          name: 'Go' },
];

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div className="techstack__marquee">
      <div className={`techstack__track${reverse ? ' techstack__track--reverse' : ''}`}>
        {doubled.map(({ Icon, name }, i) => (
          <div key={i} className="techstack__item">
            <Icon className="techstack__icon" />
            <span className="techstack__name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="techstack section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <h2 className="section-title">Stack tecnológico</h2>
          <p className="section-subtitle">
            Seleccionamos cada herramienta con criterio — priorizando rendimiento, mantenibilidad y adopción en la industria.
          </p>
        </div>
      </div>

      <div className="techstack__rows">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
