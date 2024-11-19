// import { createResource, createSignal, For } from 'solid-js';
// import dayjs from 'dayjs';
// import copy from 'clipboard-copy';

// // 为 fetchPics 函数的参数定义类型
// interface FetchPicsParams {
//   pageNum: number;
//   pageSize: number;
// }

// const fetchPics = async ({ pageNum, pageSize }: FetchPicsParams) => {
//   try {
//     const response = await fetch(`https://image-hosting-storage.wwl158.workers.dev/query?pageSize=${pageSize}&pageNum=${pageNum}`);
//     if (!response.ok) {
//       throw new Error('网络请求失败');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('请求失败:', error);
//     return { results: [], total: 0 };  // 错误时返回空数据
//   }
// };

// // 为 copyToClipboard 函数的参数定义类型
// const copyToClipboard = async (text: string) => {
//   try {
//     await copy(text); // 使用 clipboard-copy 复制到剪贴板
//     alert('链接已复制到剪贴板！');
//   } catch (error) {
//     console.error('复制失败:', error);
//     alert('复制失败，请重试！');
//   }
// };

// function ImageHome() {
//   const pageSize = 20;
//   const [pageNo] = createSignal(1);

//   // 配置 fetch 请求的参数
//   const fetchOption = () => ({
//     pageNum: pageNo(),
//     pageSize,
//   });

//   // 创建资源，加载图片列表
//   const [picList] = createResource(fetchOption, fetchPics);

//   return (
//     <div>
//       <div class="flex p-4 lg:p-10 justify-between lg:pb-0 pb-0 items-center">
//         <h1 class="p-4 text-2xl">图片列表</h1>
//         <p>共 {picList.loading ? '加载中...' : picList().total} 条数据</p>
//       </div>

//       <div class="p-4 lg:p-10">
//         <span>{picList.loading && '加载中...'}</span>

//         {/* 当没有加载完成且没有数据时，显示 "没有找到图片" */}
//         {!picList.loading && picList().results.length === 0 && (
//           <div class="text-center text-gray-500">没有找到图片</div>
//         )}

//         {/* 当数据加载完毕且有结果时，展示图片列表 */}
//         {!picList.loading && picList().results.length > 0 && (
//           <div class="grid 3xl:grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6 2xl:gap-8 pb-10">
//             <For each={picList().results}>
//               {(picItem) => (
//                 <div class="flex flex-col overflow-hidden items-center justify-center bg-slate-200 rounded-xl p-4 flex-wrap md:flex-nowrap">
//                   {/* 图片预览 */}
//                   <div class="flex flex-shrink-0 items-center w-32 h-32 rounded-md mx-auto p-2 justify-center">
//                     <img class="h-full object-contain" src={picItem.imageUrl} alt={picItem.imageName} />
//                   </div>

//                   {/* 图片信息 */}
//                   <div class="w-full pt-2 pl-5 space-y-2">
//                     {/* 图片名，处理长文本 */}
//                     <div class="text-sm font-semibold text-gray-800 truncate w-full">{picItem.imageName}</div>

//                     {/* 创建时间 */}
//                     <div class="text-xs text-gray-600">{dayjs(+picItem.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>

//                     {/* 图片地址，处理长文本 */}
//                     <div class="text-xs text-gray-400 break-words">{picItem.imageUrl}</div>
//                   </div>

//                   {/* 复制链接按钮 */}
//                   <div class="w-full flex p-3 justify-between">
//                     <div
//                       class="m-2 w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
//                       onClick={() => copyToClipboard(picItem.imageUrl)}
//                     >
//                       复制链接
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </For>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageHome;

import { createResource, createSignal, For } from 'solid-js';
import dayjs from 'dayjs';
import copy from 'clipboard-copy';

// 定义 fetchPics 参数类型
interface FetchPicsParams {
  pageNum: number;
  pageSize: number;
}

// 定义 deletePic 参数类型
interface DeletePicParams {
  id: string;
}

