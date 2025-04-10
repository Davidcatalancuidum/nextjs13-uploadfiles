"use client"
import { useState } from "react"

function HomePage() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    // Crear URL de previsualización
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black p-8 rounded-lg shadow-md w-96">
        <form onSubmit={async (e) => {
          e.preventDefault()
          
          if(!file) return

          const form = new FormData()
          form.set("file", file)

          const res = await fetch("/api/upload", {
            method: "POST",
            body: form
          })

          const data = await res.json()
          console.log(data)

          // Limpiar la previsualización después de subir
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
          }
        }}>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-200 font-medium">Upload file:</label>
              <input 
                type="file" 
                onChange={handleFileChange}
                accept="image/*"
                className="border p-2 rounded-md bg-gray-800 text-gray-200 border-gray-700"
              />
            </div>

            {previewUrl && (
              <div className="mt-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-contain rounded-md border border-gray-700"
                />
              </div>
            )}

            <button 
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HomePage