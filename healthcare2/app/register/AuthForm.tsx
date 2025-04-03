
import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: isRegister ? "register" : "login", name, email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/${role}`); // redirect ไป /user, /doctor, /admin
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
          {isRegister ? "Create an Account" : "Welcome Back!"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <select
              className="w-full border rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setIsRegister(false)} className="text-blue-600 underline">
                Login here
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button onClick={() => setIsRegister(true)} className="text-blue-600 underline">
                Register here
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
