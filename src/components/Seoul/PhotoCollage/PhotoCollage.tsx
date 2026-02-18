'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './PhotoCollage.module.css';

interface PhotoData {
  src: string;
  rotation: number;
  scale: number;
}

export default function PhotoCollage() {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [loadedPhotos, setLoadedPhotos] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/seoul-photos');
        if (response.ok) {
          const photoList: string[] = await response.json();
          const photosWithStyles = photoList.map((src) => ({
            src,
            rotation: Math.random() * 10 - 5,
            scale: 0.95 + Math.random() * 0.1,
          }));
          setPhotos(photosWithStyles);
        }
      } catch {
        setPhotos([]);
      }
    };

    fetchPhotos();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedPhotos((prev) => new Set(prev).add(index));
  };

  if (photos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📷</span>
        <p className={styles.emptyText}>
          I love you if you see this it's still rendering
        </p>
      </div>
    );
  }

  return (
    <div className={styles.collage}>
      {photos.map((photo, index) => (
        <motion.div
          key={photo.src}
          className={styles.photoWrapper}
          initial={{ opacity: 0, scale: 0.8, rotate: photo.rotation }}
          animate={{
            opacity: loadedPhotos.has(index) ? 1 : 0,
            scale: loadedPhotos.has(index) ? photo.scale : 0.8,
            rotate: photo.rotation,
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: 'easeOut',
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            zIndex: 10,
            transition: { duration: 0.3 },
          }}
        >
          <div className={styles.photoFrame}>
            <Image
              src={photo.src}
              alt={`Memory ${index + 1}`}
              fill
              sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, 250px"
              className={styles.photo}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
