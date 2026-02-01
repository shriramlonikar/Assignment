"use client";
import EventBasicsStep from '@/components/forms/EventBasicsStep'
import React from 'react'

const page = () => {
  const handleNext = () => {
    // Handle next step logic here
  }

  return (
    <div>
      <EventBasicsStep onNext={handleNext}/>
    </div>
  )
}

export default page
