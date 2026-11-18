import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">About</h1>
        <p className="mb-6 text-gray-700">
          A small to-do app built with Next.js, React, Tailwind and json-server
          while learning frontend at Blotz.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to my to-dos
        </Link>
      </div>
    </main>
  );
}
