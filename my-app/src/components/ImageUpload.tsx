import { createSignal } from 'solid-js';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = createSignal(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile()) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile());

    try {
      const response = await fetch('https://image-hosting-storage.wwl158.workers.dev/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('result', result);
        alert('上传成功');
      } else {
        console.error('Upload failed. HTTP status:', response.status);
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

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
        上传
      </button>
    </div>
  );
}

export default ImageUpload;
