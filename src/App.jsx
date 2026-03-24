import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Work from './components/Work';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Container from './components/Container';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogEditor from './pages/BlogEditor';
import LoginPage from './pages/LoginPage';
import { BlogProvider } from './context/BlogContext';

function HomePage({ isDarkMode, toggleDarkMode }) {
  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Container>
          <Hero />
        </Container>
        <About />
        <Skills />
        <Experience />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <BlogProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog" element={<BlogList isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/:id" element={<BlogDetail isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/editor" element={<BlogEditor isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/blog/editor/:id" element={<BlogEditor isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </div>
    </BlogProvider>
  );
}

export default App;
