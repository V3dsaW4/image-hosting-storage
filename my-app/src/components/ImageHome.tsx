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
//   const [pageNo, setPageNo] = createSignal(1);

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
//         <p>当前第 {pageNo()} 页，共 {picList.loading ? '加载中...' : picList().total} 条数据</p>
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

//       {/* 底部分页按钮 */}
//       <div class="fixed bottom-0 left-0 p-4 w-full flex flex-1 mt-8 justify-between bg-white shadow-inner">
//         {pageNo() > 1 ? (
//           <p
//             class="w-22 relative inline-flex justify-center items-center rounded-md border border-gray-300 text-white px-4 py-2 text-sm font-medium bg-blue-500"
//             onClick={() => setPageNo((p) => p - 1)}
//           >
//             上一页
//           </p>
//         ) : (
//           <p class="w-20" />
//         )}

//         <p class="font-medium pt-2">第 {pageNo()} 页</p>

//         {/* 显示下一页按钮，且禁用当没有更多数据时 */}
//         {!picList.loading && pageNo() * pageSize < picList().total ? (
//           <p
//             class="w-20 relative inline-flex justify-center items-center rounded-md border border-gray-300 text-white px-4 py-2 text-sm font-medium bg-blue-500"
//             onClick={() => setPageNo((p) => p + 1)}
//           >
//             下一页
//           </p>
//         ) : (
//           <p class="w-20" />
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageHome;


import { createResource, createSignal, For } from 'solid-js';
import dayjs from 'dayjs';
import copy from 'clipboard-copy';

// 为 fetchPics 函数的参数定义类型
interface FetchPicsParams {
  pageNum: number;
  pageSize: number;
}

const fetchPics = async ({ pageNum, pageSize }: FetchPicsParams) => {
  try {
    const response = await fetch(`https://image-hosting-storage.wwl158.workers.dev/query?pageSize=${pageSize}&pageNum=${pageNum}`);
    if (!response.ok) {
      throw new Error('网络请求失败');
    }
    return await response.json();
  } catch (error) {
    console.error('请求失败:', error);
    return { results: [], total: 0 };  // 错误时返回空数据
  }
};

// 为 copyToClipboard 函数的参数定义类型
const copyToClipboard = async (text: string) => {
  try {
    await copy(text); // 使用 clipboard-copy 复制到剪贴板
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

  // 创建资源，加载图片列表
  const [picList] = createResource(fetchOption, fetchPics);

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
                    <img class="h-full object-contain" src={picItem.imageUrl} alt={picItem.imageName} />
                  </div>

                  {/* 图片信息 */}
                  <div class="w-full pt-2 pl-5 space-y-2">
                    {/* 图片名，处理长文本 */}
                    <div class="text-sm font-semibold text-gray-800 truncate w-full">{picItem.imageName}</div>

                    {/* 创建时间 */}
                    <div class="text-xs text-gray-600">{dayjs(+picItem.createdAt).format('YYYY/MM/DD HH:mm:ss')}</div>

                    {/* 图片地址，处理长文本 */}
                    <div class="text-xs text-gray-400 break-words">{picItem.imageUrl}</div>
                  </div>

                  {/* 复制链接按钮 */}
                  <div class="w-full flex p-3 justify-between">
                    <div
                      class="m-2 w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      onClick={() => copyToClipboard(picItem.imageUrl)}
                    >
                      复制链接
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

