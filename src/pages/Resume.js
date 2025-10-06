import React from 'react';
import Navigation from '../components/Navigation';
import '../css/main.css';

const Resume = () => {
  return (
    <div className="p-4 sm:p-8">
      <header className="boxy-window p-6 mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl text-rose-900 font-bold mb-2">My Resume</h1>
        <p className="text-xl text-rose-800">Here you can look at my professional experience, skills, and education. Feel free to read, download, or contact me for more information!</p>
      </header>
      <main className="home-flex-container w-full max-w-[90rem] mx-auto">
        <Navigation />
        <div className="boxy-window flex-1 relative overflow-auto w-full" style={{ maxWidth: 'none', margin: '0' }}>
          <div className="p-4">
            <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-rose-100 border-2 border-rose-900 rounded-lg shadow boxy-window w-full">
              <h2 className="text-rose-900 font-bold text-xl mb-2">About My Resume</h2>
              <p className="text-rose-800 mb-4">This resume is intended for creative, technical, and collaborative roles. If you have questions or want to reach out, please use the contact info below!</p>
              <div className="mt-2">
                <span className="font-bold text-rose-900">Contact:</span>
                <a href="mailto:your@email.com" className="ml-2 text-rose-700 underline hover:text-rose-900">myron.axel.rios@gmail.com</a>
              </div>
            </div>
            <div className="mb-6 w-full">
              <iframe
                src={process.env.PUBLIC_URL + '/PioPio-Resume-No-Identifiers.pdf'}
                title="Resume PDF"
                width="100%"
                height="800px"
                className="lg:h-[900px] xl:h-[1000px] 2xl:h-[1200px]"
                style={{ border: '2px solid #be123c', borderRadius: '8px', background: '#ffe4e6' }}
              />
            </div>
            <a
              href={process.env.PUBLIC_URL + '/PioPio-Resume-No-Identifiers.pdf'}
              download
              className="px-6 py-3 bg-rose-700 text-white font-bold rounded shadow hover:bg-rose-900 transition"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
