import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import LogoMark from '../brand/LogoMark';
import siteConfig from '../../config/siteConfig';
import './Hero.css';

const floatingKeywords = ['React', 'Node.js', 'AI', 'Cloud', 'APIs', 'DevOps', 'ML', 'Flutter'];

export default function Hero() {
    const { company } = siteConfig;

    return (
        <section id="hero" className="hero">

            <div className="container hero__container">
                <motion.div
                    className="hero__content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="hero__badge-row"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="hero__badge-pill">
                            <span className="hero__badge-dot" />
                            Disponibles para nuevos proyectos
                        </span>
                    </motion.div>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        {company.tagline.split(' ').map((word, i) => (
                            <span key={i} className={i >= company.tagline.split(' ').length - 2 ? 'hero__title-accent' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                    >
                        {company.description}
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <a href="#quote" className="btn btn-primary btn-lg">
                            Solicitar Cotización <FaArrowRight />
                        </a>
                        <a href="#portfolio" className="btn btn-secondary btn-lg">
                            <FaPlay style={{ fontSize: '0.7rem' }} /> Ver Proyectos
                        </a>
                    </motion.div>

                    <motion.div
                        className="hero__stats-bar"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        {siteConfig.stats.map((stat, i) => (
                            <div key={i} className="hero__stat">
                                <span className="hero__stat-value">{stat.value}{stat.suffix}</span>
                                <span className="hero__stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {/* Branded visual — Logo showcase with floating tech keywords */}
                    <div className="hero__brand-visual">
                        <div className="hero__logo-glow" />
                        <img
                            src="/images/logos/hero-logo.png"
                            alt="Nuxelit Logo"
                            className="hero__logo-main"
                            style={{ width: '170px', height: 'auto', objectFit: 'contain' }}
                        />

                        {/* Floating tech keywords */}
                        {floatingKeywords.map((kw, i) => (
                            <motion.span
                                key={kw}
                                className="hero__float-tag glass-light"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + i * 0.08 }}
                                style={{
                                    '--float-delay': `${i * 0.7}s`,
                                    '--float-x': `${(i % 2 === 0 ? 1 : -1) * (20 + i * 8)}%`,
                                    '--float-y': `${-15 + i * 12}%`,
                                }}
                            >
                                {kw}
                            </motion.span>
                        ))}
                    </div>

                    {/* Code snippet below visual */}
                    <div className="hero__code-snippet glass">
                        <div className="hero__code-header">
                            <span className="hero__code-dot hero__code-dot--red" />
                            <span className="hero__code-dot hero__code-dot--yellow" />
                            <span className="hero__code-dot hero__code-dot--green" />
                            <span className="hero__code-filename">init.ts</span>
                        </div>
                        <pre className="hero__code-body">
                            <code><span className="code-kw">const</span> <span className="code-var">project</span> = <span className="code-kw">await</span> {company.name}.<span className="code-fn">create</span>({'{\n  '}stack: [<span className="code-str">'React'</span>, <span className="code-str">'Node'</span>, <span className="code-str">'AI'</span>],{'\n  '}deploy: <span className="code-bool">true</span> <span className="code-comment">// 🚀</span>{'\n}'});</code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
