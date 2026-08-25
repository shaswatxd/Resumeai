'use client'

import { useRef, useState, useEffect } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { X, Upload, Trash2, ZoomIn, Image as ImageIcon, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  open: boolean
  onClose: () => void
  photo?: string
  currentPhoto?: string
  onSave: (dataUrl: string) => void
  onRemove?: () => void
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
]

export function PhotoEditor({
  open,
  onClose,
  photo,
  currentPhoto,
  onSave,
  onRemove,
}: Props) {
  const activePhoto = photo || currentPhoto || ''
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setRawImage(null)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
  }, [open])

  if (!open) return null

  const image = rawImage ?? (activePhoto || null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setRawImage(String(reader.result))
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleClose = () => {
    setRawImage(null)
    onClose()
  }

  const handleSave = async () => {
    if (!image) return
    setSaving(true)
    try {
      const cropped = croppedAreaPixels
        ? await getCroppedImage(image, croppedAreaPixels)
        : await compressImage(image)
      onSave(cropped)
      handleClose()
    } catch {
      onSave(image)
      handleClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
      onClick={handleClose}
      role="dialog"
      aria-label="Edit Profile Photo"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-popover p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Profile Photo</h3>
            <p className="text-xs text-muted-foreground">Crop and position your headshot</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        {image ? (
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-950">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/20 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <Upload className="size-7 text-primary" />
              <span className="text-sm font-medium">Upload photo from device</span>
              <span className="text-xs text-muted-foreground">JPG, PNG or WebP</span>
            </button>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Or choose a sample headshot
              </p>
              <div className="flex gap-2.5">
                {PRESET_AVATARS.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRawImage(url)
                      setCrop({ x: 0, y: 0 })
                      setZoom(1)
                    }}
                    className="relative size-14 overflow-hidden rounded-full border-2 border-border transition-all hover:scale-105 hover:border-primary"
                  >
                    <img src={url} alt={`Preset ${i + 1}`} className="size-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {image && (
          <div className="mt-4 flex items-center gap-3">
            <ZoomIn className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-primary"
              aria-label="Zoom"
            />
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFile}
        />

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/60 pt-4">
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="size-3.5" />
            {image ? 'Change' : 'Choose File'}
          </Button>

          <div className="flex items-center gap-2">
            {(image || activePhoto) && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  if (onRemove) onRemove()
                  else onSave('')
                  handleClose()
                }}
              >
                <Trash2 className="size-3.5" />
                Remove
              </Button>
            )}
            <Button size="sm" onClick={handleSave} disabled={!image || saving}>
              {saving ? 'Saving…' : 'Save Photo'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCroppedImage(src: string, area: Area): Promise<string> {
  return loadImage(src).then((img) => {
    const targetDim = Math.min(360, Math.max(120, Math.round(area.width)))
    const canvas = document.createElement('canvas')
    canvas.width = targetDim
    canvas.height = targetDim
    const ctx = canvas.getContext('2d')
    if (!ctx) return src
    ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, targetDim, targetDim)
    return canvas.toDataURL('image/jpeg', 0.88)
  })
}

function compressImage(src: string): Promise<string> {
  return loadImage(src).then((img) => {
    const maxDim = 360
    let w = img.width
    let h = img.height
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w)
        w = maxDim
      } else {
        w = Math.round((w * maxDim) / h)
        h = maxDim
      }
    }
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return src
    ctx.drawImage(img, 0, 0, w, h)
    return canvas.toDataURL('image/jpeg', 0.88)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = src
  })
}
