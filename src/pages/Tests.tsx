// import { useState } from "react";

// function Login() {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="max-w-[800px] w-full mx-auto p-10 shadow-2xl rounded-lg bg-white">
//         {/* Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-orange-600">Welcome Back!</h1>
//           <p className="text-xl text-gray-600 mt-2">Please login to your account</p>
//         </div>

//         {/* Form */}
//         <form action="">
//           {/* Username Field */}
//           <div className="mb-6">
//             <label htmlFor="username" className="block mb-2 text-lg text-gray-600">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="w-full p-4 border border-gray-300 rounded-lg text-lg"
//               placeholder="Enter your username"
//               onChange={(event) => {
//                 setUsername(event.target.value);
//                 setError("");
//               }}
//             />
//           </div>

//           {/* Password Field */}
//           <div className="mb-6">
//             <label htmlFor="password" className="block mb-2 text-lg text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-4 border border-gray-300 rounded-lg text-lg"
//               placeholder="Enter your password"
//               onChange={(event) => {
//                 setPassword(event.target.value);
//                 setError("");
//               }}
//             />
//           </div>

//           {/* Error Message */}
//           {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

//           {/* Login Button */}
//           <div className="mt-8">
//             <button
//               type="button"
//               className="w-full py-3 text-xl bg-orange-600 text-white rounded-lg hover:bg-orange-800"
//             >
//               Login
//             </button>
//           </div>

//           {/* Register Button */}
//           <div className="mt-4">
//             <button className="w-full py-3 text-xl bg-gray-500 text-white rounded-lg hover:bg-gray-700">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
