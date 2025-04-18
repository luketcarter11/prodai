'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaPlay, FaShoppingCart } from 'react-icons/fa'
import { Track } from '@/types/track'
import { useCart } from '../context/CartContext'
import LicenseSelectionModal from './LicenseSelectionModal'
import CartPopup from './CartPopup'

interface TrackCardProps extends Omit<Track, 'key'> {
  musicalKey: string
  onPlay?: (track: Track) => void
  onDownload?: (track: Track) => void
  onShare?: (track: Track) => void
  licenseType?: 'Non-Exclusive' | 'Non-Exclusive Plus' | 'Exclusive' | 'Exclusive Plus' | 'Exclusive Pro'
}

export default function TrackCard({
  id,
  title,
  artist,
  coverUrl,
  price,
  bpm,
  musicalKey,
  duration,
  tags = [],
  audioUrl,
  licenseType = 'Non-Exclusive',
  onPlay,
  onDownload,
  onShare
}: TrackCardProps) {
  const { addToCart, cart } = useCart()
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false)
  const [addedTrack, setAddedTrack] = useState<Track | null>(null)
  const isInCart = cart.some(item => item.id === id)

  const track: Track = { 
    id, 
    title, 
    artist, 
    coverUrl, 
    price, 
    bpm, 
    key: musicalKey, 
    duration, 
    tags, 
    audioUrl,
    licenseType 
  }

  const handlePlay = () => {
    onPlay?.(track)
  }

  const handleDownload = () => {
    onDownload?.(track)
  }

  const handleShare = () => {
    onShare?.(track)
  }

  const handleAddToCart = () => {
    if (isInCart) {
      // If already in cart, navigate to cart page or show cart
      window.location.href = '/cart'
      return
    }
    
    // Open license selection modal
    setIsLicenseModalOpen(true)
  }

  // Handle cart popup close
  const handleCartPopupClose = () => {
    setIsCartPopupOpen(false)
    setAddedTrack(null)
  }

  // Handle license modal close and potentially show cart popup
  const handleLicenseModalClose = (addedItem?: Track | null) => {
    setIsLicenseModalOpen(false)
    
    if (addedItem) {
      setAddedTrack(addedItem)
      setIsCartPopupOpen(true)
    }
  }

  return (
    <>
      <div 
        className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-lg group"
        role="article"
        aria-label={`Track: ${title} by ${artist}`}
      >
        <div className="flex items-center flex-1">
          <div className="relative w-12 h-12 mr-4 group-hover:opacity-80 transition-opacity">
            <Image
              src={coverUrl}
              alt={`Cover art for ${title}`}
              fill
              className="object-cover rounded"
            />
            <button 
              onClick={handlePlay}
              onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Play ${title}`}
              tabIndex={0}
            >
              <FaPlay className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-medium truncate">{title}</h3>
            <p className="text-sm text-gray-400 truncate">{artist}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{duration}</span>
              <span>{bpm} BPM</span>
              <span>{musicalKey}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2 mx-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleDownload}
            onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={`Download ${title}`}
            tabIndex={0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          <button 
            onClick={handleShare}
            onKeyDown={(e) => e.key === 'Enter' && handleShare()}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={`Share ${title}`}
            tabIndex={0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
          <button 
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded font-medium transition-colors flex items-center ${
              isInCart 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
            aria-label={isInCart ? `${title} is in your cart` : `Add ${title} to cart for $${price.toFixed(2)}`}
          >
            {isInCart ? (
              <>
                <FaShoppingCart className="mr-1.5 w-3.5 h-3.5" />
                In Cart
              </>
            ) : (
              `$${price.toFixed(2)}`
            )}
          </button>
        </div>
      </div>

      {/* License Selection Modal with track info passed to it */}
      <LicenseSelectionModal
        isOpen={isLicenseModalOpen}
        onClose={(track) => {
          setIsLicenseModalOpen(false);
          if (track) {
            setAddedTrack(track);
            setIsCartPopupOpen(true);
          }
        }}
        track={track}
      />

      {/* Cart Popup */}
      <CartPopup 
        isOpen={isCartPopupOpen} 
        onClose={handleCartPopupClose} 
        addedTrack={addedTrack} 
      />
    </>
  )
} 