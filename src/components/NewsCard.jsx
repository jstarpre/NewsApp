import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

function NewsCard({ article }) {
  const { title, description, image, url, publishedAt, source } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <article className="group bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl 
                    border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1.5 
                    flex flex-col h-full transform hover:scale-[1.02] hover:shadow-purple-500/20">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-indigo-600/10">
            <span className="text-6xl opacity-20 text-white">📰</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Source and Date */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            {source?.name || 'Unknown Source'}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-4 h-4 text-purple-300/70" />
            <span className="text-sm">{formatDate(publishedAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-3 line-clamp-3 flex-grow group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-gray-500 dark:text-gray-250 mb-5 line-clamp-3 text-sm leading-relaxed">
            {description}
          </p>
        )}

        {/* Read More Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-white 
                   transition-colors group w-fit px-3 py-1.5 -ml-2 rounded-md hover:bg-white/5"
        >
          <span>Read Full Article</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </article>
  );
}

export default NewsCard;