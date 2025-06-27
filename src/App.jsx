import { useState, useEffect, useRef } from 'react'
import BlurText from './components/BlurText'
import TextPressure from './components/TextPressure'
import TiltedCard from './components/TiltedCard'
import AnimatedTrain from './components/AnimatedTrain'
import Beams from './components/Beams'
import EventsTable from './components/EventsTable'
import './App.css'

function App() {
  const [cardOffset, setCardOffset] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const containerRef = useRef(null)
  
  const videos = [
    { id: 'kISy-mPcwLE', title: 'TrainWreckStation 033' },
    { id: 'PFMy2WSJ_nc', title: 'Video 2' },
    { id: 'Iwl8Wx0jSaQ', title: 'Video 3' },
    { id: 'LBNkpJGYmCQ', title: 'Video 4' },
    { id: 'Knx5yCHvq60', title: 'Video 5' },
    { id: 'hSw_n2Zh-Hc', title: 'Video 6' }
  ]
  
  // Generate infinite cards by repeating the video array
  const infiniteVideos = []
  for (let i = 0; i < 10; i++) {
    infiniteVideos.push(...videos)
  }
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Disable on mobile/touch devices
      if ('ontouchstart' in window || window.innerWidth < 768) return
      
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const relativeX = e.clientX - rect.left
      const containerWidth = rect.width
      
      // Check if mouse is within the cards section
      if (e.clientY < rect.top || e.clientY > rect.bottom) return
      
      setMouseX(relativeX)
      
      // Calculate offset based on mouse position
      // When mouse is at left edge, offset is 0
      // When mouse is at right edge, show more cards
      const mousePercent = Math.max(0, Math.min(1, relativeX / containerWidth))
      const cardWidth = 320
      const totalCardsWidth = infiniteVideos.length * cardWidth
      const visibleWidth = containerWidth
      const maxOffset = Math.max(0, totalCardsWidth - visibleWidth - 100)
      
      // Create smooth infinite scroll effect (half speed)
      const offset = mousePercent * maxOffset * 0.5
      setCardOffset(-offset)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [infiniteVideos.length])
  
  return (
    <div className="app">
      {/* Global Background */}
      <div className="beams-background">
        <Beams />
      </div>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <BlurText
            text="Welcome to the ..."
            className="hero-title hero-text"
            animateBy="chars"
            delay={50}
            direction="top"
          />
        </div>
      </section>

      {/* Text Pressure Section */}
      <section className="text-pressure-section">
        <div className="container">
          <div style={{position: 'relative', height: '140px'}}>
            <TextPressure
              text="trainwreckstation"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={24}
            />
          </div>
        </div>
      </section>

      {/* Tilted Cards Section */}
      <section className="tilted-cards-section" ref={containerRef}>
        <div className="container">
          {mouseX > 0 && (
            <div 
              className="mouse-indicator"
              style={{
                left: `${mouseX}px`,
                opacity: 0.6
              }}
            >
              <div className="indicator-dot"></div>
              <div className="indicator-line"></div>
            </div>
          )}
          <div 
            className="tilted-cards-grid"
            style={{
              transform: `translateX(${cardOffset}px)`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            {infiniteVideos.map((video, index) => (
              <a 
                key={`${video.id}-${index}`}
                href={`https://www.youtube.com/watch?v=${video.id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="card-link"
              >
                <TiltedCard
                  imageSrc={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  altText={video.title}
                  containerHeight="300px"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Train Section */}
      <section className="animated-train-section">
        <AnimatedTrain />
      </section>

      {/* Events Table Section */}
      <EventsTable />

    </div>
  )
}

export default App 