// 获取图片列表的函数
const fetchPics = async ({ pageNum, pageSize }: FetchPicsParams) => {
  try {
    const response = await fetch(
      `https://image-hosting-storage.wwl158.workers.dev/query?pageSize=${pageSize}&pageNum=${pageNum}`
    );
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    return await response.json();
  } catch (error) {
    console.error('请求失败:', error);
    return { results: [], total: 0 }; // 返回空数据以防止页面崩溃
  }
};

// 删除图片的函数
const deletePic = async ({ id }: DeletePicParams) => {
  try {
    const response = await fetch(`https://image-hosting-storage.wwl158.workers.dev/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('删除失败');
    }

    const result = await response.json();
    if (result.success) {
      alert('图片删除成功！');
    } else {
      alert('图片删除失败，请重试！');
    }

    return result;
  } catch (error) {
    console.error('删除请求失败:', error);
    alert('删除失败，请检查网络或重试！');
  }
};

// 复制到剪贴板的函数
const copyToClipboard = async (text: string) => {
  try {
    await copy(text); // 使用 clipboard-copy 库
    alert('链接已复制到剪贴板！');
  } catch (error) {
    console.error('复制失败:', error);
    alert('复制失败，请重试！');
  }
};

function ImageHome() {
  const pageSize = 20;
  const [pageNo] = createSignal(1);

  // 配置 fetch 请求的参数
  const fetchOption = () => ({
    pageNum: pageNo(),
    pageSize,
  });

  // 创建资源，加载图片列表，并解构出 refetch
  const [picList, { refetch }] = createResource(fetchOption, fetchPics);

  return (
    <div>
      <div class="flex p-4 lg:p-10 justify-between lg:pb-0 pb-0 items-center">
        <h1 class="p-4 text-2xl">图片列表</h1>
        <p>共 {picList.loading ? '加载中...' : picList().total} 条数据</p>
      </div>

      <div class="p-4 lg:p-10">
        <span>{picList.loading && '加载中...'}</span>

        {/* 当没有加载完成且没有数据时，显示 "没有找到图片" */}
        {!picList.loading && picList().results.length === 0 && (
          <div class="text-center text-gray-500">没有找到图片</div>
        )}

        {/* 当数据加载完毕且有结果时，展示图片列表 */}
        {!picList.loading && picList().results.length > 0 && (
          <div class="grid 3xl:grid-cols-4 2xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6 2xl:gap-8 pb-10">
            <For each={picList().results}>
              {(picItem) => (
                <div class="flex flex-col overflow-hidden items-center justify-center bg-slate-200 rounded-xl p-4 flex-wrap md:flex-nowrap">
                  {/* 图片预览 */}
                  <div class="flex flex-shrink-0 items-center w-32 h-32 rounded-md mx-auto p-2 justify-center">
                    <img
                      class="h-full object-contain"
                      src={picItem.imageUrl}
                      alt={picItem.imageName}
                    />
                  </div>

                  {/* 图片信息 */}
                  <div class="w-full pt-2 pl-5 space-y-2">
                    <div class="text-sm font-semibold text-gray-800 truncate w-full">
                      {picItem.imageName}
                    </div>
                    <div class="text-xs text-gray-600">
                      {dayjs(+picItem.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                    </div>
                    <div class="text-xs text-gray-400 break-words">{picItem.imageUrl}</div>
                  </div>

                  {/* 操作按钮 */}
                  <div
                    class="w-full flex p-3 justify-between mt-auto"
                    style="min-height: 80px;" // 固定按钮容器高度
                  >
                    {/* 复制链接按钮 */}
                    <div
                      class="m-2 w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      onClick={() => copyToClipboard(picItem.imageUrl)}
                    >
                      复制链接
                    </div>
                    {/* 删除按钮 */}
                    <div
                      class="m-2 w-full text-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      onClick={async () => {
                        const confirmed = confirm('确定要删除这张图片吗？');
                        if (confirmed) {
                          const result = await deletePic({ id: picItem.id });
                          if (result?.success) {
                            refetch();
                          }
                        }
                      }}
                    >
                      删除图片
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageHome;


