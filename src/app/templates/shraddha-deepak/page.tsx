
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'; // For internal navigation if needed
import { Button } from '@/components/ui/button'; // For the "Use This Design" button
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'; // For simple image preview
import { Home, ShoppingCart, Info, MapPin as LucideMapPin, Phone, Search, ArrowUp, Heart, ChevronDown, Menu as MenuIcon } from 'lucide-react'; // Lucide icons
import useIntersectionObserver from '@/hooks/use-intersection-observer';

// Import the consolidated stylesheet for this specific template
import './shraddha-deepak-styles.css';

// Helper hook for scroll-triggered animations
const useScrollAnimation = (className: string, threshold = 0.1) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold, freezeOnceVisible: true });
  useEffect(() => {
    if (isIntersecting && ref.current) {
      ref.current.classList.add('animate__animated', className);
    }
  }, [isIntersecting, ref, className]);
  return ref;
};


// Sub-components for better organization
const SDHeader: React.FC<{ onToggleNav: () => void }> = ({ onToggleNav }) => {
  return (
    <section className="navigation">
      <header>
        <div className="header-content">
          <div className="logo">
            <a href="#">
              <Image 
                src="/assets/shraddha-deepak/img/logo2.gif" 
                alt="Logo" 
                width={100} // Adjusted for better display, original was 120x120 with negative margins
                height={100}
                style={{ marginTop: '-30px', marginBottom: '-20px' }} // Adjusted margins
              />
            </a>
          </div>
          <div className="header-nav">
            <nav>
              <ul className="primary-nav">
                <li><a href="#intro-sd">New Chapter</a></li>
                <li><a href="#events-sd">Events</a></li>
                <li><a href="#eng-pics-sd">Engagement</a></li>
                <li className="hidden-sm hidden-xs"><a href="#video-bg-sd">Glimpse of the city</a></li>
              </ul>
              <ul className="member-actions">
                <li><a href="#map-sd" className="btn-white btn-small">Venue</a></li>
              </ul>
            </nav>
          </div>
          <div className="navicon">
            <a className="nav-toggle" href="#" onClick={(e) => { e.preventDefault(); onToggleNav(); }}>
              <MenuIcon size={24} /> {/* Using Lucide icon */}
            </a>
          </div>
        </div>
      </header>
    </section>
  );
};

const SDHero = () => {
  const heroContentRef = useScrollAnimation('animate__fadeInUp');
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="hero-content text-center" ref={heroContentRef}>
              {/* Assuming logo-lg.png is a significant visual element */}
              <Image 
                src="/assets/shraddha-deepak/img/logo-lg.png" 
                alt="Shraddha & Deepak" 
                width={500}  // Adjust based on actual image size
                height={300} // Adjust based on actual image size
                data-ai-hint="wedding logo couple names"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 hidden-xs"></div>
          <div className="col-sm-4 hidden-xs text-center">
            <a href="#map-sd" className="btn btn-accent btn-large rsvp-btn">Venue</a>
          </div>
          <div className="col-sm-4 hidden-xs"></div>
        </div>
      </div>
      <div className="down-arrow floating-arrow">
        <a href="#invitation-sd"><i className="fa fa-angle-down"></i></a>
      </div>
    </section>
  );
};

const SDRotatedVideoSection = () => {
  return (
    <div className="bg-video-section-rotated">
      <div className="bg-video-container-rotated">
        <iframe
          src="https://www.youtube.com/embed/33bGuZMsCCk?autoplay=1&mute=1&loop=1&playlist=33bGuZMsCCk&controls=0&playsinline=1&start=1&vq=hd1080"
          title="Rotated Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
      <div className="bg-video-overlay-rotated">
        <h1>We are getting hitched</h1>
        <p style={{ color: 'antiquewhite' }}>The dates are 22<sup>th</sup> & 23<sup>th</sup> of February 2025 and we would like you to be a part of it</p>
      </div>
    </div>
  );
};

