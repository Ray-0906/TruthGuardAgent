import React from 'react';

function ServiceImageDisplay({ images, serviceTitle }) {
  // Check if this is the Browser Extension service
  const isBrowserExtension = serviceTitle === 'Browser Extension';

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`flex gap-4 ${
          images.length === 1 ? 'justify-center' : 'justify-start flex-wrap'
        }`}
      >
        {images.map((image, imgIdx) => (
          <div
            key={imgIdx}
            className={`relative group rounded-2xl overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-300 ${
              images.length === 1
                ? 'w-full max-w-xs'
                : isBrowserExtension
                ? 'flex-1 min-w-[350px] max-w-[750px]'
                : 'flex-1 min-w-[280px]'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-auto object-cover bg-slate-800/50 rounded-xl ${
                isBrowserExtension ? 'scale-105' : ''
              }`}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceImageDisplay;
