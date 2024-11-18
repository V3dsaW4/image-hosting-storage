// import { createSignal } from 'solid-js';

// function ImageUpload() {
//   const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
//   const [isUploading, setIsUploading] = createSignal(false);
//   const [progress, setProgress] = createSignal(0);

//   const handleFileChange = (event: Event) => {
//     const input = event.target as HTMLInputElement;
//     const file = input?.files?.[0] ?? null;
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) { // 限制文件大小为10MB
//         alert('文件大小超过 10MB，请选择更小的文件');
//         setSelectedFile(null);
//         return;
//       }
//       setSelectedFile(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile()) {
//       alert('请先选择文件');
//       return;
//     }

//     setIsUploading(true);
//     setProgress(0);

//     const formData = new FormData();
//     formData.append('file', selectedFile() as Blob);

//     try {
//       const response = await fetch('https://image-hosting-storage.wwl158.workers.dev/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       console.log('Response:', response);

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Upload result:', result);
//         alert('上传成功！');
//       } else {
//         console.error('Upload failed:', response.status);
//         const error = await response.text();
//         alert(`上传失败：${error}`);
//       }
//     } catch (error) {
//       console.error('Error during upload:', error);
//       alert('上传出错，请检查网络或服务状态');
//     } finally {
//       setIsUploading(false);
//       setProgress(100); // 假设完成上传时直接设置为 100%
//     }
//   };

//   return (
//     <div class="max-w-screen-md mx-auto p-4">
//       <h1 class="text-2xl font-bold mb-4">图片上传</h1>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         class="mb-4"
//         disabled={isUploading()} // 上传时禁用文件选择
//       />
//       <button
//         onClick={handleUpload}
//         class={`bg-blue-500 text-white py-2 px-4 rounded ${isUploading() ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={isUploading()} // 上传时禁用按钮
//       >
//         {isUploading() ? '上传中...' : '上传图片'}
//       </button>
//       <div class="mt-4">
//         {isUploading() && (
//           <div class="w-full bg-gray-200 rounded">
//             <div
//               class="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
//               style={{ width: `${progress()}%` }}
//             >
//               {progress()}%
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageUpload;


import { createSignal } from 'solid-js';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [isUploading, setIsUploading] = createSignal(false);
  const [progress, setProgress] = createSignal(0);

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

    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile() as Blob);

    try {
      const response = await fetch(`https://image-hosting-storage.wwl158.workers.dev/upload`, {
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
    } finally {
      setIsUploading(false);
      setProgress(100); // 假设完成上传时直接设置为 100%
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
        disabled={isUploading()} // 上传时禁用文件选择
      />
      <button
        onClick={handleUpload}
        class={`bg-blue-500 text-white py-2 px-4 rounded ${isUploading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isUploading()} // 上传时禁用按钮
      >
        {isUploading() ? '上传中...' : '上传图片'}
      </button>
      <div class="mt-4">
        {isUploading() && (
          <div class="w-full bg-gray-200 rounded">
            <div
              class="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
              style={{ width: `${progress()}%` }}
            >
              {progress()}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;

