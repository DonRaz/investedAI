// This is a route handler for favicon.ico
export const runtime = 'edge';

export async function GET() {
  // Redirect to the SVG favicon
  return new Response(null, {
    status: 307,
    headers: {
      'Location': '/favicon.svg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 