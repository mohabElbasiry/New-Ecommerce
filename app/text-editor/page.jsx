"use client"
import TextEditor from '@/components/TextEditor'
import React, { useState } from 'react'

export default function page() {
    const [content, setContent] = useState("Worlds best html page");
  return (
    <div>
     <TextEditor content={content} setContent={setContent} /> 
    </div>
  )
}
