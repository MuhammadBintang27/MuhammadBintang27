import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3ELoading...%3C/text%3E%3C/svg%3E",
  fallbackSrc,
  bare = false,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP version of the image
  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    
    // If it's already a WebP, return as is
    if (originalSrc.endsWith('.webp')) return originalSrc;
    
    // Convert to WebP extension
    return originalSrc.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  };

  useEffect(() => {
    const webpSrc = getWebPSrc(src);
    
    // Check if WebP is supported
    const checkWebPSupport = () => {
      return new Promise((resolve) => {
        const webp = new Image();
        webp.onload = webp.onerror = () => {
          resolve(webp.height === 2);
        };
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      });
    };

    const loadImage = async () => {
      try {
        const supportsWebP = await checkWebPSupport();
        const finalSrc = supportsWebP ? webpSrc : src;
        
        const img = new Image();
        img.onload = () => {
          setImageSrc(finalSrc);
          setIsLoaded(true);
        };
        img.onerror = () => {
          // Fallback to original format if WebP fails
          if (supportsWebP && finalSrc !== src) {
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
              setImageSrc(src);
              setIsLoaded(true);
            };
            fallbackImg.onerror = () => {
              setImageSrc(fallbackSrc || src);
              setIsLoaded(true);
            };
            fallbackImg.src = src;
          } else {
            setImageSrc(fallbackSrc || src);
            setIsLoaded(true);
          }
        };
        img.src = finalSrc;
      } catch (error) {
        setImageSrc(fallbackSrc || src);
        setIsLoaded(true);
      }
    };

    loadImage();
  }, [src, fallbackSrc]);

  if (bare) {
    // Render only the <img> tag, no wrapper, no skeleton
    return (
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={className}
        onError={() => setHasError(true)}
        {...props}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden ${className}`}
    >
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-70'
        }`}
        onError={() => setHasError(true)}
        {...props}
      />
      
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Error fallback */}
      {hasError && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </motion.div>
  );
};

export default OptimizedImage; 