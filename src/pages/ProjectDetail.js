import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import projects from '../data/projects.json';
import projectDetails from '../data/projectDetails.json';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <Layout header={<h1 className="text-3xl text-rose-900 font-bold">Project Not Found</h1>} nav={<Navigation />}>
        <div className="boxy-window p-4">
          <p className="text-rose-800">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn-y2k mt-4 inline-block">← Back to Projects</Link>
        </div>
      </Layout>
    );
  }

  const header = (
    <div className="p-4 text-center sm:text-left">
      <Link to="/projects" className="text-rose-700 hover:text-rose-900 mb-2 inline-block">
        ← Back to Projects
      </Link>
      <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">{project.title}</h1>
      {project.subtitle && (
        <div className="mb-2">
          <span className="y2k-pill-title">{project.subtitle}</span>
        </div>
      )}
    </div>
  );

  return (
    <Layout header={header} nav={<Navigation />}>
      <section className="boxy-window p-0" style={{ gridColumn: '1 / -1' }}>
        <div className="boxy-window-title p-4">
          <h2 className="text-rose-900 font-bold text-xl">Project Details</h2>
        </div>
        <div className="p-4 space-y-6">
          {/* Full Image Display */}
          <div className="project-image-full">
            <img
              src={require(`../${project.image}`)}
              alt={project.title}
              className="w-full max-w-4xl mx-auto border-2 border-rose-900 shadow-lg rounded"
            />
          </div>

          {/* Project Description */}
          <div className="boxy-window p-4">
            <h3 className="text-xl font-bold text-rose-900 mb-3">About This Project</h3>
            <p className="text-rose-800 mb-4 leading-relaxed">{project.description}</p>
          </div>

          {/* Project Changes/Details Section */}
          <div className="boxy-window p-4">
            <h3 className="text-xl font-bold text-rose-900 mb-3">Development Process & Changes</h3>
            <div className="text-rose-800 leading-relaxed">
              {projectDetails[project.id] ? (
                <div className="space-y-4">
                  {projectDetails[project.id].developmentProcess.map((section, index) => (
                    <div key={index}>
                      {section.type === 'paragraph' && (
                        <p>{section.content}</p>
                      )}
                      {section.type === 'section' && section.items && (
                        <div>
                          <h4 className="font-semibold text-lg text-rose-900 mt-4">{section.title}</h4>
                          <ul className="list-disc list-inside space-y-2 ml-4">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.type === 'section' && section.content && (
                        <div>
                          <h4 className="font-semibold text-lg text-rose-900 mt-4">{section.title}</h4>
                          <p>{section.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>Detailed information about this project's development process will be added soon.</p>
              )}
            </div>
          </div>

          {/* External Link (if exists) */}
          {project.link && project.link !== '' && (
            <div className="text-center">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-y2k"
              >
                Visit Live Project →
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;