import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">🗺️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page introuvable
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Cette page n&apos;existe pas ou a été supprimée.
        </p>
        <Link
          href="/dashboard"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Retour au dashboard
        </Link>
      </div>
    </div>
  );
}
