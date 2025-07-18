import React, { useState } from 'react';

// Main App Component
export default function PhotographyPortfolio() {
  const initialImages = [
    { id: 1, src: 'https://placehold.co/300x200', alt: 'Portrait 1', category: 'portraits' },
    { id: 2, src: 'https://placehold.co/300x200', alt: 'Portrait 2', category: 'portraits' },
    { id: 3, src: 'https://placehold.co/300x200', alt: 'Event 1', category: 'events' },
    { id: 4, src: 'https://placehold.co/300x200', alt: 'Event 2', category: 'events' },
    { id: 5, src: 'https://placehold.co/300x200', alt: 'Lifestyle 1', category: 'lifestyle' },
    { id: 6, src: 'https://placehold.co/300x200', alt: 'Lifestyle 2', category: 'lifestyle' },
  ];

  const [images, setImages] = useState(initialImages);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleFilter = (cat) => {
    setFilter(cat);
    setCurrentPage(1);
  };

  const handleUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file, idx) => {
        const url = URL.createObjectURL(file);
        return { id: images.length + idx + 1, src: url, alt: file.name, category: 'uploaded' };
      });
      setImages(prev => [...newFiles, ...prev]);
    }
  };

  const openLightbox = (src) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Studio Selfie Shot</h1>
        <nav>
          <ul className="flex gap-4">
            {['home', 'about', 'gallery', 'contact'].map(sec => (
              <li key={sec}>
                <a href={`#${sec}`} className="hover:underline capitalize">{sec}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1200x400')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
          <h2 className="text-4xl font-bold">Welcome to My Photography Portfolio</h2>
          <p className="mt-2">Capturing moments, one shot at a time.</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="mb-4">I'm a passionate photographer with a love for capturing life's special moments. My work spans portraits, events, and lifestyle photography, each telling a unique story.</p>
        <div className="flex justify-center gap-4">
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Instagram</a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Facebook</a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">Twitter</a>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="flex-1 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Gallery</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6 gap-2">
          {['all','portraits','events','lifestyle','uploaded'].map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-2 font-medium rounded ${filter===cat ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Upload Input */}
        <div className="text-center mb-6">
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="border p-2 rounded" />
        </div>

        {/* Image Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map(img => (
            <figure key={img.id} className="cursor-pointer" onClick={() => openLightbox(img.src)}>
              <img src={img.src} alt={img.alt} className="w-full h-auto rounded shadow" loading="lazy" />
              <figcaption className="text-center text-sm text-gray-600 mt-1">{img.alt}</figcaption>
            </figure>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx+1)}
                className={`px-3 py-1 rounded ${currentPage===idx+1 ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
              >
                {idx+1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50" onClick={closeLightbox}>
          <img src={lightboxSrc} alt="Enlarged" className="max-w-full max-h-full" />
          <span className="absolute top-4 right-6 text-white text-3xl cursor-pointer">×</span>
        </div>
      )}

      {/* Contact */}
      <section id="contact" className="py-12 bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-4">Contact</h2>
          <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input id="name" name="name" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input id="email" name="email" type="email" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea id="message" name="message" rows={4} required className="w-full border p-2 rounded" />
            </div>
            <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 Studio Selfie Shot. All rights reserved.
      </footer>
    </div>
  );
}
