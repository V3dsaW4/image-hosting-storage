import { createSignal } from 'solid-js'

function ImageUpload() {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null)

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] ?? null; // 确保如果没有文件，则是 null
    setSelectedFile(file); // 传递 null 或者 File
  }


  const handleUpload = async () => {
    if (!selectedFile()) {
      alert('Please select a file first')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile() as Blob) // 确保传递文件为 Blob 类型

    try {
      const response = await fetch('https://image-hosting-storage.wwl158.workers.dev/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('result', result)
        alert('上传成功')
      } else {
        console.error('Upload failed. HTTP status:', response.status)
      }
    } catch (error) {
      console.error('Error during upload:', error)
    }
  }

  return (
    <div class="max-w-screen-md mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Image Upload</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        class="mb-4"
      />
      <button onClick={handleUpload} class="bg-blue-500 text-white py-2 px-4 rounded">
        Upload Image
      </button>
    </div>
  )
}

export default ImageUpload
