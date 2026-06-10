import {
  SiReact, SiVite, SiNodedotjs, SiExpress, SiMongodb,
  SiMongoose, SiTailwindcss, SiFramer, SiGooglegemini,
  SiAnthropic, SiVercel, SiRender, SiCloudinary,
  SiJsonwebtokens, SiFigma
} from 'react-icons/si';
import './TechStack.css';

const row1 = [
  { Icon: SiReact,       name: 'React' },
  { Icon: SiVite,        name: 'Vite' },
  { Icon: SiNodedotjs,   name: 'Node.js' },
  { Icon: SiExpress,     name: 'Express' },
  { Icon: SiMongodb,     name: 'MongoDB' },
  { Icon: SiMongoose,    name: 'Mongoose' },
  { Icon: SiTailwindcss, name: 'Tailwind CSS' },
  { Icon: SiFramer,      name: 'Framer Motion' },
];

const row2 = [
  { Icon: SiGooglegemini, name: 'Gemini AI' },
  { Icon: SiAnthropic,    name: 'Claude' },
  { Icon: SiVercel,       name: 'Vercel' },
  { Icon: SiRender,       name: 'Render' },
  { Icon: SiCloudinary,   name: 'Cloudinary' },
  { Icon: SiJsonwebtokens, name: 'JWT' },
  { Icon: SiFigma,        name: 'Figma' },
];

function MarqueeRow({ items, reverse = false }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="techstack__marquee">
      <div className={`techstack__track${reverse ? ' techstack__track--reverse' : ''}`}>
        {repeated.map(({ Icon, name }, i) => (
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
