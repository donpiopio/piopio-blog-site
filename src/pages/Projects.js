import React from 'react';
import '../css/main.css';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import projects from '../data/projects.json';

const Projects = () => {
  const header = (
    <div className="p-4 text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">Projects</h1>
      <p className="text-xl text-rose-800">A few things I've built or collaborated on.</p>
    </div>
  );

  return (
    <Layout header={header} nav={<Navigation />}>
      <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
        <div className="boxy-window-title p-4">
          <h2 className="text-rose-900 font-bold text-xl">Featured Projects</h2>
        </div>
        <div className="p-4 space-y-6">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              className={`boxy-window p-4 flex flex-col md:flex-row ${idx % 2 ? 'md:flex-row-reverse' : ''} items-center gap-4`}
            >
              <div className="project-media w-full md:w-64 flex-shrink-0">
                <img
                  src={require(`../${p.image}`)}
                  alt={p.title}
                  className="w-full h-40 md:h-48 object-cover border-2 border-rose-900 shadow-md"
                />
              </div>
              <div className="project-content text-rose-900">
                <h3 className="text-2xl font-extrabold mb-1">{p.title}</h3>
                {p.subtitle && (
                  <div className="mb-3">
                    <span className="y2k-pill-title">{p.subtitle}</span>
                  </div>
                )}
                <p className="mb-3 text-rose-800" style={{ maxWidth: '65ch' }}>{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-y2k">Visit</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
