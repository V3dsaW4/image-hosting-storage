// import { createSignal } from 'solid-js'
// // import solidLogo from './assets/solid.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import './index.css'

// import { createSignal, lazy } from 'solid-js';
// import 'tailwindcss/tailwind.css';

// const ImageUpload = lazy(() => import('./components/ImageUpload'));
// const ImageHome = lazy(() => import('./components/ImageHome'));

// function App() {
//   const [showUpload, setShowUpload] = createSignal(true);

//   return (
//     <div class="min-h-screen w-full bg-gray-800 text-white flex flex-col overflow-hidden">
//       {/* 主容器，确保页面高度至少填满屏幕，去掉滚动条 */}

//       {/* Header */}
//       <div class="bg-gray-700 shadow-md p-5 flex justify-between items-center sm:flex-col md:flex-row">
//         {/* 顶部背景深灰色，没有圆角，响应式调整 */}
//         <h1 class="text-3xl font-bold text-gray-100 text-center md:text-left">图片管理系统</h1>
//         <div class="space-x-4 mt-4 md:mt-0 md:flex-row flex flex-col items-center md:items-center">
//           <button
//             class="py-2 px-6 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all duration-300 w-full sm:w-auto"
//             onClick={() => setShowUpload(true)}
//           >
//             上传图片
//           </button>
//           <button
//             class="py-2 px-6 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all duration-300 w-full sm:w-auto mt-4 md:mt-0"
//             onClick={() => setShowUpload(false)}
//           >
//             图片列表
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div class="flex-grow w-full p-4 sm:p-8 lg:p-16 bg-gray-700 flex flex-col overflow-auto">
//         <div class="max-w-4xl mx-auto bg-gray-600 p-6 sm:p-8 rounded-lg shadow-xl">
//           {showUpload() ? (
//             <ImageUpload />
//           ) : (
//             <ImageHome />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import './App.css';
import './index.css';

import { createSignal, lazy } from 'solid-js';
import 'tailwindcss/tailwind.css';

const ImageUpload = lazy(() => import('./components/ImageUpload'));
const ImageHome = lazy(() => import('./components/ImageHome'));

function App() {
  const [showUpload, setShowUpload] = createSignal(true);
  const [showLogin, setShowLogin] = createSignal(true);  // 用于控制登录弹窗的显示状态
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');

  // 账号和密码验证
  const correctUsername = 'wwl';
  const correctPassword = '403';

  // 登录验证函数
  const handleLogin = () => {
    if (username() === correctUsername && password() === correctPassword) {
      setShowLogin(false);  // 登录成功后关闭弹窗
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div class="min-h-screen w-full bg-gray-800 text-white flex flex-col overflow-hidden">

      {/* 登录弹窗 */}
      {showLogin() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-gray-800 p-8 rounded-xl w-96">
            <h2 class="text-xl font-bold text-center text-white mb-4">请输入账号密码</h2>
            <div class="mb-4">
              <label class="text-white block mb-2" for="username">账号：</label>
              <input
                id="username"
                type="text"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                class="w-full p-2 rounded-md bg-gray-700 text-white"
              />
            </div>
            <div class="mb-4">
              <label class="text-white block mb-2" for="password">密码：</label>
              <input
                id="password"
                type="password"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                class="w-full p-2 rounded-md bg-gray-700 text-white"
              />
            </div>
            {error() && <div class="text-red-500 text-sm mb-4">{error()}</div>}
            <div class="flex justify-between">
              <button
                class="py-2 px-6 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold"
                onClick={handleLogin}
              >
                登录
              </button>
              <button
                class="py-2 px-6 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold"
                onClick={() => alert('取消登录')}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header (导航栏) */}
      <div class="bg-gray-700 shadow-md p-5 flex justify-between items-center sm:flex-col md:flex-row">
        {/* 顶部背景深灰色，没有圆角，响应式调整 */}
        <h1 class="text-3xl font-bold text-gray-100 text-center md:text-left">图片管理</h1>
        <div class="space-x-4 mt-4 md:mt-0 md:flex-row flex flex-col items-center md:items-center">
          <button
            class="py-2 px-6 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all duration-300 w-full sm:w-auto"
            onClick={() => setShowUpload(true)}
          >
            上传图片
          </button>
          <button
            class="py-2 px-6 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all duration-300 w-full sm:w-auto mt-4 md:mt-0"
            onClick={() => setShowUpload(false)}
          >
            图片列表
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div class="flex-grow w-full p-4 sm:p-8 lg:p-16 bg-gray-700 flex flex-col overflow-auto">
        <div class="max-w-4xl mx-auto bg-gray-600 p-6 sm:p-8 rounded-lg shadow-xl">
          {showUpload() ? (
            <ImageUpload />
          ) : (
            <ImageHome />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