const SDIntroSection = () => {
  const img1Ref = useScrollAnimation('animate__fadeInLeft', 0.2); // animate.css classes
  const textRef = useScrollAnimation('animate__fadeInUp', 0.1);
  const img2Ref = useScrollAnimation('animate__fadeInRight', 0.2);
  const imgSmall1Ref = useScrollAnimation('animate__fadeInUp');
  const imgSmall2Ref = useScrollAnimation('animate__fadeInUp');

  return (
    <section id="intro-sd" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="header">A New Chapter Begins</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 hidden-sm hidden-xs" ref={img1Ref}>
            <Image src="https://placehold.co/300x400.png?text=IMG_2317" alt="Shraddha" width={300} height={400} data-ai-hint="bride portrait" />
          </div>
          <div className="col-md-6" ref={textRef}>
            <p>
              As Shraddha younger brother, seeing her begin this beautiful journey
              fills my heart with joy. She has always been someone I admire for her
              strength and kindness, and Deepak complements her perfectly with his
              warmth and understanding. I feel a deep sense of gratitude knowing my
              sister has found someone who truly cherishes her. And as a fellow
              engineer, I’m thrilled to welcome Deepak into our family, not just as
              a brother-in-law but also as a new teammate in life’s greatest project.
              They are embarking on life’s greatest adventure, and I wish them endless happiness.
            </p>
          </div>
          <div className="col-md-3 hidden-sm hidden-xs" ref={img2Ref}>
            <Image src="https://placehold.co/300x400.png?text=DSD_0214" alt="Deepak" width={300} height={400} data-ai-hint="groom portrait" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 col-sm-push-2 col-xs-6 hidden-md hidden-lg" ref={imgSmall1Ref}>
             <Image src="https://placehold.co/300x400.png?text=IMG_2317+Small" alt="Shraddha Small" width={300} height={400} data-ai-hint="bride portrait" />
          </div>
          <div className="col-sm-4 col-sm-push-2 col-xs-6 hidden-md hidden-lg" ref={imgSmall2Ref}>
            <Image src="https://placehold.co/300x400.png?text=DSD_0214+Small" alt="Deepak Small" width={300} height={400} data-ai-hint="groom portrait" />
          </div>
        </div>
      </div>
    </section>
  );
};

