"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import LoadingSpinner from "./ui/loading-spinner";

interface ImageSliderProps {
  images: {
    url: string;
    alt: string;
    title: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageSlider = ({ images, autoPlay = false, interval = 3000 }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsLoading(true);
    setHasError(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, interval, images.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-xl border border-border/50 bg-gradient-card p-8">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl border border-border/50 bg-gradient-card overflow-hidden">
      <div className="relative h-80" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/50">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/50">
            <div className="text-destructive text-center">
              <p className="font-medium">Failed to load image</p>
              <p className="text-sm text-muted-foreground mt-1">Please try again</p>
            </div>
          </div>
        ) : (
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover transition-opacity duration-300"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        )}
        
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 hover:opacity-100 focus:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 hover:opacity-100 focus:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Play/Pause Button */}
        {images.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
      
      {/* Image Title */}
      <div className="p-4 bg-gradient-to-t from-black/50 to-transparent absolute bottom-0 left-0 right-0">
        <p className="text-white text-center font-body text-sm font-medium">
          {images[currentIndex].title}
        </p>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 p-4 bg-black/20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-6" : "bg-border/50 hover:bg-border/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
