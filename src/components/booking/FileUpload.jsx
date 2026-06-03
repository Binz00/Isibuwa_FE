/**
 * components/booking/FileUpload.jsx
 * Drag-and-drop styled file input with preview and validation feedback.
 */

import { useState, useRef, useCallback } from 'react'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = {
  'image/jpeg':      'JPEG',
  'image/jpg':       'JPEG',
  'image/png':       'PNG',
  'application/pdf': 'PDF',
}

export function FileUpload({ onChange, error }) {
  const [dragActive, setDragActive] = useState(false)
  const [file,       setFile]       = useState(null)
  const [fileError,  setFileError]  = useState(null)
  const inputRef = useRef(null)

  const validate = (f) => {
    if (!ACCEPTED_TYPES[f.type]) {
      return 'Only JPEG, PNG, and PDF files are accepted'
    }
    if (f.size > MAX_SIZE) {
      return 'File size must not exceed 5MB'
    }
    return null
  }

  const handleFile = useCallback((f) => {
    const err = validate(f)
    if (err) {
      setFileError(err)
      setFile(null)
      onChange(null)
    } else {
      setFileError(null)
      setFile(f)
      onChange(f)
    }
  }, [onChange])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) handleFile(droppedFile)
  }

  const handleChange = (e) => {
    const selected = e.target.files[0]
    if (selected) handleFile(selected)
  }

  const formatSize = (bytes) => {
    if (bytes < 1024)       return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const displayError = fileError || error?.message

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/80">
        Payment Slip <span className="text-white/40">(JPEG, PNG, PDF — max 5MB)</span>
      </label>

      {/* Drop zone */}
      <div
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false) }}
        onDragOver={(e)  => { e.preventDefault(); setDragActive(true) }}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'relative flex flex-col items-center justify-center gap-3',
          'rounded-xl border-2 border-dashed p-8 cursor-pointer',
          'transition-all duration-200',
          dragActive
            ? 'border-primary-500 bg-primary-500/10 scale-[1.01]'
            : file
            ? 'border-emerald-500/60 bg-emerald-500/5'
            : displayError
            ? 'border-red-500/60 bg-red-500/5'
            : 'border-white/20 bg-white/5 hover:border-primary-500/60 hover:bg-white/8',
        ].join(' ')}
        role="button"
        tabIndex={0}
        aria-label="Upload payment slip"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleChange}
          className="hidden"
          id="payment_slip"
          aria-hidden="true"
        />

        {file ? (
          <>
            {/* File icon */}
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              {file.type === 'application/pdf' ? (
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-emerald-400">✓ File selected</p>
              <p className="text-xs text-white/60 mt-1">{file.name}</p>
              <p className="text-xs text-white/40">{formatSize(file.size)}</p>
            </div>
            <p className="text-xs text-white/40">Click to change file</p>
          </>
        ) : (
          <>
            <div className={[
              'w-14 h-14 rounded-xl flex items-center justify-center transition-colors',
              dragActive ? 'bg-primary-500/30' : 'bg-white/5',
            ].join(' ')}>
              <svg className={['w-7 h-7 transition-colors', dragActive ? 'text-primary-400' : 'text-white/30'].join(' ')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white/70">
                <span className="text-primary-400 font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/40 mt-1">JPEG, PNG, PDF up to 5MB</p>
            </div>
          </>
        )}
      </div>

      {displayError && (
        <p className="text-sm text-red-400 flex items-center gap-1" role="alert">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {displayError}
        </p>
      )}
    </div>
  )
}
