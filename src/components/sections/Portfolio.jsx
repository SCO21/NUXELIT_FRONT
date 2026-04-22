import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import siteConfig from '../../config/siteConfig';
import { getPortfolio } from '../../utils/api';
import './Portfolio.css';

export default function Portfolio() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [filter, setFilter] = useState('Todos');
    const [portfolio, setPortfolio] = useState(siteConfig.portfolio);

    useEffect(() => {
        let isMounted = true;
        const fetchPortfolio = async () => {
            try {
                const res = await getPortfolio();
                // Assume backend structure uses res.data.projects or direct array
                const fetchedPortfolio = res?.data?.projects || res?.data || res;
                if (isMounted && Array.isArray(fetchedPortfolio) && fetchedPortfolio.length > 0) {
                    setPortfolio(fetchedPortfolio);
                }
            } catch (error) {
                console.log('Using mock portfolio data (API fallback).');
            }
        };
        fetchPortfolio();
        return () => { isMounted = false; };
    }, []);

    const categories = ['Todos', ...new Set(portfolio.map((p) => p.category))];
    const filtered = filter === 'Todos'
        ? portfolio
        : portfolio.filter((p) => p.category === filter);

    return (
        <section id="portfolio" className="section">
            <div className="container" ref={ref}>
                <div style={{ textAlign: 'center' }}>
                    <span className="badge">Portafolio</span>
                    <h2 className="section-title">Proyectos destacados</h2>
                    <p className="section-subtitle">
                        Cada proyecto es una historia de innovación. Conoce cómo hemos ayudado a empresas a transformarse digitalmente.
                    </p>
                </div>

                {/* Filter */}
                <div className="portfolio__filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`portfolio__filter ${filter === cat ? 'portfolio__filter--active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="portfolio__grid">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="portfolio__card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            layout
                        >
                            <div className="portfolio__img-wrap">
                                <div
                                    className="portfolio__img"
                                    style={{
                                        background: `linear-gradient(135deg, ${siteConfig.theme.primary}30, ${siteConfig.theme.secondary}30)`,
                                    }}
                                >
                                    <span className="portfolio__img-placeholder">{project.title.charAt(0)}</span>
                                </div>
                                <div className="portfolio__overlay">
                                    <h3 className="portfolio__title">{project.title}</h3>
                                    <p className="portfolio__desc">{project.description}</p>
                                    <a href="#quote" className="btn btn-primary btn-sm">Ver Detalle</a>
                                </div>
                            </div>
                            <div className="portfolio__info">
                                <span className="portfolio__category">{project.category}</span>
                                <h4 className="portfolio__name">{project.title}</h4>
                                <div className="portfolio__tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
