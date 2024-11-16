import { createSignal } from 'solid-js';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0] ?? null;
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 限制文件大小为10MB
        alert('文件大小超过 10MB，请选择更小的文件');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile()) {
      alert('请先选择文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile() as Blob);

    try {
      const response = await fetch('https://image-hosting-storage.wwl158.workers.dev/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Response:', response);

      if (response.ok) {
        const result = await response.json();
        console.log('Upload result:', result);
        alert('上传成功！');
      } else {
        console.error('Upload failed:', response.status);
        const error = await response.text();
        alert(`上传失败：${error}`);
      }
    } catch (error) {
      console.error('Error during upload:', error);
      alert('上传出错，请检查网络或服务状态');
    }
  };

  return (
    <div class="max-w-screen-md mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">图片上传</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        class="mb-4"
      />
      <button onClick={handleUpload} class="bg-blue-500 text-white py-2 px-4 rounded">
        上传图片
      </button>
    </div>
  );
}

export default ImageUpload;