const SDEventsSection = () => {
  const event1Ref = useScrollAnimation('animate__fadeInUp');
  const event2Ref = useScrollAnimation('animate__fadeInUp', 0.15);
  const event3Ref = useScrollAnimation('animate__fadeInUp', 0.2);
  const event4Ref = useScrollAnimation('animate__fadeInUp', 0.25);
  const event5Ref = useScrollAnimation('animate__fadeInUp', 0.3);

  return (
    <section className="events section-padding" id="events-sd">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="header">Events</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12 leftcol">
            <div ref={event1Ref}> {/* Apply ref to wrapping div if .wp3 is the animated element */}
              <p><strong>19th February</strong></p>
              <h5>Grihapravesh & Divine Blessings <span className="time">5AM - 1PM</span></h5>
              <p>Join us as we celebrate the auspicious opening of our new home's first floor, blessed by Lord Revanasiddeshwara. This sacred ceremony marks the beginning of our wedding celebrations, where divine energy meets earthly joy, setting the perfect foundation for our journey together.</p>
            </div>
             <div ref={event2Ref}>
              <p><strong>20th February</strong></p>
              <h5>Mehendi - Where Art Meets Heart <span className="time">4PM - 6PM</span></h5>
              <p>As intricate henna patterns adorn the bride's hands, each swirl and curve tells a story of love and devotion. The air will be filled with laughter, melodious songs, and the sweet scent of mehendi, while vibrant colors dance around us. Come witness this beautiful blend of artistry and tradition, where every design symbolizes the deep bond of love about to be sealed forever.</p>
            </div>
            <div ref={event3Ref}>
              <p><strong>21th February</strong></p>
              <h5>Haldi - The Golden Glow <span className="time">9AM - 2PM</span></h5>
              <p>In this cherished ritual, the sacred turmeric paste brings its golden touch to bless the bride with radiance and purity. As loving hands apply the haldi, each touch carries wishes of happiness and prosperity, preparing her for the beautiful journey ahead. This intimate ceremony glows with the warmth of family bonds and the promise of new beginnings.</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12 rightcol">
            <div ref={event4Ref}>
              <p><strong>22th February</strong></p>
              <h5>Royal Engagement Procession <span className="time">6PM-12PM</span></h5>
              <p>Watch as tradition meets style in our grand procession, where the groom arrives with royal flair in a decorated jeep, embodying the perfect blend of traditional charm and modern swagger. Hearts will unite as rings are exchanged, marking the beautiful beginning of our forever journey. This moment, wrapped in love and witnessed by our dear ones, will sparkle with joy and endless promises.</p>
            </div>
            <div ref={event5Ref}>
              <p><strong>23th February</strong></p>
              <h5>Wedding-The Divine Union <span className="time">9AM-3PM</span></h5>
              <p>As the sacred fire bears witness, two souls will join in eternal partnership under the ancient rituals of our tradition. The air will be filled with the rhythmic beats of dhol, the sweet fragrance of flowers, and the blessed chants of mantras. Each phera around the ceremonial fire weaves a promise - of love, loyalty, friendship, and togetherness. Join us in this divine celebration as we transform from 'I' to 'We', blessed by the gods and surrounded by the love of our family and friends.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SDEngagementPics: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => {
  const galleryImages = [
    "https://i.postimg.cc/RF2gPKXZ/Whats-App-Image-2025-01-30-at-9-48-51-AM-1.jpg",
    "https://i.postimg.cc/JhG39tyD/Whats-App-Image-2025-01-30-at-9-59-41-AM.jpg",
    "https://i.postimg.cc/x8HtB84y/Whats-App-Image-2025-01-30-at-9-49-53-AM.jpg",
    "https://i.postimg.cc/RhcLX8Wg/Whats-App-Image-2025-01-30-at-9-56-26-AM.jpg",
    "https://i.postimg.cc/PJkmp4SY/Whats-App-Image-2025-01-30-at-9-55-02-AM.jpg",
    "https://i.postimg.cc/jqZHdzzw/Whats-App-Image-2025-01-26-at-9-17-59-AM.jpg"
  ];

  return (
    <section id="eng-pics-sd" className="section-padding">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="header">Ethereal Frames</h3>
          </div>
        </div>
        <div className="row">
          {galleryImages.map((src, index) => (
            <div className="col-md-2 col-sm-4 col-xs-6" key={index}> {/* Adjusted for better responsiveness */}
              <a href={src} onClick={(e) => { e.preventDefault(); onImageClick(src); }} className="fancybox-placeholder">
                <div className="img-wrap">
                  <div className="overlay"><Search size={24} /></div>
                  <Image src={src} alt={`Engagement Photo ${index + 1}`} width={300} height={200} style={{ objectFit: 'cover', width: '100%', height: '200px' }} data-ai-hint="engagement couple" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const SDMapSection = () => {
  const [showMapInfo, setShowMapInfo] = useState(false);

  // Google Maps init - this would typically be more complex with a React wrapper
  useEffect(() => {
    const initMap = () => {
      if (document.getElementById('map-canvas') && (window as any).google) {
        new (window as any).google.maps.Map(document.getElementById('map-canvas')!, {
          center: { lat: 15.3541, lng: 75.6228 }, // Approx. Gadag coordinates
          zoom: 15,
        });
      }
    };

    if (!(window as any).googleMapsLoaded) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMapGlobal`; // REPLACE YOUR_GOOGLE_MAPS_API_KEY
        script.async = true;
        script.defer = true;
        (window as any).initMapGlobal = initMap; // Make it global for callback
        document.head.appendChild(script);
        (window as any).googleMapsLoaded = true;
    } else if ((window as any).google) {
        initMap();
    }
    
    // Basic toggle for map info like in original scripts.js
    const mapContentElement = document.getElementById('map-content');
    if (mapContentElement) {
        mapContentElement.style.display = showMapInfo ? 'block' : 'none';
    }

  }, [showMapInfo]);


  return (
    <section id="map-sd" className="section-padding">
      <div className="text-center">
        <h3>How do I get there?</h3>
        <p>It's way easier than you think!</p>
      </div>
      <div id="map-canvas" style={{ height: '400px', width: '100%', backgroundColor: '#e0e0e0' }}>
        {/* Map will render here */}
      </div>
      <div id="map-content-wrapper" className="container pointer-events-none">
        <div className="row">
          <div className="col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6">
            <div className="text-center">
              <div id="btn-show-content" className="toggle-map-content pointer-events-auto" onClick={() => setShowMapInfo(!showMapInfo)} style={{cursor: 'pointer', padding: '10px', background: '#eee', display:'inline-block', margin: '10px 0'}}>
                <Info size={16} style={{verticalAlign: 'middle'}}/>&nbsp;&nbsp; {showMapInfo ? "Hide" : "Show"} info
              </div>
            </div>
            {showMapInfo && (
                 <div id="map-content" className="pointer-events-auto" style={{ display: 'block', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                    <div className="row">
                        <div className="col-md-6">
                        <h5>Tontadarya Kalyana Mantapa</h5>
                        <p>K C Rani Rd, Gadag, Karnataka 582101, India</p>
                        </div>
                        <div className="col-md-6">
                        <h5>Sri SS Patil</h5>
                        <p><Phone size={14} style={{verticalAlign: 'middle'}}/> <a href="tel://+919483077888">+91 94830 77888</a></p>
                        <h5>Prasanna Patil</h5>
                        <p><Phone size={14} style={{verticalAlign: 'middle'}}/> <a href="tel://+919448677888">+91 94486 77888</a></p>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-6" style={{ padding: '5px' }}>
                        <a className="custom-map-button" 
                            href="https://maps.app.goo.gl/FtEDHtRg9o3SszNMA" 
                            target="_blank" rel="noopener noreferrer">
                            <LucideMapPin size={16} style={{verticalAlign: 'middle', marginRight: '5px'}} /> Show map
                        </a>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


const SDFooter = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center content">
            <span className="to-top-wrapper">
              <a href="#top-sd" className="to-top"><ArrowUp /></a>
            </span>
            <p>Crafted by Prasanna with lots of <Heart className="pulse2" size={14} fill="red" color="red" /> for Shraddha <br />Special thanks to Ram</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ShraddhaDeepakPage: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);

  const handleToggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);
  const handleImageClick = (src: string) => setPreviewImageSrc(src);
  const closePreviewModal = () => setPreviewImageSrc(null);

  useEffect(() => {
    document.body.classList.add('shraddha-deepak-template');
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        const hrefAttribute = this.getAttribute('href');
        if (hrefAttribute && hrefAttribute.startsWith('#') && hrefAttribute.length > 1) {
            const targetElement = document.querySelector(hrefAttribute);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (isMobileNavOpen) setIsMobileNavOpen(false); // Close nav on click
            }
        }
      });
    });
    
    return () => {
      document.body.classList.remove('shraddha-deepak-template');
    };
  }, [isMobileNavOpen]);


  return (
    <>
      <Head>
        <title>Shraddha and Deepak getting hitched!</title>
        <meta name="description" content="We would like to invite you to our big day." />
        <meta property="og:title" content="Shraddha and Deepak getting hitched" />
        <meta property="og:description" content="We would like to invite you to our big day." />
        <meta property="og:image" content="https://i.postimg.cc/63Ftsv1f/hero-min.jpg" /> {/* Provided OG image */}
        <meta property="og:type" content="website" />
        {/* Favicons and manifest would be in public folder, e.g., /favicon-32x32.png */}
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/shraddha-deepak/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/shraddha-deepak/favicon-16x16.png" />
        {/* Add other meta tags and links from original HTML head if needed */}
      </Head>
      
      {/* Anchor for "Scroll to Top" */}
      <div id="top-sd"></div>

      {/* Call to Action Button - Positioned Fixed */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <Button asChild size="lg" className="bg-primary hover:bg-pink-400 text-primary-foreground shadow-lg">
          <Link href="/#pricing">
            <ShoppingCart className="mr-2 h-5 w-5" /> Use This Design
          </Link>
        </Button>
      </div>

      <SDHeader onToggleNav={handleToggleMobileNav} />
      {isMobileNavOpen && (
        <div className="mobile-nav-menu" style={{background: 'white', padding: '20px', borderBottom: '1px solid #eee', position:'fixed', width:'100%', zIndex: 999}}>
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            <li style={{marginBottom:'10px'}}><a href="#intro-sd" onClick={handleToggleMobileNav}>New Chapter</a></li>
            <li style={{marginBottom:'10px'}}><a href="#events-sd" onClick={handleToggleMobileNav}>Events</a></li>
            <li style={{marginBottom:'10px'}}><a href="#eng-pics-sd" onClick={handleToggleMobileNav}>Engagement</a></li>
            <li><a href="#map-sd" onClick={handleToggleMobileNav}>Venue</a></li>
          </ul>
        </div>
      )}
      
      <main>
        <SDHero />
        <SDRotatedVideoSection />
        <div id="invitation-sd"> {/* Anchor for hero down arrow */}
            <SDIntroSection />
        </div>
        <SDEventsSection />
        <SDEngagementPics onImageClick={handleImageClick} />
        {/* Placeholder for the second video background section if distinct content is needed
           The original HTML has a section with id="video-bg" for "Glimpse of the city"
           If this is different from SDRotatedVideoSection, it needs its own component and logic.
           For now, assuming the primary video showcase is SDRotatedVideoSection.
        */}
         <section id="video-bg-sd" className="hidden-sm hidden-xs video-section" style={{minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background:'#333'}}>
            {/* This could be a simple video tag or another iframe for city glimpse */}
            {/* <iframe 
                width="100%" height="100%" 
                src="https://www.youtube.com/embed/YOUR_CITY_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_CITY_VIDEO_ID&controls=0" 
                title="City Glimpse" style={{border:0, position:'absolute', top:0, left:0}} allowFullScreen>
            </iframe> */}
            <div className="video-content" style={{zIndex:1}}>
                <h5>GADAG</h5>
                <p>City of culture n joy</p>
            </div>
        </section>
        <SDMapSection />
      </main>
      <SDFooter />

      {previewImageSrc && (
        <Dialog open={!!previewImageSrc} onOpenChange={(isOpen) => !isOpen && closePreviewModal()}>
          <DialogContent className="max-w-3xl p-0">
            <Image src={previewImageSrc} alt="Engagement Preview" width={800} height={600} style={{ width: '100%', height: 'auto', borderRadius:'var(--radius)' }} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ShraddhaDeepakPage;
