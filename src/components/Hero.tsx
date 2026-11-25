import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import row1 from '@/assets/client-logos/row1.png';
import row2 from '@/assets/client-logos/row2.png';
import row3 from '@/assets/client-logos/row3.png';
import row4 from '@/assets/client-logos/row4.png';
import row5 from '@/assets/client-logos/row5.png';
// Video paths from public folder - optimized versions
const video2 = '/videos/video2.mp4';
const video3 = '/videos/video3.mp4';
const video4 = '/videos/video4.mp4';

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const videos = [video2, video3, video4];

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      // Move to next video when current one ends
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      setVideoError(null);
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      setVideoError('Failed to load video');
      setIsVideoLoaded(false);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [currentVideoIndex, videos.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isInView) {
      // Reset video and play when index changes
      video.currentTime = 0;
      video.load(); // Reload the video source
      video.play().catch((error) => {
        console.error('Play error:', error);
        setVideoError('Failed to play video');
      });
    }
  }, [currentVideoIndex, isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        muted
        playsInline
        preload="metadata"
        autoPlay
        loop={false}
        poster={videos[currentVideoIndex].replace('.mp4', '.webp')}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        <source
          src={videos[currentVideoIndex].replace('.mp4', '.webm')}
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      {/* Subtle gradient overlay to blend with video */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark/60 via-luxury-navy/60 to-luxury-purple/60 z-10"></div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20 z-20"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-30">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#c8a564] mb-6 leading-relaxed">
            Engineered leather goods
            <br /> Built to perform
            <br /> Designed to last
          </h1>

          {/* Subheadline */}

          <p className="text-xl md:text-2xl text-cream-gold/80 mb-8 max-w-2xl mx-auto font-body">
            Reliable private-label leather manufacturing for wholesale & Amazon
            brands
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center text-cream-gold/90">
              <CheckCircle className="h-5 w-5 text-accent mr-2" />
              <span className="text-sm font-medium">
                Top-grade hides & hardware
              </span>
            </div>
            <div className="flex items-center text-cream-gold/90">
              <CheckCircle className="h-5 w-5 text-accent mr-2" />
              <span className="text-sm font-medium">
                Stage-gate QC, end-to-end
              </span>
            </div>
            <div className="flex items-center text-cream-gold/90">
              <CheckCircle className="h-5 w-5 text-accent mr-2" />
              <span className="text-sm font-medium">
                EU & US export ready LWG sourcing
              </span>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-accent text-luxury-dark hover:bg-accent/90 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/quote">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-luxury-dark font-semibold text-lg px-8 py-6 rounded-xl transition-all duration-300"
            >
              <Link to="/sample-kit">Request Samples</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-cream-gold/70 text-sm mb-4 font-body">
              Trusted by brands across the UK, EU & USA
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4">
              <img
                src={row1}
                alt="Coach"
                className="h-12 sm:h-16 md:h-20 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              />
              <img
                src={row2}
                alt="Ettinger London"
                className="h-12 sm:h-16 md:h-20 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              />
              <img
                src={row3}
                alt="Desai"
                className="h-12 sm:h-16 md:h-20 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              />
              <img
                src={row4}
                alt="Merriele"
                className="h-12 sm:h-16 md:h-20 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              />
              <img
                src={row5}
                alt="Bracialini"
                className="h-12 sm:h-16 md:h-20 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background/10 to-transparent"></div>
    </section>
  );
};

export default Hero;
